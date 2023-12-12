'use client'
import React, { useEffect, useRef, useState } from "react";

const useMediaStream = () => {
  const [state, setState] = useState<MediaStream | null>(null);
  const isSet = useRef(false)
  useEffect(() => {
    if (isSet.current) return;
    isSet.current = true;
    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({audio: true, video: true})
        console.log('setting your stream')
        setState(stream)
      } catch(err){
        console.log('Error in media navigator', {err})
      }
    })();
  }, []);
  return {stream: state };
};

export default useMediaStream;
