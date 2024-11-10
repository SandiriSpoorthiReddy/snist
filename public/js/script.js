document.addEventListener('DOMContentLoaded', function() {
    const sendButton = document.querySelector('button');
    if (sendButton) {
        sendButton.addEventListener('click', sendMessage);
    }
});

function sendMessage() {
    const userInput = document.getElementById('userInput').value;  // Get the user's input from the text box
    const chatbox = document.getElementById('chatbox');  // Get the chatbox where the messages will be displayed

    if (userInput.trim() !== "") {
        // Create a new message element
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.textContent = `You: ${userInput}`;
        chatbox.appendChild(messageElement);

        // Clear the input field
        document.getElementById('userInput').value = "";

        // Send the user input to the server and get the bot's response
        fetch('/getBotResponse', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userInput: userInput })
        })
        .then(response => response.json())
        .then(data => {
            const botResponse = data.response;

            // Create and display the bot's response
            const botMessage = document.createElement('div');
            botMessage.classList.add('message');
            botMessage.textContent = `Bot: ${botResponse}`;
            chatbox.appendChild(botMessage);
        })
        .catch(error => console.error('Error:', error));
    }
}
