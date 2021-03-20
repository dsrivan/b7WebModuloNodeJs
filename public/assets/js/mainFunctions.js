/* alterar visual menu de navegação da HOME e botão TO TOP - Inicio */
const fnToggleBGNavigation = () => {
    window.addEventListener('scroll', () => {
        let scrollY = window.scrollY;
        let toTop = document.getElementsByClassName('divToTop')[0];
        let header = document.getElementsByTagName('header')[0];

        if (scrollY > 50) {
            classListAdd(header, 'toggleBGNavigation');
            classListRemove(toTop, 'right100off');
        } else {
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