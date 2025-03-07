addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
    const url = new URL(request.url);

    // Якщо запит надходить на site1.learning-web.rocks
    if (url.hostname === 'site1.learning-web.rocks') {
        // Отримуємо вміст з learning-web.rocks/site1.html
        const response = await fetch('https://learning-web.rocks/site1.html');
        return new Response(response.body, {
            headers: { 'Content-Type': 'text/html' },
        });
    }

    // Якщо запит не на сабдомен, повертаємо оригінальний запит
    return fetch(request);
}
