/*
 * Create a list that holds all of your cards
 */
const symbols = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt",
                 "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];
// spread operator to make an array of 16 cards
const cards = [...symbols, ...symbols];

const open_cards = [];

let moves = 0;



/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
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

function displayCards(cards) {
    //initialize
    moves = 0;
    updateMoves(moves);
    rate(50);
    const shuffled_cards = shuffle(cards);
    const deck = document.querySelector(".deck");
    const parent = deck.parentElement;
    // clear the deck first
    deck.remove();
    const newDeck = document.createElement("ul");
    newDeck.className = "deck";

    // create a fragment to boost avoid repaint in the loop.
    const fragment = document.createDocumentFragment();
    for (const card of cards) {
        const li = document.createElement("li");
        li.className = "card";
        li.innerHTML = `<i class="fa ${card}"></i>`;

        fragment.appendChild(li);
    }
    newDeck.appendChild(fragment);
    parent.appendChild(newDeck);
}

 function addListeners() {
    //avoid to add too many listeners with event delegation
    const deck = document.querySelector(".deck");
    deck.addEventListener("click", function(event) {
        const target = event.target;
        if (target.tagName.toLowerCase() === "li" && !open_cards.includes(target)) {
            moves += 1;
            updateMoves(moves);
            flipCard(target);
            if (open_cards.length % 2 === 0) {
                open_cards.push(target);
            }
            else {
                if (isMatch(target)) {
                    open_cards.push(target);
                    if (open_cards.length === 16) {
                        setTimeout(() => {
                            rate(moves);
                            alert("You Win! Click restart to play again.");
                        }, 1000);
                    };
                }
                else {
                    const card = open_cards.pop();
                    setTimeout(() => {
                        flipCard(card);
                        flipCard(target);
                    }, 1000);
                }
            }
        }
    });

    const restartNode = document.querySelector(".restart");
    restartNode.addEventListener("click", restart)
 }

 function updateMoves(moves) {
    const movesNode = document.querySelector(".moves");
    movesNode.textContent = moves;
 }

 function getCardName(target) {
    const i = target.firstElementChild;
    return i.classList[1]
 }

 function isMatch(card) {
    return getCardName(open_cards[open_cards.length - 1]) === getCardName(card);
 }

 function flipCard(card) {
    card.classList.toggle("open");
    card.classList.toggle("show");
 }

 function restart() {
    displayCards(cards);
    addListeners();
 }

 function rate(moves) {
    const startList = document.querySelector(".stars").children;
    if (moves >= 50) {
        for (const item of startList) {
            item.firstElementChild.classList.remove("fa-star");
            item.firstElementChild.classList.add("fa-star-o");
        }
    }
    else if (moves > 30){
        startList[0].firstElementChild.classList.remove("fa-star-o");
        startList[0].firstElementChild.classList.add("fa-star");
        startList[1].firstElementChild.classList.remove("fa-star");
        startList[1].firstElementChild.classList.add("fa-star-o");
        startList[2].firstElementChild.classList.remove("fa-star");
        startList[2].firstElementChild.classList.add("fa-star-o");

    }
    else if (moves > 20) {
        startList[0].firstElementChild.classList.remove("fa-star-o");
        startList[0].firstElementChild.classList.add("fa-star");
        startList[1].firstElementChild.classList.remove("fa-star-o");
        startList[1].firstElementChild.classList.add("fa-star");
        startList[2].firstElementChild.classList.remove("fa-star");
        startList[2].firstElementChild.classList.add("fa-star-o");
    }
    else {
        for (const item of startList) {
            item.firstElementChild.classList.remove("fa-star-o");
            item.firstElementChild.classList.add("fa-star");
        }
    }
 }


 displayCards(cards);
 addListeners();
