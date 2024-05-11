import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { button, useControls } from "leva";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useMessage } from '../Hooks/useMessage';

// Predefined facial expressions for the 3D model
const facialExpressions = {
  // ... (omitted for brevity)
};

// Mapping of phonemes to corresponding morph targets
const corresponding = {
  // ... (omitted for brevity)
};

let setupMode = false;

export function Avatar(props) {
  const { nodes, materials, scene } = useGLTF("/models/66347decfc3938c12dcb467f.glb");
  const { message, onMessagePlayed, chat } = useMessage();
  const [lipsync, setLipsync] = useState();

  // Handle message changes
  useEffect(() => {
    if (!message) {
      setAnimation("standing");
      return;
    }
    setAnimation(message.animation);
    setFacialExpression(message.facialExpression);
    setLipsync(message.lipsync);
    const audio = new Audio("data:audio/mp3;base64," + message.audio);
    audio.play();
    setAudio(audio);
    audio.onended = onMessagePlayed;
  }, [message]);

  // Load animations and setup animation mixer
  const { animations } = useGLTF("/models/Animations.glb");
  const group = useRef();
  const { actions, mixer } = useAnimations(animations, group);
  const [animation, setAnimation] = useState('dance');

  // Handle animation changes
  useEffect(() => {
    Object.values(actions).forEach((action) => {
      action.stop();
    });
    if (actions[animation]) {
      actions[animation]
        .reset()
        .fadeIn(mixer.stats.actions.inUse === 0 ? 0 : 0.5)
        .play();
    } else {
      console.error(`No action found for animation: ${animation}`);
    }
  }, [message, animations, actions, mixer]);

  // Function to interpolate morph target values
  const lerpMorphTarget = (target, value, speed = 0.1) => {
    scene.traverse((child) => {
      if (child.isSkinnedMesh && child.morphTargetDictionary) {
        const index = child.morphTargetDictionary[target];
        if (index === undefined || child.morphTargetInfluences[index] === undefined) {
          return;
        }
        child.morphTargetInfluences[index] = THREE.MathUtils.lerp(
          child.morphTargetInfluences[index],
          value,
          speed
        );
      }
    });
  };

  // State variables for facial expressions
  const [blink, setBlink] = useState(false);
  const [winkLeft, setWinkLeft] = useState(false);
  const [winkRight, setWinkRight] = useState(false);
  const [facialExpression, setFacialExpression] = useState("");
  const [audio, setAudio] = useState();

  // Update morph targets on each frame
  useFrame(() => {
    if (!setupMode) {
      Object.keys(nodes.EyeLeft.morphTargetDictionary).forEach((key) => {
        const mapping = facialExpressions[facialExpression];
        if (key === "eyeBlinkLeft" || key === "eyeBlinkRight") {
          return; // eyes wink/blink are handled separately
        }
        if (mapping && mapping[key]) {
          lerpMorphTarget(key, mapping[key], 0.1);
        } else {
          lerpMorphTarget(key, 0, 0.1);
        }
      });

      lerpMorphTarget("eyeBlinkLeft", blink || winkLeft ? 1 : 0, 0.5);
      lerpMorphTarget("eyeBlinkRight", blink || winkRight ? 1 : 0, 0.5);
    }

    // Synchronize lip movements with audio playback
    const appliedMorphTargets = [];
    if (message && lipsync) {
      const currentAudioTime = audio.currentTime;
      for (let i = 0; i < lipsync.mouthCues.length; i++) {
        const mouthCue = lipsync.mouthCues[i];
        if (currentAudioTime >= mouthCue.start && currentAudioTime <= mouthCue.end) {
          appliedMorphTargets.push(corresponding[mouthCue.value]);
          lerpMorphTarget(corresponding[mouthCue.value], 1, 0.2);
          break;
        }
      }
    }

    // Reset morph targets not currently in use
    Object.values(corresponding).forEach((value) => {
      if (!appliedMorphTargets.includes(value)) {
        lerpMorphTarget(value, 0, 0.1);
      }
    });
  });

  // Leva panel controls
  useControls("FacialExpressions", {
    chat: button(() => chat()),
    winkLeft: button(() => {
      setWinkLeft(true);
      setTimeout(() => setWinkLeft(false), 300);
    }),
    winkRight: button(() => {
      setWinkRight(true);
      setTimeout(() => setWinkRight(false), 300);
    }),
  });





  // useEffect(() => {
  //   let blinkTimeout;
  //   const nextBlink = () => {
  //     blinkTimeout = setTimeout(() => {
  //       setBlink(true);
  //       setTimeout(() => {
  //         setBlink(false);
  //         nextBlink();
  //       }, 200);
  //     }, THREE.MathUtils.randInt(1000, 5000));
  //   };
  //   nextBlink();
  //   return () => clearTimeout(blinkTimeout);
  // }, []);
console.log('avatar')

  return (
    <group  {...props} dispose={null} ref={group} >  
    <primitive object={nodes.Hips}  />
    <skinnedMesh
      name="EyeLeft"
      geometry={nodes.EyeLeft.geometry}
      material={materials.Wolf3D_Eye}
      skeleton={nodes.EyeLeft.skeleton}
      morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
      morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
    />
    <skinnedMesh
      name="EyeRight"
      geometry={nodes.EyeRight.geometry}
      material={materials.Wolf3D_Eye}
      skeleton={nodes.EyeRight.skeleton}
      morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
      morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
    />
    <skinnedMesh
      name="Wolf3D_Head"
      geometry={nodes.Wolf3D_Head.geometry}
      material={materials.Wolf3D_Skin}
      skeleton={nodes.Wolf3D_Head.skeleton}
      morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
      morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
    />
    <skinnedMesh
      name="Wolf3D_Teeth"
      geometry={nodes.Wolf3D_Teeth.geometry}
      material={materials.Wolf3D_Teeth}
      skeleton={nodes.Wolf3D_Teeth.skeleton}
      morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
      morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
    />
    <skinnedMesh
      geometry={nodes.Wolf3D_Hair.geometry}
      material={materials.Wolf3D_Hair}
      skeleton={nodes.Wolf3D_Hair.skeleton}
    />
    <skinnedMesh
      geometry={nodes.Wolf3D_Outfit_Top.geometry}
      material={materials.Wolf3D_Outfit_Top}
      skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
    />
    <skinnedMesh
      geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
      material={materials.Wolf3D_Outfit_Bottom}
      skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
    />
    <skinnedMesh
      geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
      material={materials.Wolf3D_Outfit_Footwear}
      skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
    />
    <skinnedMesh
      geometry={nodes.Wolf3D_Body.geometry}
      material={materials.Wolf3D_Body}
      skeleton={nodes.Wolf3D_Body.skeleton}
    />
  </group>
)
}

useGLTF.preload('/66347decfc3938c12dcb467f.glb')

useGLTF.preload("/models/Animations.glb");