export default function BeatCard({ data, currentlyPlaying, setCurrentlyPlaying }) {
  const isPlaying = currentlyPlaying?.objStorageKey === data.objStorageKey
  return (
    <div key={data.id} className={isPlaying ? "animate-pulse py-8 border border-white hover:cursor-pointer rounded shadow-2xl shadow-white/40 transition-all duration-1000" : "hover:cursor-pointer hover:scale-90 duration-500 transition-all"} onClick={() => setCurrentlyPlaying(data)}>
      <img src={data.coverArtUrl} width={200} className="mx-auto" />
      <h1 className="text-xl font-extrabold text-center my-4">{data.title}</h1>
      <div className="flex justify-evenly">
        <p className="text-sm">{data.bpm} BPM</p>
        <p className="text-sm">${data.price}</p>
      </div>
      <div className="flex justify-evenly mt-8">
        {data.tags.map((tag) => {
          return (
            <p className="text-xs">#{tag}</p>
          )
        })}
      </div>
    </div >
  )
}
