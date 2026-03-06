import { useState } from 'react'
import BeatGrid from './components/BeatGrid'
import PlayerBar from './components/PlayerBar.jsx'

export default function StoreFront() {
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null)

  return (
    <>
      <div>
        <BeatGrid
          currentlyPlaying={currentlyPlaying}
          setCurrentlyPlaying={setCurrentlyPlaying}
        />
        <PlayerBar currentlyPlaying={currentlyPlaying} />
      </div>
    </>
  )
}
