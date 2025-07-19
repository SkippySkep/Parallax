"use strict"

document.addEventListener('mousemove', parallax);

function parallax(event) {
    const background = document.querySelector('#background');
    const backgroundPos = background.getAttribute('data-value');

    const x1 = (event.pageX - window.innerWidth / 2) * backgroundPos / 10;  
    const y1 = (event.pageY - window.innerHeight / 2) * backgroundPos / 10;  

    background.style.transform = `translateX(${x1}px) translateY(${y1}px)`;

    this.querySelectorAll(".universe img").forEach((shift) => {
        const imgPos = shift.getAttribute('data-value');
        const x2 = (window.innerWidth - event.pageX * imgPos) / 90;
        const y2 = (window.innerHeight - event.pageY * imgPos) / 90;

        shift.style.transform = `translateX(${x2}px) translateY(${y2}px)`;
    });
}