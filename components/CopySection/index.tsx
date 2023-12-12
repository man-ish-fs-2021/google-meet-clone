import { CopyIcon } from 'lucide-react'
import React from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import styles from './index.module.css'

interface CopyProps{
    roomId: string
}

const Copy = (props: CopyProps) => {
    const {roomId} = props
  return (
    <div className={styles.copyContainer}>
        <div className={styles.copyHeading}>Copy room id:</div>
        <hr/>
        <span className={styles.copyDescription}>
            <CopyToClipboard text={roomId}>
                <CopyIcon className='ml-3 cursor-pointer' />
                </CopyToClipboard>
        </span>
    </div>
  )
}

export default Copy