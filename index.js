// =========================
// VARIABLES
// =========================

let cards = []
let sum = 0

let hasBlackJack = false
let isAlive = false
let gameOver = false
let gameStarted = false

let currentLevel = 1

let wins = 0
let losses = 0

let isTransitioning = false

// =========================
// DOM
// =========================

let sumEl = document.getElementById("sum-el")
let messageEl = document.getElementById("message-el")
let hooksEl = document.getElementById("hook-el")
let playerEl = document.getElementById("player-el")
let resultEl = document.getElementById("result-el")
let gameWindow = document.getElementById("game-window")
let gameCard = document.getElementById("card-el")
let level2Btn = document.getElementById("game2-el")
let tryAgainBtn = document.getElementById("restore-el")

let trapFillEl = document.getElementById("trap-fill")

// =========================
// PLAYER
// =========================

let player = {
    name: "Jack Sparrow",
    mermaidTeardrops: 0
}

// =========================
// SAFE TRAP BAR UPDATE
// =========================

function updateTrapBar(){

    if(!trapFillEl) return  // prevents crash

    let max = 29
    let percent = (sum / max) * 100

    percent = Math.max(0, Math.min(100, percent))

    trapFillEl.style.width = percent + "%"

    if(percent < 60){
        trapFillEl.style.background =
        "linear-gradient(90deg, #00b4d8, #0077b6)"
    }
    else if(percent < 90){
        trapFillEl.style.background =
        "linear-gradient(90deg, #ffb703, #fb8500)"
    }
    else{
        trapFillEl.style.background =
        "linear-gradient(90deg, #ff006e, #d00000)"
    }
}

// =========================
// RANDOM CARD
// =========================

function getRandomCard(){

    let randomNumber = Math.floor(Math.random() * 13) + 1

    if(currentLevel === 2 && Math.random() < 0.30){
        return -randomNumber
    }

    return randomNumber
}

// =========================
// START GAME
// =========================

function startGame(){

    // BLOCK RESTART AFTER LOSS
    if(gameStarted && !gameOver){

    messageEl.textContent =
    "⚓ Finish the current hunt first!"

    return
}
    if(gameOver){

        messageEl.textContent =
        "❌ Press TRY AGAIN before restarting!"

        return
    }

    clearStates()

    // IMPORTANT RESET
    isTransitioning = false

    currentLevel = 1

    cards = []
    sum = 0

    hasBlackJack = false
    isAlive = false
    gameStarted = true

    hooksEl.textContent = "Hooks:"

    messageEl.textContent =
    "🎣 Press PICK NEW HOOKS to begin."

    playerEl.textContent =
    `${player.name}: ${player.mermaidTeardrops}`

    setCardImage("images/mermaid1.jpg")

    level2Btn.disabled = true
    tryAgainBtn.disabled = true

    updateTrapBar()
}
// =========================
// START LEVEL 2
// =========================

function startGame2(){

    if(hasBlackJack === false || currentLevel !== 1){
        messageEl.textContent = "🏴‍☠️ Win Level 1 before entering Level 2!"
        return
    }

    isTransitioning = false
    clearStates()

    currentLevel = 2

    cards = []
    sum = 0

    hasBlackJack = false
    isAlive = false
    gameOver = false
    gameStarted = true

    hooksEl.textContent = "Hooks:"

    gameWindow.classList.add("level2-state")

    setCardImage("images/cursedavyjones.jpg")

    messageEl.textContent =
    "🌊 Level 2 Begins! Beware of Davy Jones Curse!"

    level2Btn.disabled = true
    tryAgainBtn.disabled = true

    updateTrapBar()
}

// =========================
// NEW HOOK
// =========================

function newHook(){

    if(!gameStarted || hasBlackJack || gameOver || isTransitioning){
        return
    }

    isAlive = true

    let newCard = getRandomCard()

    cards.push(newCard)
    sum += newCard

    animateHook()

    renderGame()
}

// =========================
// RENDER GAME
// =========================

function renderGame(){

    hooksEl.textContent = "Hooks: " + cards.join(" ")

    updateTrapBar()

    playerEl.textContent =
    `${player.name}: ${player.mermaidTeardrops}`

    if(sum < 29){
        messageEl.textContent = "🎣 Cast another hook!"
    }
    else if(sum === 29){
        handleWin()
    }
    else{
        handleLoss()
    }
}

// =========================
// HANDLE WIN
// =========================

function handleWin(){

    isTransitioning = true
    hasBlackJack = true
    isAlive = false

    wins++
    player.mermaidTeardrops += 5

    resultEl.textContent = "Wins: " + wins

    gameWindow.classList.add("win-state")

    setCardImage("images/winmermaid.jpg")

    if(currentLevel === 1){
        messageEl.textContent = "🎉 Mermaid caught! LEVEL 2 unlocked!"
        level2Btn.disabled = false
    } else {
        messageEl.textContent = "🏆 MASTER OF THE SEVEN SEAS!"
    }
}

// =========================
// HANDLE LOSS
// =========================

function handleLoss(){

    isTransitioning = true
    isAlive = false
    gameOver = true

    losses++
    resultEl.textContent = "Losses: " + losses

    gameWindow.classList.add("lose-state")

    setCardImage("images/lossimage.jpg")

    messageEl.textContent = "❌ The mermaid escaped!"

    tryAgainBtn.disabled = false
}

// =========================
// TRY AGAIN
// =========================

function tryAgain(){

    if(!gameOver){
        messageEl.textContent =
        "❌ You can only try again after losing!"
        return
    }

    clearStates()
    isTransitioning = false

    currentLevel = 1
    cards = []
    sum = 0

    hasBlackJack = false
    isAlive = false
    gameOver = false
    gameStarted = false

    hooksEl.textContent = "Hooks:"
    messageEl.textContent = "🎣 Press START GAME to begin again."

    setCardImage("images/mermaid1.jpg")

    level2Btn.disabled = true
    tryAgainBtn.disabled = true

    updateTrapBar()
}

// =========================
// HELPERS
// =========================

function clearStates(){
    gameWindow.classList.remove(
        "win-state",
        "lose-state",
        "level2-state"
    )
}

function setCardImage(image){
    gameCard.style.backgroundImage = `url('${image}')`
}

function animateHook(){
    gameCard.classList.add("hook-animation")

    setTimeout(() => {
        gameCard.classList.remove("hook-animation")
    }, 500)
}
