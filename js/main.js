const main = document.getElementById('main')
const header = document.getElementById('header')
const logo = document.getElementById('logo')
const navList = document.querySelectorAll('.gnb-list')
const lanButton = document.querySelector('.header-utils')
const changeButton = document.querySelectorAll('.lang')
const hiddenLanButton = document.querySelector('.hidden-lan')
const sidePageNation = document.querySelector('.side-page-nation')
const sideDots = document.querySelectorAll('.side-page-nation > span')
const sections = document.querySelectorAll('.section.main-section')

let currentIndex = 0
let isScrolling = false

/* scroll event */
main.addEventListener('wheel', (event)=> {
  if(isScrolling) return

  isScrolling = true
  setTimeout(()=> {
    isScrolling = false
  }, 500)

  if(event.deltaY > 0) {
    if (currentIndex < sections.length - 1) currentIndex ++;
  } else {
    if (currentIndex > 0) currentIndex --;
  }

  sections[currentIndex].scrollIntoView({behavior: 'smooth'})

  if(currentIndex > 0) {
    header.classList.add('no-top')
    logo.src = '/imgs/main-logo.png'
    if(sidePageNation.style.opacity == 0) sidePageNation.style.opacity = 1
  } else {
    header.classList.remove('no-top')
    logo.src = '/imgs/main-logo-white.png'
    sidePageNation.style.opacity = 0
  }

  sideDots.forEach((dot)=>dot.classList.remove('active'))
  sideDots[currentIndex].classList.add('active')

}, {passive: true})

/* nav hover event */
navList.forEach(list=> {
  console.log('list')
  list.addEventListener('mouseover', ()=> {
    list.classList.add('active')
  })

  list.addEventListener('mouseout', ()=> {
    list.classList.remove('active')
  })
})

/* header lan button hover event */

lanButton.addEventListener('mouseover', ()=> {
  lanButton.classList.add('active')
})
lanButton.addEventListener('mouseout', ()=> {
  lanButton.classList.remove('active')
})
lanButton.addEventListener('click', ()=> {
  lanButton.classList.toggle('click')
})

changeButton.forEach(button=> {
  button.addEventListener('click', ()=> {
    if(button.textContent.trim() === 'KOR') {
      changeButton[0].textContent = 'KOR'
      changeButton[1].textContent = 'ENG'
    } else {
      changeButton[0].textContent = 'ENG'
      changeButton[1].textContent = 'KOR'
    }
    console.log('button',lanButton)
    // lanButton.classList.remove('click')
  })
})


/* 메인페이지 swiper */
const spans = document.querySelectorAll('.section-content.brand .section-sub-text span')

var swiperMain = new Swiper(".mainPageSwipers", {
  pagination: {
    el: ".swiper-pagination",
    type: "progressbar",
  },
  slidesPerView: 1.4,
  spaceBetween: 50,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

swiperMain.on('slideChange', (event)=> {
  const index = event.activeIndex
  spans.forEach((span, i) => {
    if (i === index) {
      span.classList.add("active");
    } else {
      span.classList.remove("active"); 
    }
  });
})

var swiperMain2 = new Swiper(".mainPageSwipers2", {
  slidesPerView: 3.5,
  spaceBetween: 30,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
