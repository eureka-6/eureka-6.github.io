for ext in JPG PNG MOV; do
    for i in *.$ext; do
        if [ -f "$i" ]; then
            case $ext in
                JPG|PNG)
                    cwebp "$i" -o "${i%.*}.webp"
                    ;;
                MOV)
                    ffmpeg -i "$i" -c:v libvpx-vp9 -c:a libopus "${i%.*}.webm"
                    ;;
            esac
            rm "$i" # 删除原始文件
        fi
    done
done