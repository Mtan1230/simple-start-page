//Fetch the weather of user's location when page loaded
document.addEventListener('DOMContentLoaded', function () {
  const weatherDiv = document.querySelector('#weather');

  function fetchWeather(lat, lon) {
    // Fetch weather based on user's location
    fetch(`https://api.tomorrow.io/v4/timelines?location=${lat},${lon}&fields=temperature&timesteps=1h&units=imperial&apikey=yrzID5wkQL0b0g9UP1pUkNogMNnm8cgb`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        displayWeather(data);
      })
      .catch(e => {
        console.error(e);
      });
  }

  function displayWeather(data) {
    const weatherHtml = `
            <h2>Temperature: ${data.data.timelines[0].intervals[0].values.temperature}°F</h2>
        `;
    weatherDiv.innerHTML = weatherHtml;
  }

  // Fetch user's location
  if (user.location.lat) {
    fetchWeather(user.location.lat, user.location.lon)
  } else if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      user.location.lat = position.coords.latitude;
      user.location.lon = position.coords.longitude;
      fetchWeather(user.location.lat, user.location.lon)
    });
  }
});