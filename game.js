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
const GAME_CONTAINER = document.getElementById('GAME_CONTAINER');
const LETTERS = document.getElementById('LETTERS');
const WORD = document.getElementById('WORD');
const INFO = document.getElementById('INFO');
const HINT_BUTTON = document.getElementById('HINT_BUTTON');
const GUESSES_LEFT = document.getElementById('GUESSES_LEFT');
let WORDS = [];
let LETTER_ID = '';
let WORD_TO_GUESS = '';
let WINNING_ARRAY = [];
let GUESSES = 0;
let GAME_ON = false;
let HINT = '';
let HINTS_LEFT = 5;
let GUESSES_AMOUNT = 14;


async function INITIALIZE_GAME(){
    GAME_ON = true;
    await GET_RANDOM_WORDS();
    GENERATE_WORD();
    DISPLAY_LETTERS();
    YOUR_GUESSES();
    HINT_BUTTON.textContent = `GET HINT. ${HINTS_LEFT} LEFT `
    HINT_BUTTON.addEventListener('click', () => {
        GET_HINT();
    })
}


async function GET_RANDOM_WORDS(){
    if(GAME_ON){
        //Get random words based on the difficulty.
        const RESPONSE = await fetch(`https://random-word-api.herokuapp.com/word?length=${DIFFICULTY}`)
        WORDS = await RESPONSE.json()
    }
}


function DISPLAY_LETTERS(){
    if(GAME_ON){
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
}


function GENERATE_WORD(){
    if(GAME_ON){
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
    }
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
                INFO.textContent = `You lost! The word was ${WORD_TO_GUESS}`
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
                    INFO.textContent = `You lost! The word was ${WORD_TO_GUESS}`
                }
            })
        }
    }
}


function GET_HINT(){
    if(GAME_ON == true && HINTS_LEFT > 0){
        HINTS_LEFT -= 1;
        HINT_BUTTON.textContent = `GET HINT. ${HINTS_LEFT} LEFT `
        //Function expression to generate hints. 
        //Makes it easier to use under specific conditions.
        GENERATE_HINT = function(){
            RANDOM_LETTER = Math.floor(Math.random() * WORD_TO_GUESS.length);
            return RANDOM_LETTER;
        }
        HINT = WORD_TO_GUESS[GENERATE_HINT()];
        //Check if hint is already guessed &
        //Generate new one until it's not.
        if(WINNING_ARRAY.includes(HINT)){
            while(WINNING_ARRAY.includes(HINT)){
                GENERATE_HINT();
                HINT = WORD_TO_GUESS[GENERATE_HINT()];
                if(!WINNING_ARRAY.includes(HINT)){
                    break;
                }
            }
        }
        GUESS_LETTER(HINT);   
    }
}





