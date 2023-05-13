/** make text appear in the innerHTML of the element, one character at a time per timeBetween */
const elem = document.getElementById('hello-there');
const secondPage = document.getElementById('second');

function appearChars(str, elem, timeBetween) {
    var index = -1;
    (function go() {
        if (++index < str.length) {
         	elem.textContent = elem.textContent + str.charAt(index);
            setTimeout(go, timeBetween);
        }
    })();
}

// example
var str = "... \n Hello, There.";

var timeBetween = 500;

appearChars(str, elem, timeBetween);
setInterval(function() {
    elem.textContent = '';
    appearChars(str, elem, timeBetween);

}, 10000)




const wayBtn = document.getElementById('who-are-you');
wayBtn.addEventListener('click', function () {
    secondPage.setAttribute('style', "z-index: 2")
})