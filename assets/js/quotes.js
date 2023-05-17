const quote = document.getElementById('quote');
const author = document.getElementById('author');

async function getQuotes() {
    const key = 'LF0jwI+EzK3wwore/KkY8A==uiXxwWPhQDdHhurV';
    const url = 'https://api.api-ninjas.com/v1/quotes?category=inspirational';

    await fetch(url, {
        headers: { 'X-Api-Key': key },
        contentType: 'application/json',
    })
        .then(res => {
            if (res.status === 404) {
                console.log('404');
            }
            return res.json();
        })
        .then(data => {
            quote.textContent = `"` + data[0].quote + `"`;
            author.textContent = data[0].author;
        })
        .catch(error => {
            console.error(error);
        });
}

getQuotes();