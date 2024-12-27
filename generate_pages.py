import os

# 配置参数
base_folder = 'daily'
output_folder = 'pages'
template_path = '01-01-template.html'

# 读取模板
with open(template_path, 'r', encoding='utf-8') as f:
    template = f.read()

# 遍历每日文件夹
for folder in sorted(os.listdir(base_folder)):
    folder_path = os.path.join(base_folder, folder)
    if os.path.isdir(folder_path):
        date = folder.split('-')  # 假设文件夹格式为 YYYY-MM-DD
        message = f"I miss u so much, and I can't wait to share all the pieces I've collected on <b>{date[1]}/{date[2]}/{date[0]}</b>!"
        videos = ""
        for file in os.listdir(folder_path):
            ext = file.split('.')[-1]
            if ext in ['mp4', 'webm']:
                videos += f'<video controls width="100%"><source src="{folder}/{file}" type="video/{ext}">您的浏览器不支持 HTML5 视频播放功能。</video>\n'

        # 替换占位符
        page_content = template.replace('{{DATE}}', folder)\
                               .replace('{{MESSAGE}}', message)\
                               .replace('{{VIDEOS}}', videos)

        # 保存页面
        output_path = os.path.join(output_folder, f"{folder}.html")
        os.makedirs(output_folder, exist_ok=True)
        with open(output_path, 'w', encoding='utf-8') as out_file:
            out_file.write(page_content)

print("所有页面已生成！")