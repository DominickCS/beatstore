import { useEffect, useState } from "react";
import BeatCard from "./BeatCard";

export default function BeatGrid() {
  const [allBeats, setAllBeats] = useState([])
  useEffect(() => {
    const fetchBeatsOnMount = async () => {
      const response = await fetch('/beats')
      setAllBeats(await response.json())
    }
    fetchBeatsOnMount()
  }, [])

  return (
    <>
      {allBeats.map((beat, id) => {
        return (
          <BeatCard key={id} data={{
            title: beat.title,
            description: beat.description,
            bpm: beat.bpm,
            tags: beat.tags,
            uploadDate: beat.uploadDate,
            price: beat.price,
            coverartkey: beat.coverartkey,
            objStorageKey: beat.objStorageKey
          }} />
        )
      })}
    </>
  )
}
