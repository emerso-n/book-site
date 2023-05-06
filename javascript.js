console.log("js loaded");

const booksCon = document.querySelector("#books_con");
const form = document.querySelector("form")
const pagesInput = document.querySelector("#input-pages")
const deletePopup = document.querySelector("#delete-popup")
const deletePopupBtns = deletePopup.querySelectorAll("button")

function guidGenerator() {
    var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

form.addEventListener("submit", (e) => {
    e.preventDefault()
    let book = new Book(e.target[0].value, e.target[1].value, e.target[2].value, e.target[3].checked)
    myLibrary[book.id] = book
    createBookDiv(book)
})

deletePopupBtns[0].addEventListener("click", deleteEntry) //yes btn
deletePopupBtns[1].addEventListener('click', (e) => deletePopup.classList.add("hide")) //cancel btn

let popupParent
function pressXbtn(e) {
    popupParent = e.target.parentElement.parentElement
    deletePopup.classList.remove("hide")
    movePopup(popupParent)
}

function deleteEntry(e) {
    deletePopup.classList.add("hide")
    delete myLibrary[popupParent.id]
    popupParent.remove()
}

function movePopup(parent) {
    const parentRect = parent.getBoundingClientRect();
    const childRect = deletePopup.getBoundingClientRect();
    const topPosition = (parentRect.height - childRect.height) / 2 + parentRect.top;
    const leftPosition = (parentRect.width - childRect.width) / 2 + parentRect.left;
    deletePopup.style.top = topPosition + 'px';
    deletePopup.style.left = leftPosition + 'px';
}

let myLibrary = {};

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = guidGenerator();
}

function createDiv(tag, parent, className = '') {
    const div = document.createElement(tag)
    if (className) div.className = className
    parent.appendChild(div)
    return div
}

function createBookDiv(bookObject) {
    const bookBorder = createDiv("div", booksCon, "book-border");
    bookBorder.id = bookObject.id
    const bookHeader = createDiv("div", bookBorder, "book-header");
    const headerTxt = createDiv("div", bookHeader, "header-txt");
    headerTxt.innerText = "Book";
    const xBtn = createDiv("button", bookHeader, "x-btn");
    xBtn.addEventListener("click", pressXbtn)
    const div = createDiv("div", xBtn);
    const book = createDiv("div", bookBorder, "book");
    const bookTitle = createDiv("div", book, "book-title");
    bookTitle.innerText = bookObject.title;
    const bookAuthor = createDiv("div", book, "book-author");
    bookAuthor.innerText = bookObject.author;
    const bookPages = createDiv("div", book, "book-pages");
    bookPages.innerText = `${bookObject.pages || "???"} pgs`;
    const bookRead = createDiv("div", book, "book-read");
    const readLabel = createDiv("label", bookRead);
    readLabel.setAttribute("for", "read-cb");
    readLabel.innerText = "Read";
    const readCB = createDiv("input", bookRead);
    readCB.type = "checkbox";
    readCB.name = "read-cb";
    readCB.id = "read-cb";
    readCB.checked = bookObject.read
}

const testBook = new Book("Test Book", "Fake Author", "420", false)
const threebody = new Book("The Three-Body Problem", "Cixin Liu", 416, true)
createBookDiv(threebody)
createBookDiv(testBook)