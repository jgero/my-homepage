use std::convert::Infallible;

// use crate::posts::Posts;
// use warp::http::StatusCode;
//
// pub async fn load_post(name: String, posts: Posts) -> Result<impl warp::Reply, Infallible> {
//     if !posts.has_post(name) {
//         return Ok(StatusCode::NOT_FOUND);
//     }
//     posts.get_post_content(name)
//         warp::reply::Reply
// }
//
// // pub async fn posts(name: String, posts: Posts) -> Result<impl warp::Reply, Infallible> {
// //
// // }
