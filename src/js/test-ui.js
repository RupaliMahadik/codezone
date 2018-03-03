// 1 ->show and hide javascript

function hide(element) {  //name of the function is hide (arguments)
    element.style.display = 'none';  //name of the function is name (arguments)
}

function show(element) {
    element.style.display = '';
}

function initialize() {
    var message = document.querySelector('h1');
    var hideButton = document.querySelector('#hide');

    hideButton.addEventListener('click', function () {
        hide(message);
    });

    var showButton = document.querySelector('#show');

    showButton.addEventListener('click', function () {
        show(message);
    });
}


document.addEventListener('DOMContentLoaded', initialize);

// 1 -> jQuery Version

// 2 -> Do the same work, but - in initialize only call addEventListener one time