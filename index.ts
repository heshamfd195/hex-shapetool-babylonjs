import {
	Engine,
	Scene,
	ArcRotateCamera,
	HemisphericLight,
	Vector3,
	MeshBuilder,
	Quaternion,
	Mesh,
	TransformNode,
} from "babylonjs";
import "babylonjs-loaders";
import * as GUI from "babylonjs-gui";
import { AdvancedDynamicTexture } from "babylonjs-gui";
import { setCamera, setLight, setEnv } from "./assets/sceneSettings";
import meshPrimitives from "./assets/meshPrimitives"
import applyBouncing from "./assets/applyBouncing"
import playAnimationControl from "./assets/playAnimation"

let appState = {
	cameraStates: [
		{
			name: "camera1",
			position: new Vector3(0, 0, 0),
			target: new Vector3(0, 2, 8),
			alphaLowerLimit: 0.8,
			alphaUpperLimit: 1.9,
			betaLowerLimit: 0.6,
			betaUpperLimit: 1.4,
			attachFlag: false,
			isEnabled: true,
		},
		{
			name: "camera2",
			position: new Vector3(0, -1, 0),
			target: new Vector3(0, 1.57, 15),
			alphaLowerLimit: 0.8,
			alphaUpperLimit: 1.9,
			betaLowerLimit: 0.6,
			betaUpperLimit: 1.4,
			radiusUpperLimit:10,
			radiusLowerLimit:20,
			attachFlag: true,
			isEnabled: false,
		},
		{
			name: "camera3",
			position: new Vector3(-5, 8, 0),
			target: new Vector3(0, 1.57, 30),
			alphaLowerLimit: 0.8,
			alphaUpperLimit: 1.9,
			betaLowerLimit: 0.6,
			betaUpperLimit: 1.4,
			radiusUpperLimit:15,
			radiusLowerLimit:40,
			attachFlag: true,
			isEnabled: false,
		},
	],
    primitivesGUI:<AdvancedDynamicTexture>{},
    bouncyAnimationGUI:<AdvancedDynamicTexture>{},

	meshes: {
		icosphere: <Mesh>{},
		cube: <Mesh>{},
		cylinder: <Mesh>{},
		sphere: <Mesh>{},
	},
	
};

let { meshes, cameraStates,primitivesGUI,bouncyAnimationGUI} = appState;

const canvas = document.getElementById("canvas");
if (!(canvas instanceof HTMLCanvasElement))
	throw new Error("Couldn't find a canvas. Aborting the demo");

const engine = new Engine(canvas, true, {});
const scene = new Scene(engine);
scene.debugLayer.show();

let camera1 = setCamera(scene, canvas, cameraStates[0]);
let camera2 = setCamera(scene, canvas, cameraStates[1]);
let camera3 = setCamera(scene, canvas, cameraStates[2]);







setLight(scene);
setEnv(scene);

function primitivesSetScene() {
	// Objects
	meshes.cube = MeshBuilder.CreateBox("Cube", {}, scene);
	meshes.cube.position.set(0, 0.5, 0);
	meshes.cube.isPickable = true;

	meshes.icosphere = MeshBuilder.CreateIcoSphere("IcoSphere", {}, scene);
	meshes.icosphere.position.set(-3, 1, 0);
	meshes.icosphere.isPickable = true;

	meshes.cylinder = MeshBuilder.CreateCylinder("Cylinder", {}, scene);
	meshes.cylinder.position.set(3, 1, 0);
	meshes.cylinder.isPickable = true;

	primitivesGUI =meshPrimitives(scene,meshes)
}

function rmMeshFromScene() {
	scene.removeMesh(meshes.cube);
	scene.removeMesh(meshes.cylinder);
	scene.removeMesh(meshes.icosphere);
	scene.removeMesh(meshes.sphere)
}

function menuGUI() {
	let menuGui = AdvancedDynamicTexture.CreateFullscreenUI("Menu UI");
	// Menu Header Text
	let header = new GUI.TextBlock("Header");
	header.text = "Select An Option";
	header.color = "white";
	header.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
	header.top = "-30%";
	header.fontSize = 50;
	menuGui.addControl(header);

	// Primitives Setter

	let psBtn = GUI.Button.CreateSimpleButton("psBtn", "Set Mesh Primivies");
	psBtn.width = "30%";
	psBtn.height = "6%";
	psBtn.top = "-10%";
	psBtn.color = "white";
	psBtn.background = "#006D85";

	// Apply Bouncy
	let apBtn = GUI.Button.CreateSimpleButton("apBtn", "Apply Bouncy");
	apBtn.width = "30%";
	apBtn.height = "6%";
	apBtn.top = "-20%";
	apBtn.color = "white";
	apBtn.background = "#006D85";

	menuGui.addControl(psBtn);
	menuGui.addControl(apBtn);

	psBtn.onPointerUpObservable.add(function () {
		homeGUI();
		menuGui.dispose();
		scene.switchActiveCamera(camera2);
		primitivesSetScene();
	});

	apBtn.onPointerUpObservable.add(function () {
		homeGUI();
		menuGui.dispose();
		scene.switchActiveCamera(camera3);
		meshes.sphere = MeshBuilder.CreateSphere("sphere", {diameter:2}, scene);
		meshes.sphere.position = new Vector3(0,1,0)
		let tNode =new TransformNode("SphereNode"); 
		meshes.sphere.parent =tNode
		bouncyAnimationGUI =playAnimationControl(scene,tNode)

	});
}

function homeGUI() {
	let homeGui = AdvancedDynamicTexture.CreateFullscreenUI("Home UI");
	// Home Btn
	let hmBtn = GUI.Button.CreateSimpleButton("hmBtn", "Home");
	hmBtn.width = "10%";
	hmBtn.height = "6%";
	hmBtn.left = "-30%";
	hmBtn.top = "-40%";
	hmBtn.color = "white";
	hmBtn.background = "blue";

	homeGui.addControl(hmBtn);

	hmBtn.onPointerUpObservable.add(function () {
		homeGui.dispose()
		menuGUI()
		scene.layers[0]
		scene.switchActiveCamera(camera1);
		rmMeshFromScene();
		bouncyAnimationGUI.dispose()
		primitivesGUI.dispose()
		
		
	});
}

menuGUI();

engine.runRenderLoop(() => {
	scene.render();
});

window.addEventListener("resize", () => {
	engine.resize();
});
