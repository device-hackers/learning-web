export default {
	async fetch(request, env, ctx) {
		const url = new URL(request.url);

		if (url.hostname === 'site1.learning-web.rocks') {
			const response = await fetch('https://learning-web.rocks/site1.html');
			return new Response(response.body, {
				headers: { 'Content-Type': 'text/html' },
			});
		}

		return fetch(request);
	},
};
