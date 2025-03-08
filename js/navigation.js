document.addEventListener('DOMContentLoaded', function () {
    fillHeader();

    const navItems = [
        {key: 'nav.home', href: 'index.html', text: 'Home'},
        {key: 'nav.about', href: 'about.html', text: 'About'},
        {key: 'nav.repertoire', href: 'repertoire.html', text: 'Repertoire'},
        {key: 'nav.members', href: 'members.html', text: 'Members'},
        {key: 'nav.recordings', href: 'recordings.html', text: 'Recordings'},
        {key: 'nav.gallery', href: 'gallery.html', text: 'Gallery'},
        {key: 'nav.actualities', href: 'actualities.html', text: 'Actualities'},
        {key: 'nav.contact', href: 'contact.html', text: 'Contact'}
    ];

    const navContainer = document.querySelector('.header-nav');
    const mobileNavPanel = document.querySelector('.mobile-nav-panel');
    mobileNavPanel.innerHTML = '<button class="close-mobile-nav-panel">X</button>';

    navItems.forEach(item => {
        const navLink = document.createElement('a');
        navLink.className = 'nav-a translatable';
        navLink.dataset.key = item.key;
        navLink.href = item.href;
        navLink.textContent = item.text;
        navContainer.appendChild(navLink);
        mobileNavPanel.appendChild(navLink.cloneNode(true));
    });

    // Set the active link
    const currentPath = window.location.pathname.split('/').pop();
    const activeLink = navContainer.querySelector(`a[href="${currentPath}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    } else {
        navContainer.querySelector('a[href="index.html"]').classList.add('active');
    }

    translate().then(() => {
        document.body.classList.remove('hidden');
    });

    // Toggle mobile navigation panel
    const mobileNavButton = document.querySelector('.mobile-nav-button');
    mobileNavButton.addEventListener('click', function () {
        mobileNavPanel.classList.toggle('open');
    });

    // Close mobile navigation panel
    const closeMobileNavButton = document.querySelector('.close-mobile-nav-panel');
    closeMobileNavButton.addEventListener('click', function () {
        mobileNavPanel.classList.remove('open');
    });
});

function fillHeader() {
    const header = document.querySelector('.header');
    header.innerHTML = `
        <a class="header-logo" href="index.html">
            <img alt="logo" src="/stalegria-new/media/IMGs/logo/headerLogo.png"/>
        </a>
        <div class="header-title">Stalegria</div>
        <div class="header-gap"></div>
        <button class="mobile-nav-button">☰</button>
        <nav class="header-nav"></nav>
        <div class="mobile-nav-panel"></div>
    `;
}