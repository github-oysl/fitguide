# 动作对比与模型指导

当前支持 **直杆绳索弯举 / 侧面拍摄**，入口在该动作详情的“对比我的动作”。

## 启动

安装 Node.js 20+，在项目目录运行：

```sh
node server.mjs
```

打开 http://127.0.0.1:8766。服务默认只监听本机。无 npm 安装步骤。

选择 1–30 秒、50 MB 以内的单人视频。姿态模型、WASM、参考模板均为本地文件，使用约 5 FPS 抽帧；分析仅在浏览器 Worker 中进行，关闭窗口或取消会终止分析。不会把分析自动记作训练打卡。

浏览器需支持 WebAssembly SIMD、WebGL2、Module Worker 和所选视频编码。MP4 / WebM 是否可解码取决于浏览器；MOV 仅在浏览器支持时可用。直接以 file:// 打开仍可使用动作教学和打卡，视频分析请通过网页服务打开。

## OpenAI 兼容接口（默认关闭）

复制 `.env.example` 为 `.env`，启用时配置：

```dotenv
GUIDANCE_ENABLED=true
OPENAI_BASE_URL=https://你的兼容服务地址/v1
OPENAI_API_KEY=你的密钥
OPENAI_MODEL=支持图片输入的模型名
OPENAI_JSON_MODE=true
PORT=8766
```

启动：

```sh
node --env-file=.env server.mjs
```

`OPENAI_BASE_URL` 是版本基础地址，程序追加 `/chat/completions`，不要填写完整的 completions 路径。兼容服务需支持 `messages` 中的 `image_url`。如果不支持 `response_format: {type: "json_object"}`，可设置 `OPENAI_JSON_MODE=false`，返回内容仍会进行 JSON 校验。密钥仅用于服务端 Bearer 请求，不发送到浏览器。

前端先读取 `GET /guidance-status.json`。关闭时返回 `{"enabled":false}`，不会调用模型。开启后，用户点击“发送关键帧并生成指导”，才调用同源 `POST /api/guidance`，发送 `{report, frames}`。`frames` 是最多 6 张 JPEG base64 图片及原视频时间（秒），不传完整视频、音频或视频文件名；界面在按钮旁说明发送范围。

服务端将代码报告与带时间的图片装入 Chat Completions 的 `system` / `user` 消息，`stream:false`，默认 `response_format: {type:"json_object"}`。不自动重试。超时 30 秒；取消操作中止 HTTP 请求。当前服务适合本机使用，未实现多用户登录或公网额度管理。

成功响应：

```json
{
  "status": "completed",
  "source": "model",
  "guidance": {
    "summary": "简短总结",
    "tips": [
      {"metricId":"armDrift","start":0.4,"end":1.2,"observation":"观察到的现象","adjustment":"具体调整建议"}
    ],
    "uncertainties": ["看不清或不能推断的事项"],
    "disagreements": [
      {"metricId":"armDrift","reason":"与代码判定不同的依据"}
    ]
  }
}
```

`tips`、`uncertainties`、`disagreements` 最多各 3 项。指标限定 `elbowRange` / `armDrift` / `torsoSway`，时间必须落在视频范围内。非 JSON、截断、拒绝或不合格式的响应不作为指导展示。未启用返回 `{"status":"not_connected"}`；错误返回 HTTP 4xx/5xx 和 `{status:"error",code,message}`，不回显上游响应或密钥。

格式依据：[OpenAI Chat Completions](https://developers.openai.com/api/reference/resources/chat/subresources/completions/methods/create)。兼容提供方的图片能力和 JSON 模式需分别确认。

## 对比方法与实际限制

- 固定拍摄角度和选定动作；不进行通用动作识别。
- 按可见性选取身体的一侧，检查肩、肘、腕、髋部覆盖率及粗略侧面特征。遮挡、多人、静止画面或未识别到完整往返时不给出对比结论。
- 图像关键点换算回等比例像素坐标后计算肘角；上臂位移按躯干长度归一化。以弯举前后两个阶段归一化为 21 个点，保留原视频时间定位。
- 比较每次动作的幅度、上臂位移、躯干晃动，多次动作取中位数；每次动作的差异仍在片段按钮中标出。
- `curl-reference.json` 来自现有参考视频的真实姿态提取，记录模板版本。当前只有 1 个参考动作样本，差异阈值为试验参数（20° / 0.15 倍躯干长度 / 10°），尚未经过人群验证。只代表与示例的差异，不是动作准确率、医疗判断或安全评分。
- 目前验证了参考视频自对比、静止视频、程序构造的变速/缺帧序列；尚未验证不同人群、现场器械遮挡和真实手机拍摄误差。姿态模型自身会输出部分初始化诊断日志。

## 检查与更新

```sh
node --test tools/comparison.test.mjs tools/checkin-stats.test.cjs
python tools/build-offline.py
```

浏览器脚本使用 Playwright，可通过 `NODE_PATH` 指向已安装的包，通过 `QA_CHROMIUM` 指定 Chromium。

- `tools/build-reference.cjs`：从参考视频重新提取模板（本地服务需已启动，`QA_URL` 默认 8766）。
- `tools/verify-comparison.cjs`：真实 Worker 推理、静止视频拒绝、取消、回放、模型失败重试/成功状态。静止视频由 `ffmpeg -loop 1 -i assets/cable-curl-with-bar.jpg -t 3 -vf format=yuv420p -c:v libx264 test-artifacts/static-curl.mp4` 生成。模型状态使用隔离的 HTTP mock，不调用外部模型。

运行库：MediaPipe Tasks Vision 1.0.1，按需加载 ES module 的 SIMD WASM；来源与许可证见 `vendor/mediapipe/NOTICE.md` 和 `LICENSE`。
