import { useEffect, useState } from "react";
import BeatCard from "./BeatCard";

export default function BeatGrid({ currentlyPlaying, setCurrentlyPlaying }) {
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
          coverArtUrl: await coverResponse.text(),
        };
      }));

      setAllBeats(revisedBeatMetadata);
    };

    fetchBeatMetadata()
  }, [])

  return (
    <>
      <div className="grid gap-24 sm:grid-cols-3 sm:gap-16 px-12 mt-16">
        {allBeats.map((beat) => {
          return (
            <BeatCard key={beat.objStorageKey} data={beat} currentlyPlaying={currentlyPlaying} setCurrentlyPlaying={setCurrentlyPlaying} />
          )
        })}
      </div>
    </>
  )
}
