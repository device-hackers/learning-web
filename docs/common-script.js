const refresh = document.getElementById('refresh');
const clear = document.getElementById('clear');
const localStorageOutput = document.getElementById('localStorageOutput');

function displayLocalStorage() {
    const output = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        output.push(`${key}: ${value}`);
    }
    localStorageOutput.innerText = output.join('\n');
}

refresh.addEventListener('click', displayLocalStorage);

clear.addEventListener('click', function() {
    localStorage.clear();
    displayLocalStorage();
});

displayLocalStorage();