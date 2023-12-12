'use client'
import { useSocket } from '@/context'
import usePeer from '@/hooks/usePeer'
import React, { useEffect } from 'react'

const Room = () => {
    const socket = useSocket()
    const {peer} = usePeer()
    useEffect(() => {
      socket?.on('connect', () => {
        console.log(socket.id)
      })
    }, [socket])
  return (
    <div>Room</div>
  )
}

export default Room