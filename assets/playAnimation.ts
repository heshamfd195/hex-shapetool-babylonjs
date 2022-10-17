import applyBouncing from "./applyBouncing";
import {Scene,Vector3,MeshBuilder, TransformNode,} from "babylonjs";
import * as GUI from "babylonjs-gui";


export default function playAnimation(scene:Scene,node:TransformNode){

 let aniSet={
     h:5,
     t:10
 }

 let advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("SA UI");

 let setAniBox = new GUI.SelectionPanel("Set Animation");
  setAniBox.width = "20%";
  setAniBox.height = "20%";
  setAniBox.color = "white";
  setAniBox.left = "20%"
  setAniBox.background = "#084973";

  advancedTexture.addControl(setAniBox);
  

  let displayDValue = function (value: number) {
    return Math.round(value);
  };


  let releaseHeight = function (value: number) {
    aniSet.h = Math.round(value);
  };
  let time = function (value: number) {
    aniSet.t = Math.round(value);
  };

  let aniGroup = new GUI.SliderGroup("Set Paratmers");
  aniGroup.addSlider("Height of Release", releaseHeight, "m", 5, 20, 5, displayDValue);
  aniGroup.addSlider("Time", time, "s", 2, 10, 2, displayDValue);
  
  setAniBox.addGroup(aniGroup);

  let pBtn = GUI.Button.CreateSimpleButton("pBtn", "Play");
  pBtn.width = "20%";
  pBtn.height = "6%";
  pBtn.top = "15%";
  pBtn.left = "20%";
  pBtn.color = "white";
  pBtn.background = "#0049b8";
  
  advancedTexture.addControl(pBtn);


  pBtn.onPointerUpObservable.add(function () {
      applyBouncing(node,aniSet.h,aniSet.t)
      scene.beginAnimation(node,0,100,false)
    
  })


  return advancedTexture

}





