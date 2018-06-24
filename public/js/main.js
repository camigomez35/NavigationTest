
showItems()

function showItems() {
    var data = getItems();
    var logo = '<div class="nav__logo"><img src="./images/HUGE-white.png"></div>'
    var navbar = document.getElementById("navbar");
    menu = createNavigation(data.items, 1)
    navbar.innerHTML = logo + menu

    var items = document.getElementsByClassName('nav-item');
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
            li += '<li class="nav__item"> ';
            li += '<a id="' + item.label + '">' + item.label + "</a>" + createNavigation(item.items, 2);
        } else {
            li += '<li class="nav__item"> ';
            li += '<a id="' + item.label + '" href="' + item.url + '">' + item.label + "</a>";
        }
        li += '</li>'
        menu += li;
    }

    return menu
}