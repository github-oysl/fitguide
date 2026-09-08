import { PoseLandmarker, FilesetResolver } from '../vendor/mediapipe/vision_bundle.mjs';
let detector;
self.onmessage = async ({data}) => {
  try {
    if (data.type === 'init') {
      const vision = await FilesetResolver.forVisionTasks(new URL('../vendor/mediapipe/wasm', import.meta.url).href, true);
      detector = await PoseLandmarker.createFromOptions(vision, {
        baseOptions:{modelAssetPath:new URL('../vendor/mediapipe/pose_landmarker_lite.task',import.meta.url).href,delegate:'CPU'},
        runningMode:'VIDEO',numPoses:2,minPoseDetectionConfidence:.6,minPosePresenceConfidence:.6,minTrackingConfidence:.6
      });
      self.postMessage({id:data.id,ready:true});
    } else if (data.type === 'frame') {
      const result=detector.detectForVideo(data.bitmap,data.time*1000);
      data.bitmap.close();
      self.postMessage({id:data.id,points:result.landmarks.length===1?result.landmarks[0]:null,people:result.landmarks.length});
    }
  } catch (error) {
    data.bitmap?.close();
    self.postMessage({id:data.id,error:error.message || '姿态识别失败'});
  }
};

