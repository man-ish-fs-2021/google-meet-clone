'use client'
import { useSocket } from '@/context'
import Image from 'next/image'
import { useEffect } from 'react'

export default function Home() {
  const socket = useSocket()
  useEffect(() => {
    socket?.on('connect', () => {
      console.log(socket.id)
    })
  }, [socket])
  return (
   <></>
  )
}
