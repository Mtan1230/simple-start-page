const firstText = document.getElementById('hello-there');
const secondText = document.getElementById('I-am-Mia');
const firstPage = document.getElementById('first');
const secondPage = document.getElementById('second');
const thirdPage = document.getElementById('third');
const openAiKey = document.getElementById("open-ai-key");

const nextBtn = document.getElementsByClassName('next-btn');

const str1 = "... \n Hello, there.";
const timeBetween1 = 500;
const str2 = "My name is Mia.";
const timeBetween2 = 250;

function displayText(str, elem, timeBetween) {
    let i = 0;
    const interval = setInterval(function () {
        elem.textContent = elem.textContent + str.charAt(i);
        i++;
        if (i === str.length) {
            clearInterval(interval);
        }
    }, timeBetween)
}

displayText(str1, firstText, timeBetween1);
const firstInterval = setInterval(function () {
    firstText.textContent = '';
    displayText(str1, firstText, timeBetween1);

}, 15000)

nextBtn[0].addEventListener('click', function () {
    firstPage.setAttribute('style', 'display: none');
    secondPage.setAttribute('style', "z-index: 2");
    secondPage.setAttribute('style', 'visibility: visible');
    displayText(str2, secondText, timeBetween2);
    if (!user.openAI.key) {
        openAiKey.setAttribute('style', 'display: block')
    }
})

nextBtn[1].addEventListener('click', function () {
    secondPage.setAttribute('style', 'display: none');
    thirdPage.setAttribute('style', "z-index: 3");
    thirdPage.setAttribute('style', 'visibility: visible');

    if (!user.openAI.key) {
        user.openAI.key = openAiKey.value;
    }
    fetchChat();
})