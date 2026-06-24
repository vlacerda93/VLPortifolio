const matrixChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ';
const charsArray = matrixChars.split('');
const fontSize = 16;

const canvases = document.querySelectorAll('.matrix-canvas');
const matrices = [];

canvases.forEach(canvas => {
    const ctx = canvas.getContext('2d');
    const parent = canvas.parentElement;
    
    // Configurações independentes por canvas
    const matrixState = {
        canvas: canvas,
        ctx: ctx,
        parent: parent,
        columns: 0,
        drops: []
    };
    
    matrices.push(matrixState);
    
    function resizeCanvas() {
        // Redimensiona baseado no elemento pai
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
        
        matrixState.columns = Math.floor(canvas.width / fontSize);
        matrixState.drops = [];
        for (let i = 0; i < matrixState.columns; i++) {
            matrixState.drops[i] = 1;
        }
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
});

function drawMatrix() {
    matrices.forEach(state => {
        const { canvas, ctx, drops } = state;
        
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
    });
}

// Otimizar com setInterval para controlar a velocidade (ex: 140ms = ~7fps, 25% da velocidade original)
setInterval(drawMatrix, 140);

// ================= Theme Toggle =================
const themeToggleBtn = document.getElementById('theme-toggle');
if(themeToggleBtn) {
    const themeIcon = themeToggleBtn.querySelector('i');
    
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        
        if (document.body.classList.contains('light-mode')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    });
}
