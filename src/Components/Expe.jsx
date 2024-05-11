import { CameraControls, ContactShadows, Environment } from "@react-three/drei";
import { useMessage } from "../Hooks/useMessage";
import { Suspense, useEffect, useRef } from "react";
import { Avatar } from "./Avatar";

// This is the Expe component. It is responsible for setting up the 3D environment and controlling the camera.
export const Expe = () => {
  const cameraControls = useRef();
  const { cameraZoomed } = useMessage();

  // On component mount, set the initial camera position
  useEffect(() => {
    if (cameraControls.current) {
      cameraControls.current.setLookAt(0, 2, 5, 0, 1.5, 0);
    }
  }, []);

  // When the cameraZoomed state changes, update the camera position
  useEffect(() => {
    if (cameraControls.current) {
      if (cameraZoomed) {
        cameraControls.current.setLookAt(0, 1.5, 1.5, 0, 1.5, 0, true);
      } else {
        cameraControls.current.setLookAt(0, 2.2, 5, 0, 1.0, 0, true);
      }
    }
  }, [cameraZoomed]);

  return (
    <>
      <CameraControls ref={cameraControls} />
      <Environment preset="sunset" />
      <Avatar />
      <ContactShadows opacity={0.7} />
    </>
  );
};
