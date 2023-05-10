  const curtTime = $('#curtTime');
  const curtDate = $('#curtDate');
  const welcMsg = $('#welcMsg');
  const nameInput = $('#name');

  function setDateTime() {
    curtTime.text(dayjs().format('h:mm'));
    curtDate.text(dayjs().format('MMM D, dddd'));
    if (!user.name) {
      nameInput.css('display', 'inline-block')
    }
    welcMsg.text('Hello, ' + user.name);
    setInterval(function () {
      curtTime.text(dayjs().format('h:mm'));
      const hour = dayjs().hour();
      if (hour === 0) {
        curtDate.text(dayjs().format('MMM D, dddd'));
      }
      if (user.name) {
        setTimeout(function () {
          switch (true) {
            case (hour < 12):
              welcMsg.text('Good morning, ' + user.name);
              break;
            case (hour < 18):
              welcMsg.text('Good afternoon, ' + user.name);
              break;
            default:
              welcMsg.text('Good evening, ' + user.name);
              break;
          }
        }, 2000);
      }
    }, 1000);
  }

  setDateTime();

  //listen to the name input and save on local storage
  nameInput.on('keydown', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      user.name = nameInput.val();
      nameInput.css('display', 'none')
      welcMsg.text('Hello, ' + user.name);
      localStorage.setItem("user", JSON.stringify(user));
    }
  })