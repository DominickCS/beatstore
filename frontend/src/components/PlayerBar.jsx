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
      <input className="fixed bottom-12 w-full flex accent-white" type="range" min={0} max={duration} value={currentTime} onChange={(e) => { playerRef.current.currentTime = e.target.value; setCurrentTime(e.target.value); }} />
      <div className="fixed bottom-0 w-full flex content-center items-center">
        <div className="flex items-center [&>p]:px-4 flex-2">
          <img src={currentlyPlaying?.coverArtUrl} width={50} />
          <p className="font-extrabold italic">{currentlyPlaying?.title ?? "No beat selected"}</p>
          <button onClick={() => isPlaying ? playerRef.current.pause() : playerRef.current.play()}><p className="text-2xl hover:cursor-pointer">{isPlaying ? "⏸" : "▶"}</p></button>
        </div>
        <div className="flex flex-1 justify-evenly">
          <p>{formatTime(currentTime)} / {formatTime(duration)}</p>
          <input type="range" min={0} max={1} value={volume} step={.01} onChange={(e) => playerRef.current.volume = e.target.value} className="w-24 accent-white" />
        </div>
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
