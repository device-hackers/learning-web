window.addEventListener('message', function(event) {
    if (event.data && event.data.type === 'SET_TOKEN') {
        localStorage.setItem('token', event.data.token);
        displayLocalStorage();
    } else if (event.data && event.data.type === 'GET_TOKEN') {
        const token = localStorage.getItem('token') || '';
        event.source.postMessage({ type: 'TOKEN_RESPONSE', token }, '*');
    }
});