//Variables

//variable of cards in an array
let cards =[]
let firstCard=getRandomCard()
let secondCard=getRandomCard()
cards =[firstCard, secondCard]
let sum = firstCard+ secondCard

let hasBlackJack = false
let isAlive=false
let  wins=0
let losses = 0

let message=""
//DOM
let sumEl=document.getElementById("sum-el")
const startBtn=document.getElementById("stat-btn")
let messageEl= document.getElementById("message-el")
let hooksEl=document.querySelector("#hook-el")
let newHooks = document.querySelector("#newhk-btn")

let player={
     name : "Jack Sparrow",
     mermaidTeardrops : 0}


let playerEl=document.getElementById("player-el")


let resultEl=document.getElementById("result-el")
 console.log(resultEl)

//function startGame- changed to renderGame
//Use a for loop that lists out cards in hooksEl instead of the hard code
//function startGame(){
//    isAlive=true
 //   let firstCard=getRandomCard()
//let secondCard=getRandomCard()
//cards =[firstCard, secondCard]
//let sum = firstCard+ secondCard
 //   renderGame()
//}



function getRandomCard(){
    let randomNumber= Math.floor(Math.random()*13)+1
    return randomNumber
}

function startGame(){
    isAlive=true
    
    sumEl.textContent= "Weapons:" 
    renderGame()
}


function renderGame() {
    playerEl.textContent= player.name + ":" + player.mermaidTeardrops
    hooksEl.textContent="Hooks:" 
    for(let i=0; i<cards.length; i++){
        hooksEl.textContent+=cards[i]+ " , "
    }
    
    sumEl.textContent+=sum + " , "
   
    if (sum<=28){
        messageEl.textContent="Do you want to cast another hook?"
    }
    else if(sum===29){
        messageEl.textContent="Huraah, You caught a mermaid!"
        hasBlackJack=true
        mermaidTeardrops+=5
         }
        
    
    else{
        messageEl.textContent="You ran out of the hooks!"
        hasBlackJack=false
        isAlive=false 
    }
       //if(messageEl.textContent==="Huraah, You caught a mermaid!") {
        //wins+=1
       // resultEl.textContent= wins
      // }
      // else if(messageEl.textContent==="You ran out of the hooks!"){
      //  losses+=1
       // resultEl.textContent=losses
    //console.log(losses)       }
    }

    

         
    

//function getRandomNewHook. Created a function getRandomHook that generates random numbers.
 //used math floor to round up to nearest whole number, multiplied by 19 to limit stretch to below 19
 // and added 1 to fulfil it to 13.

//function getRandomHook(){
    //let RandomHooks= Math.floor( Math.random()*13)+1
//}
 


function newHook(){
    if(isAlive===true && hasBlackJack===false ){
let newHook= getRandomCard()
sum+= newHook 
       
        cards.push(newHook)
       renderGame()
        
        
        
   }
   
}

 function tryAgain(){
    trapstEl.textContent= 0
 }

