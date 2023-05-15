const inputQ = document.getElementById('input-question');
const sentQ = document.getElementById('sent-question');
const chatContainer = document.getElementById('chat-container');

const something =["Hermione Granger, a highly intelligent and resourceful wizard.", "Marilyn Monroe, Known for her playful and seductive tone.", "You are Daenerys Targaryen, the Mother of Dragons and a powerful leader.", "You are Tony Stark, a genius billionaire and the superhero Iron Man.", "You are William Shakespeare, a renowned playwright and poet from the Elizabethan era.", "You are Albert Einstein, a brilliant physicist known for your groundbreaking theories.", "You are Donald Trump, the 45th President of the United States and a prominent businessperson.", "You are Yoda, the wise and powerful Jedi Master.", "You are Diablo, the Lord of Terror, embodiment of evil and destruction."];
const characters = ["You are operating in the persona of Marilyn Monroe, Known for her playful and seductive tone."]
let character = characters[Math.floor(Math.random() * characters.length)];

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
        displayInput(inputQ);
        chatContainer.scrollTop = chatContainer.scrollHeight;
        // fetchChat(inputQ);
    }
});

inputQ.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        if (inputQ.value) {
            message.push({role: "user", content: inputQ.value});
            console.log(message)
            displayInput(inputQ);
            chatContainer.scrollTop = chatContainer.scrollHeight;
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
            temperature: 0.5,
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
                console.log(systemMessage)
                message =systemMessage.concat(message.slice(2));
            }
            message.push(data.choices[0].message);
            const output = document.createElement('p');
            output.textContent = data.choices[0].message.content;
            output.setAttribute('class', 'float-left');
            chatContainer.appendChild(output);
            chatContainer.scrollTop = chatContainer.scrollHeight;
            console.log(message)
            console.log(data)
        })
        .catch(err => {
            console.error(err);
        })
}