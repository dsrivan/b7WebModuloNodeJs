/* alterar visual menu de navegação da HOME - Inicio */
window.addEventListener('scroll', () => {
    let scrollY = window.scrollY;
    let header = document.getElementsByTagName('header')[0];

    if (scrollY > 50) {
        if (!header.classList.contains('toggleBGNavigation'));
        header.classList.add('toggleBGNavigation');
    } else {
        if (header.classList.contains('toggleBGNavigation'));
        header.classList.remove('toggleBGNavigation');
    }
});
/* alterar visual menu de navegação da HOME - Fim */