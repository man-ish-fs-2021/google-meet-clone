import React from "react";
import styles from "./index.module.css";
import { Camera, CameraOff, Mic, MicOff, PhoneOff } from "lucide-react";
import cx from "classnames";
interface ControlPanelProps {
  muted: boolean;
  playing: boolean;
  toggleAudio: () => void;
  toggleVideo: () => void;
  leaveRoom: () => void;
}

const ControlPanel = (props: ControlPanelProps) => {
  const { muted, playing, toggleAudio, toggleVideo, leaveRoom } = props;
  return (
    <div className={styles.bottomMenu}>
      <div>
        {muted ? (
          <MicOff
          size={55}
            className={cx(styles.icon, styles.active)}
            onClick={toggleAudio}
          />
        ) : (
          <Mic size={55} className={styles.icon} onClick={toggleAudio} />
        )}
      </div>
      <div>
        {playing ? (
          <Camera size={55} className={styles.icon} onClick={toggleVideo} />
        ) : (
          <CameraOff
          size={55}
            className={cx(styles.icon, styles.active)}
            onClick={toggleVideo}
          />
        )}
      </div>
      <div>
        <PhoneOff size={55} onClick={leaveRoom} className={styles.icon} />
      </div>
    </div>
  );
};

export default ControlPanel;
