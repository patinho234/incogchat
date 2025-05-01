const socket = io();

let username = '';

const usernameScreen = document.getElementById('username-screen');
const chatScreen = document.getElementById('chat-screen');
const usernameInput = document.getElementById('usernameInput');
const enterChat = document.getElementById('enterChat');
const usernameError = document.getElementById('usernameError');

const inputMessage = document.getElementById('inputMessage');
const sendButton = document.getElementById('sendButton');
const messages = document.getElementById('messages');

const badWords = ['palavrao1', 'palavrao2', 'outro']; // adicione palavras proibidas aqui

function containsBadWords(text) {
    return badWords.some(word => text.toLowerCase().includes(word));
}

// Entrar no chat
enterChat.addEventListener('click', () => {
    const name = usernameInput.value.trim();
    if (!name) {
        usernameError.textContent = "Digite um nome válido.";
    } else if (containsBadWords(name)) {
        usernameError.textContent = "Nome de usuário contém palavras proibidas.";
    } else {
        username = name;
        usernameScreen.style.display = 'none';
        chatScreen.style.display = 'block';
    }
});

// Enviar mensagem
sendButton.addEventListener('click', () => {
    const message = inputMessage.value.trim();
    if (message) {
        socket.emit('chat message', { username, message });
        inputMessage.value = '';
    }
});

// Receber mensagens
socket.on('chat message', (data) => {
    const messageElement = document.createElement('div');
    messageElement.innerHTML = `<strong>${data.username}:</strong> ${data.message}`;
    messages.appendChild(messageElement);
    messages.scrollTop = messages.scrollHeight;
});
