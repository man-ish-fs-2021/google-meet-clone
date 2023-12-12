import { PlayerProps } from '@/components/Player'
import _ from 'lodash';
import React, { useState } from 'react'

interface UsePlayerProps{
    id: string;
}

const usePlayer = ({id}: UsePlayerProps) => {
    const [players, setPlayers] = useState<{[id:string]: PlayerProps}>({});
    const playersCopy = _.cloneDeep(players);
    const playerHighlighted = playersCopy[id];
    delete playersCopy[id]
    const nonHighlightedPlayers = playersCopy
  return (
    {players, setPlayers, playerHighlighted, nonHighlightedPlayers}
  )
}

export default usePlayer