import { useEffect, useState } from "react";
import NavigationBar from "../components/NavigationBar";
import api from "../api/axiosInstance";
import { toast, ToastContainer, Bounce } from "react-toastify";
import { Link } from "react-router-dom";

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
    const response = await api.get('/api/admin/buckets/beats');
    setBeatObjects(response.data)
  }

  useEffect(() => {
    fetchBeatMetadata()
    fetchBeatObjects()
  }, [])

  async function handleListingDeletion(id) {
    try {
      const response = await api.delete(`/api/admin/beats/delete`, {
        data: { id: id }
      })
      toast.success(<p className="font-extrabold text-center text-lg">{response.data}</p>, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Bounce,
      });

      fetchBeatMetadata();
    } catch (e) {
      toast.error(<p className="font-extrabold text-center text-lg">{e.data}</p>, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Bounce,
      });
    }
  }

  async function handleBeatObjectDeletion(key) {
    try {
      const response = await api.delete("/api/admin/buckets/beats/delete", {
        data: { beatObjKey: key }
      })
      toast.success(<p className="font-extrabold text-center text-lg">{response.data}</p>, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Bounce,
      });

      fetchBeatObjects()
    } catch (e) {
      toast.error(<p className="font-extrabold text-center text-lg">{e.data}</p>, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Bounce,
      });
    }
  }


  return (
    <>
      <ToastContainer />
      <NavigationBar />
      <div>
        <Link to="/admin/new-listing">NEW</Link>
      </div>
      <div className="grid grid-cols-2">
        <ul className="text-center">
          <h2>Storefront Listing Management</h2>
          {allBeats.map((beat) => {
            console.log(beat)
            return (
              <div className="flex justify-between max-w-md mx-auto [&>li]:py-4">
                <li>{beat.title}</li>
                <li>{beat.price}</li>
                <button onClick={() => handleListingDeletion(beat.id)}>Delete</button>
              </div>
            )
          })}
        </ul>
        <ul className="text-center">
          <h2>Bucket Management</h2>
          <h3>Beats</h3>
          {beatObjects.map((beatObj) => {
            return (
              <div className="flex justify-between max-w-md mx-auto [&>li]:py-4">
                <li>{beatObj}</li>
                <button onClick={() => handleBeatObjectDeletion(beatObj)}>Delete</button>
              </div>
            )
          })}
        </ul>
      </div>
    </>
  )
}
