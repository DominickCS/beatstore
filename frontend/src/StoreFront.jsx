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
      tags: form.beatTags.value.split(',').map(t => t.trim())
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
    <>
      <div>
        <nav>
          <button onClick={() => openModal()}>Add New</button>
        </nav>
        <BeatGrid
          currentlyPlaying={currentlyPlaying}
          setCurrentlyPlaying={setCurrentlyPlaying}
        />
        <PlayerBar currentlyPlaying={currentlyPlaying} />
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
        >
          <button onClick={closeModal}>X</button>
          <form className='*:my-4' onSubmit={handleSubmit}>
            <div className='flex flex-col'>
              <label htmlFor='beatUpload'>Beat</label>
              <input type='file' name='beatUpload' />
              <label htmlFor='coverartUpload'>Cover Art</label>
              <input type='file' name='coverartUpload' />
            </div>
            <div className='flex flex-col'>
              <div>
                <label htmlFor='beatTitle'>Title</label>
                <input type='text' name='beatTitle' />
              </div>
              <div>
                <label htmlFor='beatDescription'>Description</label>
                <input type='text' name='beatDescription' />
              </div>
              <div>
                <label htmlFor='beatPrice'>Price</label>
                <input type='text' name='beatPrice' />
              </div>
              <div>
                <label htmlFor='beatBPM'>BPM</label>
                <input type='number' name='beatBPM' />
              </div>
              <div>
                <label htmlFor='beatTags'>Tags</label>
                <input type='text' name='beatTags' />
              </div>
              <input type='submit' value={"Add Beat"} />
            </div>
          </form>
        </Modal>
      </div>
    </>
  )
}
