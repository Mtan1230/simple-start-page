const inputText = document.getElementById('input-text');
const sentBtn = document.getElementById('sent-btn');
const chatContainer = document.getElementById('chat-container');

//assign a character to the Chatbot
const characters = ["Hermione Granger", "Marilyn Monroe", "Daenerys Targaryen", "Tony Stark", "William Shakespeare", "Albert Einstein", "Yoda", "Diablo"];
let character = "You are playing " + characters[Math.floor(Math.random() * characters.length)] + ", and imitating his/her tone.";

//set the POST messages
let message = [
    { role: "system", content: character },
    { role: 'user', content: 'Hello.' },
];

//POST request and handle respond
async function fetchChat() {
    const url = `https://api.openai.com/v1/chat/completions`;
    await fetch(url, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${user.openAI.key}`,
            "content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: message,
            temperature: 0.8 //control the level of creativity and randomness from 0 to 1
        })
    })
        .then(res => {
            if (res.status === 404) {
                console.log('404');
            }
            return res.json();
        })
        .then(data => {
            //control the tokens and message context
            if (data.usage.total_tokens > 500 || message.length > 7) {
                let systemMessage = [];
                systemMessage[0] = message.shift();
                message = systemMessage.concat(message.slice(2));
            }
            message.push(data.choices[0].message);

            //display respond
            const output = document.createElement('p');
            output.textContent = data.choices[0].message.content;
            output.setAttribute('class', 'float-left');
            chatContainer.appendChild(output);
            chatContainer.scrollTop = chatContainer.scrollHeight;
        })
        .catch(err => {
            console.error(err);
        })
}

//display the input message in the chat box
function displayInput(elem) {
    const displayInput = document.createElement('p');
    displayInput.textContent = elem.value;
    displayInput.setAttribute('class', 'float-right');
    chatContainer.appendChild(displayInput);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    elem.value = '';
}

//handle user's input
function handleInput(elem) {
    message.push({ role: "user", content: elem.value });
    fetchChat();
    displayInput(elem);
}

sentBtn.addEventListener('click', () => {
    if (inputText.value) {
        handleInput(inputText);
    }
});

inputText.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (inputText.value) {
            handleInput(inputText);
        }
    }
});

//allow shift+enter to insert a line break
inputText.addEventListener('keydown', (e) => {
    if (e.shiftKey && e.key === 'Enter') {
        e.preventDefault();
        const start = inputText.selectionStart;
        const end = inputText.selectionEnd;
        const value = inputText.value;
        // Insert line break at the current cursor position
        inputText.value = value.substring(0, start) + '\n' + value.substring(end);
        // Move the cursor position after the inserted line break
        inputText.selectionStart = inputText.selectionEnd = start + 1;
    }
});