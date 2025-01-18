// File: js/navigation.js

document.addEventListener('DOMContentLoaded', function () {
    fillHeader();

    const navItems = [
        {key: 'nav.home', href: 'home.html', text: 'Home'},
        {key: 'nav.about', href: 'about.html', text: 'About'},
        {key: 'nav.repertoire', href: 'repertoire.html', text: 'Repertoire'},
        {key: 'nav.members', href: 'members.html', text: 'Members'},
        {key: 'nav.recordings', href: 'recordings.html', text: 'Recordings'},
        {key: 'nav.gallery', href: 'gallery.html', text: 'Gallery'},
        {key: 'nav.actualities', href: 'actualities.html', text: 'Actualities'},
        {key: 'nav.contact', href: 'contact.html', text: 'Contact'}
    ];

    const navContainer = document.querySelector('.header-nav');

    navItems.forEach(item => {
        const navLink = document.createElement('a');
        navLink.className = 'nav-a translatable';
        navLink.dataset.key = item.key;
        navLink.href = item.href;
        navLink.textContent = item.text;
        navContainer.appendChild(navLink);
    });

    // Set the active link
    const currentPath = window.location.pathname.split('/').pop();
    const activeLink = navContainer.querySelector(`a[href="${currentPath}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }

    translate().then(() => {
        document.body.classList.remove('hidden');
    });
});

function fillHeader() {
    const header = document.querySelector('.header');
    header.innerHTML = `
        <a class="header-logo" href="home.html">
            <img alt="logo" src="../media/IMGs/logo/headerLogo.png"/>
        </a>
        <div class="header-title">Stalegria</div>
        <nav class="header-nav"></nav>
    `;
}