const ALPHABET =  [
    'a', 'b', 'c', 'd', 'e', 
    'f', 'g', 'h', 'i', 'j', 'k', 'l',
    'm', 'n', 'o', 'p', 'q', 'r', 's', 
    't', 'u', 'v', 'w', 'x', 'y', 'z'
];
const HANGMAN_PARTS_IDS = [
    "FIRST", "SECOND", "THIRD", 
    "FOURTH", "FIFTH", "SIXTH", 
    "SEVENTH", "EIGHT", "NINTH", 
    "TENTH", "ELEVENTH", "TWELTH", 
    "THIRTEENTH"
]
const WORDS = [
    'jade', 'piki', 
    'degu', 'tikru'
];
const LETTERS = document.getElementById('LETTERS');
const WORD = document.getElementById('WORD');
const INFO = document.getElementById('INFO');
const HINT_BUTTON = document.getElementById('HINT_BUTTON');
const GUESSES_LEFT = document.getElementById('GUESSES_LEFT')
let LETTER_ID = '';
let WORD_TO_GUESS = '';
let WINNING_ARRAY = [];
let GUESSES = 0;
let GAME_ON = false;
let HINT = '';
let GUESSES_AMOUNT = 14;

INITIALIZE_GAME();

function INITIALIZE_GAME(){
    GAME_ON = true;
    GENERATE_WORD();
    DISPLAY_LETTERS();
    YOUR_GUESSES();
}



function GET_RANDOM_WORDS(){

}



function DISPLAY_LETTERS(){
    ALPHABET.forEach((LETTER) => {
        const BUTTON = document.createElement('BUTTON');
        BUTTON.textContent = LETTER;
        LETTERS.appendChild(BUTTON);
        BUTTON.addEventListener('click', () => {
            GUESS_LETTER(LETTER);
            YOUR_GUESSES();
        });
    })
}


function GENERATE_WORD(){
    const RANDOM = Math.floor(Math.random() * WORDS.length);
    WORD_TO_GUESS = WORDS[RANDOM];
    const WORD_TO_LETTERS = WORD_TO_GUESS.split('');
    //For each letter create new elements.
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
    HINT_BUTTON.addEventListener('click', () => {
        GET_HINT();
    })
}


function YOUR_GUESSES(){
    if(GAME_ON){
        let RGB_BRIGTHNESS = 255;
        //Text increases to more redish each time you make a wrong guess.
        for(let i = 0; i < GUESSES; i++){
            RGB_BRIGTHNESS -= 20;
            GUESSES_LEFT.style.color = `rgb(255, ${RGB_BRIGTHNESS}, ${RGB_BRIGTHNESS})`
        }
        GUESSES_LEFT.textContent = `GUESSES LEFT: ${GUESSES_AMOUNT}`
    }
}


function GUESS_LETTER(LETTER){
    if(GAME_ON){
        LETTER_ID = document.querySelectorAll(`#${LETTER}`)
        if(WORD_TO_GUESS.includes(LETTER)){
            //Change display to block for all guessed letters.
            for(let i = 0; i < LETTER_ID.length; i++) {
                let CURRENT_LETTERS = LETTER_ID[i];
                //Check that guessed letter isn't already guessed.
                if(CURRENT_LETTERS.style.display !== 'block'){
                    CURRENT_LETTERS.style.display = 'block';
                    CHECK_WIN(LETTER);
                }
            }
        }
        else{
            GUESSES += 1;
            GUESSES_AMOUNT -= 1;
            //Display new hangman part.
            const HANGMAN_PART = document.getElementById(HANGMAN_PARTS_IDS[GUESSES - 1]);
            if(HANGMAN_PART == null){
                GAME_ON = false;
                INFO.style.color = 'red';
                INFO.textContent = "You lost!"
            }
            else{
                HANGMAN_PART.style.display = 'block';
            }
        }
    }
    else{
        return null;
    }
}


function CHECK_WIN(LETTERS){
    if(GAME_ON){
        WINNING_ARRAY.push(LETTERS)
        //Check if both arrays include same elements.
        if(WINNING_ARRAY.length === WORD_TO_GUESS.split('').length){
            GAME_ON = false;
            return WINNING_ARRAY.every((element, index) => {
                if(element == WORD_TO_GUESS[index] || WORD_TO_GUESS.includes(element)){
                    INFO.textContent = `You won with ${GUESSES} wrong guesses!`
                }
                else{
                    INFO.textContent = "You no win :("
                }
            })
        }
    }
}


function GET_HINT(){
    if(GAME_ON == true){
        RANDOM_LETTER = Math.floor(Math.random() * WORD_TO_GUESS.length);
        HINT = WORD_TO_GUESS[RANDOM_LETTER];
        GUESS_LETTER(HINT);
    }
}





