/* alterar visual menu de navegação da HOME - Inicio */
const fnToggleBGNavigation = () => {
    window.addEventListener('scroll', () => {
        let scrollY = window.scrollY;
        let header = document.getElementsByTagName('header')[0];

        if (scrollY > 50) {
            if (!header.classList.contains('toggleBGNavigation'));
            classListAdd(header, 'toggleBGNavigation');
        } else {
            if (header.classList.contains('toggleBGNavigation'));
            classListRemove(header, 'toggleBGNavigation');
        } impor
    });
}

function classListAdd(vElem, vClass) {
    vElem.classList.add(vClass);
}

function classListRemove(vElem, vClass) {
    vElem.classList.remove(vClass);
}

fnToggleBGNavigation();
/* alterar visual menu de navegação da HOME - Fim */