'use strict'

var gProjs = [
    {
        id: "mine-sweeper",
        name: "Mine sweaper",
        title: "Clasic game",
        desc: "Dont press the mines",
        url: "projs/delivery 2",
        publishedAt: "2022-07-19",
        labels: ["Matrix", "keyboard events"]
    },
    {
        id: "safe-content",
        name: "Secret",
        title: "For logged users only",
        desc: "Enter user details to get access to picture and more...(if u admin user)",
        url: "projs/safe-content",
        publishedAt: "2022-07-19",
        labels: ["Data base", "inputs","structure","css"]
    },
    {
        id: "day20-crudl",
        name: "Books-library",
        title: "Books app",
        desc: "Manage your books library",
        url: "projs/day20-crudl",
        publishedAt: "2022-07-19",
        labels: ["Data base", "structure","css"]
    },
    {
        id: "ball-board-start-here",
        name: "Ball-game",
        title: "the ball game",
        desc: "Practice your chess",
        url: "projs/ball-board-start-here",
        publishedAt: "2022-07-19",
        labels: ["Matrix", "keyboard events"]
    },
    {
        id: "touch-nums",
        name: "touch the nums",
        title: "click all the numbers",
        desc: "click them as fast as u can",
        url: "projs/touch-nums",
        publishedAt: "",
        labels: ["Matrix", "keyboard events"]
    },
    {
        id: "in-picture",
        name: "In-picture",
        title: "whats in picture",
        desc: "choose between 2 options the matching one",
        url: "projs/in-picture",
        publishedAt: "2022-07-19",
        labels: ["Matrix", "keyboard events"]
    }
]

function getProjs() {
    return gProjs
}

function getProjById(projId) {
    return gProjs.find(proj => proj.id == projId)
}