        // 初始化地图
        var map = L.map('map').setView([34.3416, 108.9398], 13); // 西安的初始坐标
    
        // 添加地图瓦片层
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
        }).addTo(map);
    
        // 添加标记
        var journey = [
            { lat: 34.3416, lng: 108.9398, description: "起点：西安市中心" },
            { lat: 34.2416, lng: 108.7398, description: "午餐地点" },
            { lat: 34.1416, lng: 108.6398, description: "上午观景点" },
            { lat: 34.4416, lng: 108.8398, description: "下午观景点" },
            { lat: 34.3416, lng: 108.9398, description: "晚餐地点" },
            { lat: 34.3416, lng: 108.9398, description: "终点：西安市中心" },
        ];
    
        journey.forEach(function (stop) {
            L.marker([stop.lat, stop.lng])
                .addTo(map)
                .bindPopup(stop.description);
        });
    
        // 如果你想绘制路线
        var latlngs = journey.map(function (stop) {
            return [stop.lat, stop.lng];
        });
        L.polyline(latlngs, { color: 'brown', dashArray: '5, 10' }).addTo(map);