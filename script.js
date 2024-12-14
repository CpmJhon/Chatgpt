// Function untuk mengirim pesan ke ChatGPT
function sendMessage() {
    const message = document.getElementById('user-message').value;
    if (message.trim() === '') return;

    // Menampilkan pesan pengguna di chat
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML += `<div><strong>You:</strong> ${message}</div>`;
    document.getElementById('user-message').value = '';

    // Kirim pesan ke server (Flask)
    fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: message })
    })
    .then(response => response.json())
    .then(data => {
        chatBox.innerHTML += `<div><strong>ChatGPT:</strong> ${data.response}</div>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    });
}

// Function untuk melakukan pencarian artikel
function searchArticles() {
    const query = document.getElementById('search-query').value;
    
    // Kirim query pencarian ke server (Flask)
    fetch(`/search?q=${query}`)
        .then(response => response.json())
        .then(data => {
            const results = data.results;
            const resultsList = document.getElementById('search-results');
            resultsList.innerHTML = ''; // Kosongkan hasil pencarian sebelumnya

            if (results.length === 0) {
                resultsList.innerHTML = '<li>No articles found</li>';
            } else {
                results.forEach(article => {
                    const li = document.createElement('li');
                    li.textContent = article.title;
                    resultsList.appendChild(li);
                });
            }
        });
}
