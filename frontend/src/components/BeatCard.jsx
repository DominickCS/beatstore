export default function BeatCard({ data, id }) {

  return (
    <>
      <div key={data.id} className="my-8 items-center content-center flex justify-center flex-col *:my-2">
        <img src={data.coverArtUrl} width={300} />
        <p className="text-2xl font-extrabold">{data.title}</p>
        <p className="font-extralight">{new Date(data.uploadDate).toLocaleDateString()}</p>
        <p>{data.description}</p>
        <p>{data.bpm} BPM</p>
        <p className="font-extrabold">${data.price}</p>
        {data.beatUrl ?
          <div>
            <audio controls={true} controlsList="nodownload" src={data.beatUrl || null}></audio>
          </div>
          :
          <p>LOADING</p>
        }
      </div>
    </>
  )
}
