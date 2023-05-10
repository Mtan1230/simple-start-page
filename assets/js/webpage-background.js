const accessKey = 'oNYAMSRxDEbcBS2JxqDx55PVoeQ7UJc8fbiiSjPu';

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