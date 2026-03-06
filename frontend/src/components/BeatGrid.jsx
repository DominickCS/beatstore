import { useEffect, useState } from "react";
import BeatCard from "./BeatCard";

export default function BeatGrid() {
  const [allBeats, setAllBeats] = useState([])

  useEffect(() => {
    const fetchBeatMetadata = async () => {
      const response = await fetch('/beats');
      const beats = await response.json();

      const revisedBeatMetadata = await Promise.all(beats.map(async (beat) => {
        const beatResponse = await fetch(`/beats/${beat.objStorageKey}`);
        const coverResponse = await fetch(`/beats/cover/${beat.coverArtKey}`);
        return {
          ...beat,
          beatUrl: await beatResponse.text(),
          coverArtUrl: await coverResponse.text()
        };
      }));

      setAllBeats(revisedBeatMetadata);
    };

    fetchBeatMetadata()
  }, [])

  return (
    <>
      <div className="grid grid-cols-2 gap-8">
        {allBeats.map((beat) => {
          return (
            <BeatCard key={beat.objStorageKey} data={beat} />
          )
        })}
      </div>
    </>
  )
}
