# eureka-6.github.io
### This is a previledged repository only for eureka and yaxin

#### 媒体格式转换
ffmpeg -i test.mov -vcodec h264 -acodec aac output.mp4

ffmpeg -i input.mp4 output.gif

ffmpeg -i input.gif -vf "fps=24,scale=800:-1:flags=lanczos" -c:v libwebp -lossless 0 -qscale 75 -loop 0 output.webp

ffmpeg -i input.mov -c:v libvpx-vp9 -crf 30 -b:v 0 -c:a libopus output.webm

cwebp input.jpg -o output.webp

magick input.dng output.webp

#### 文心大模型密钥
X4mFviAW8QyS1CWm7CcMgCPz

zUYLcXNPzTY0E9NEGS3grV8kkp5tLX0U

24.de1c5db047606148860fe5a23b54b53b.2592000.1737745563.282335-116844271


#### 基于前端的哈希算法加密
async function generateHash(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
}

generateHash('xxx').then(console.log); // 替换 'xxx' 为你的密码
