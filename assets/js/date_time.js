  const curtTime = $('#curtTime');
  const curtDate = $('#curtDate');
  const welcMsg = $('#welcMsg');

  function setDateTime() {
    curtTime.text(dayjs().format('h:mm a'));
    curtDate.text(dayjs().format('MMM D, dddd'));
    welcMsg.text('Hello ' + user.name);
    setInterval(function () {
      curtTime.text(dayjs().format('h:mm a'));
      if (dayjs().hour() === 0) {
        curtDate.text(dayjs().format('MMM D, dddd'));
      }
    }, 1000);
  }
  setDateTime();