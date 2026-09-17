# FitGuide 品牌与界面约定

- 标识：[`assets/fitguide-brand/logo.svg`](assets/fitguide-brand/logo.svg)，延续原有「练」字方形标识；页头与站点图标共用此文件。
- 界面参考：[`assets/fitguide-brand/today-mobile.png`](assets/fitguide-brand/today-mobile.png)，2026-09-18 改版后的 390px 今日训练页真实预览截图。右侧悬浮的浏览器助手图标不属于产品界面。
- 动作素材：`assets/*.jpg`、`assets/*.mp4`、`assets/3d/*`；器械图片：`assets/equipment/*.jpg`。动作图保持 1:1。
- 颜色：浅底 `#f6f7f3`、白色内容区 `#ffffff`、深绿 `#2c533e`、浅绿状态 `#eef3ea`、正文 `#1f3329`。以 [`style.css`](style.css) 的 `:root` 为唯一令牌来源。
- 字体：中文使用现有系统字体栈，字重仅用 400、500、600、700；常用正文 16px，辅助信息不低于 11px。
- 交互：主任务优先，说明按需展开。按钮触控目标至少 44px；键盘焦点沿用双层焦点环；反馈短促且尊重减少动态效果设置。
- 运行：无打包、无构建、页面仍可直接通过 `file://` 打开；动作对比需要本地 HTTP。
