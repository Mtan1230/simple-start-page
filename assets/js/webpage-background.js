const accessKey = '6d775f08-961e-48d5-8e02-77c918d1f1be';

fetch(`https://api.nasa.gov/planetary/apod?api_key=${accessKey}`)
  .then(response => response.json())
  .then(data => {

    const style = document.createElement('style');
    style.innerHTML = `
            body {
                background-image: url("${data.url}");
                background-size: cover;
                background-position: center;
            }
        `;

    document.head.appendChild(style);
  })
  .catch(error => {
    console.error('Error fetching image from NASA APOD API:', error);
  });