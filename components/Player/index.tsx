import React from "react";
import ReactPlayer from "react-player";

export interface PlayerProps{
  playerId: string;
  url: string | MediaStream;
  muted: boolean;
  playing: boolean;
}

const Player = ({playerId, url, muted, playing}: PlayerProps) => {
  return <div><ReactPlayer key={playerId} url={url} muted={muted} playing={playing} /></div>;
};

export default Player;
