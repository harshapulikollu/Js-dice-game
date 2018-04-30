/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// declaring variables
var scores, roundscore, activeplayer, gameplaying;

//initializing all values
init();


//function to generate random dice num and shows on UI when user clicks on ROLLDICE btn
document.querySelector('.btn-roll').addEventListener('click', function(){
    //if gameplaying is true then only works means game is active
    if(gameplaying){
        //generating random number
    var dice = Math.floor(Math.random()* 6) + 1;
    //display the reslut to user UI
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    //to display dice with associated generated random number
    diceDOM.src = 'dice-' + dice + '.png';
    //update the round socre untill rolled num was NOT a 1
    if(dice !== 1){
        //Add dice score to roundscore
        roundscore += dice;
        document.querySelector('#current-' + activeplayer).textContent = roundscore;
    } else {
        //next player's turn
        nextPlayer();
    }
    }
});


//event fiunction for HOLD btn
document.querySelector('.btn-hold').addEventListener('click', function(){

    if(gameplaying){

        //update roundscore to global score
    scores[activeplayer] += roundscore;

    //upate the user UI accordingly.
    document.querySelector('#score-' + activeplayer).textContent = scores[activeplayer];

    //check if player won game.
    if(scores[activeplayer] >= 100){
        document.querySelector('#name-' + activeplayer).textContent = 'WINNER!';

        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activeplayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activeplayer + '-panel').classList.remove('active');

        gameplaying = false;
    } else{
        //nextplayer
        nextPlayer();
    }
    }


});

//function to toggle activeplayers
function nextPlayer(){
    //changig activeplayer turn using turnary operator
        activeplayer === 0 ? activeplayer = 1 : activeplayer = 0;
        roundscore =0;
        //changing back the roundscore to 0 as we get one.
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';

        //toggling the active player icon
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');

        document.querySelector('.dice').style.display = 'none ';
}

//working on NEW GAME btn
document.querySelector('.btn-new').addEventListener('click', init);

//main method to initialize all values
function init(){
    scores = [0,0];
    roundscore = 0;
    activeplayer =0;
    gameplaying = true;
    //hiding dice when game starts as no user clicks on roll dice
    document.querySelector('.dice').style.display = 'none';

    //initialzing all values in game to zero when game starts.
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

}
