import { Mesh,Animation, TransformNode} from 'babylonjs';

function dampingFrameGenerator(height: number) {

    const generatedFramesData ={
      compTime:0,
      keyFrames:[] as any[]
    }

    const frameRate =1;


    const h0 = height // Intial Height : m
    const g = 10 // Acceration due to gravity : m/s
    let v = 0
    let t = 0
    let dt = 0.01
    let rho = 0.75
    let tau = 0.10
    let hmax = h0
    let h = h0
    let hstop = 0.01
    let freefall = true
    let t_last = -Math.sqrt(2 * h0 / g)
    let vmax = Math.sqrt(2 * hmax * g)
    let H = [] as number[]
    let T = [] as number[]
  
  
    while (hmax > hstop) {
      if (freefall) {
        var hnew = h + v * dt - 0.5 * g * dt * dt
        if (hnew < 0) {
          t = t_last + 2 * Math.sqrt(2 * hmax / g)
          freefall = false
          t_last = t + tau
          h = 0
        }
        else {
          t = t + dt
          v = v - g * dt
          h = hnew
        }
      }
      else {
        t = t + tau
        vmax = vmax * rho
        v = vmax
        freefall = true
        h = 0
      }
      hmax = 0.5 * vmax * vmax / g
  
      H.push(Number(h.toFixed(1)))
      T.push(Number(t.toFixed(1)))
  
    }

    console.log("stopped bouncing at time :", t)
    generatedFramesData.compTime=t
  
    T.map((time: number, index: number) => {
      generatedFramesData.keyFrames.push({
        frame: time * frameRate,
        value: H[index]
      })
  
  
    })
  
    return generatedFramesData
  }

export default function applyBouncing(node:TransformNode,amplitude:number,duration:number){

    const {compTime,keyFrames} =dampingFrameGenerator(amplitude)
    const frameRate =compTime/duration
    const dampingAnimation = new Animation("dampingAnimation", "position.y", frameRate, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE);
    dampingAnimation.setKeys(keyFrames);
    node.animations.push(dampingAnimation);
    node.beginAnimation("damp",true)
    
}