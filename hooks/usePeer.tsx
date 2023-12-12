'use client'
import Peer from 'peerjs'
import React, { useEffect, useRef, useState } from 'react'

const usePeer = () => {
    const [peer, setPeer] = useState<Peer | null>(null)
    const [id, setId] = useState<string | null>(null)
    const isPeerSet = useRef(false);
    useEffect(() => {
        if (isPeerSet.current) return;
        (async () => {
            const myPeer =  new (await import('peerjs')).default();
            setPeer(myPeer);
            myPeer.on('open', (id): void => {
                setId(id)
                console.log('Peer js initialized', id)
            })
        })()
        isPeerSet.current = true;

    }, [])
  return (
    {peer, id}
  )
}

export default usePeer