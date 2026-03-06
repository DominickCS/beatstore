import { useRef, useState, useEffect } from "react"

export default function PlayerBar({ currentlyPlaying }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const formatTime = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`

  const playerRef = useRef(null)

  useEffect(() => {
    if (currentlyPlaying) {
      playerRef.current?.play();
    }
  }, [currentlyPlaying]);

  return (
    <>
      <div className="fixed bottom-0 w-full flex *:mx-8">
        <img src={currentlyPlaying?.coverArtUrl} width={50} />
        <button onClick={() => isPlaying ? playerRef.current.pause() : playerRef.current.play()}>{isPlaying ? "PAUSE" : "PLAY"}</button>
        <p>{currentlyPlaying?.title ?? "No beat selected"}</p>
        <p>{formatTime(currentTime)} / {formatTime(duration)}</p>
        <input type="range" min={0} max={duration} value={currentTime} onChange={(e) => { playerRef.current.currentTime = e.target.value; setCurrentTime(e.target.value); }} />
        <input type="range" min={0} max={1} value={volume} step={.01} onChange={(e) => playerRef.current.volume = e.target.value} />
        <audio
          ref={playerRef}
          src={currentlyPlaying?.beatUrl}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onTimeUpdate={() => setCurrentTime(playerRef.current.currentTime)}
          onLoadedMetadata={() => setDuration(playerRef.current.duration)}
          onVolumeChange={() => setVolume(playerRef.current.volume)}
        />
      </div>
    </>
  )
}
