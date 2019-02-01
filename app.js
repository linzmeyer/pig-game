/*

GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

Version 3 Commits
- Refactoring funcitons

*/

// Global Variables
var scores, roundScore, activePlayer, gamePlaying, lastDice1, lastDice2;

// initialize the game.
init();

// When btn-roll is clicked
document.querySelector( '.btn-roll' ).addEventListener( 'click', function() {
    if( gamePlaying ) {
        // 1. Set random number.
        var dice1 = Math.floor( Math.random() * 6 ) + 1;
        var dice2 = Math.floor( Math.random() * 6 ) + 1;
        
        // 2. Display rndm #s in the dice
        document.getElementById( 'dice-1' ).style.display = 'block';
        document.getElementById( 'dice-2' ).style.display = 'block';
        document.getElementById( 'dice-1' ).src = 'dice-' + dice1 + '.png';
        document.getElementById( 'dice-2' ).src = 'dice-' + dice2 + '.png';

        // 3. Update the round score
        if (( dice1 === 6 && lastDice1 === 6 ) || ( dice2 === 6 && lastDice2 === 6 )) { // IF either of the dice roll a 6 twice in a row.
            // Player resets score (harsh!)
            scores[activePlayer] = 0;
            // Update the DOM
            document.querySelector( '#score-' + activePlayer ).textContent = '0';
            // Go to next player
            nextPlayer();
        }
        else if ( dice1 !== 1 && dice2 !== 1 ) { // IF either of the dice was NOT a 1
            // Add the round score to the global score.
            roundScore += ( dice1 + dice2 );
            document.querySelector( '#current-' + activePlayer ).textContent = roundScore;
        }
        else {
            // Next player's turn
            nextPlayer();
        }
        // Set values of last roll.
        lastDice1 = dice1;
        lastDice2 = dice2;
    }
});

// When 'btn-hold' is clicked
document.querySelector( '.btn-hold' ).addEventListener( 'click', function() {
    
    if( gamePlaying ) {
        // 1. Add current score to global score
        scores[activePlayer] += roundScore;

        // 2. Update the DOM (use id of score-#)
        document.querySelector( '#score-' + activePlayer ).textContent = scores[ activePlayer ];
        
        // 3. Grab input field value.
        var input = document.querySelector('.final-score').value; //
        var winningScore;
        // Check if input is empty
            // Undefined, 0, null, or "" are coerced to false.
            // Anything else is coerced to true.
        if( input ) {
            winningScore = input;
        }
        else {
            winningScore = 100; // Set default winning score to 100.
        }
        
        // 4. Check if player won the game
        if( scores[activePlayer] >= winningScore ) {
            document.getElementById( 'name-' + activePlayer ).textContent = 'Winner!';
            hideDice();
            document.querySelector( '.player-' + activePlayer + '-panel' ).classList.add( 'winner' );
            document.querySelector( '.player-' + activePlayer + '-panel' ).classList.remove( 'active' );
            gamePlaying = false;
        }
        else {
            // Next player's turn
            nextPlayer(); 
        }
    }
});

// When btn-new is clicked, initialize new game.
document.querySelector( '.btn-new' ).addEventListener( 'click', init );

// Go to next player
function nextPlayer() {
    // Next player's turn
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById( 'current-0' ).textContent = '0';
    document.getElementById( 'current-1' ).textContent = '0';

    document.querySelector( '.player-0-panel' ).classList.toggle( 'active' );
    document.querySelector( '.player-1-panel' ).classList.toggle( 'active' );

    hideDice();
}

// initialize a new game.
function init() {
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    
    
    // Hide Dice
    hideDice();

    // getElementById is best choice when manipulating a specific element.
    document.getElementById( 'score-0' ).textContent = '0';
    document.getElementById( 'score-1' ).textContent = '0';
    document.getElementById( 'current-0' ).textContent = '0';
    document.getElementById( 'current-1' ).textContent = '0';
    document.getElementById( 'name-0' ).textContent = 'Player 1';
    document.getElementById( 'name-1' ).textContent = 'Player 2';
    document.querySelector( '.player-0-panel' ).classList.remove( 'winner' );
    document.querySelector( '.player-1-panel' ).classList.remove( 'winner' );
    document.querySelector( '.player-0-panel' ).classList.remove( 'active' );
    document.querySelector( '.player-1-panel' ).classList.remove( 'active' );
    document.querySelector( '.player-0-panel' ).classList.add( 'active' );
    
}

function hideDice() {
    document.getElementById( 'dice-1' ).style.display = 'none';
    document.getElementById( 'dice-2' ).style.display = 'none';
}




















