  const curtTime = $('#curtTime');
  const curtDate = $('#curtDate');

  function setDateTime() {
    curtTime.text(dayjs().format('h:mm a'));
    curtDate.text(dayjs().format('MMM D, YYYY'));
    setInterval(function () {
      currentDay.text(dayjs().format('MMM D, YYYY h:mm:ss a'))
      //when hour changes, re-set color
      let dynamicHour = dayjs().format('HH') * 1;
      if (dynamicHour !== staticHour) {
        staticHour = dynamicHour;
        setColor();
      }
    }, 1000);
  }
  setDateTime();