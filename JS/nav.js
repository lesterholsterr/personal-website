const nav_tag = document.getElementById('navbar')
fetch('../Navbar/nav.html')
  .then(res => res.text())
  .then(data => {
    nav_tag.innerHTML = data

    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navlinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', ()=> {

      nav.classList.toggle('nav-active');

      navlinks.forEach((link, index) => {
        if(link.style.animation) {
          link.style.animation = '';
        }
        else {
          link.style.animation = `nav-fade 0.5s ease forwards ${index/10 + 0.5}s`;
        }
      });

      burger.classList.toggle('burger-toggle');

    }); 
  })
