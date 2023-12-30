import { useRef, useEffect } from 'react'

function Settings() {
  const dialog = useRef<HTMLDialogElement>(null)
  const openButton = useRef<HTMLDivElement>(null)
  
  interface Settings {
    totalMatches: number
  }

  let settings: Settings = {
    totalMatches: localStorage.getItem('totalMatches') ? parseInt(localStorage.getItem('totalMatches')!) : 0
  }

  function handleOpen () {
    if (dialog.current) {
      dialog.current.showModal(); 
      dialog.current.focus();
      dialog.current.style.display = 'flex';
      dialog.current.focus();
    }
  }

  function handleClose () {
    if (dialog.current) {
      dialog.current.close()
      dialog.current.style.display = 'none';
    }
  }

  /* dialog.current?.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      handleClose();
    }
  }); */

  function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const totalMatches = data.get('matchNumber')

    if (totalMatches) {
      localStorage.setItem('totalMatches', totalMatches.toString())
      settings.totalMatches = parseInt(totalMatches.toString())
    }
    handleClose()
  }

  function clearStorage () {
    localStorage.clear()
    handleClose()
    window.location.reload()
  }


  return (
    <>
      <div ref={openButton} onClick={handleOpen} id="settings" style={{ userSelect: 'none' }}>
        <span className="icon material-icons">settings</span>
      </div>
      <dialog ref={dialog} onKeyDown={(e) => e.key === 'Escape' && handleClose()}>
        <h3>Dashboard Settings</h3>
        <form  onSubmit={handleSubmit}>
          <label htmlFor="match-number">Total Matches</label>
          <input type="number" id="matchNumber" name="matchNumber" defaultValue={settings.totalMatches}/>
          <button type="submit">Save</button>
        </form>
        <button onClick={handleClose}>Close</button>
        <button onClick={clearStorage}>Clear</button>
      </dialog>
    </>
  )
}

export default Settings