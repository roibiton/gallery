function onInit() {
    const user = loadFromStorage('loggedinUser')
    if (!user || !user.isAdmin) {
        window.location = 'index.html'
    }
    renderUsers()
}
function renderUsers() {
    const users = getUsersForDisplay()
    var strHTMLs = users.map((user) =>
        `
        <tr>
            <td>
                ${user.username}
            </td>    
            <td>
                ${user.password}
            </td>    
            <td>
                ${new Date(user.lastLoginTime).toLocaleString()}
            </td>    
            <td class="text-center">
                ${(user.isAdmin) ? '✓' : 'x'}
            </td>    
        </tr>
        `
    )

    document.querySelector('.user-list').innerHTML = strHTMLs.join('')
}

function onSortBy(propName) {
    sortBy(propName)
    renderUsers()
}