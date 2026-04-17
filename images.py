import os
from PIL import Image
import numpy as np

def change_bg_color(input_path, output_path):
    if not os.path.exists(input_path):
        print(f"⚠️ 파일을 찾을 수 없음: {input_path}")
        return

    # 이미지 열기
    img = Image.open(input_path).convert("RGBA")
    data = np.array(img)

    # 흰색 임계값 및 타겟 색상 (#F5F3EF)
    white_threshold = 200
    target_color = (245, 243, 239)

    r, g, b, a = data[:,:,0], data[:,:,1], data[:,:,2], data[:,:,3]
    white_areas = (r >= white_threshold) & (g >= white_threshold) & (b >= white_threshold)

    data[white_areas, 0] = target_color[0]
    data[white_areas, 1] = target_color[1]
    data[white_areas, 2] = target_color[2]

    result_img = Image.fromarray(data)
    result_img.save(output_path)
    print(f"✅ 처리 완료: {output_path}")

# --- 여기서부터 실제 실행 부분 ---
if __name__ == "__main__":
    # 프로젝트 내 images 폴더 경로 (상황에 맞게 수정하세요)
    base_path = "public/images" 
    
    for i in range(2, 9):
        file_name = f"9-{i}.png"
        path = os.path.join(base_path, file_name)
        change_bg_color(path, path) # 원본에 바로 덮어쓰기