/** Model */
const model = {
    icons: [
        {
           icon: 'fa-anchor',
           clickCount: 0,  
           isMatched: false
        },
        {
            icon: 'fa-anchor',
            clickCount: 0,  
            isMatched: false  
        },
        {
            icon: 'fa-bicycle',
            clickCount: 0,  
            isMatched: false  
        },
        {
            icon: 'fa-bolt',
            clickCount: 0,  
            isMatched: false
        },
        {
            icon: 'fa-cube',
            clickCount: 0,  
            isMatched: false 
         },
         {
             icon: 'fa-diamond',
             clickCount: 0,  
            isMatched: false  
         },
         {
             icon: 'fa-diamond',
             clickCount: 0,  
            isMatched: false  
         },
         {
             icon: 'fa-plane',
             clickCount: 0,  
            isMatched: false
         },
         {
            icon: 'fa-leaf',
            clickCount: 0,  
            isMatched: false  
        },
        {
            icon: 'fa-bomb',
            clickCount: 0,  
            isMatched: false
        },
        {
            icon: 'fa-leaf',
            clickCount: 0,  
            isMatched: false  
        },
        {
            icon: 'fa-bomb',
            clickCount: 0,  
            isMatched: false
        },
        {
            icon: 'fa-bolt',
            clickCount: 0,  
            isMatched: false  
        },
        {
            icon: 'fa-bicycle',
            clickCount: 0,  
            isMatched: false
        },
        {
            icon: 'fa-plane',
            clickCount: 0,  
            isMatched: false  
        },
        {
            icon: 'fa-cube',
            clickCount: 0,  
            isMatched: false
        }
    ],
    moveCount: 0,
    clickCount: 0,
    openCards: []
};

/** Octopus */
const octopus = {
    init: function() {
        cardView.init();
    },

    incrementMovement: function() {
        model.moveCount++;
    },

    getIconFromClass: function(card) {
        return card.firstChild.className;
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
    }
};

/** View */

const cardView = {

    /** initialize the game */
    init: function() {
        /** select the container */
        const cardContainer = document.querySelector('.deck');
        this.render(cardContainer);
        model.openCards = [];
    },

    /** render cards on the board */
    render: function(cardContainer) {
        
        /**  shuffle the cards */
        const cards = octopus.shuffle(model.icons);

        /** display icons on card */
        cards.forEach(icon => {
            const li = document.createElement('li');
            li.classList.add('card');
            const i = document.createElement('i');
            i.classList.add('fa', icon.icon);

            li.appendChild(i);
            cardContainer.appendChild(li);

        });
        cardContainer.addEventListener('click', this.clickCard);
    },

    clickCard: function(evt) {

        if( model.openCards.length < 2){
            model.openCards[model.clickCount] = evt.target;
            console.log(model.openCards);
            evt.target.classList.add('open', 'show');
            model.clickCount++;
        } 
        if (model.openCards.length === 2){

            if (octopus.getIconFromClass(model.openCards[0]) === octopus.getIconFromClass(model.openCards[1])) {
                model.openCards.forEach(card => {
                    card.classList.add('open', 'show','match');
                });
            } else {
                model.openCards.forEach(card => {
                    setTimeout( function (){
                        card.classList.remove('open', 'show');
                    }, 1000);
                });
            }
            model.openCards = [];
            model.clickCount = 0;
        }        
    
    },

};

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 octopus.init();
