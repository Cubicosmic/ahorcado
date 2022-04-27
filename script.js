const letrasCont = document.getElementById('letrasCont');
const startButton = document.getElementById('startButton');
const letrasPuestasCont = document.getElementById('letrasPuestas');

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
ctx.canvas.width  = 0;
ctx.canvas.height = 0;

const bodyParts = [
    [4,2,1,1],
    [4,3,1,2],
    [3,5,1,1],
    [5,5,1,1],
    [3,3,1,1],
    [5,3,1,1]
];

let selectedWord;
let usedletrass;
let mistakes;
let hits;

const addletras = letras => {
    const letrasElement = document.createElement('span');
    letrasElement.innerHTML = letras.toUpperCase();
    letrasPuestasCont.appendChild(letrasElement);
}

const addBodyPart = bodyPart => {
    ctx.fillStyle = '#fff';
    ctx.fillRect(...bodyPart);
};

const wrongletras = () => {
    addBodyPart(bodyParts[mistakes]);
    mistakes++;
    if(mistakes === bodyParts.length) endGame();
}

const endGame = () => {
    document.removeEventListener('keydown', letrasEvent);
    startButton.style.display = 'block';
}

const correctletras = letras => {
    const { children } =  letrasCont;
    for(let i = 0; i < children.length; i++) {
        if(children[i].innerHTML === letras) {
            children[i].classList.toggle('hidden');
            hits++;
        }
    }
    if(hits === selectedWord.length) endGame();
}

const letrasInput = letras => {
    if(selectedWord.includes(letras)) {
        correctletras(letras);
    } else {
        wrongletras();
    }
    addletras(letras);
    usedletrass.push(letras);
};

const letrasEvent = event => {
    let newletras = event.key.toUpperCase();
    if(newletras.match(/^[a-zñ]$/i) && !usedletrass.includes(newletras)) {
        letrasInput(newletras);
    };
};

const drawWord = () => {
    selectedWord.forEach(letras => {
        const letrasElement = document.createElement('span');
        letrasElement.innerHTML = letras.toUpperCase();
        letrasElement.classList.add('letras');
        letrasElement.classList.add('hidden');
        letrasCont.appendChild(letrasElement);
    });
};

const selectRandomWord = () => {
    let word = words[Math.floor((Math.random() * words.length))].toUpperCase();
    selectedWord = word.split('');
};

const drawHangMan = () => {
    ctx.canvas.width  = 120;
    ctx.canvas.height = 160;
    ctx.scale(20, 20);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#d95d39';
    ctx.fillRect(0, 7, 4, 1);
    ctx.fillRect(1, 0, 1, 8);
    ctx.fillRect(2, 0, 3, 1);
    ctx.fillRect(4, 1, 1, 1);
};

const startGame = () => {
    usedletrass = [];
    mistakes = 0;
    hits = 0;
    letrasCont.innerHTML = '';
    letrasPuestasCont.innerHTML = '';
    startButton.style.display = 'none';
    drawHangMan();
    selectRandomWord();
    drawWord();
    document.addEventListener('keydown', letrasEvent);
};

startButton.addEventListener('click', startGame);