const game = document.getElementById('labirintoScreen')
const victoryMessage = document.getElementById('victoryScreen')
const start = document.getElementById('start')
const player = document.getElementById('player')
const buttonRestart = document.getElementById('button')

let playerPosition = ''
let row = 9
let column = 0

const map1 = [
    "WWWWWWWWWWWWWWWWWWWWW",
    "W   W     W     W W W",
    "W W W WWW WWWWW W W W",
    "W W W   W     W W   W",
    "W WWWWWWW W WWW W W W",
    "W         W     W W W",
    "W WWW WWWWW WWWWW W W",
    "W W   W   W W     W W",
    "W WWWWW W W W W W W F",
    "S     W W W W W W WWW",
    "WWWWW W W W W W W W W",
    "W     W W W   W W W W",
    "W WWWWWWW WWWWW W W W",
    "W       W       W   W",
    "WWWWWWWWWWWWWWWWWWWWW",
]

const renderMap = () => {

    for (let i = 0; i < map1.length; i++) {

        let row = document.createElement('div')
        row.classList.add('row')

        for (let j = 0; j < map1[i].length; j++) {

            let div = document.createElement('div')
            let wall = map1[i][j]

            div.classList.add('cell')
            div.dataset.row = i
            div.dataset.column = j

            if (wall === 'S') {
                div.classList.add('start')
            } else if (wall === 'F') {
                div.classList.add('finish')
            } else if (wall === 'W') {
                div.classList.add('wall')

            } else {
                div.classList.add('space')
            }
            row.appendChild(div)
        }
        game.appendChild(row)
    }
}
renderMap()


const insertPlayer = () => {
    playerPosition = document.querySelector("[data-row='" + row + "'][data-column='" + column + "']")
    playerPosition.appendChild(player)
}
insertPlayer()


const movePlayer = (key) => {

    if (key === 'ArrowUp') {
        row--
    } else if (key === 'ArrowDown') {
        row++
    } else if (key === 'ArrowLeft') {
        column--
    } else if (key === 'ArrowRight') {
        column++
    }
}

const blockWall = (key) => {

    if (key === 'ArrowUp') {
        row++

    } else if (key === 'ArrowDown') {
        row--

    } else if (key === 'ArrowLeft') {
        column++

    } else if (key === 'ArrowRight') {
        column--
    }
}

const victoryCondition = () => {
    if (playerPosition.classList.contains('finish')) {
        victoryMessage.style.display = 'block'
        document.removeEventListener('keydown', movementPlayer)
    }
}

document.addEventListener('keydown', movementPlayer = (event) => {

    let keyName = event.key
    movePlayer(keyName)

    playerPosition = document.querySelector("[data-row='" + row + "'][data-column='" + column + "']")

    if (playerPosition.classList.contains('wall')) {
        blockWall(keyName)

    } else {
        playerPosition.appendChild(player)
    }
    
    victoryCondition()
    
})

buttonRestart.addEventListener('click', () => {
    row = 9
    column = 0
    playerPosition = document.querySelector("[data-row='" + row + "'][data-column='" + column + "']")
    playerPosition.appendChild(player)
    victoryMessage.style.display = 'none'
    document.addEventListener('keydown', movementPlayer)
})
