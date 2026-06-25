const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

// Definir o tamanho do canvas para preencher a seção hero
function resizeCanvas() {
    const heroSection = document.getElementById('hero');
    canvas.width = heroSection.offsetWidth;
    canvas.height = heroSection.offsetHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Caracteres do Matrix (Katakana + Latin + Números)
const matrixChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ';
const charsArray = matrixChars.split('');

const fontSize = 16;
// Número de colunas com base na largura
let columns = Math.floor(canvas.width / fontSize);
let drops = [];

// Inicializar as gotas
for (let i = 0; i < columns; i++) {
    drops[i] = 1;
}

// Quando a janela redimensiona, precisamos reajustar as gotas
window.addEventListener('resize', () => {
    columns = Math.floor(canvas.width / fontSize);
    drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
});

function drawMatrix() {
    // Fundo preto semi-transparente para criar o rastro
    ctx.fillStyle = 'rgba(10, 10, 15, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Cor das letras (Verde clássico do Matrix)
    ctx.fillStyle = '#0F0';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        // Selecionar um caractere aleatório
        const text = charsArray[Math.floor(Math.random() * charsArray.length)];
        
        // Desenhar o caractere
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Se a gota chegar no final da tela ou aleatoriamente, resetar para o topo
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        // Mover a gota para baixo
        drops[i]++;
    }
}

// Otimizar com setInterval para controlar a velocidade (ex: 33ms = ~30fps)
setInterval(drawMatrix, 35);
