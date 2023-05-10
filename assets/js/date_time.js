  const curtTime = $('#curtTime');
  const curtDate = $('#curtDate');
  const welcMsg = $('#welcMsg');
  let userName = user.name;

  function setDateTime() {
    curtTime.text(dayjs().format('h:mm a'));
    curtDate.text(dayjs().format('MMM D, dddd'));
    welcMsg.text('Hello ' + userName);
    setInterval(function () {
      curtTime.text(dayjs().format('h:mm a'));

      let hour = dayjs().hour();
      switch (true) {
        case (hour < 12):
          welcMsg.text('Good morning! ' + user.name.uppercase());
          break;
        case (hour < 18):
          welcMsg.text('Good afternoon! ' + user.name.uppercase());
          break;
        default:
          welcMsg.text('Good evening! ' + user.name.uppercase());
          break;
      }

      // if (dayjs().hour() === 0) {
      //   curtDate.text(dayjs().format('MMM D, dddd'));
      // }
    }, 1000);
  }
  setDateTime();