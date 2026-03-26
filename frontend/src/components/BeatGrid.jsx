import { useEffect, useState } from "react";
import BeatCard from "./BeatCard";
import api from "../api/axiosInstance";

export default function BeatGrid({ currentlyPlaying, setCurrentlyPlaying }) {
  const [allBeats, setAllBeats] = useState([])

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

  useEffect(() => {
    fetchBeatMetadata()
  }, []) // Revisit this, make sure that this doesn't cause performance issues | used to refresh pre-signed player links


  if (allBeats.length > 0) {
    return (
      <>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-32 px-64 mt-24 pb-48">
          {allBeats.map((beat) => {
            return (
              <BeatCard key={beat.objStorageKey} data={beat} currentlyPlaying={currentlyPlaying} setCurrentlyPlaying={setCurrentlyPlaying} />
            )
          })}
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className="px-64 mt-24 pb-48 text-center">
          <h1 className="text-3xl font-extrabold leading-16" >Well, that's awkward. <br />There are no beats for sale...</h1>
        </div>
      </>
    )
  }
}
