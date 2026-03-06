import { useRef, useState, useEffect } from "react"



export default function BeatCard({ data, currentlyPlaying, setCurrentlyPlaying }) {
  const beatRef = useRef(null)

  useEffect(() => {
    if (currentlyPlaying !== data.objStorageKey) {
      beatRef.current?.pause();
    }
  }, [currentlyPlaying]);

  return (
    <div key={data.id} className="my-8 items-center content-center flex justify-center flex-col *:my-2 p-8 border border-white">
      <img src={data.coverArtUrl} width={300} className="rounded-2xl shadow-xl shadow-white/10" />
      <p className="text-2xl font-extrabold">{data.title}</p>
      <p className="font-extralight">{new Date(data.uploadDate).toLocaleDateString()}</p>
      <p>{data.description}</p>
      <p>{data.bpm} BPM</p>
      <p className="font-extrabold">${data.price}</p>
      {data.beatUrl ?
        <div>
          <audio onPlay={() => setCurrentlyPlaying(data.objStorageKey)} ref={beatRef} controls={true} controlsList="nodownload" src={data.beatUrl || null}></audio>
        </div>
        :
        <p>LOADING</p>
      }
    </div>
  )
}
