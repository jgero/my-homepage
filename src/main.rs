use leptos::*;
use warp::Filter;

#[tokio::main]
async fn main() {
    let hello = warp::get().map(move || {
        let html = ssr::render_to_string(Main);
        warp::reply::html(html.to_string())
    });

    warp::serve(hello).run(([127, 0, 0, 1], 8080)).await;
}

#[component]
fn Main() -> impl IntoView {
    view! {
    <head>
      <script src="https://unpkg.com/htmx.org@1.9.9" integrity="sha384-QFjmbokDn2DjBjq+fM+8LUIVrAgqcNW2s0PjAxHETgRn9l4fvX31ZxDxvwQnyMOX" crossorigin="anonymous"></script>
    </head>
    <body>
      <App />
    </body>
    }
}

#[component]
fn App() -> impl IntoView {
    view! {
        <div>hello world</div>
    }
}
