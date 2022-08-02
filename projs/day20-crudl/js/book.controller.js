function onInit() {
    renderFilterByQueryStringParams()
    renderTitels()
    renderBooks()
}
function renderTitels() {
    const titles = getTitles()

    var strHTMLs = titles.map(title => `<option>${title}</option>`)
    strHTMLs.unshift('<option value="">Select title</option>')


    document.querySelector('.filter-title-select').innerHTML = strHTMLs.join('')
}
function renderBooks() {
    const books = getBooksForDisplay()
    const strHtmls = books.map(book => `
    <tr>
        <td>
            ${book.id}
        </td>    
        <td>
            ${book.title}
        </td>    
        <td>
            $${book.price.toLocaleString()}
        </td>    
        <td class="text-center">
        <button class="btn-read" onclick="onReadBook('${book.id}')">Read</button>
        <button class="btn-update" onclick="onUpdateBook('${book.id}')">Update</button>
        <button class="btn-delete" onclick="onDeleteBook('${book.id}')">Delete</button>       
        </td>    
</tr>
`

    )
    document.querySelector('.books-container').innerHTML = strHtmls.join('')
}
function onDeleteBook(bookId) {
    deleteBook(bookId)
    renderBooks()
    flashMsg(`book Deleted`)
}

function onAddBook() {
    var title = prompt('title?')
    if (title) {
        const book = addBook(title)
        renderBooks()
        flashMsg(`book Added (id: ${book.id})`)
    }
}

function onUpdateBook(bookId) {
    var book = getBookById(bookId)
    const newPrice = +prompt('price?', book.price)
    if (newPrice && book.price !== newPrice) {
        book = updateBook(bookId, newPrice)
        renderBooks()
        flashMsg(`price updated to: ${book.price}`)
    }
}

function onReadBook(bookId) {
    const book = getBookById(bookId)
    
    const elModal = document.querySelector('.modal')
    elModal.querySelector('h3').innerText = book.title
    elModal.querySelector('h4 span').innerText = book.price
    elModal.querySelector('p').innerText = book.desc
    elModal.classList.add('open')
}
function onSetFilterBy(filterBy) {
    filterBy = setBookFilter(filterBy)
    renderBooks()
    
    const queryStringParams = `?title=${filterBy.title}&price=${filterBy.price}`
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)

}


function onCloseModal() {
    document.querySelector('.modal').classList.remove('open')
}

function flashMsg(msg) {
    const el = document.querySelector('.user-msg')
    el.innerText = msg
    el.classList.add('open')
    setTimeout(() => {
        el.classList.remove('open')
    }, 3000)
}

function renderFilterByQueryStringParams() {
    const queryStringParams = new URLSearchParams(window.location.search)
    const filterBy = {
        title : queryStringParams.get('title') || '',
        price : +queryStringParams.get('price') || 0
    }

    if (!filterBy.title && !filterBy.price) return

    document.querySelector('.filter-title-select').value = filterBy.title
    document.querySelector('.filter-price-range').value = filterBy.price
    setBookFilter(filterBy)
}

function onSetSortBy() {
    const prop = document.querySelector('.sort-by').value
    const isDesc = document.querySelector('.sort-desc').checked

    const sortBy = {}
    sortBy[prop] = (isDesc)? -1 : 1

    // Shorter Syntax:
    // const sortBy = {
    //     [prop] : (isDesc)? -1 : 1
    // }

    setBookSort(sortBy)
    renderBooks()
}


function onNextPage() {
    nextPage()
    renderBooks()
}
