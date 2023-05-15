const inputQ = document.getElementById('input-question');
const sentQ = document.getElementById('sent-question');
const chatContainer = document.getElementById('chat-container');

const characters = ["Hermione Granger", "Marilyn Monroe", "Daenerys Targaryen", "Tony Stark", "William Shakespeare", "Albert Einstein", "Yoda", "Diablo"];
let character = "You are playing " + characters[Math.floor(Math.random() * characters.length)] + " and imitating his/her voice.";
console.log(character);
let message = [
    {role: "system", content: character},
    { role: 'user', content: 'Hello.' },
];

function displayInput(str) {
    const displayInput = document.createElement('p');
    displayInput.textContent = str.value;
    displayInput.setAttribute('class', 'float-right');
    chatContainer.appendChild(displayInput);
    str.value = '';
}

sentQ.addEventListener('click', () => {
    if (inputQ.value) {
        message.push({role: "user", content: inputQ.value});
        displayInput(inputQ);
        chatContainer.scrollTop = chatContainer.scrollHeight;
        fetchChat();
    }
});

inputQ.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        if (inputQ.value) {
            message.push({role: "user", content: inputQ.value});
            displayInput(inputQ);
            chatContainer.scrollTop = chatContainer.scrollHeight;
            console.log(message);
            fetchChat();
        }
    }
});

async function fetchChat() {
    const url = `https://api.openai.com/v1/chat/completions`;
    await fetch(url, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${user.openAI.key}`,
            "content-Type": "application/json"
        },
        body: JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages": message,
            temperature: 0.8,
        })
    })
        .then(res => {
            if (res.status === 404) {
                console.log('404');
            }
            return res.json();
        })
        .then(data => {
            if (data.usage.total_tokens > 300) {
                let systemMessage = [];
                systemMessage[0] = message.shift();
                message =systemMessage.concat(message.slice(2));
            }
            message.push(data.choices[0].message);
            const output = document.createElement('p');
            output.textContent = data.choices[0].message.content;
            output.setAttribute('class', 'float-left');
            chatContainer.appendChild(output);
            chatContainer.scrollTop = chatContainer.scrollHeight;
            console.log(message);
        })
        .catch(err => {
            console.error(err);
        })
}