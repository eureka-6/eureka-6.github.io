function createStars() {
    const starsContainer = document.getElementById('stars');
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 2}s`;
        star.style.opacity = Math.random(); // 随机透明度
        star.style.width = `${Math.random() * 5}px`; // 随机大小
        star.style.height = star.style.width; // 保持宽高一致
        starsContainer.appendChild(star);
    }
}

createStars();