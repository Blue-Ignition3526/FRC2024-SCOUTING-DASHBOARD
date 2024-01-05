import { useRef } from 'react'
import '../styles/Settings.css'

function Settings() {
  const dialog = useRef<HTMLDialogElement>(null)
  const openButton = useRef<HTMLDivElement>(null)

  interface Settings {
    totalMatches: number
    apiURL: string
    apiPassword: string
  }

  let defaults: Settings = {
    totalMatches: 0,
    apiURL: "",
    apiPassword: "",
  }

  let settings: Settings = {
    totalMatches: localStorage.getItem('totalMatches') ? parseInt(localStorage.getItem('totalMatches')!) : defaults.totalMatches,
    apiURL: localStorage.getItem('apiURL') ? localStorage.getItem('apiURL')! : defaults.apiURL,
    apiPassword: localStorage.getItem('apiPassword') ? localStorage.getItem('apiPassword')! : defaults.apiPassword,
  }

  function handleOpen () {
    if (dialog.current) {
      dialog.current.showModal(); 
      dialog.current.focus();
      dialog.current.style.display = 'flex';
      dialog.current.focus();
    }
  }

  function handleClose (e: React.FormEvent<HTMLButtonElement> | undefined = undefined) {
    if (e) {
      e.preventDefault();
    }
    if (dialog.current) {
      dialog.current.close()
      dialog.current.style.display = 'none';
    }
  }

  function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const totalMatches = data.get('matchNumber')
    const apiURL = data.get('apiURL')
    const apiPassword = data.get('apiPassword')

    if (totalMatches) {
      localStorage.setItem('totalMatches', totalMatches.toString())
      settings.totalMatches = parseInt(totalMatches.toString())
    }

    if (apiURL) {
      localStorage.setItem('apiURL', apiURL.toString())
      settings.apiURL = apiURL.toString()
    }

    if (apiPassword) {

      localStorage.setItem('apiPassword', apiPassword.toString())
      settings.apiPassword = apiPassword.toString()
    }

    handleClose()
    window.location.reload()
  }

  function clearStorage (e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault()  
    localStorage.clear()
    handleClose()
    window.location.reload()
  }


  return (
    <>
      <div ref={openButton} onClick={handleOpen} id="settings" style={{ userSelect: 'none' }}>
        <span className="icon material-icons">settings</span>
      </div>
      <dialog ref={dialog} onKeyDown={(e) => e.key === 'Escape' && handleClose()} className='card'>
        <div id='dialog-header'>
          <h2>Dashboard Settings</h2>
          <button onClick={handleClose}><span className="icon material-icons">close</span></button>
        </div>
        <form  onSubmit={handleSubmit}>
          <div className='data-entry'>
            <label htmlFor="matchNumber">Total Matches</label>
            <input type="number" id="matchNumber" name="matchNumber" defaultValue={settings.totalMatches}/>
          </div>
          <div className='data-entry'>
            <label htmlFor="apiURL">API URL</label>
            <input type="text" id="apiURL" name="apiURL" defaultValue={settings.apiURL}/>
          </div>
          <div className='data-entry'>
            <label htmlFor="apiPassword">API Password</label>
            <input type="password" id="apiPassword" name="apiPassword" defaultValue={settings.apiPassword}/>
          </div>
          <div id='settings-buttons'>
            <button type="submit" className='main'>Save</button>
            <button onClick={clearStorage} className='second'>Clear</button>
          </div>
        </form>
      </dialog>
      <Alerts values={settings} defaults={defaults}/>
    </>
  )
}

function Alerts ({values, defaults}: {values: object, defaults: object}) {
  const missing = []

  for (const key in values) {
    if (values[key as keyof typeof values] === defaults[key as keyof typeof defaults]) {
      missing.push(
        <div className="alert card">
          <div style={{width: '2.5rem', height: '2.5rem' }}>
            <span className="icon material-icons" style={{ color: 'red', paddingRight: '1rem' }}>error</span>
          </div>
          <p style={{ color: 'red' }}><b>'{key}'</b> is not set.</p>
        </div>
      )
    }
  }

  return (
    <>
      <div id="alerts-box">
        {missing}
      </div>
    </>
  )
}

export default Settings