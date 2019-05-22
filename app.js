/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/


var scores , roundScore , activePlayer, gamePlaying;

function init(){
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    
//when we made the html and css file we had ani image in the middle
//so to remove that then we strat with the click

document.querySelector('.dice').style.display = 'none';

// now to put the values in the score as zero in js

document.querySelector('#score-0').textContent = '0';
document.querySelector('#score-1').textContent = '0';
document.querySelector('#current-0').textContent = '0';
document.querySelector('#current-1').textContent = '0';
document.querySelector('#name-0').textContent = 'Player 1';
document.querySelector('#name-1').textContent = 'Player 2';

document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');
document.querySelector('.player-0-panel').classList.remove('active');
document.querySelector('.player-1-panel').classList.remove('active');
document.querySelector('.player-0-panel').classList.add('active');
}

init();

document.querySelector('.btn-roll').addEventListener('click',function(){

    if(gamePlaying)
    {
    //1. to add the random number to current score 
    var dice;
    dice = Math.floor(Math.random() * 6 ) + 1;

    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';  
    
    // the working of the game updating the values 

    if(dice !== 1)
    {
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    }
    else
    {  nextPlayer();  }

}
});

document.querySelector('.btn-hold').addEventListener('click', function(){
if(gamePlaying)
{
    
    // update the round score

    scores[activePlayer] += roundScore;
    //update th UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    //check he won or not
    if(scores[activePlayer] >=20)
    {
    document.querySelector('#name-' + activePlayer ).textContent = "winner :)";
    document.querySelector('.dice').style.display = "none";
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    gamePlaying = false;
    }
    else
    {
    nextPlayer();
    } 
}
});

//functions


function nextPlayer (){
    
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0 ;
    roundScore = 0;
    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';

    // this method is only when we have to change once 
    // but when we have to alternative change it then  we use toggle

    // document.querySelector('.player-0-panel').classList.remove('active');
    // document.querySelector('.player-1-panel').classList.add('active');
    
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    
    //when the player changes ther dice should not be present so
    document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);