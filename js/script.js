function clickObject(objectClick, objectOpen, contentBlock) {
    const mainObject = document.querySelector(objectClick)
    const dopObject = document.querySelector(objectOpen)
    if (mainObject) {
        mainObject.addEventListener('click', e => {
            mainObject.classList.toggle('_active')
            if (mainObject.classList.contains('_close')) {
                mainObject.classList.add('_open')
                mainObject.classList.remove('_close')
            } else {
                mainObject.classList.remove('_open')
                mainObject.classList.add('_close')
            }
            if (dopObject) {
                dopObject.classList.toggle('_active-burger')
            }
        })
    }
    document.addEventListener('click', closeClick)
    function closeClick(e) {
        if (mainObject.classList.contains('_active')) {
            if (!e.target.closest(contentBlock)) {
                mainObject.classList.remove('_active', '_open')
                dopObject.classList.remove('_active-burger')
                mainObject.classList.add('_close')
            }
        }
    }
}

const menuLinks = document.querySelectorAll('.nav__link[data-anchor]')
const mainObject = document.querySelector('.menu-btn')
const dopObject = document.querySelector('.nav__navigation')

if (menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener('click', onMenuLinkClick)
    })

    function onMenuLinkClick(e) {
        const menuLink = e.target
        if (menuLink.dataset.anchor && document.querySelector(menuLink.dataset.anchor)) {
            const anchorBlock = document.querySelector(menuLink.dataset.anchor)
            const anchorBlockValue = anchorBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('nav').offsetHeight

            if (dopObject.classList.contains('_active-burger')) {
                mainObject.classList.remove('_active', '_open')
                dopObject.classList.remove('_active-burger')
                mainObject.classList.add('_close')
            }

            window.scrollTo({
                top: anchorBlockValue,
                behavior: 'smooth',
            })
            e.preventDefault()
        }
    }
}

function showUpScroll(objectShow, scrollHeight) {
    let timeout = 200
    let scrollPrev = 0

    const header = document.querySelector(objectShow)
    const archorView = document.querySelector('.anchor')

    window.onscroll = function () {
        const scrolled = window.pageYOffset
        const headerHeight = document.querySelector(objectShow).offsetHeight
        const oneSectionHeight = document.querySelector('.header').offsetHeight

        archorView.addEventListener('click', e => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            })
            e.preventDefault()
        })
        if (scrolled >= (scrollHeight || oneSectionHeight) && scrolled < scrollPrev) {
            archorView.classList.add('_anchor-show')
            header.classList.add('_fixed')
            header.classList.remove('_stop-fixed')
            document.body.setAttribute('style', `margin-top: ${headerHeight}px;`)
        } else {
            archorView.classList.remove('_anchor-show')
            mainObject.classList.remove('_active', '_open')
            dopObject.classList.remove('_active-burger')
            mainObject.classList.add('_close')

            if (scrolled >= (scrollHeight || oneSectionHeight) && header.classList.contains('_fixed')) {
                header.classList.remove('_fixed')
                header.classList.add('_stop-fixed')
            } else {
                if (header.classList.contains('_stop-fixed')) {
                    document.body.setAttribute('style', `margin-top: ${headerHeight}px;`)
                } else {
                    if (header.classList.contains('_fixed')) {
                        header.classList.remove('_fixed')
                        header.classList.add('_stop-fixed')
                        setTimeout(() => {
                            header.classList.remove('_stop-fixed')
                            document.body.removeAttribute('style', `margin-top: ${headerHeight}px;`)
                        }, timeout)
                    }
                }
            }
        }
        scrollPrev = scrolled
    }
}

clickObject('.menu-btn', '.nav__navigation', '.navigation')
showUpScroll('.nav')
