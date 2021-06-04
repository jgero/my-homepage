import { get_post } from "./_posts.js";

export async function get(req, res) {
  const { slug } = req.params;
  const post = get_post(slug);
  res.end(JSON.stringify(post));
}
