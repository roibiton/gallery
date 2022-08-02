'use strict'

var gUsers = []
_createUsers()


function login(username, password) {
    const user = gUsers.find((user) => username === user.username && password === user.password)
    if (user) {
        user.lastLoginTime = Date.now()
        _saveUsersToStorage()
        saveToStorage('loggedinUser', user)
    }
    return user
}

function logout() {
    clearFromSorage('loggedinUser')    
}

function getUsersForDisplay() {
    return gUsers
}
function _saveUsersToStorage() {
    saveToStorage('userDB', gUsers)
}

function _createUsers() {

    var users = loadFromStorage('userDB')
    if (!users || !users.length) {
        users = [
            _createUser('miki', '34567'),
            _createUser('puki', '12345', true),
            _createUser('momo', '56789')
        ]
        users[2].lastLoginTime = Date.now() - 1000*60*60
    }

    gUsers = users
    _saveUsersToStorage()
}

function _createUser(username, password, isAdmin = false) {
    const user = {
        id: makeId(),
        username: username,
        password: password,
        lastLoginTime: Date.now(),
        isAdmin: isAdmin
    }
    return user
}

function sortBy(propName) {
    if (propName === 'username') {
        gUsers.sort((u1, u2) => {
            if (u1.username > u2.username) return 1
            if (u1.username < u2.username) return -1
            return 0
        })
    } else if (propName === 'lastLoginTime') {
        gUsers.sort((u1, u2) => u1.lastLoginTime - u2.lastLoginTime)
    }
}