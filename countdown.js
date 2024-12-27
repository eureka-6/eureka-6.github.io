// 计算倒计时
function updateCountdown() {
    const returnDate = new Date("2025-05-20"); // 回国日期
    const today = new Date();
    const timeDiff = returnDate - today;
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // 转换为天数

    // 更新倒计时窗口
    document.getElementById('countdownDays').textContent = daysLeft >= 0 ? daysLeft : 0;
}

// 页面加载时初始化倒计时
updateCountdown();

// 如果需要倒计时实时更新（每日更新），可以使用以下代码：
setInterval(updateCountdown, 86400000); // 每24小时更新一次