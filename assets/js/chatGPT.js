async function chat() {
    url = `https://api.openai.com/v1/chat/completions`;
    await fetch(url, {
        method: "POST",
        headers: {
            Authorization: `Bearer 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`,
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

console.log(`${user.openAI.key}`)
chat();