const authBridgeWindow = document.getElementById('authBridge').contentWindow;

document.getElementById('setToken').addEventListener('click', function() {
    const now = new Date();
    const token = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();

    localStorage.setItem('token', token);

    displayLocalStorage();

    authBridgeWindow.postMessage({ type: 'SET_TOKEN', token }, '*');
});

document.getElementById('getToken').addEventListener('click', function() {
    authBridgeWindow.postMessage({ type: 'GET_TOKEN' }, '*');
});

window.addEventListener('message', function(event) {
    if (event.data && event.data.type === 'TOKEN_RESPONSE') {
        localStorage.setItem('token', event.data.token);
        displayLocalStorage();
    }
});
