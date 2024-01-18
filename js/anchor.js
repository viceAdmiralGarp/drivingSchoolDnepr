document.querySelector('#filials').href = `#anchor_filial_${getScreenSizeFilials(window.innerWidth)}`
document.querySelector('#education').href = `#edu_${getScreenSizeFilials(window.innerWidth)}`
document.querySelector('#cars').href = `#cars_${getScreenSizeCars(window.innerWidth)}`
document.querySelector('#comments').href = `#comment_${getScreenSizeCars(window.innerWidth)}`
document.querySelector('#contacts').href = `#contact_${getScreenSizeComments(window.innerWidth)}`
document.querySelectorAll('#register').forEach(element => element.href = `#register_${getScreenSizeRegister(window.innerWidth)}`);

function getScreenSizeFilials(windowWidth) {
    if (windowWidth <= 576)
        return '320'
    if (windowWidth <= 768)
        return '576'
    else if (windowWidth <= 992)
        return '768'
    else if (windowWidth <= 1199)
        return '900'
    else if (windowWidth > 1199)
        return '1200'
}

function getScreenSizeCars(windowWidth) {
    if (windowWidth <= 576)
        return '1200'
    if (windowWidth <= 768)
        return '900'
    else if (windowWidth <= 992)
        return '768'
    else if (windowWidth <= 1199)
        return '1400'
    else if (windowWidth > 1199)
        return '1400'
}

function getScreenSizeComments(windowWidth) {
    if (windowWidth <= 576)
        return 'sm'
    else if (windowWidth > 576)
        return 'lg'
}

function getScreenSizeRegister() {
    if (windowWidth <= 576)
        return '576'
    if (windowWidth <= 768)
        return '768'
    else if (windowWidth > 768)
        return '992'
}