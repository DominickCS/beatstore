export default function BeatCard({ data, setCurrentlyPlaying }) {
  return (
    <div key={data.id} className="min-w-50 content-center *:my-2 p-8 hover:shadow-2xl shadow-white transition-shadow" onClick={() => setCurrentlyPlaying(data)}>
      <img src={data.coverArtUrl} />
      <p className="text-2xl font-extrabold">{data.title}</p>
      <p className="font-extralight">{new Date(data.uploadDate).toLocaleDateString()}</p>
      <p>{data.description}</p>
      <p>{data.bpm} BPM</p>
      <p className="font-extrabold">${data.price}</p>
    </div >
  )
}
