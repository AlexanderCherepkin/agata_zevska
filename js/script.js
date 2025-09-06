

const slides = document.querySelectorAll('.gallery__slide')
let currentSlide = 0
const slideInterval = 6000
let intervalId

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.transform = `translateX(${(i - index) * 650}%)`
    })
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length
    showSlide(currentSlide)
}

function initSlider() {
    showSlide(currentSlide)
    intervalId = setInterval(nextSlide, slideInterval)
}

function stopSlider() {
    clearInterval(intervalId)
}

function checkWindowSize() {
    if (window.innerWidth >= 680) {
        document.querySelector('.gallery__next').addEventListener('click', nextSlide)
        document.querySelector('.gallery__prev').addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length
            showSlide(currentSlide)
        })
        initSlider()
    } else {
        stopSlider()
        document.querySelector('.gallery__next').removeEventListener('click', nextSlide)
        document.querySelector('.gallery__prev').removeEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length
            showSlide(currentSlide)
        })
    }
}

checkWindowSize()
window.addEventListener('resize', checkWindowSize);


/**************************************************************************/

document.addEventListener('DOMContentLoaded', function () {
    const blocks = document.querySelector('.exhibitions__blocks')
    const dots = document.querySelectorAll('.exhibitions__dot')
    const totalBlocks = document.querySelectorAll('.exhibitions__block').length
    const blocksPerSlide = 2 
    const totalSlides = Math.ceil(totalBlocks / blocksPerSlide) 
    let currentIndex = 0

    function updateSlider(index) {
        const offset = -index * (500 / totalSlides) 
        blocks.style.transform = `translateX(${offset}%)`
        dots.forEach(dot => dot.classList.remove('active'))
        dots[index].classList.add('active')
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides 
        updateSlider(currentIndex)
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides 
        updateSlider(currentIndex)
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index
            updateSlider(currentIndex)
        })
    })

    document.querySelector('.exhibitions__next').addEventListener('click', nextSlide)
    document.querySelector('.exhibitions__prev').addEventListener('click', prevSlide)

    updateSlider(currentIndex)

    const slideInterval = 7000 
    setInterval(nextSlide, slideInterval)
});


/********************************************************************/


document.addEventListener('DOMContentLoaded', function () {
    // Добавляем обработчик событий для плавной прокрутки
    document.querySelectorAll('.menu__link').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault() // Отменяем стандартное поведение ссылки
            const targetId = this.getAttribute('href') // Получаем ID целевого элемента
            const targetElement = document.querySelector(targetId) // Находим целевой элемент

            if (targetElement) {
                // Получаем позицию целевого элемента
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY

                // Плавная прокрутка к целевому элементу
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                })
            }
        })
    })
})
