const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const colorHex = document.getElementById('colorHex');
const brushSize = document.getElementById('brushSize');
const clearCanvas = document.getElementById('clearCanvas');
const manholeCover = document.getElementById('manhole-cover');
const thumbnails = document.querySelectorAll('.manhole-thumbnail');

let drawing = false;
let currentBrushSize = brushSize.value;

let currentColor = '#00a3d7'; 
colorPicker.value = currentColor;
colorHex.value = currentColor;

colorPicker.addEventListener('input', () => {
    currentColor = colorPicker.value;
    colorHex.value = currentColor;
});

colorHex.addEventListener('input', () => {
    currentColor = colorHex.value;
    colorPicker.value = currentColor;
});


// 更新图片
thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', (e) => {
        const selectedSrc = e.target.getAttribute('data-src');
        manholeCover.src = selectedSrc;
    });
});

colorPicker.addEventListener('input', () => {
    currentColor = colorPicker.value;
    colorHex.value = currentColor;
});

colorHex.addEventListener('input', () => {
    currentColor = colorHex.value;
    colorPicker.value = currentColor;
});

// 笔刷
brushSize.addEventListener('input', () => {
    currentBrushSize = brushSize.value;
});

function hexToRGBA(hex, alpha = 0.5) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
}

// 画
canvas.addEventListener('mousedown', (e) => {
    drawing = true;
    draw(e);
});

canvas.addEventListener('mouseup', () => {
    drawing = false;
    ctx.beginPath(); 
});

canvas.addEventListener('mousemove', draw);

function draw(e) {
    if (!drawing) return;

    const rect = canvas.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    ctx.lineWidth = currentBrushSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = hexToRGBA(currentColor, 0.5); 

    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
}

// 清除
clearCanvas.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

function navigateTo(page) {
    window.location.href = page;
}

