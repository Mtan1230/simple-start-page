const accessKey = '6rxWYVxKqIxxZ2iZaoTRJrxKfkYXXdqCQGQDHvLVvig';

fetch(`https://api.unsplash.com/photos/random?client_id=${accessKey}`)
  .then(response => response.json())
  .then(data => {
   
    const style = document.createElement('style');
    style.innerHTML = `
            body {
                background-image: url("${data.urls.regular}");
                background-size: cover;
                background-position: center;
            }
        `;
  
    document.head.appendChild(style);
  })
  .catch(error => {
    console.error('Error fetching image from Unsplash API:', error);
  });