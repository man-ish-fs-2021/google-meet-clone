import { PlayerProps } from "@/components/Player";
import { useSocket } from "@/context";
import _ from "lodash";
import { useRouter } from "next/navigation";
import Peer from "peerjs";
import React, { useState } from "react";

interface UsePlayerProps {
  id: string;
  roomId: string;
  peer:  Peer | null;
}

const usePlayer = ({ id: myId, roomId, peer }: UsePlayerProps) => {
  const socket = useSocket();
  const [players, setPlayers] = useState<{ [id: string]: PlayerProps }>({});
  const router = useRouter()
  const playersCopy = _.cloneDeep(players);
  const playerHighlighted = playersCopy[myId];
  delete playersCopy[myId];
  const nonHighlightedPlayers = playersCopy;
  const changeAudioState = (id: string) => {
    setPlayers((prev) => {
      const copy = _.cloneDeep(prev);
      copy[id].muted = !copy[id].muted;
    console.log(`audio ${copy[id].muted ?'stopped' :'resumed' } for`, id)

      return { ...copy };
    });
  };
  const changeVideoState = (id: string) => {
    console.log('video stopped for', id)

    setPlayers((prev) => {
      const copy = _.cloneDeep(prev);
      copy[id].playing = !copy[id].playing;
      return { ...copy };
    });
  };

  const leaveRoom = () => {
      socket?.emit('user_leave', roomId, myId)
      console.log('leaving room', roomId, myId)
    peer?.disconnect()
    router.push('/')
  }
  const toggleAudio = () => {
    console.log("I toggled my audio", myId);
    changeAudioState(myId);
    socket?.emit("user_toggle_audio", roomId, myId);
  };
  const toggleVideo = () => {
    console.log("I toggled my audio", myId);
    changeVideoState(myId);
    socket?.emit("user_toggle_video", roomId, myId);
  };
  return {
    players,
    setPlayers,
    playerHighlighted,
    nonHighlightedPlayers,
    toggleAudio,
    toggleVideo,
    // changeAudioState,
    // changeVideoState,
    leaveRoom,
    // removePlayers
  };
};

export default usePlayer;
