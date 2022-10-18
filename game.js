
const ALPHABET =  ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const WORDS = ['jade', 'piki', 'degu', 'tikru'];
const LETTERS = document.getElementById('LETTERS');
const WORD = document.getElementById('WORD');
let LETTER_ID = '';
let WORD_TO_GUESS = '';
let WINNING_ARRAY = [];
let GUESSES = 0;

INITIALIZE_GAME();

function INITIALIZE_GAME(){
    GENERATE_WORD();
    DISPLAY_LETTERS();
}


function DISPLAY_LETTERS(){
    ALPHABET.forEach((LETTER) => {
        const BUTTON = document.createElement('BUTTON');
        BUTTON.textContent = LETTER;
        LETTERS.appendChild(BUTTON);
        BUTTON.addEventListener('click', () => {
            GUESS_LETTER(LETTER)
        });
    })
}


function GENERATE_WORD(){
    const RANDOM = Math.floor(Math.random() * WORDS.length);
    WORD_TO_GUESS = WORDS[RANDOM];
    const WORD_TO_LETTERS = WORD_TO_GUESS.split('');
    //For each letter create new elements to display them.
    WORD_TO_LETTERS.forEach((LETTER) => {
        const CHARACTER_CONTAINER = document.createElement('div');
        const CHARACTER = document.createElement('span');
        const UNDERLINE = document.createElement('div')
        CHARACTER.textContent = LETTER;
        CHARACTER.setAttribute("id", LETTER)
        CHARACTER_CONTAINER.appendChild(CHARACTER);
        WORD.appendChild(CHARACTER_CONTAINER);
        CHARACTER_CONTAINER.appendChild(UNDERLINE)
        //Set display to none at the start.
        console.log(WORD_TO_GUESS, CHARACTER)
        CHARACTER.style.display = "none"
    })
}


function GUESS_LETTER(LETTER){
    LETTER_ID = document.querySelectorAll(`#${LETTER}`)
    if(WORD_TO_GUESS.includes(LETTER)){
        //Change display to block for all guessed letters.
        for(let i = 0; i < LETTER_ID.length; i++) {
            let CURRENT_LETTERS = LETTER_ID[i];
            CURRENT_LETTERS.style.display = 'block';
            CHECK_WIN(LETTER)
        }
    }
}


function CHECK_WIN(LETTERS){
    WINNING_ARRAY.push(LETTERS)
    //Check if both arrays include same elements.
    if(WINNING_ARRAY.length === WORD_TO_GUESS.split('').length){
        return WINNING_ARRAY.every((element, index) => {
            if(element == WORD_TO_GUESS[index] || WORD_TO_GUESS.includes(element)){
                console.log('You won!')
                return true;
            }
            else{
                console.log('You no win')
            }
        })
    }
}





