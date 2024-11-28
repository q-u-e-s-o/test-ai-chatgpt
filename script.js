const predefinedApiKey = "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"; // Replace with your actual API key

const chatContainer = document.getElementById('chat-container');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

sendBtn.addEventListener('click', async () => {
  const userMessage = userInput.value.trim();

  if (!userMessage) {
    alert('Please type a message.');
    return;
  }

  // Display user's message
  const userMessageElement = document.createElement('p');
  userMessageElement.textContent = userMessage;
  userMessageElement.className = 'user';
  chatContainer.appendChild(userMessageElement);

  // Make the API request
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', { // Replace with the actual API endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${predefinedApiKey}`,
      },
      body: JSON.stringify({ message: userMessage }),
    });

    const data = await response.json();

    // Display bot's response
    const botMessageElement = document.createElement('p');
    botMessageElement.textContent = data.response || "No response received.";
    botMessageElement.className = 'bot';
    chatContainer.appendChild(botMessageElement);
  } catch (error) {
    // Handle errors
    const botMessageElement = document.createElement('p');
    botMessageElement.textContent = "Error: Unable to fetch response from API.";
    botMessageElement.className = 'bot';
    chatContainer.appendChild(botMessageElement);
  }

  // Clear the input field
  userInput.value = '';
});
