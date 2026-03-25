import { useEffect, useState } from "react";
import NavigationBar from "../components/NavigationBar";
import api from "../api/axiosInstance";

export default function AdminPage() {
  const [allBeats, setAllBeats] = useState([])
  const [beatObjects, setBeatObjects] = useState([])

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

  const fetchBeatObjects = async () => {
    const response = await api.get('/api/buckets/beats');
    setBeatObjects(response.data)
    console.log(response.data)
  }

  useEffect(() => {
    fetchBeatMetadata()
    fetchBeatObjects()
  }, [])

  async function handleDeletion(id) {
    const response = await api.delete(`/api/beats/delete/${id}`)

    fetchBeatMetadata();
    console.log(response.data)
  }

  return (
    <>
      <NavigationBar />

      <div className="grid grid-cols-2">
        <ul className="text-center">
          <h2>Storefront Management</h2>
          {allBeats.map((beat) => {
            return (
              <div className="flex justify-between max-w-md mx-auto">
                <li>{beat.title}</li>
                <button onClick={() => handleDeletion(beat.id)}>Delete</button>
              </div>
            )
          })}
        </ul>
        <ul className="text-center">
          <h2>Bucket Management</h2>
          {beatObjects.map((beatObj) => {
            return (
              <div className="flex justify-between max-w-md mx-auto">
                <li>{beatObj}</li>
                <button onClick={() => handleDeletion(beat.id)}>Delete</button>
              </div>
            )
          })}
        </ul>
      </div>
    </>
  )
}
