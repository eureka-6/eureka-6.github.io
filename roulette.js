

const prizes = ["悄悄话", "歌曲推荐", "宝藏安利", "外卖奖励", "视频通话奖励", "纪念品奖励", "再来一次", "明天再来"];
let isSpinning = false;

document.getElementById("spinButton").addEventListener("click", () => {
    if (isSpinning) return; // 防止重复点击
    isSpinning = true;

    const canvas = document.getElementById("rouletteCanvas");
    const ctx = canvas.getContext("2d");

    // 颜色数组可自行增减
    const colors = ["#f4a582", "#92c5de", "#b2182b", "#2166ac", "#d6604d", "#4393c3"];
    const arc = (2 * Math.PI) / prizes.length; // 每个扇形的弧度

    // -----------------------------
    // 1. 绘制轮盘
    // -----------------------------
    function drawRoulette() {
        let currentAngle = 0;
        const radius = 170; // 调整轮盘半径
        for (let i = 0; i < prizes.length; i++) {
            ctx.beginPath();
            ctx.fillStyle = colors[i % colors.length];
            ctx.moveTo(200, 200); // 圆心
            // 扇形
            ctx.arc(200, 200, radius, currentAngle, currentAngle + arc);
            ctx.fill();
            ctx.closePath();

            // 绘制文字
            ctx.save();
            // 先将画布移动到扇形外沿中点
            ctx.translate(
                200 + Math.cos(currentAngle + arc / 2) * (radius - 30), // 调整距离以靠近边缘
                200 + Math.sin(currentAngle + arc / 2) * (radius - 30)  // 调整距离以靠近边缘
            );
            // 让文字“径向”向外
            ctx.rotate(currentAngle + arc / 2 + Math.PI / 2);
            ctx.fillStyle = "#fff";
            ctx.font = "18px Arial";
            ctx.fillText(prizes[i], -ctx.measureText(prizes[i]).width / 2, 0);
            ctx.restore();

            currentAngle += arc;  }
    }

    // -----------------------------
    // 2. 绘制固定指针（位于顶部）
    // -----------------------------
    function drawPointer() {
        ctx.beginPath();
        ctx.fillStyle = "#8b4c39";
        // 指针三角形
        ctx.moveTo(200, 50);
        ctx.lineTo(190, 80);
        ctx.lineTo(210, 80);
        ctx.closePath();
        ctx.fill();

        // 绘制从圆心到箭头的直线
        ctx.beginPath();
        ctx.moveTo(200, 200); // 圆心
        ctx.lineTo(200, 70);  // 箭头顶点
        ctx.strokeStyle = "#8b4c39";
        ctx.lineWidth = 5;
        ctx.stroke();
    }

    // -----------------------------
    // 3. 动画控制变量
    // -----------------------------
    let rotation = 0;                         // 当前旋转角度
    let spinSpeed = Math.random() * 25 + 105;  // 随机初始速度
    const deceleration = 0.98;                // 减速因子，稍微调小以实现更平滑的减速效果
    const minSpeed = 0.3;                     // 最小速度阈值  // -----------------------------
    // 4. 动画函数
    // -----------------------------
    function animate() {
    // 转动
    rotation += spinSpeed;
    rotation %= 2 * Math.PI;  // 保证 rotation 在 0~2π 范围内循环
    spinSpeed *= deceleration; // 逐帧减速

    // 重新绘制
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(200, 200);
    ctx.rotate(rotation); // 轮盘旋转
    ctx.translate(-200, -200);
    drawRoulette();
    ctx.restore();

    drawPointer(); // 指针始终保持在画布顶部

    // 如果速度还大于一定阈值，继续动画
    if (spinSpeed > 0.5) {
        requestAnimationFrame(animate);
    } else {
        // -----------------------------
        // 5. 转盘停止，计算最终结果
        // -----------------------------
        // 方法一：根据 rotation 计算当前“顶部”指向的扇形
        // 让 finalAngle = 轮盘转过的角度对 2π 取余（与上面保持一致）
        const finalAngle = rotation % (2 * Math.PI); 
        
        // 如果我们将指针对准 0 角度(正上方)，
        // 扇形索引可按 “(反向角度 + 一些偏移)/arc” 来计算
        // 这里为了更直观，先把顶部当作 0 角度线，
        // 又由于圆弧是按顺时针分片还是逆时针，这里可做相应调整。
        
        // 下面示例：让 0 角度线对应 prizes[0] 那一块的中间位置，
        // 简单起见，加上半个扇形 arc/2 再除以 arc，得到落在哪个扇形区间。
        let rawIndex = Math.floor((2 * Math.PI - finalAngle + arc / 2 - 5 / 8 * Math.PI ) / arc);
        // 结果做个取模，避免溢出或负数
        rawIndex = (rawIndex + prizes.length) % prizes.length;

        // 输出抽奖结果
        document.getElementById("resultText").innerText = `恭喜你抽中了: ${prizes[rawIndex]}！`;

        isSpinning = false;
    }
    }

    // 开始动画
    animate();
});

// -----------------------------
// 页面加载后，先画出静止轮盘和指针
// -----------------------------
window.onload = () => {
    const canvas = document.getElementById("rouletteCanvas");
    const ctx = canvas.getContext("2d");
    drawRoulette();
    drawPointer();
};

// -----------------------------
// 如果有需要，也可以封装角度到索引的转换函数
// -----------------------------
// function angleToIndex(angle, arc) {
//   let idx = Math.floor((2 * Math.PI - angle + arc / 2) / arc);
//   idx = (idx + prizes.length) % prizes.length;
//   return idx;
// }
