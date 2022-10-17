import {Scene,Vector3,MeshBuilder,} from "babylonjs";
import * as GUI from "babylonjs-gui";


export default function meshPrimitives(scene: Scene, meshes: any) {


  let meshValue = "";
  let advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("Primitives UI");

  //Bottom Gird

  let grid1 = new GUI.Grid("grid1");
  grid1.background = "#084973";
  advancedTexture.addControl(grid1);
  grid1.width = "50%";
  grid1.height = "5%";
  grid1.top = "20%";

  grid1.addColumnDefinition(5, true);
  grid1.addColumnDefinition(0.5);
  grid1.addColumnDefinition(0.5);

  grid1.addColumnDefinition(0, true);
  grid1.addRowDefinition(0.5);

  let label1 = new GUI.TextBlock();
  label1.text = "";
  label1.color = "white";

  // Selected Primitive Text
  let primitiveText = new GUI.TextBlock("primitiveText");
  primitiveText.text = "Select Primitives";
  primitiveText.color = "white";
  primitiveText.fontSize = "50%";

  // Selected Primitive Object Div
  let SelectedDiv = new GUI.Rectangle();
  SelectedDiv.background = "#081F73";
  SelectedDiv.width = "80%";
  SelectedDiv.height = "80%";

  grid1.addControl(primitiveText, 0, 1);
  grid1.addControl(SelectedDiv, 0, 2);

  // Primitives Setters

  let cubeHeight = function (value: number) {
    meshes.cube.scaling.y = value;
    // Increasing position relative to ground
    meshes.cube.position.y = value/2;
  };

  let cubeWidth = function (value: number) {
    meshes.cube.scaling.x = value;
  };

  let cubeDepth = function (value: number) {
    meshes.cube.scaling.z = value;
  };

  let cylinderHeight = function (value: number) {
    meshes.cylinder.scaling.y = value;
    // Increasing position relative to ground
    meshes.cylinder.position.y = value;
  };

  let cylinderDiameter = function (value: number) {
    meshes.cylinder.scaling.x = value;
    meshes.cylinder.scaling.z = value;

  
  

  };
  let icoSphereSubdivision = function (value: number) {
    meshes.icosphere.dispose();
    meshes.icosphere = MeshBuilder.CreateIcoSphere(
      "IcoSphere",
      { subdivisions: Math.round(value) },
      scene
    );
    meshes.icosphere.position.set(-3, 1, 0);
  };

  let icoSphereDiameter = function (value: number) {
    meshes.icosphere.scaling = new Vector3(value, value, value);

      // Increasing position of icosphere relative to ground
      meshes.icosphere.position.y = value;
  };

  let displayDValue = function (value: number) {
    return Math.floor(value * 100) / 100;
  };

  let displayRValue = function (value: number) {
    return Math.round(value)
  };

  let selectBox = new GUI.SelectionPanel("spi");
  selectBox.width = "50%";
  selectBox.height = "25%";
  selectBox.color = "white";
  selectBox.top = "35%";
  selectBox.background = "#084973";
  selectBox.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
  // selectBox.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;

  advancedTexture.addControl(selectBox);

  let cubeGroup = new GUI.SliderGroup("Cube Primitives");
  cubeGroup.addSlider("Height", cubeHeight, "m", 0.1, 2, 0, displayDValue);
  cubeGroup.addSlider("Width", cubeWidth, "m", 0.1, 2, 0, displayDValue);
  cubeGroup.addSlider("Depth", cubeDepth, "m", 0.1, 2, 0, displayDValue);

  let cylinderGroup = new GUI.SliderGroup("Cylinder Primitives");
  cylinderGroup.addSlider(
    "Height",
    cylinderHeight,
    "m",
    0.1,
    2,
    0,
    displayDValue
  );
  cylinderGroup.addSlider(
    "Width",
    cylinderDiameter,
    "m",
    0.1,
    2,
    0,
    displayDValue
  );

  let icoSphereGroup = new GUI.SliderGroup("IcoSphere Primitives");
  icoSphereGroup.addSlider(
    "Diameter",
    icoSphereDiameter,
    "m",
    0.1,
    2,
    0,
    displayDValue
  );
  icoSphereGroup.addSlider(
    "Subdivision",
    icoSphereSubdivision,
    "divisions",
    1,
    10,
    1,
    displayRValue
  );

  scene.onPointerDown = function (evt, pickResult) {
    if (pickResult.hit) {
      meshValue = String(pickResult?.pickedMesh?.name);
      if (meshValue !== "BackgroundSkybox" && meshValue !== "BackgroundPlane") {
        label1.text = meshValue;
        SelectedDiv.addControl(label1);
      }
    }

    switch (meshValue) {
      case "Cube":
        selectBox.removeGroup(0);
        selectBox.addGroup(cubeGroup);
        break;

      case "Cylinder":
        selectBox.removeGroup(0);
        selectBox.addGroup(cylinderGroup);
        break;

      case "IcoSphere":
        selectBox.removeGroup(0);
        selectBox.addGroup(icoSphereGroup);
        break;
    }
  };


   return advancedTexture
  


}
