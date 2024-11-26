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

function sectionMoveScroll(event) {
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
}

function changeHeaderScroll() {
  if(window.scrollY >= 150) {
    header.classList.add('no-top')
    logo.src = '/imgs/main-logo.png'
  } else {
    header.classList.remove('no-top')
    logo.src = '/imgs/main-logo-white.png'
  }
}

if(window.location.pathname === '/' || window.location.pathname.endsWith('index.html')) {
  main.addEventListener('wheel', (event)=> sectionMoveScroll(event), {passive: true})
} else {
  window.addEventListener('scroll', changeHeaderScroll, {passive:true})
}

/* nav hover event */
navList.forEach(list=> {
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
  })
})

/* 인증 페이지네이션 */
const listItems = document.querySelectorAll('.certification-list')
const viewPerPage = 9
const totalPages = Math.ceil(listItems.length / viewPerPage)
const pageElement = document.querySelector('.page-area')

let currentPage = 1

function showPage(page) {
  listItems.forEach((list)=> {
    list.style.display = 'none'
  })

  const startIndex = (page - 1) * viewPerPage //0
  const endIndex = startIndex + viewPerPage //9
  for(let i=startIndex; i < endIndex; i++) {
    if(listItems[i]) {
      listItems[i].style.display = 'block'
    }
  }
}

function createPagination() {
  for(let i=1; i <= totalPages; i++) {
    const button = document.createElement('button')
    button.textContent = i
    button.addEventListener('click',()=> {
      currentPage = i
      showPage(currentPage)
    document.querySelectorAll('.page-area button').forEach(btn => {
      btn.classList.remove('active');
    });

    // 클릭된 버튼에 active 클래스 추가
    button.classList.add('active');
    })
    if(i===currentPage) {
      button.classList.add('active')
    } 
    pageElement.appendChild(button)
  }
}

createPagination();
showPage(currentPage);

const frontBtn = document.querySelector('.front-btn')
const prevBtn = document.querySelector('.prev-btn')
const nextBtn = document.querySelector('.next-btn')
const backBtn = document.querySelector('.back-btn')

if(window.location.pathname.includes('certification')) {

  frontBtn.addEventListener('click',()=> {
    if(currentPage > 1) {
      currentPage = 1;
      showPage(currentPage)
      const buttons = document.querySelectorAll('.page-area button')
      buttons.forEach(button=>button.classList.remove('active'))
      buttons[currentPage-1].classList.add('active')
    }
  })
  
  nextBtn.addEventListener('click',()=> {
    if(totalPages > currentPage) {
      currentPage ++
      showPage(currentPage)
      const buttons = document.querySelectorAll('.page-area button')
      buttons.forEach(button=>button.classList.remove('active'))
      buttons[currentPage-1].classList.add('active')
    }
  })
  
  prevBtn.addEventListener('click', ()=> {
    if(currentPage > 1) {
      currentPage --
      showPage(currentPage)
      const buttons = document.querySelectorAll('.page-area button')
      buttons.forEach(button=>button.classList.remove('active'))
      buttons[currentPage-1].classList.add('active')
    }
  })
  
  backBtn.addEventListener('click', ()=> {
    if(currentPage < totalPages) {
      currentPage = totalPages
      showPage(currentPage)
      const buttons = document.querySelectorAll('.page-area button')
      buttons.forEach(button=>button.classList.remove('active'))
      buttons[currentPage-1].classList.add('active')
    }
  })
}

/* interection observer */
const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5
}

const io = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry=> {
    const leftArea = entry.target.querySelector('.left-area')
    const rightArea = entry.target.querySelector('.right-area')
    if(entry.isIntersecting) {
      if (leftArea) {
        leftArea.classList.add('animate');
      }
      if (rightArea) {
        rightArea.classList.add('animate'); 
      }
    } else {
      if (leftArea) {
        leftArea.classList.remove('animate');
      }
      if (rightArea) {
        rightArea.classList.remove('animate'); 
      }
    }
   
  })
}, options)

const target = document.querySelector('.main-section.num2')
if(target) {
  io.observe(target)
}

/* 메인페이지 swiper (brand) */
const spans = document.querySelectorAll('.section-content.brand .section-sub-text span')

var swiperMain = new Swiper(".mainPageSwipers", {
  pagination: {
    el: ".swiper-pagination",
    type: "progressbar",
  },
  slidesPerView: 1.4,
  spaceBetween: 50,
  autoplay: {
    delay: 3000
  },
  loop: true,
});

swiperMain.on('slideChange', (event)=> {
  const index = swiperMain.realIndex
  spans.forEach((span, i) => {
    if (i === index) {
      span.classList.add("active");
    } else {
      span.classList.remove("active"); 
    }
  });
})
spans.forEach((span, index)=>span.addEventListener('click', ()=> {
  swiperMain.slideToLoop(index)
}))

/* notice swiper */
var swiperMain2 = new Swiper(".mainPageSwipers2", {
  slidesPerView: 3.5,
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 3000
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    1280: {
      slidesPerView: 4.5,
    }
  }
});

