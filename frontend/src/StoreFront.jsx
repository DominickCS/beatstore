import { useState } from 'react'
import BeatGrid from './components/BeatGrid'
import PlayerBar from './components/PlayerBar.jsx'
import NavigationBar from './components/NavigationBar.jsx'

export default function StoreFront() {
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null)
  return (
    <div>
      <NavigationBar />
      <main className='min-h-screen'>
        <BeatGrid
          currentlyPlaying={currentlyPlaying}
          setCurrentlyPlaying={setCurrentlyPlaying}
        />
        <PlayerBar currentlyPlaying={currentlyPlaying} />
      </main>
    </div>
  )
}
