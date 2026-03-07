import { useState } from 'react'
import Modal from 'react-modal'
import BeatGrid from './components/BeatGrid'
import PlayerBar from './components/PlayerBar.jsx'

export default function StoreFront() {
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null)
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;

    const formData = new FormData();
    formData.append('beatFile', form.beatUpload.files[0]);
    formData.append('coverartFile', form.coverartUpload.files[0]);
    formData.append('uploadRequest', new Blob([JSON.stringify({
      title: form.beatTitle.value,
      description: form.beatDescription.value,
      price: form.beatPrice.value,
      bpm: parseInt(form.beatBPM.value),
      tags: form.beatTags.value.split(',').map(t => t.trim()) // Separate Tags with commas between each tag
    })], { type: 'application/json' }));

    const response = await fetch('/beats/upload', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      closeModal();
    }
  }

  return (
    <div className='min-h-screen'>
      <nav>
        <button onClick={() => openModal()}>Add New</button>
      </nav>
      <main>
        <BeatGrid
          currentlyPlaying={currentlyPlaying}
          setCurrentlyPlaying={setCurrentlyPlaying}
        />

        <PlayerBar currentlyPlaying={currentlyPlaying} />
        <Modal
          className={"bg-black/90 text-white flex items-center content-center flex-col m-8 min-h-fit py-8"}
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
        >
          <form className='flex flex-col *:py-3 [&>input]:border [&>input]:text-center [&>label]:text-center' onSubmit={handleSubmit}>
            <label htmlFor='beatUpload'>File Upload</label>
            <input type='file' name='beatUpload' />
            <label htmlFor='coverartUpload'>Cover Art</label>
            <input type='file' name='coverartUpload' />
            <label htmlFor='beatTitle'>Title</label>
            <input type='text' name='beatTitle' />
            <label htmlFor='beatDescription'>Description</label>
            <input type='text' name='beatDescription' />
            <label htmlFor='beatPrice'>Price</label>
            <input type='text' name='beatPrice' />
            <label htmlFor='beatBPM'>BPM</label>
            <input type='number' name='beatBPM' />
            <label htmlFor='beatTags'>Tags</label>
            <input type='text' name='beatTags' />
            <input className='mt-8' type='submit' value={"Add Beat"} />
          </form>
        </Modal>
      </main>
    </div>
  )
}
