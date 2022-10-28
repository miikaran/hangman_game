const CHOOSE_DIFFICULTIES = document.getElementById('DIFFICULTIES');
let DIFFICULTIES = ['EASY', 'MEDIUM', 'HARD', 'EXTREME'];
let DIFFICULTY = '';

CHOOSE_DIFFICULTY();

function CHOOSE_DIFFICULTY(){
    DIFFICULTIES.forEach((LEVEL) => {
        const BUTTON = document.createElement('BUTTON');
        BUTTON.textContent = LEVEL;
        CHOOSE_DIFFICULTIES.appendChild(BUTTON);
        BUTTON.addEventListener('click', () => {  
            DIFFICULTY = BUTTON.textContent;
            if(DIFFICULTY == 'EASY'){
                DIFFICULTY = 4;
            }
            else if(DIFFICULTY == 'MEDIUM'){
                DIFFICULTY = 6;
            }
            else if(DIFFICULTY == 'HARD'){
                DIFFICULTY = 8;
            }
            else if(DIFFICULTY == 'EXTREME'){
                DIFFICULTY = 10;
            }
            if(DIFFICULTY !== ''){
                INITIALIZE_GAME();
                CHOOSE_DIFFICULTIES.style.display = 'none';
            }
        })
    })
}