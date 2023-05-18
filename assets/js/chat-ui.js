const firstText = document.getElementById('hello-there');
const secondText = document.getElementById('I-am-Mia');
const firstPage = document.getElementById('first');
const secondPage = document.getElementById('second');
const thirdPage = document.getElementById('third');
const openAiKey = document.getElementById("open-ai-key");
const nextBtn = document.getElementsByClassName('next-btn');
const title = document.getElementById('MiaGPT');

const str1 = "... \n Hello, there.";
const str2 = "My name is Mia.";
const timeBetween1 = 500;
const timeBetween2 = 250;

//function to display text character by character
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

//display first page text when page loaded
displayText(str1, firstText, timeBetween1);
//iterate
const firstInterval = setInterval(function () {
    firstText.textContent = '';
    displayText(str1, firstText, timeBetween1);

}, 15000)

//close first page and display second page
nextBtn[0].addEventListener('click', function () {
    firstPage.setAttribute('style', 'display: none');
    clearInterval(firstInterval);
    secondPage.setAttribute('style', "z-index: 2");
    secondPage.setAttribute('style', 'visibility: visible');
    displayText(str2, secondText, timeBetween2);
    if (!user.openAI.key) {
        openAiKey.setAttribute('style', 'display: block')
    }
})

//close second page and display third page
nextBtn[1].addEventListener('click', function () {
    secondPage.setAttribute('style', 'display: none');
    thirdPage.setAttribute('style', "z-index: 3");
    thirdPage.setAttribute('style', 'visibility: visible');
    //display hello message on third page from API
    if (!user.openAI.key) {
        user.openAI.key = openAiKey.value;
    }
    fetchChat();
})

//click the title to pin the chat box
title.addEventListener('click', function () {
    if (title.parentElement.dataset.status === "un-pin") {
        title.parentElement.dataset.status = "pin"
    } else {
        title.parentElement.dataset.status = "un-pin"
    }
})

//dblclick the tile to zoom the chat box
title.addEventListener('dblclick', function (e) {
    e.stopPropagation();
    if (title.parentElement.dataset.size === "small") {
        title.parentElement.dataset.size = "big"
    } else {
        title.parentElement.dataset.size = "small"
    }
})