export default function BeatCard({ data, id }) {
  console.log(data)

  return (
    <>
      <div key={data.id} className="my-8">
        <img src={data.coverArtKey} />
        <p>Title: {data.title}</p>
        <p>Description: {data.description}</p>
        <p>BPM: {data.bpm}</p>
        <p>Price: ${data.price}</p>
        <p>Uploaded: {new Date(data.uploadDate).toLocaleString()}</p>
        <div>
        </div>
      </div>
    </>
  )
}
