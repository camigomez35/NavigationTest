
showItems();

function showItems() {
    var data = getItems();
    var logo = '<div class="nav__logo"><img src="./images/HUGE-white.png"></div>'
    var navbar = document.getElementById("navbar");
    menu = createNavigation(data.items, 1);
    navbar.innerHTML += logo + menu;

    var items = document.getElementsByClassName('nav__item nav__item_list');
    for (var count = 0; count < items.length; count++) {
        if (items.item(count).childNodes.length > 1) {
            items.item(count).addEventListener('click', toogleSubMenu);
        }
    }
}

/**
 * Get Items from API.
 */

function getItems() {
    var XMLhttp = new XMLHttpRequest();
    XMLhttp.open("GET", "./api/nav.json", false);
    XMLhttp.send();
    return JSON.parse(XMLhttp.responseText);
}

function createNavigation(items, type) {
    switch (type) {
        case 1:
            menu = '<ul class="nav__primary">' + createlist(items) + '</ul>';
            break;
        case 2:
            menu = '<ul class="nav__secondary">' + createlist(items) + '</ul>';
            break;
        default:
            menu = "Err"
            break;
    }
    return menu
}

function createlist(items) {
    var menu = "";
    if (items === undefined || items.length === 0) return menu;
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var childItems = item.items && item.items.length;
        var li = '';
        if (childItems) {
            li += '<li class="nav__item nav__item_list"> ';
            li += '<a id="' + item.label + '">' + item.label + '<span class="nav__item_arrow"/></span></a>' + createNavigation(item.items, 2);
        } else {
            li += '<li class="nav__item"> ';
            li += '<a id="' + item.label + '" href="' + item.url + '">' + item.label + '</a>';
        }
        li += '</li>'
        menu += li;
    }

    return menu
}

function toogleSubMenu() {
    var oldItem = document.getElementsByClassName('nav__item nav__item_list nav__item--open')[0];
    // removeClass(document.getElementsByClassName('nav__item--open')[0], 'nav__item--open');

    if (oldItem == this) {
        removeClass(oldItem, 'nav__item--open');
        removeClass(document.getElementsByTagName("BODY")[0], 'body--open');
    } else if(oldItem) {
        removeClass(oldItem, 'nav__item--open');
        setClass(this, 'nav__item--open');
        setClass(document.getElementsByTagName("BODY")[0], 'body--open');
    } else {
        setClass(this, 'nav__item--open');
        setClass(document.getElementsByTagName("BODY")[0], 'body--open');
    }
}

function closeMenu() {
    var oldItem = document.getElementsByClassName('nav__item nav__item_list nav__item--open')[0];
    if(oldItem) {
        removeClass(oldItem, 'nav__item--open');
    }
    removeClass(document.getElementsByTagName("BODY")[0], 'body--open');
}


setClass = (element, className) => {
    element.classList.add(className)
}

removeClass = (element, className) => {
    element.classList.remove(className)
}

document.getElementById('back').addEventListener('click', closeMenu)