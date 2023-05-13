import {React, useRef} from 'react';
import {useFrame} from '@react-three/fiber';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';

import state from '../store';


const CameraRig = ({ children }) => {

  const group = useRef();
  const snap = useSnapshot(state);

  useFrame((state, delta)=>{
    const isBreakPoint = window.innerWidth<=1260;
    const isMobile = window.innerWidth<=600;

    //Setting the initial position of the model
    let targetPosition = [-0.4, 0, 2];
    if(snap.intro){
      if(isBreakPoint) targetPosition = [0,0,2];
      if(isMobile) targetPosition = [0,0.2, 2.5];
    }else{
      if(isMobile) targetPosition = [0,0, 2.5]
      else targetPosition = [0,0,2]
    }

    //setting the model camera position smoothly
    easing.damp3(state.camera.position, targetPosition, 0.25, delta)


      //setting the model rotation smoothly
    easing.dampE(
      group.current.rotation,
      //pointers or location axix of the camera rig
      [state.pointer.y/10, -state.pointer.x/5, 0],
      //time 
      0.25,
      //delta
      delta
    )
  })


 
  return (
    <group ref={group}>
      {children}
    </group>
  )
}

export default CameraRig