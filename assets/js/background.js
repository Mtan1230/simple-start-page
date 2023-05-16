const body = document.getElementsByTagName('body')[0];
const accessKey = 'oNYAMSRxDEbcBS2JxqDx55PVoeQ7UJc8fbiiSjPu';
let subtractDate = 1;

//function to fetch background from NASA
async function getBackground(url) {
  await fetch(url)
    .then(response => response.json())
    .then(data => {
      body.setAttribute('style', `background-image: url('${data.url}')`);
    })
    .catch(error => {
      console.error(error);
    });
}
getBackground(`https://api.nasa.gov/planetary/apod?api_key=${accessKey}`);

//add event listener to change a background
body.addEventListener('dblclick', () => {
  const date = dayjs().subtract(subtractDate, 'day').format('YYYY-MM-DD');
  subtractDate++;
  const newURL = `https://api.nasa.gov/planetary/apod?api_key=${accessKey}&date=${date}`;
  getBackground(newURL);
})
