import { Scene, ArcRotateCamera, Vector3, HemisphericLight, MeshBuilder, StandardMaterial, CubeTexture, Texture, Color3 } from "babylonjs";

/**
 * Set Camera
 * @param scene
 * @param canvas
 */
export function setCamera(scene: Scene, canvas: HTMLCanvasElement,settings:any) {


let camera = new ArcRotateCamera(settings.name, 0, 0, 0, settings.position, scene);
if(settings.attachFlag){
  camera.attachControl(canvas, true);
}

camera.speed = 0.01;
camera.lowerRadiusLimit = settings.radiusUpperLimit;
camera.upperRadiusLimit = settings.radiusLowerLimit;
camera.minZ = 0.01 
camera.wheelPrecision = 1;
camera.upperBetaLimit=settings.betaUpperLimit;
camera.lowerBetaLimit=settings.betaLowerLimit;
camera.upperAlphaLimit=settings.alphaUpperLimit;
camera.lowerAlphaLimit=settings.alphaLowerLimit
camera.setPosition(settings.target);
camera.setEnabled(settings.isEnabled);
return camera


}

/**
 * Set Light
 * HemisphericLight
 * @param scene 
 */
export function setLight(scene:Scene){
  const light =new HemisphericLight("light", new Vector3(0.5, 1, 0.8).normalize(), scene);
}





export function setEnv(scene:Scene){
 const options={
  groundColor: new BABYLON.Color3(0, 0.88, 1),
  skyboxColor: new BABYLON.Color3(0, 0.8, 1),
  skyboxSize:100
 
 }
 
 let  enviroment = scene.createDefaultEnvironment(options);
}

 