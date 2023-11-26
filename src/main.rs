use std::sync::Arc;

use leptos::*;
use posts::posts::Posts;
// cuse posts::Posts;
use warp::{http::Response, Filter, reply::Reply};

mod posts;
mod handlers;

#[tokio::main]
async fn main() {
    let lazy = warp::get().and(warp::path("lazy")).map(|| {
        let html = ssr::render_to_string(Lazy);
        warp::reply::html(html.to_string())
    });
    let posts = Posts::new("/home/jgero/projects/my-webpage/posts".to_string());
    let posts_ref = Arc::new(posts);
    let post_handler = warp::path!("posts" / String)
        .and(warp::get())
        .and(warp::any().map(move || posts_ref.clone()))
        .and_then(|name, posts: Arc<Posts>| async move {
            println!("searching post {}", name);
            if let Some(post) = posts.get_post(name) {
                Ok(post.into_response())
            } else {
                println!("post not found");
                Err(warp::reject())
            }
        })
    ;
    let hello = warp::get().and(warp::path("asdf")).map(move || {
        let html = ssr::render_to_string(Main);
        warp::reply::html(html.to_string())
    });
    warp::serve(lazy.or(hello).or(post_handler))
        .run(([127, 0, 0, 1], 8080))
        .await;
}

#[component]
fn Main() -> impl IntoView {
    view! {
    <head>
      <script src="https://unpkg.com/htmx.org@1.9.9" integrity="sha384-QFjmbokDn2DjBjq+fM+8LUIVrAgqcNW2s0PjAxHETgRn9l4fvX31ZxDxvwQnyMOX" crossorigin="anonymous"></script>
    </head>
    <body>
      <App />
      <div hx-get="/lazy" hx-trigger="load"></div>
    </body>
    }
}

#[component]
fn App() -> impl IntoView {
    view! {
        <div>hello world</div>
    }
}

#[component]
fn Lazy() -> impl IntoView {
    view! {
        <div>Im lazy</div>
    }
}
