
const ALPHABET =  ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const WORDS = ['jade', 'piki', 'degu', 'tikru'];
const LETTERS = document.getElementById('LETTERS');
const WORD = document.getElementById('WORD')
let WORD_TO_GUESS = '';

INITIALIZE_GAME();


function INITIALIZE_GAME(){
    DISPLAY_LETTERS();
    GENERATE_WORD();
}


function DISPLAY_LETTERS(){
    ALPHABET.forEach((LETTER) => {
        const BUTTON = document.createElement('BUTTON');
        BUTTON.textContent = LETTER;
        LETTERS.appendChild(BUTTON);
    })
}


function GENERATE_WORD(){
    const RANDOM = Math.floor(Math.random() * WORDS.length);
    WORD_TO_GUESS = WORDS[RANDOM];
    const WORD_TO_LETTERS = WORD_TO_GUESS.split('');
    //For each letter create new elements to display guess.
    WORD_TO_LETTERS.forEach((LETTER) => {
        const CHARACTER_CONTAINER = document.createElement('div');
        const CHARACTER = document.createElement('span');
        const UNDERLINE = document.createElement('div')
        CHARACTER.textContent = LETTER;
        CHARACTER_CONTAINER.appendChild(CHARACTER);
        WORD.appendChild(CHARACTER_CONTAINER);
        CHARACTER_CONTAINER.appendChild(UNDERLINE)
    })
}


function GUESS_LETTER(){
 //
}





