'use strict';
const checkButtonRef = document.getElementById("btn check")
let randomnumber = Math.floor(Math.random() * 100);
let a = 20;

console.log(randomnumber);
document.querySelector('.check').addEventListener('click',function(){
    const guess = Number(document.querySelector('.guess').value);
    console.log(typeof guess);

    if(guess === randomnumber)
    {
        document.querySelector('.message').textContent = 'correct';
        if(document.querySelector('.score').textContent > document.querySelector('.highscore').textContent){
            document.querySelector('.highscore').textContent = document.querySelector('.score').textContent;
        }      
        document.querySelector('.number').textContent = randomnumber;
    }
    else if(guess < randomnumber){
        a--
        if(document.querySelector('.score').textContent <= 0){
            document.querySelector('.message').textContent = 'You lost lel';
        }
        if(document.querySelector('.score').textContent > 0){
            document.querySelector('.message').textContent = 'too low';
            document.querySelector('.score').textContent = a;
        }
    }
    else if(guess > randomnumber){
        a--
        if(document.querySelector('.score').textContent <= 0){
            document.querySelector('.message').textContent = 'You lost lel';
        }
        if(document.querySelector('.score').textContent > 0){
            document.querySelector('.message').textContent = 'too high';
            document.querySelector('.score').textContent = a;
        }
    }
})
document.querySelector('.again').addEventListener('click',function(){
    document.querySelector('.score').textContent = 20;
    document.querySelector('.number').textContent = "?";
    randomnumber = Math.floor(Math.random() * 100);
    console.log(randomnumber);
    a = 20;
})