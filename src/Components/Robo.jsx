import React from 'react'
import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { Expe } from '../Components/Expe';
import {Expe2} from "../Components/Expe2"

// This is the Robo component. It is created to put all the 3D related components in one place and send them in one component.
const Robo = () => {
  return (
    <> 
      {/* The Loader component is used to display a loading spinner while the 3D components are loading. */}
      <Loader />

      {/* The Leva component is used for live editing of the 3D scene. It is hidden in this case. */}
      <Leva />

      {/* The Canvas component is where the 3D scene is rendered. */}
      <Canvas shadows camera={{ position: [0, 0, 1], fov: 30 }}>
        {/* The Expe component is a part of the 3D scene. */}
        {/* <Expe /> */}
        <Expe2/>
   
      </Canvas>
    </>
  )
}

export default Robo;
