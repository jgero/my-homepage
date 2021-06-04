import { get_posts } from './_posts.js';

export async function get(req, res) {
	const posts = get_posts();
	res.end(JSON.stringify(posts));
}
