document.addEventListener('DOMContentLoaded', () =>{

const diceArr = [
    {
        name: 'dice_1',
        img: '/images/dice-1.png'
    },
    {
        name: 'dice_2',
        img: '/images/dice-2.png'
    },
    {
        name: 'dice_3',
        img: '/images/dice-3.png'
    },
    {
        name: 'dice_4',
        img: '/images/dice-4.png'
    },
    {
        name: 'dice_5',
        img: '/images/dice-5.png'
    },
    {
        name: 'dice_6',
        img: '/images/dice-6.png'
    },


]
let points_p1; 
let points_p2; 
let gameStarted;
let round;

let leftArr = [];
let rightArr = [];    
let diceValue;  


// const jokerFade =document.getElementById("header_img");
// window.onload = joker(jokerFade);
const newGame = document.getElementById("start_button");
newGame.onclick = startGame;
const rollButton = document.getElementById("roll_button");
rollButton.onclick = rollDice;

// function joker(el) {
//     var fade = function() {
//       el.style.opacity = +el.style.opacity + 0.01;
  
//       if (+el.style.opacity < 1) {
//         setTimeout(fade, 50)
//       }
//     }
//     fade();
// }

async function rollDice() {
    if(gameStarted===true && round<=11){
        document.getElementById("current_round").innerHTML = `Round ${round}`;
              
        for(let i = 0; i < 7; i++){
            leftArr[i]=Math.floor(Math.random()*6);
            rightArr[i]=Math.floor(Math.random()*6);
            document.getElementById("dice_img_left").src = `${diceArr[leftArr[i]].img}`;
            document.getElementById("dice_img_right").src = `${diceArr[rightArr[i]].img}`;
            await timer(125);
            }
            diceValue = (leftArr.pop() + 1) + (rightArr.pop() + 1);
            console.log(diceValue);
        }
    
        
        
        if(document.getElementById("space_left").classList.contains("active")){
            if(diceValue === round){
                document.getElementById("points_p1").innerHTML = `${points_p1+=1}`
               
            }
        }
        if(document.getElementById("space_right").classList.contains("active")){
            if(diceValue === round){
                document.getElementById("points_p2").innerHTML = `${points_p2+=1}`
               
            }
        }
        if(gameStarted){
            nextPlayer(diceValue);
            
        }
    }
function timer(ms) {
    return new Promise(res => setTimeout(res, ms));
}



function nextPlayer(dice_value){
    round+=1;
    document.getElementById("current_round").innerHTML = `Round ${round}`;
    if(document.getElementById("space_left").classList.contains("active")){
        document.getElementById("space_left").className = "nonactive";
        document.getElementById("space_right").className = "active";
        document.getElementById("points_rolled_left").innerHTML = `You just rolled ${dice_value}`;
        document.getElementById("points_rolled_right").innerHTML = "";
    }else{
        document.getElementById("space_left").className ="active";
        document.getElementById("space_right").className = "nonactive";
        document.getElementById("points_rolled_left").innerHTML = "";
        document.getElementById("points_rolled_right").innerHTML = `You just rolled ${dice_value}`;
    }
    
    if(round===12){
        gameStarted = false;
        gameOver(points_p1, points_p2);
        
    
            
    }
}

function gameOver(points_p1, points_p2){
    document.getElementById("current_round").innerHTML = `GAME OVER`;
    if(points_p1 === points_p2){
        document.getElementById("points_rolled_left").innerHTML = "Tie Game!";
        document.getElementById("points_rolled_right").innerHTML = "Tie Game!";
        document.getElementById("space_left").className ="active";
        document.getElementById("space_right").className = "active";
    }else if(points_p1 > points_p2){
        document.getElementById("points_rolled_left").innerHTML = "You're the WINNER!!!";
        document.getElementById("points_rolled_right").innerHTML = "";
        document.getElementById("space_left").className ="active";
        document.getElementById("space_right").className = "nonactive";
    }else{
        document.getElementById("points_rolled_left").innerHTML = "";
        document.getElementById("points_rolled_right").innerHTML = "You're the WINNER!!!";
        document.getElementById("space_left").className ="nonactive";
        document.getElementById("space_right").className = "active";
    }

}

function startGame(){
    points_p1 = 0;
    points_p2 = 0;
    round = 2;
    gameStarted = true;
    document.getElementById("current_round").innerHTML = `Round ${round}`;
    document.getElementById("points_p1").textContent = "0";
    document.getElementById("points_p2").textContent = "0";
    document.getElementById("dice_img_left").src = `${diceArr[0].img}`;
    document.getElementById("dice_img_right").src = `${diceArr[0].img}`;
    document.getElementById("space_left").className = "active";
    document.getElementById("space_right").className = "nonactive";
    document.getElementById("points_rolled_right").innerHTML = "";
    document.getElementById("points_rolled_left").innerHTML = "";
    
    
    
}



})


