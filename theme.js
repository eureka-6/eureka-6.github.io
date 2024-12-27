document.getElementById('themeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// 页面加载时根据本地存储应用主题
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
}