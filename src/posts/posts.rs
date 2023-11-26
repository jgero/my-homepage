use std::{fs, path::Path};

use super::post::Post;

pub struct Posts {
    path_base: String,
    post_names: Vec<String>,
}

impl Posts {
    pub fn new(path_input: String) -> Self {
        let post_names = fs::read_dir(path_input.clone())
            .unwrap()
            .map(|i| {
                i.unwrap()
                    .path()
                    .file_stem()
                    .unwrap()
                    .to_str()
                    .unwrap()
                    .to_string()
            })
            .collect::<Vec<String>>();
        Posts {
            post_names,
            path_base: path_input.clone(),
        }
    }

    pub fn get_posts(&self) -> &Vec<String> {
        &self.post_names
    }

    pub fn has_post(&self, name: String) -> bool {
        self.post_names.contains(&name)
    }

    pub fn get_post(&self, name: String) -> Option<Post> {
        let mut name = name.clone();
        name.push_str(".md");
        if let Ok(content) = fs::read_to_string(Path::new(&self.path_base).join(&name)) {
            Some(Post::new(content, chrono::Utc::now()))
        } else {
            None
        }
    }
}
