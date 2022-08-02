'use strict'
const STORAGE_KEY = 'bookDB'
const gTitles = ['harry potter', 'sonik', 'avatar', 'frozen']
const PAGE_SIZE = 5

var gPageIdx = 0
var gBooks
var gFilterBy = { title: '', price: 0 }

_createBooks()

function nextPage() {
    gPageIdx++
    if (gPageIdx * PAGE_SIZE >= gBooks.length) {
        gPageIdx = 0
    }
}

function getTitles() {
    return gTitles
}

function getBooksForDisplay() {
    var books = gBooks.filter(book => book.title.includes(gFilterBy.title) &&
        book.price >= gFilterBy.price)

    const startIdx = gPageIdx * PAGE_SIZE
    books = books.slice(startIdx, startIdx + PAGE_SIZE)
    return books
}

function deleteBook(bookId) {
    const bookIdx = gBooks.findIndex(book => bookId === book.id)
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage()
}

function addBook(title) {
    const book = _createBook(title)
    gBooks.unshift(book)
    _saveBooksToStorage()
    return book
}

function getBookById(bookId) {
    const book = gBooks.find(book => bookId === book.id)
    return book
}

function updateBook(bookId, newPrice) {
    const book = gBooks.find(book => bookId === book.id)
    book.price = newPrice
    _saveBooksToStorage()
    return book
}

function _createBook(title) {
    return {
        id: makeId(),
        title,
        price: getRandomIntInclusive(800, 1500),
        desc: makeLorem()
    }
}

function _createBooks() {
    
    var books = loadFromStorage(STORAGE_KEY)
    // Nothing in storage - generate demo data
    if (!books || !books.length) {
        books = []
        for (let i = 0; i < 11; i++) {
            var title = gTitles[getRandomIntInclusive(0, gTitles.length - 1)]
            books.push(_createBook(title))
        }
    }
    gBooks = books
    _saveBooksToStorage()
}

function setBookFilter(filterBy = {}) {
    if (filterBy.title !== undefined) gFilterBy.title = filterBy.title
    if (filterBy.price !== undefined) gFilterBy.price = filterBy.price
    return gFilterBy
}


function setBookSort(sortBy = {}) {
    if (sortBy.price !== undefined) {
        gBooks.sort((b1, b2) => (b1.price - b2.price) * sortBy.price)
    } else if (sortBy.title !== undefined) {
        gBooks.sort((b1, b2) => b1.title.localeCompare(b2.title) * sortBy.title)
    }
}

function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}
