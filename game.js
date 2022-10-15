
const ALPHABET =  ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const LETTERS = document.getElementById('LETTERS');

INITIALIZE_GAME();

function INITIALIZE_GAME(){
    DISPLAY_LETTERS();
}

function DISPLAY_LETTERS(){
    ALPHABET.forEach((LETTER) => {
        const BUTTON = document.createElement('BUTTON');
        BUTTON.textContent = LETTER
        LETTERS.appendChild(BUTTON)    
    })
}
