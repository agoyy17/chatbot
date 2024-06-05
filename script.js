const chatBox = document.getElementById('chat-box');
const inputBox = document.getElementById('input-box');
const sendBtn = document.getElementById('send-btn');
const historyList = document.getElementById('history-list');


sendBtn.addEventListener('click', sendMessage);
inputBox.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const message = inputBox.value;
    if (message.trim() !== '') {
        const newMessage = document.createElement('div');
        newMessage.textContent = 'User: ' + message;
        chatBox.appendChild(newMessage);

        // Add message to history
        addToHistory(message);

        // Simulate response from ChaTis
        setTimeout(() => {
            const response = 'AI: This is a response from ChaTis';
            const newResponse = document.createElement('div');
            newResponse.textContent = response;
            chatBox.appendChild(newResponse);

            // Add response to history
            addToHistory(response);
        }, 1000);

        inputBox.value = ''; // Clear input box after sending message
    }
}

// Function to add a message to history
function addToHistory(message) {
    const listItem = document.createElement('li');
    listItem.textContent = message;
    historyList.appendChild(listItem);
}


// Example for loading history
historyList.addEventListener('click', (event) => {
    const clickedItem = event.target;
    if (clickedItem.tagName === 'LI') {
        const selectedChat = clickedItem.textContent;
        inputBox.value = selectedChat; // Populate input with selected chat
    }
});
