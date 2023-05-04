console.log("js loaded");

const booksCon = document.querySelector("#books_con");
const form = document.querySelector("form")

form.addEventListener("submit", (e)=> {
    e.preventDefault()
    // console.log(e)
    let book = new Book(e.target[0].value, e.target[1].value, e.target[2].value, e.target[3].checked)
    myLibrary.push(book)
    // console.log(myLibrary)
    createBookDiv(book)
})

let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function createDiv(tag, parent, className = '') {
    const div = document.createElement(tag)
    if (className) div.className = className
    parent.appendChild(div)
    return div
}

function createBookDiv(bookObject) {
    const bookBorder = createDiv("div", booksCon, "book-border");
    const bookHeader = createDiv("div", bookBorder, "book-header");
    const headerTxt = createDiv("div", bookHeader, "header-txt");
    headerTxt.innerText = "Book";
    const xBtn = createDiv("button", bookHeader, "x-btn");
    const div = createDiv("div", xBtn);
    const book = createDiv("div", bookBorder, "book");
    const bookTitle = createDiv("div", book, "book-title");
    bookTitle.innerText = bookObject.title;
    const bookAuthor = createDiv("div", book, "book-author");
    bookAuthor.innerText = bookObject.author;
    const bookPages = createDiv("div", book, "book-pages");
    bookPages.innerText = `${bookObject.pages} pgs`;
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
createBookDiv(testBook)