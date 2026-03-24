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
  }, [])

  return (
    <>
      <div className="grid gap-24 sm:grid-cols-6 sm:gap-16 px-12 mt-16">
        {allBeats.map((beat) => {
          return (
            <BeatCard key={beat.objStorageKey} data={beat} currentlyPlaying={currentlyPlaying} setCurrentlyPlaying={setCurrentlyPlaying} />
          )
        })}
      </div>
    </>
  )
}
