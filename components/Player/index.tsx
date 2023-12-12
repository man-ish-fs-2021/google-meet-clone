import React from "react";
import ReactPlayer from "react-player";
import cx from "classnames";
import styles from "./index.module.css";
import { Mic, MicOff, StopCircleIcon } from "lucide-react";

export interface PlayerProps {
  playerId: string;
  url: string | MediaStream;
  muted: boolean;
  playing: boolean;
  isActive?: boolean;
}

const Player = ({ playerId, url, muted, playing, isActive }: PlayerProps) => {
  const icon = () => (muted ? <MicOff className={styles.icon} /> : <Mic className={styles.icon} />);
  return (
    <div
      className={cx(styles.playerContainer, {
        [styles.notActive]: !isActive,
        [styles.active]: isActive,
        [styles.notPlaying]: !playing
      })}
    >
      {playing ? (
        <ReactPlayer
          width="100%"
          height="100%"
          key={playerId}
          url={url}
          muted={muted}
          playing={playing}
        />
      ) : (
        <StopCircleIcon className={cx(styles.user)} size={isActive ? 400 : 150} />
      )}
      {!isActive ? icon() : null}
    </div>
  );
};

export default Player;
