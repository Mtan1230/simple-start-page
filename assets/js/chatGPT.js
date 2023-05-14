const inputQ = document.getElementById('input-question');
const sentQ = document.getElementById('sent-question');
const chatContainer = document.getElementById('chat-container');

function displayInput() {
    const question = inputQ.value;
    const displayQ = document.createElement('p');
    displayQ.textContent = question;
    displayQ.setAttribute('class', 'float-right');
    chatContainer.appendChild(displayQ);
    inputQ.value = '';
}

sentQ.addEventListener('click', displayInput);

inputQ.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        displayInput();
    }
});

async function sentChat() {
    url = `https://api.openai.com/v1/chat/completions`;
    await fetch(url, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${user.openAI.key}`,
            "content-Type": "application/json"
        },
        body: JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages": [{"role": "user", "content": "Hello!"}]
          })
    })
        .then(res => {
            if (res.status === 404) {
                console.log('404');
            }
            return res.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(err => {
            console.error(err);
        })
}