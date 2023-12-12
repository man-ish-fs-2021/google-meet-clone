import React from "react";
import ReactPlayer from "react-player";
import cx from "classnames";
import styles from "./index.module.css";

export interface PlayerProps {
  playerId: string;
  url: string | MediaStream;
  muted: boolean;
  playing: boolean;
  isActive?: boolean;
}

const Player = ({ playerId, url, muted, playing, isActive }: PlayerProps) => {
  return (
    <div
      className={cx(styles.playerContainer, {
        [styles.notActive]: !isActive,
        [styles.active]: isActive,
      })}
    >
      <ReactPlayer width='100%' height='100%' key={playerId} url={url} muted={muted} playing={playing} />
    </div>
  );
};

export default Player;
