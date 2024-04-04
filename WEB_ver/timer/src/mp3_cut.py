from pydub import AudioSegment
import os

def cut_mp3(input_path, start_min, start_sec, end_min, end_sec, output_path=None):
    # 如果未指定输出路径，生成默认输出路径
    if output_path is None:
        # 获取源文件所在路径和文件名（不含扩展名）
        dir_name, file_name = os.path.split(input_path)
        name, ext = os.path.splitext(file_name)
        # 在源文件名后添加 "_cut" 标记
        output_file_name = f"{name}_cut{ext}"
        output_path = os.path.join(dir_name, output_file_name)
    
    # 加载 MP3 文件
    audio = AudioSegment.from_mp3(input_path)
    
    # 计算剪切起始的毫秒数
    start_time = (start_min * 60 + start_sec) * 1000
    
    # 检查是否剪切至文件末尾
    if end_min == 'end' and end_sec == 'end':
        end_time = len(audio)  # 使用音频文件的总长度作为结束时间
    else:
        # 计算指定的结束时间的毫秒数
        end_time = (int(end_min) * 60 + int(end_sec)) * 1000
    
    # 剪切音频
    cut_audio = audio[start_time:end_time]
    
    # 保存剪切后的音频到新文件
    cut_audio.export(output_path, format="mp3")

# 使用示例
input_path = "Legends Never Die.mp3"
start_min = 0  # 开始剪切的分钟
start_sec = 16  # 开始剪切的秒数
end_min = 'end'    # 结束剪切的分钟
end_sec = 'end'   # 结束剪切的秒数

cut_mp3(input_path, start_min, start_sec, end_min, end_sec)
