import { PlayerProps } from '@/components/Player'
import React, { useState } from 'react'

const usePlayer = () => {
    const [players, setPlayers] = useState<{[id:string]: PlayerProps}>({})
  return (
    {players, setPlayers}
  )
}

export default usePlayer