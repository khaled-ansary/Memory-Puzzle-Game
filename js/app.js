/** Model */
const model = {
    icons: [ // list of card icons
        {
           icon: 'fa-anchor'
        },
        {
            icon: 'fa-anchor' 
        },
        {
            icon: 'fa-bicycle'
        },
        {
            icon: 'fa-bolt'
        },
        {
            icon: 'fa-cube' 
        },
        {
            icon: 'fa-diamond'
        },
        {
            icon: 'fa-diamond'
        },
        {
            icon: 'fa-plane'
        },
        {
            icon: 'fa-leaf'  
        },
        {
            icon: 'fa-bomb'
        },
        {
            icon: 'fa-leaf'  
        },
        {
            icon: 'fa-bomb'
        },
        {
            icon: 'fa-bolt'  
        },
        {
            icon: 'fa-bicycle'
        },
        {
            icon: 'fa-plane'  
        },
        {
            icon: 'fa-cube'
        }
    ],
    moveCount: 0, // count pairs clicks
    matchCount: 0, // count matching pairs
    clickCount: 0, // count single pair clicks 
    openCards: [], // store two pair card event
    isTimerStart: false, // timer staring flag
    minute: 0, 
    second: 0,
    hour: 0
};

var interval; // set global timer
/** Octopus */
const octopus = {
    /**
     * initalize function 
     */
    init: function() {
        cardView.reStart();
        cardView.init();
    },

    /**
     * call this function when click on the card
     * @param {event} evt 
     */
    handlingCard(evt){
        if (! model.isTimerStart) {
            this.startTimer();
            model.isTimerStart = true;
        }
        cardView.checkCard(evt);
    },

    /**
     * count total moves
     */
    movementCount: function() {
        model.moveCount++;
        cardView.displayMoves();
    },

    /**
     * count total matching
     */
    matchingCount: function() {
        model.matchCount++;
        if( model.matchCount == 8) {
            cardView.displayModel();
        }
    },

    /**
     * get Icon class name
     * @param {card} card 
     */
    getIconFromClass: function(card) {
        return card.firstChild.className;
    },

    /***
     * return score for moves
     */
    getMoveScore: function() {
        if (model.moveCount <=10) {
            return 3;
        } else if (model.moveCount >10 && model.moveCount <=20) {
            return 2;
        } else if (model.moveCount >20){
            return 1;
        }
    },

    
    /**
    * @description Timer function initialization and definition
    * The time parameters are set for the game
    */
    startTimer: function () {
        
        interval = setInterval(function() {
            cardView.displayTimer();
            
            model.second++;
            if (model.second === 60) {
                model.minute++;
                model.second = 0;
            }
            if (model.minute === 60) {
                model.hour++;
                model.minute = 0;
            }
        }, 1000);

        return interval;
    },

    /*
    * Display the cards on the page
    *   - shuffle the list of cards using the provided "shuffle" method below
    *   - loop through each card and create its HTML
    *   - add each card's HTML to the page
    */

    // Shuffle function from http://stackoverflow.com/a/2450976
    shuffle: function(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    },

    /**
     * Reset model and views
     */
    setReset: function(){
        window.location.reload();
    }
};

/** View */

const cardView = {

    /** initialize the game */
    init: function() {
        /** select the container */
        const cardContainer = document.querySelector('.deck');
        cardContainer.innerHTML = '';
        this.render(cardContainer);
        this.displayMoves();
    },

    /**
     * Restart the game
     */
    reStart: function(){
        const reset = document.querySelector('.restart');
        reset.addEventListener('click', function (evt){
           octopus.setReset();
           cardView.init();
        });
    },

    /** render cards on the board */
    render: function(cardContainer) {
        
        /**  shuffle the cards */
        const cards = octopus.shuffle(model.icons);

        /** display icons on card */
        cards.forEach(iconClass => {
            const card = document.createElement('li');
            card.classList.add('card');
            const icon = document.createElement('i');
            icon.classList.add('fa', iconClass.icon);

            card.appendChild(icon);

            // add eventListener to each card
            card.addEventListener('click', function(evt){
                octopus.handlingCard(evt);
            }, true);
            cardContainer.appendChild(card);

        });
    },

    /** display and compare cards */
    checkCard: function(evt) {

        // open first selected card
        if( model.openCards.length < 2){
            model.openCards[model.clickCount] = evt.target;
            this.displayCard();
            model.clickCount++;
        } 
        /**
         * open second selected card and compare it to the first selected card
         */ 

        if (model.openCards.length === 2){
            if (octopus.getIconFromClass(model.openCards[0]) === octopus.getIconFromClass(model.openCards[1])) {
               this.matched();
            } else {
               this.unmatched();
            }
            model.openCards = [];
            model.clickCount = 0;
            octopus.movementCount();
        }        
        this.setScore();
    },

    /**
     * display selected card
     */
    displayCard: function() {
        model.openCards.forEach(card =>{
            card.classList.add('open', 'show','disabled');
        });
    },

    /**
     * this function call when two cards are not match
     * and hide the cards
     */
    unmatched: function() {
        model.openCards.forEach(card => {
            card.classList.add('open', 'show', 'shake-little', 'unmatched');
            setTimeout( function (){
                card.classList.remove('open', 'show', 'shake-little', 'unmatched', 'disabled');
            }, 1000);
        });
    },

    /**
     * this function call when two cards are match
     * it lock the card and increment the matchingCount
     */
    matched: function() {
        model.openCards.forEach(card =>{
            card.classList.add('open', 'show', 'match');
        });
        octopus.matchingCount();
    },

    /**
     * Display the total moves 
     * @param {count the total movement} move 
     */
    displayMoves: function() {
        const moveDisplaySpan = document.querySelector('.moves');
        moveDisplaySpan.textContent = model.moveCount;
    },

    /**
     * opem congratulation model dialog
     */
    displayModel: function() {
        const dialogModel = document.querySelector('#dialog');
        const congratsMessage = document.querySelector('.congrats');
        const scoreText = document.querySelector('.scoreText');
        const ratings = document.querySelector('.ratings');
        const playAgain = document.querySelector('.play');
        congratsMessage.textContent = 'Congratulations! You win the Game';
        clearInterval(interval); //clear time
        scoreText.textContent = `Total Moves ${model.moveCount} and Total Time takes ${model.minute} mins ${model.second} sec`;
        ratings.innerHTML = document.querySelector('.stars').innerHTML;

        playAgain.addEventListener('click', function (evt){
            window.location.reload();
        });

        dialogModel.showModal();

    },

    /**
     * display timing
     * @param {minute} min 
     * @param {second} sec 
     */
    displayTimer: function() {
        const timer = document.querySelector(".timer");
        timer.innerHTML = model.minute + " mins " + model.second + " secs";
    },

    /**
     * reset Ratings
     */
    setScore: function() {
        const stars = document.querySelector('.stars');
        const star ='<li><i class="fa fa-star"></i></li>';
        const star_o ='<li><i class="fa fa-star-o"></i></li>';
        console.log(octopus.getMoveScore());
        if(octopus.getMoveScore() === 3) {
            stars.innerHTML = `${star}${star}${star}`;
        } else if (octopus.getMoveScore() === 2) {
            stars.innerHTML =  `${star}${star}${star_o}`;
        }if (octopus.getMoveScore() === 1) {
            stars.innerHTML = `${star}${star_o}${star_o}`;
        } 
    }
};
octopus.init();
 