export default function BeatCard({ data, currentlyPlaying, setCurrentlyPlaying }) {
  const isPlaying = currentlyPlaying?.objStorageKey === data.objStorageKey
  return (
    <div key={data.id} className={isPlaying ? "rounded-4xl shadow-2xl shadow-white/30 transition-all duration-1000 overflow-hidden bg-black scale-110 border-white border-4" : "hover:scale-95 duration-500 transition-all overflow-hidden rounded-4xl"} >
      <img src={data.coverArtUrl} className="mx-auto w-full h-full object-cover max-h-80 border-b-4 hover:cursor-pointer" onClick={() => setCurrentlyPlaying(data)} />
      <h1 className="text-2xl font-extrabold text-center mt-4">{data.title}</h1>
      <div className="flex justify-evenly mb-6">
        {data.tags.map((tag) => {
          return (
            <p className="text-xs font-extralight">#{tag}</p>
          )
        })}
      </div>
      <div className="flex justify-evenly">
        <p className="text-md">{data.bpm} BPM</p>
        <p className="text-md">${data.price}</p>
      </div>
      <div className="flex justify-center pt-8 lg:pb-16 sm:pb-4">
        <button className="bn54">PURCHASE</button>
      </div>
    </div >
  )
}
