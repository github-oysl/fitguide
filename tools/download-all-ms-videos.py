#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Muscle & Strength 全站视频批量下载工具（Plan B）
用法：
  python tools/download-all-ms-videos.py [--workers 4] [--quality 720p] [--proxy http://127.0.0.1:2334]
"""

import os, sys, json, argparse, subprocess, time
from concurrent.futures import ThreadPoolExecutor, as_completed

def main():
    parser = argparse.ArgumentParser(description="Muscle & Strength 全站视频下载工具")
    parser.add_argument("--workers", type=int, default=4, help="并发下载线程数（默认 4）")
    parser.add_argument("--quality", choices=["720p", "480p", "best"], default="720p", help="清晰度偏好")
    parser.add_argument("--proxy", type=str, default="http://127.0.0.1:2334", help="HTTP 代理地址")
    parser.add_argument("--output-dir", type=str, default=None, help="自定义保存目录")
    args = parser.parse_args()

    workspace_root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    exercises_file = os.path.join(workspace_root, "docs", "muscleandstrength", "all_exercises.json")
    
    if not os.path.exists(exercises_file):
        print(f"错误：未找到全量动作数据文件 {exercises_file}")
        sys.exit(1)

    with open(exercises_file, "r", encoding="utf-8") as f:
        exercises = json.load(f)

    out_dir = args.output_dir or os.path.join(workspace_root, "docs", "muscleandstrength", "media", "videos")
    os.makedirs(out_dir, exist_ok=True)

    download_list = []
    for slug, data in exercises.items():
        v_url = data.get("video_url", "")
        if v_url:
            target_path = os.path.join(out_dir, f"{slug}.mp4")
            download_list.append((slug, data.get("title", slug), v_url, target_path))

    print(f"==================================================")
    print(f"Muscle & Strength 全站视频下载（Plan B）")
    print(f"总计动作视频数：{len(download_list)}")
    print(f"并发线程：{args.workers} | 清晰度：{args.quality} | 代理：{args.proxy}")
    print(f"保存路径：{out_dir}")
    print(f"==================================================")

    def download_item(item):
        slug, title, url, target = item
        if os.path.exists(target) and os.path.getsize(target) > 50000:
            return slug, True, "cached", os.path.getsize(target)

        is_vimeo = "vimeo" in url
        if "youtube.com/embed/" in url:
            yt_id = url.split("embed/")[1].split("?")[0]
            video_url = f"https://www.youtube.com/watch?v={yt_id}"
        else:
            video_url = url

        if args.quality == "480p":
            format_opt = "bestvideo[height<=480]+bestaudio/best[height<=480]/best" if not is_vimeo else "bestvideo[height<=480]/best"
        elif args.quality == "720p":
            format_opt = "bestvideo[height<=720][ext=mp4]+bestaudio[ext=m4a]/best[height<=720][ext=mp4]/bestvideo/best" if not is_vimeo else "bestvideo/best"
        else:
            format_opt = "bestvideo+bestaudio/best"

        cmd = [
            "yt-dlp",
            "--referer", "https://www.muscleandstrength.com/",
            "-f", format_opt,
            "--merge-output-format", "mp4",
            "--no-playlist",
            "--retries", "3",
            "--socket-timeout", "20",
            "-o", target
        ]
        if args.proxy:
            cmd.extend(["--proxy", args.proxy])
        cmd.append(video_url)

        try:
            res = subprocess.run(cmd, capture_output=True, text=True, timeout=180)
            if res.returncode == 0 and os.path.exists(target) and os.path.getsize(target) > 50000:
                return slug, True, "downloaded", os.path.getsize(target)
            else:
                return slug, False, res.stderr[-180:] if res.stderr else "failed", 0
        except Exception as e:
            return slug, False, str(e), 0

    start_time = time.time()
    succ = 0
    cached = 0
    fail = 0
    total_bytes = 0

    with ThreadPoolExecutor(max_workers=args.workers) as executor:
        futures = {executor.submit(download_item, item): item for item in download_list}
        total = len(futures)
        completed = 0
        for f in as_completed(futures):
            completed += 1
            slug, ok, status, sz = f.result()
            if ok:
                if status == "cached":
                    cached += 1
                else:
                    succ += 1
                total_bytes += sz
                if completed % 10 == 0 or completed == total:
                    elapsed = time.time() - start_time
                    rate = completed / elapsed if elapsed > 0 else 0
                    print(f"进度：[{completed}/{total}] ({(completed/total)*100:.1f}%) | 下载：{succ} | 已缓存：{cached} | 失败：{fail} | 速率：{rate:.2f} 视频/秒")
            else:
                fail += 1
                print(f"[{completed}/{total}] ✗ {slug} 失败：{status}")

    elapsed = time.time() - start_time
    print(f"\n==================================================")
    print(f"下载任务完成！总耗时：{elapsed:.1f} 秒")
    print(f"总计：{total} | 新下载：{succ} | 本地已有：{cached} | 失败：{fail}")
    print(f"已存储视频总容量：{total_bytes / (1024 * 1024):.1f} MB")
    print(f"==================================================")

if __name__ == "__main__":
    main()
