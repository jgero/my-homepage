use chrono::Datelike;
use leptos::{IntoView, component, view};

pub struct Post {
    content: String,
    created: chrono::DateTime<chrono::Utc>
}

impl Post {
    pub fn new(content: String, created: chrono::DateTime<chrono::Utc>) -> Self {
        Post { content, created }
    }
}

impl warp::reply::Reply for Post {
    fn into_response(self) -> warp::reply::Response {
        let rendered = leptos::ssr::render_to_string(||view! {<PostCmp post=self />});
        return warp::reply::html(rendered.to_string()).into_response();
    }
}

#[component]
fn PostCmp(post: Post) -> impl IntoView {
    view! {
        <HeaderCmp stamp=post.created />
        <div>{post.content}</div>
    }
}

#[component]
fn HeaderCmp(stamp: chrono::DateTime<chrono::Utc>) -> impl IntoView {
    view! { <div>"hello world at" {stamp.year()} {stamp.month()}</div> }
}
