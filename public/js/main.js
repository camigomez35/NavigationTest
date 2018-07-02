/**
 * Add menu to navigation and add event listener -> Click
 */
function showItems() {
    var data = getItems();
    var navbar = document.getElementById("menu");
    menu = createNavigation(data.items, 1);
    navbar.innerHTML += menu;

    var items = document.getElementsByClassName('nav__item nav__item_list');
    for (var count = 0; count < items.length; count++) {
        if (items.item(count).childNodes.length > 1) {
            items.item(count).addEventListener('click', toogleSubMenu);
        }
    }
}

/**
 * Return data for build menu.
 * 
 * @returns {JSON} Menu data
 */
function getItems() {
    var XMLhttp = new XMLHttpRequest();
    XMLhttp.open("GET", "./api/nav.json", false);
    XMLhttp.send();
    return JSON.parse(XMLhttp.responseText);
}

/**
 * Create primary or secondary navigation
 * 
 * @param {JSON} items
 * @param {number} type 
 * Navigation type: 
 * 
 * Type 1: Primary navigation //
 * Type 2: Secondary navigation
 * @returns {string} <ul> structure
 */
function createNavigation(items, type) {
    switch (type) {
        case 1:
            menu = '<ul class="nav__primary">' + createlist(items) + '</ul> <span class="nav__copy">© 2014 Huge. All Rights Reserved.</span>';
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

/**
 * Create items of navigation.
 * 
 * @param {JSON} items Items
 * @returns {string} <li> items struture.
 */
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
            li += '<a id="' + item.label + '" href="' + item.url + '" target="_blank">' + item.label + '</a>';
        }
        li += '</li>'
        menu += li;
    }
    return menu
}

/**
 * Function of toggle menu.
 * Add ClassName for open or close submenu or secondary navigation.
 * 
 * @returns {void}
 */
function toogleSubMenu() {
    var oldItem = document.getElementsByClassName('nav__item nav__item_list nav__item--open')[0];
    if (oldItem === this) {
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
    return;
}

/**
 * Close menu and submenu.
 * 
 * @returns {void}
 */
function closeAll() {
    var oldItem = document.getElementsByClassName('nav__item nav__item_list nav__item--open')[0];
    if(oldItem) {
        removeClass(oldItem, 'nav__item--open');
    }
    removeClass(document.getElementsByTagName("BODY")[0], 'body--open');
    removeClass(document.getElementsByTagName("BODY")[0], 'body__toggle--open');
}

/**
 * Open responsive menu.
 * 
 * @returns {void}
 */
function openMenu() {
    setClass(document.getElementsByTagName("BODY")[0], 'body--open');
    setClass(document.getElementsByTagName("BODY")[0], 'body__toggle--open');
}

/**
 * Close responsive menu.
 * 
 * @returns {void}
 */
function closeMenu() {
    removeClass(document.getElementsByTagName("BODY")[0], 'body--open');
    removeClass(document.getElementsByTagName("BODY")[0], 'body__toggle--open');
}

/**
 * Set class to element.
 * 
 * @param {Element} element
 * @param {string} className Class to add of element
 * 
 * @returns {void}
 */
function setClass(element, className) {
    element.classList.add(className)
}

/**
 * Remove class to element.
 * 
 * @param {Element} element
 * @param {string} className Class to remove of element
 * 
 * @returns {void}
 */
function removeClass (element, className) {
    element.classList.remove(className)
}

showItems();

document.getElementById('back').addEventListener('click', closeAll);
document.getElementById('toggle-open').addEventListener('click', openMenu);
document.getElementById('toggle-close').addEventListener('click', closeMenu);
