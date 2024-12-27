const apiKey = 'd3ee8cb7414718b2f68516544b9b7116'; // 替换为你的 API 密钥

// 获取天气数据
async function fetchWeather(lat, lon, currentId, forecastId) {
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            // 当前天气
            const currentTemp = data.current.temp;
            const currentDesc = data.current.weather[0].description;

            // 天气预报（当天）
            // const forecastTemp = data.daily[0].temp.day;
            // const forecastDesc = data.daily[0].weather[0].description;

            // 更新 HTML
            document.getElementById(currentId).textContent = `当前天气：${currentDesc}，${currentTemp}°C`;
            // document.getElementById(forecastId).textContent = `预报：${forecastDesc}，${forecastTemp}°C`;
        } else {
            document.getElementById(currentId).textContent = `无法获取天气数据`;
            // document.getElementById(forecastId).textContent = `无法获取预报数据`;
        }
    } catch (error) {
        console.error('获取天气数据失败:', error);
        document.getElementById(currentId).textContent = `网络错误`;
        // document.getElementById(forecastId).textContent = `网络错误`;
    }
}

// 西安天气
fetchWeather(34.3416, 108.9398, 'xian-weather', 'xian-forecast');

// 伯克利天气
fetchWeather(37.8716, -122.2727, 'berkeley-weather', 'berkeley-forecast');