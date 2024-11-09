// Constantes do projeto
const minutosDisplay = document.getElementById('minutos');
const segundosDisplay = document.getElementById('segundos');
const startButton = document.getElementById('start');
const pausaButton = document.getElementById('parar');
const descansoButton = document.getElementById('descanso');
const tempoFocado = 25;
const tempoDescanso = 5;

// Variaves do projeto
let intervalo;
let minutos;
let segundos;
let modoAtual = 'foco';
let temporizadorAtivo = false;

// Função alterar modo
function alterarModo(novoModo) {
    clearInterval(intervalo);
    modoAtual = novoModo;
    temporizadorAtivo = false;

    switch (novoModo) {
        case 'foco': 
            minutos = tempoFocado;
            startButton.classList.add('ativar');
            pausaButton.classList.remove('ativar');
            descansoButton.classList.remove('ativar');
            break;
        case 'pausa':
            minutos = tempoPausa;
            pausaButton.classList.add('ativar');
            startButton.classList.remove('ativar');
            descansoButton.classList.remove('ativar');
            break;
        case 'descanso':
            minutos = tempoDescanso;
            descansoButton.classList.add('ativar');
            startButton.classList.remove('ativar');
            pausaButton.classList.remove('ativar');
            break;
    }
    segundos = 0;
    atualizarDisplay();
}

function atualizarDisplay() {
    minutosDisplay.innerHTML = String(minutos).padStart(2, '0');
    segundosDisplay.innerHTML = String(segundos).padStart(2, '0');
}

function iniciarTempo() {
    clearInterval(intervalo);
    intervalo = setInterval(() => {
        if (segundos === 0) {
            if (minutos === 0) {
                if (modoAtual === 'foco') alterarModo('pausa');
                else if (modoAtual === 'pausa') alterarModo('descanso');
                else alterarModo('foco');
            } else {
                minutos--;
                segundos = 59;
            }
        } else {
            segundos--;
        }
        atualizarDisplay();
    }, 1000);
}

function pausarOuRetomarTempo() {
    if (temporizadorAtivo) {
        clearInterval(intervalo); 
        temporizadorAtivo = false;
    } else {
        iniciarTempo(); 
        temporizadorAtivo = true;
    }
}

startButton.addEventListener('click', () => {
    alterarModo('foco');
    temporizadorAtivo = true;
    iniciarTempo();
});

pausaButton.addEventListener('click', pausarOuRetomarTempo);

descansoButton.addEventListener('click', () => {
    alterarModo('descanso');
    temporizadorAtivo = true;
    iniciarTempo();
});



