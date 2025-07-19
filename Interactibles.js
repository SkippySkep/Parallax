"use strict"

const planets = document.querySelectorAll('.universe img')
const descBox = document.querySelector('#descBox');
const line = document.querySelector('#animatedLine');

planets.forEach(planet => {
    planet.addEventListener('mouseenter', () => onMouseHover(planet))
    planet.addEventListener('mouseleave', onMouseLeave)
});

const planetConfig = {
    neptune: {
        text: "This is Neptune",
        offsetX: 250,
        offsetY: -200
    },

    mercury: {
        text: "This is Mercury",
        offsetX: 100,
        offsetY: 400
    },

    pluto: {
        text: "This is Pluto",
        offsetX: 150,
        offsetY: 350
    },

    venus: {
        text: "This is Venus",
        offsetX: 250,
        offsetY: 250
    }
};

function onMouseHover(planet) {
    line.style.display = 'block';

    const planetRect = planet.getBoundingClientRect();
    
    const config = planetConfig[planet.id];
    if (config) {
        descBox.textContent = config.text;
        descBox.style.top = (planetRect.top + config.offsetX) + 'px';
        descBox.style.left = (planetRect.left + config.offsetY) + 'px';
    }
    descBox.style.display = 'block';
    descBox.style.visibility = 'hidden';

    const boxRect = descBox.getBoundingClientRect();

    const startX = planetRect.left + (planetRect.width / 2);
    const startY = planetRect.top + (planetRect.height / 2);
    const endX = boxRect.left + (boxRect.width / 2);
    const endY = boxRect.top + (boxRect.height / 2);

    line.setAttribute('x1', startX);
    line.setAttribute('y1', startY);
    line.setAttribute('x2', startX);
    line.setAttribute('y2', startY);

    let startTime = null;
    let duration = 300;
    
    let descBoxShown = false;

    const animate = (timestamp) => {
        if (!startTime) {
            startTime = timestamp;
        }

        const timeTaken = timestamp - startTime;
        const progress = Math.min(timeTaken/duration, 1);
        
        const x = startX + (endX - startX) * progress;
        const y = startY + (endY - startY) * progress;

        line.setAttribute('x2', x);
        line.setAttribute('y2', y);

        if (!descBoxShown && progress > 0.4){
            descBoxShown = true;
            descBox.style.visibility = 'visible';
            requestAnimationFrame(() => {
                descBox.style.opacity = '1';
            });
        }

        if (progress < 1) {
            requestAnimationFrame(animate);
        }  
    };  
    requestAnimationFrame(animate);   
}

function onMouseLeave(){
    line.setAttribute('x2', line.getAttribute('x1'));
    line.setAttribute('y2', line.getAttribute('y1'));

    descBox.style.display = 'none';
    descBox.style.opacity = '0';
    line.style.display = 'none';
}

