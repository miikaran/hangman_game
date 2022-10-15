
const ALPHABET =  ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const WORDS = ['jade', 'piki', 'degu', 'tikru'];
const LETTERS = document.getElementById('LETTERS');
const WORD = document.getElementById('WORD');
let WORD_TO_GUESS = '';

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
        console.log(WORD_TO_GUESS)
        CHARACTER.style.display = "none"
    })
}


function GUESS_LETTER(LETTER){
    ID = document.getElementById(LETTER)
    if(WORD_TO_GUESS.includes(LETTER)){
      console.log(ID.id)
      ID.style.display = "block"
    }
}


function CHECK_WIN(){

}





