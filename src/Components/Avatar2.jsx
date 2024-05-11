import { useEffect, useRef } from 'react';
import { useGLTF} from '@react-three/drei';
// import useThree from '@react-three/drei';
import { useThree } from '@react-three/fiber'
import { degToRad } from "three/src/math/MathUtils";
import { useControls } from 'leva';
import * as THREE from 'three';


// Predefined facial expressions for the 3D model
const facialExpressions = {
    // ... (omitted for brevity)
  };
  
  // Mapping of phonemes to corresponding morph targets
  const corresponding = {
    // ... (omitted for brevity)
  };
  
  let setupMode = false;
  
  export function Avatar2(props) {
    const { nodes, materials } = useGLTF('/models/untitled.glb')
    const { scene } = useThree();
    // const { message, onMessagePlayed, chat } = useMessage();
    // const [lipsync, setLipsync] = useState();
    const group = useRef();
    

  return (
    <group {...props} dispose={null} ref={group}>

      <primitive object={nodes.root} />
      <skinnedMesh
        name="MBLab_human_male001"
        geometry={nodes.MBLab_human_male001.geometry}
        material={materials['MBlab_eyelash.0011715056371.247717']}
        skeleton={nodes.MBLab_human_male001.skeleton}
        morphTargetDictionary={nodes.MBLab_human_male001.morphTargetDictionary}
        morphTargetInfluences={nodes.MBLab_human_male001.morphTargetInfluences}
      />
      <skinnedMesh
        name="MBLab_human_male001_1"
        geometry={nodes.MBLab_human_male001_1.geometry}
        material={materials['MBlab_generic.0011715056371.247717']}
        skeleton={nodes.MBLab_human_male001_1.skeleton}
        morphTargetDictionary={nodes.MBLab_human_male001_1.morphTargetDictionary}
        morphTargetInfluences={nodes.MBLab_human_male001_1.morphTargetInfluences}
      />
      <skinnedMesh
        name="MBLab_human_male001_2"
        geometry={nodes.MBLab_human_male001_2.geometry}
        material={materials['MBlab_pupil.0011715056371.247717']}
        skeleton={nodes.MBLab_human_male001_2.skeleton}
        morphTargetDictionary={nodes.MBLab_human_male001_2.morphTargetDictionary}
        morphTargetInfluences={nodes.MBLab_human_male001_2.morphTargetInfluences}
      />
      <skinnedMesh
        name="MBLab_human_male001_3"
        geometry={nodes.MBLab_human_male001_3.geometry}
        material={materials['MBlab_human_eyes.0011715056371.247717']}
        skeleton={nodes.MBLab_human_male001_3.skeleton}
        morphTargetDictionary={nodes.MBLab_human_male001_3.morphTargetDictionary}
        morphTargetInfluences={nodes.MBLab_human_male001_3.morphTargetInfluences}
      />
      <skinnedMesh
        name="MBLab_human_male001_4"
        geometry={nodes.MBLab_human_male001_4.geometry}
        material={materials['MBlab_cornea.0011715056371.247717']}
        skeleton={nodes.MBLab_human_male001_4.skeleton}
        morphTargetDictionary={nodes.MBLab_human_male001_4.morphTargetDictionary}
        morphTargetInfluences={nodes.MBLab_human_male001_4.morphTargetInfluences}
      />
      <skinnedMesh
        name="MBLab_human_male001_5"
        geometry={nodes.MBLab_human_male001_5.geometry}
        material={materials['MBLab_Iris_V3.0011715056371.247717']}
        skeleton={nodes.MBLab_human_male001_5.skeleton}
        morphTargetDictionary={nodes.MBLab_human_male001_5.morphTargetDictionary}
        morphTargetInfluences={nodes.MBLab_human_male001_5.morphTargetInfluences}
      />
      <skinnedMesh
        name="MBLab_human_male001_6"
        geometry={nodes.MBLab_human_male001_6.geometry}
        material={materials['MBLab_skin3.0011715056371.247717']}
        skeleton={nodes.MBLab_human_male001_6.skeleton}
        morphTargetDictionary={nodes.MBLab_human_male001_6.morphTargetDictionary}
        morphTargetInfluences={nodes.MBLab_human_male001_6.morphTargetInfluences}
      />
      <skinnedMesh
        name="MBLab_human_male001_7"
        geometry={nodes.MBLab_human_male001_7.geometry}
        material={materials['MBLab_tongue.0011715056371.247717']}
        skeleton={nodes.MBLab_human_male001_7.skeleton}
        morphTargetDictionary={nodes.MBLab_human_male001_7.morphTargetDictionary}
        morphTargetInfluences={nodes.MBLab_human_male001_7.morphTargetInfluences}
      />
      <skinnedMesh
        name="MBLab_human_male001_8"
        geometry={nodes.MBLab_human_male001_8.geometry}
        material={materials['MBlab_human_teeth.0011715056371.247717']}
        skeleton={nodes.MBLab_human_male001_8.skeleton}
        morphTargetDictionary={nodes.MBLab_human_male001_8.morphTargetDictionary}
        morphTargetInfluences={nodes.MBLab_human_male001_8.morphTargetInfluences}
      />
      <skinnedMesh
        name="MBLab_human_male001_9"
        geometry={nodes.MBLab_human_male001_9.geometry}
        material={materials['MBLab_nails.0011715056371.247717']}
        skeleton={nodes.MBLab_human_male001_9.skeleton}
        morphTargetDictionary={nodes.MBLab_human_male001_9.morphTargetDictionary}
        morphTargetInfluences={nodes.MBLab_human_male001_9.morphTargetInfluences}
      />
      <primitive object={nodes.root_1} />
      <primitive object={nodes.root_2} />
    </group>
  )
}

useGLTF.preload('/models/untitled.glb')
