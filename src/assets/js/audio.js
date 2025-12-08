window.addEventListener('DOMContentLoaded', () => {
    const musica = document.getElementById('musicaFundo');
    const btnControle = document.getElementById('btnControleSom');

    // O navegador tentará tocar a música por causa do 'autoplay'
    // Se conseguir, a música tocará mutada por padrão
    // Se não conseguir, o usuário precisará clicar para iniciar

    // A função do botão é apenas alternar o estado 'muted'
    btnControle.addEventListener('click', () => {
        if (musica.muted) {
            // Se está mudo, tira o mudo e garante que a música toque
            musica.muted = false;
            musica.play(); // Importante para iniciar caso o autoplay tenha falhado
            btnControle.classList.add('active'); // Ativa a animação da onda
        } else {
            // Se está tocando, coloca no mudo
            musica.muted = true;
            btnControle.classList.remove('active'); // Desativa a animação
        }
    });
});