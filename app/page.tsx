'use client'
import {v4 as uuid} from 'uuid'
import { useRouter } from 'next/navigation'
import styles from './page.module.css'
import { useState } from 'react'

export default function Home() {
  const router = useRouter()
  const [roomId, setRoomId] = useState('')
  const createRoomAndJoin = () => {
    const id = uuid();
    router.push(`/room/${id}`)
  }
  const joinRoom = () => {
    if (roomId){
      router.push(`/room/${roomId}`)

    } else{
      alert('Enter valid room Id')
    }
  }
  return (
    <div className={styles.homeContainer}>
      <h1>Google clone meet</h1>
      <div className={styles.enterRoom}>
        <input value={roomId} onChange={(e) => setRoomId(e.target.value || "")} />
        <button onClick={joinRoom}>join room</button>
      </div>
      <span className={styles.separatorText}>OR</span>
      <div>
        <button onClick={createRoomAndJoin}>Create new room</button>
      </div>
    </div>
  )
}
