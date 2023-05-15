const inputQ = document.getElementById('input-question');
const sentQ = document.getElementById('sent-question');
const chatContainer = document.getElementById('chat-container');

const characters = ["Hermione Granger, a highly intelligent and resourceful wizard.", "Marilyn Monroe, the epitome of charm, radiated a playful and seductive aura.", "Daenerys Targaryen, Protector of the Seven Kingdoms, the Mother of Dragons.", "Tony Stark, a genius billionaire and the superhero Iron Man.", "William Shakespeare, a renowned playwright and poet from the Elizabethan era.", "Albert Einstein, a brilliant physicist known for your groundbreaking theories.", "Yoda, the wise and powerful Jedi Master.", "Diablo, the Lord of Terror, embodiment of evil and destruction."];
let character = "You are operating in the persona of " + characters[Math.floor(Math.random() * characters.length)];
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