// 加载JSON数据
fetch('journey.json')
    .then(response => response.json())
    .then(data => {
        // 获取当前页面日期，例如从URL或HTML中的变量
        var currentDate = "2025-01-01"; // 需要根据实际动态获取
        var journey = data[currentDate] || [];
        
        // 初始化地图
        var map = L.map('map').setView([34.3416, 108.9398], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
        }).addTo(map);

        // 添加标记
        journey.forEach(function (stop) {
            L.marker([stop.lat, stop.lng])
                .addTo(map)
                .bindPopup(stop.description);
        });

        // 绘制路线
        var latlngs = journey.map(function (stop) {
            return [stop.lat, stop.lng];
        });
        if (latlngs.length > 1) {
            L.polyline(latlngs, { color: 'brown', dashArray: '5, 10' }).addTo(map);
        }
    })
    .catch(error => console.error('加载地图数据失败:', error));