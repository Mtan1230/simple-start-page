$(function () {
  const time = $('#time');
  const date = $('#date');
  const msg = $('#msg');
  const name = $('#name');

  function setDateTime() {
    time.text(dayjs().format('h:mm'));
    date.text(dayjs().format('MMM D, dddd'));
    if (!user.name) {
      name.css('display', 'inline-block')
    }
    msg.text('Hello, ' + user.name);

    setInterval(function () {
      time.text(dayjs().format('h:mm'));
      const hour = dayjs().hour();
      if (hour === 0) {
        date.text(dayjs().format('MMM D, dddd'));
      }
      if (user.name) {
        setTimeout(function () {
          switch (true) {
            case (hour < 12):
              msg.text('Good morning, ' + user.name);
              break;
            case (hour < 18):
              msg.text('Good afternoon, ' + user.name);
              break;
            default:
              msg.text('Good evening, ' + user.name);
              break;
          }
        }, 3000);
      }
    }, 1000);
  }

  setDateTime();

  //listen to the name input and save on local storage
  name.on('keydown', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      let inputName = name.val();
      let capitalized = inputName.charAt(0).toUpperCase() + inputName.slice(1);
      user.name = capitalized;
      name.css('display', 'none')
      msg.text('Hello, ' + user.name);
      localStorage.setItem("user", JSON.stringify(user));
    }
  })
});