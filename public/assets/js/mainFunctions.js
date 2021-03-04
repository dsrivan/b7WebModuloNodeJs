/* alterar visual menu de navegação da HOME e botão TO TOP - Inicio */
const fnToggleBGNavigation = () => {
    window.addEventListener('scroll', () => {
        let scrollY = window.scrollY;
        let header = document.getElementsByTagName('header')[0];
        let toTop = document.getElementsByClassName('divToTop')[0];

        if (scrollY > 50) {
            if (!header.classList.contains('toggleBGNavigation'));
            classListAdd(header, 'toggleBGNavigation');
            classListRemove(toTop, 'right100off');
        } else {
            if (header.classList.contains('toggleBGNavigation'));
            classListRemove(header, 'toggleBGNavigation');
            classListAdd(toTop, 'right100off');
        }
    });
}

function classListAdd(vElem, vClass) {
    vElem.classList.add(vClass);
}

function classListRemove(vElem, vClass) {
    vElem.classList.remove(vClass);
}

fnToggleBGNavigation();
/* alterar visual menu de navegação da HOME e botão TO TOP- Fim */

/* click DivToTop - INICIO */

function toTop() {
    window.scroll({
        top: 0,
        behavior: 'smooth'
    })
};

/* click DivToTop - FIM */