# AGENTS.md · FitGuide

纯前端健身站点。**无 `package.json`、无打包器、无构建步骤**；`index.html` 直接 `<script>`/`<link>` 引用源文件。必须保持「解压后 `file://` 打开 `index.html` 可用」（仅动作对比需要 HTTP）。

## 常用命令

动作图片生成、提示词迁移或恢复出图任务时，先读 `docs/image-generation-workflow.md`；模板、逐动作计划与校验门槛均从该入口进入。文档结构校验运行 `node tools/verify-image-workflow.cjs`，不依赖本地实拍文件。

```bash
node server.mjs                                   # 预览，默认 http://127.0.0.1:8766（PORT 可覆盖）
node --test tools/comparison.test.mjs tools/checkin-stats.test.cjs   # 纯 Node 单测，无依赖
node --test tools/checkin-stats.test.cjs          # 只跑一个
```

Playwright 校验脚本（`node tools/verify-*.cjs`）需自备 `playwright`；`verify-frontend-render.cjs` 会自动从 `PLAYWRIGHT_ROOT`/仓库根/`cwd` 查找。无 lint/typecheck，改完跑相关 `tools/` 校验即可。

**端口坑**：`verify-ui.cjs`、`verify-activities.cjs` 访问 `127.0.0.1:8765`，而 server 默认 8766 → 需 `PORT=8765 node server.mjs`。`build-reference.cjs` 默认 8766，可传 `QA_URL`。`verify-comparison/verify-custom-reference/verify-all-comparisons` 自起服务，需要 `assets/` 下真实视频。

## 结构与入口

- 根目录数据/逻辑：`data.js` + `extra-data.js` 往 `window.GYM_DATA` 注入动作（当前 60 个）；`navigation.js` 视图路由（hash：#today 今天 / #stats 记录 / #library 动作库 / #settings 我的）；`training-records.js` 训练与运动记录存储层（`window.GYM_RECORDS`）；`exercise-learning.js` 动作教学弹窗与媒体调度（`window.GYM_UI`）；`guide.js` 动作库与筛选；`plans.js` 计划打卡；`dashboard.js` 统计；`free-activity.js` 自由运动（`#activity-dialog` 底部弹层）；`checkin-stats.js` 统计纯函数（`module.exports`，可被 Node require）；`surprise.js` 本地惊喜系统 loader（`window.GYM_SURPRISE`，别名 `GYM_GIFT`）。
- `comparison/`：动作对比。`core.mjs` 指标计算、`exercises.mjs` 各动作配置、`pose-worker.mjs` Worker 内 MediaPipe、`video.mjs`、`guidance.mjs`（浏览器直连 OpenAI 兼容接口）、`ui.mjs`。
- `vendor/mediapipe/`：本地 MediaPipe Tasks Vision（Apache-2.0）。
- `tools/`：测试与 Playwright 校验脚本；`docs/equipment-review/`：器械复核文档；`assets/`：媒体素材。
- `docs/muscleandstrength/`：Muscle & Strength 全站 1,219 个动作资源镜像、结构化数据与教程；方案 A（全量图文+已识别动作视频）已就绪，全站全量视频待办见 [`docs/muscleandstrength/PLAN_B_TODO.md`](docs/muscleandstrength/PLAN_B_TODO.md)（一键下载：`python tools/download-all-ms-videos.py`）。

## 服务白名单（改文件必看）

`server.mjs` 只服务 `publicFiles` 白名单内的根文件 + `assets/`、`comparison/`、`vendor/`、`surprises/` 前缀。**新增根级 JS/CSS 要同步两处**：`index.html` 的引用、`server.mjs` 的 `publicFiles`，否则 404。改 `server.mjs` 后跑 `tools/verify-server-cache.cjs`（进程内 mock req/res，不依赖真实端口）。

## 素材与公开性

仓库是 **public**。以下均被 `.gitignore` 忽略，**不要假设其存在，也不要入库**：`docs/muscleandstrength/media/`、`teachers-day.js`、`surprises/`（本地惊喜目录，含 `teachers-day-2026.css` 等私有内容）、`docs/equipment-review/photo-audit/contact-*.jpg|detail-*.jpg`、`健身房器械图片/*`（除 `*.jpg`）、`.workbuddy/`、`test-artifacts/`。
动作库素材（`assets/*.jpg|*.mp4`、`assets/equipment/*.jpg`）已纳入版本管理随仓库分发，保障开箱即用。

动作数量一律数据驱动：HTML 用 `<span data-exercise-count>` 占位，`guide.js` 用 `window.GYM_DATA.length` 填充，**不要写死数字**。

## 样式约定

- `style.css` 的 `:root` 是唯一令牌来源；`comparison/comparison.css` 复用令牌但独立加载。**改名令牌必须全仓 `grep var(--x)`**。
- 焦点环统一用双层 box-shadow（`!important`）；新增状态样式用 `border`/`background`，别用 `box-shadow`。
- 字重只用 400/500/600/700（CJK 无 550/650/750），字号下限 11px。
- `.media` 必须 `aspect-ratio: 1/1`（动作图全是正方形）；移动端不要给 `.media` 加 `max-height`，否则方图被 letterbox。

## 提交与本机运维

- 提交信息用中文，前缀 `perf:` / `test:` / `style:` / `refactor:` / `docs:`。改日期或动作数时同步 `index.html` 页脚「更新：YYYY-MM-DD · … · N 个动作」。
- 远端 `origin = github.com/github-oysl/fitguide`。**本机 github.com 的 HTTPS 被代理挡死，push 走 SSH**（`git remote set-url --push` 已指向 SSH）。
- 本机 `refs/remotes/*` 不持久，`git branch -vv` 状态不可信；判断远端用 `git ls-remote git@github.com:github-oysl/fitguide.git`。
- 本机 git 无法创建带 `/` 的分支名，分支用扁平名。
- 本机有外部工具会擅自清空文件（曾清空整个 `tools/`）：发现批量删除先 `git status`，未暂存的删除用 `git restore --worktree <path>` 恢复。
- 同一条消息里多个 Edit 指向同一文件会互相覆盖，改同一文件必须串行。

## 测试注意

- `surprise.js` 是本地惊喜系统：启动时注入 `surprises/<YYYY-MM-DD>.js` 探测当日惊喜（file:// 下不可用 fetch，必须用 script 注入），内容文件调用 `GYM_SURPRISE.register(date, def)` 注册；打卡钩子走 `window.GYM_GIFT.checkin(date)`（plans.js / free-activity.js 两处调用点）。预览用 `?surprise-preview=YYYY-MM-DD`，不消耗正式惊喜。用例需 route stub `**/surprises/*.js`，否则依赖本地私有文件。
- 断言会随数据变化的量（条数、数量）时与运行时数据比对，别写死字面量。
- 新增校验脚本不得依赖系统日期或 gitignored 文件。
