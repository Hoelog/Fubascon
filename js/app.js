function drawText(ctx, text, pos, isPositive) {
    ctx.save();
    ctx.textAlign = 'center';
    if (isPositive)
        ctx.font = '98px NanumGothic sans-serif';
    else
        ctx.font = '56px NanumGothic sans-serif';

    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 5;
    if (isPositive)
        ctx.shadowColor = "#0000ff99";
    else
        ctx.shadowColor = "#ff0000cc";
    ctx.shadowBlur = 50;
    ctx.strokeText(text, pos[0], pos[1]);

    ctx.fillStyle = "#ffffff";
    ctx.fillText(text, pos[0], pos[1]);

    ctx.restore();
}

function render(ctx, img) {
    const negativeInput = document.getElementById('negative-input');
    const negatives = negativeInput.value.split(',').map(e => e.trim());

    ctx.drawImage(img, 0, 0);
    const positions = [
        [300, 400],
        [450, 450],
        [220, 500],
        [300, 600],
        [420, 540]
    ];

    positions.forEach((e, i) => {
        drawText(ctx, negatives[i] || "", e, false);
    });

    drawText(ctx, '푸바오', [960, 500], true);
}

window.addEventListener('load', () => {
    const canvas = document.getElementById('original');
    const negativeInput = document.getElementById('negative-input');
    const downloadButton = document.getElementById('download-button');
    const ctx = canvas.getContext('2d');
    const image = new Image();

    image.src = '../img/original.png';
    image.onload = () => {
        requestAnimationFrame(() => {
            render(ctx, image);
        });

        negativeInput.addEventListener('keyup', () => {
            requestAnimationFrame(() => {
                render(ctx, image);
            });
        });
    };

    downloadButton.addEventListener('click', () => {
        const link = document.createElement('a');
        link.download = '푸바오 개비스콘.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
});
