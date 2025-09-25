const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const scoreElement = document.getElementById('score');

let isGameOver = false;
let loop;
let scoreLoop;
let score = 0;

const startGame = () => {
    isGameOver = false;
    score = 0;
    scoreElement.textContent = score;

    // Reset visuais
    pipe.style.animation = 'pipe-animation 1.5s infinite linear';
    pipe.style.left = '';

    mario.src = 'images/mario.gif';
    mario.style.width = '150px';
    mario.style.marginLeft = '0';
    mario.style.bottom = '0';
    mario.style.animation = '';

    // Loop de colisão
    loop = setInterval(() => {
        const pipePosition = pipe.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

        if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
            // Game Over
            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`;

            mario.style.animation = 'none';
            mario.style.bottom = `${marioPosition}px`;

            mario.src = 'images/game-over.png.png';
            mario.style.width = '75px';
            mario.style.marginLeft = '50px';

            clearInterval(loop);
            clearInterval(scoreLoop);
            isGameOver = true;
        }
    }, 10);

    // Loop de pontuação
    scoreLoop = setInterval(() => {
        score++;
        scoreElement.textContent = score;
    }, 100); // aumenta 1 ponto a cada 100ms
};

const jump = () => {
    if (isGameOver) {
        startGame(); // reiniciar
        return;
    }

    mario.classList.remove('jump');
    void mario.offsetWidth;
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
};

startGame();

document.addEventListener('keydown', jump);
