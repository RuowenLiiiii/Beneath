const magnifier = document.querySelector('.magnifying-glass__magnifier');
const enlargedImage = document.querySelector('.magnifying-glass__enlarged-image');
const container = document.querySelector('.magnifying-glass');
let containerRect = {};
let mouse = { x: 0, y: 0 };
let glass = { x: 0, y: 0 };
let enlargedImagePos = { x: 0, y: 0 };
const speed = 0.2;

function getMousePos(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
}
function moveGlass() {
    glass.x = lerp(glass.x, mouse.x, speed);
    glass.y = lerp(glass.y, mouse.y, speed);

    enlargedImagePos.x = ((glass.x - containerRect.left) / containerRect.width) * -100;
    enlargedImagePos.y = ((glass.y - containerRect.top) / containerRect.height) * -100;

    const verticalAdjustment = 200;

    magnifier.style.transform = `translate(calc(${glass.x}px - 50%), calc(${glass.y}px - 50%))`;

    enlargedImage.style.transform = `translate(${enlargedImagePos.x}%, calc(${enlargedImagePos.y}% - ${verticalAdjustment}px))`;

    requestAnimationFrame(moveGlass);
}

function showGlass() {
    containerRect = container.getBoundingClientRect();
    magnifier.style.opacity = '1';
    moveGlass();
}

function hideGlass() {
    magnifier.style.opacity = '0';
}

function lerp(a, b, n) {
    return (1 - n) * a + n * b;
}

container.addEventListener('mousemove', (e) => {
    getMousePos(e);
});

container.addEventListener('mouseenter', showGlass);
container.addEventListener('mouseleave', hideGlass);

function changeImage(imageSrc) {
    document.getElementById('mainImage').src = imageSrc;
    document.getElementById('zoom-img').src = imageSrc;
}

enlargedImage.style.transform = `translate(${enlargedImagePos.x}%, calc(${enlargedImagePos.y}% - ${verticalAdjustment}px))`;

function navigateTo(page) {
    window.location.href = page;
}
