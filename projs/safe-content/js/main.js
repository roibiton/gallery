'use strict'

function onInit() {
    const user = loadFromStorage('loggedinUser')
    if (user) renderPage(user)
}

function onLogin(ev) {
    ev.preventDefault()
    const elUserName = document.querySelector('[name=username]')
    const elPassword = document.querySelector('[name=password]')
    var user = login(elUserName.value, elPassword.value)
    if (!user) {
        alert('no user found')
        return
    }
    elUserName.value = ''
    elPassword.value = ''
    renderPage(user)
}

function renderPage(user) {
    const elSecret = document.querySelector('.user-info')
    elSecret.querySelector('h3 span').innerText = user.username
    elSecret.hidden = false
    const elLoginScreen = document.querySelector('.form-login')
    elLoginScreen.hidden = true
    if (user.isAdmin) {
        const elAdmin = document.querySelector('.link-admin')
        elAdmin.hidden = false
    }

}




function onLogout() {
    logout()
    const elSecret = document.querySelector('.user-info')
    elSecret.hidden = true
    const elAdmin = document.querySelector('.link-admin')
    elAdmin.hidden = true
    const elLoginScreen = document.querySelector('.form-login')
    elLoginScreen.hidden = false
}

