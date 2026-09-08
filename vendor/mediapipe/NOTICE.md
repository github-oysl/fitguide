# Bundled MediaPipe assets

- `@mediapipe/tasks-vision` **1.0.1**, Apache-2.0.
  Source: https://registry.npmjs.org/@mediapipe/tasks-vision/-/tasks-vision-1.0.1.tgz
  Upstream: https://github.com/google-ai-edge/mediapipe
  Retained files: vision_bundle.mjs and the module/SIMD WASM loader and binary.
  Unused classic and no-SIMD binaries are omitted; upstream code is unmodified.
- Pose Landmarker Lite float16 **version 1**:
  https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task
  Documentation: https://ai.google.dev/edge/mediapipe/solutions/vision/pose_landmarker
- Upstream license: https://raw.githubusercontent.com/google-ai-edge/mediapipe/master/LICENSE

All inference assets are served locally; no CDN request is required during analysis.
