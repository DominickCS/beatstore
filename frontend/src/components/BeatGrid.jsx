import { useEffect, useState } from "react";
import BeatCard from "./BeatCard";
import api from "../api/axiosInstance";

export default function BeatGrid({ currentlyPlaying, setCurrentlyPlaying }) {
  const [allBeats, setAllBeats] = useState([])

  useEffect(() => {
    const fetchBeatMetadata = async () => {
      const response = await api.get('/api/beats');
      const beats = response.data
      const revisedBeatMetadata = await Promise.all(beats.map(async (beat) => {
        const beatResponse = await api.get(`/api/beats/${beat.objStorageKey}`);
        const coverResponse = await api.get(`/api/beats/cover/${beat.coverArtKey}`);
        return {
          ...beat,
          beatUrl: await beatResponse.data,
          coverArtUrl: await coverResponse.data,
        };
      }));

      setAllBeats(revisedBeatMetadata);
    };

    fetchBeatMetadata()
  }, [currentlyPlaying]) // Revisit this, make sure that this doesn't cause performance issues | used to refresh pre-signed player links

  return (
    <>
      <div className="grid gap-24 sm:grid-cols-5 sm:gap-24 px-64 mt-24 pb-48">
        {allBeats.map((beat) => {
          return (
            <BeatCard key={beat.objStorageKey} data={beat} currentlyPlaying={currentlyPlaying} setCurrentlyPlaying={setCurrentlyPlaying} />
          )
        })}
      </div>
    </>
  )
}
