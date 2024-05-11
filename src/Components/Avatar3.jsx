import React, { useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useAnimations, useGLTF } from '@react-three/drei'
import { useMessage } from '../Hooks/useMessage'

// Predefined facial expressions for the 3D model
const facialExpressions = {
  smile: { Expressions_mouthSmile_max: 0.759124 },
  sad: { Expressions_mouthSmileOpen2_min: 0.390511, Expressions_eyeClosedR_max: 0.2821 }
};
// const phonemes = { x: {}, c :{} } /

//  const mouthCues = message.lipsync
const Model = () => {
  const gltf = useGLTF('/models/untitled.glb');
  const { actions, mixer } = useAnimations(gltf.animations, gltf.scene);
  const [expression, setExpression] = useState('sad');
  const [animation, setAnimation] = useState('talking')
  const [audio, setAudio] = useState(null)
  const { message, onMessagePlayed } = useMessage();

  useEffect(() => {
    if (!message) {
      setAnimation("sitting");
      setExpression('sad')
      return;
    }
    setAnimation(message.animation);
    setExpression(message.lipsync);
    const audio = new Audio("data:audio/mp3;base64," + message.audio);
    audio.play();
    setAudio(audio);
    audio.onended = onMessagePlayed;
  }, [message]);

  useEffect(() => {
    if (actions[animation]) {
      actions[animation]
        .reset()
        .fadeIn(mixer.stats.actions.inUse === 0 ? 0 : 0.5)
        .play();
    } else {
      console.error(`No action found for animation: ${animation}`);
    }
  }, [animation, actions, mixer]);

  useEffect(() => {
    if (audio) {
      const handleTimeUpdate = () => {
        const currentTime = audio.currentTime;
        const cue = message.lipsync.find(cue => cue.start <= currentTime && cue.end > currentTime);
        if (cue) {
          setExpression(cue.value);
        }
      };
      audio.addEventListener('timeupdate', handleTimeUpdate);
      return () => audio.removeEventListener('timeupdate', handleTimeUpdate); // Clean up on unmount
    }
  }, [audio, message]); // Add audio as a dependency

  useFrame(() => {
    gltf.scene.traverse((object) => {
      if (object.isMesh && object.morphTargetDictionary) {
        Object.keys(object.morphTargetDictionary).forEach((key) => {
          if (facialExpressions[expression] && facialExpressions[expression][key]) {
            object.morphTargetInfluences[object.morphTargetDictionary[key]] = facialExpressions[expression][key];
          }
        });
      }
    });
  });

  return <primitive object={gltf.scene} />;
};

useGLTF.preload('/models/untitled.glb')

const Avatar3 = () => (
  <Model />
);

export default Avatar3;
