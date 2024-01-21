document.querySelectorAll('.dropdown-item').forEach(element => element.addEventListener('click', function () {
    localStorage.setItem('language', element.id);
}));

if (window.location.pathname.includes('en')) {
    localStorage.setItem('language', 'en');
} else if (window.location.pathname.includes('ru')) {
    localStorage.setItem('language', 'ru');
} else if (window.location.pathname.includes('ua')) {
    localStorage.setItem('language', 'ua');
}