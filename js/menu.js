const CHOOSE_DIFFICULTIES = document.getElementById('DIFFICULTIES');
let DIFFICULTIES = ['EASY', 'MEDIUM', 'HARD', 'EXTREME'];
let DIFFICULTY = '';

CHOOSE_DIFFICULTY();

function CHOOSE_DIFFICULTY(){
    DIFFICULTIES.forEach((LEVEL) => {
        HINT_BUTTON.style.display = 'none';
        DEFINITION_BUTTON.style.display = 'none';
        const BUTTON = document.createElement('BUTTON');
        BUTTON.textContent = LEVEL;
        CHOOSE_DIFFICULTIES.appendChild(BUTTON);
        BUTTON.addEventListener('click', () => {  
            DIFFICULTY = BUTTON.textContent;
            if(DIFFICULTY == 'EASY'){
                DIFFICULTY = 4;
                HINTS_LEFT = 1;
            }
            else if(DIFFICULTY == 'MEDIUM'){
                DIFFICULTY = 6;
                HINTS_LEFT = 3;
            }
            else if(DIFFICULTY == 'HARD'){
                DIFFICULTY = 8;
                HINTS_LEFT = 4;
            }
            else if(DIFFICULTY == 'EXTREME'){
                DIFFICULTY = 10;
                HINTS_LEFT = 5;
            }
            if(DIFFICULTY !== ''){
                INITIALIZE_GAME();
                CHOOSE_DIFFICULTIES.style.display = 'none';
            }
        })
    })
}