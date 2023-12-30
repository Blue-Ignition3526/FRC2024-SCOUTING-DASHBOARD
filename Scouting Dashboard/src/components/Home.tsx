import { useEffect, useState } from "react";
import "../styles/Home.css"

function Home() {
  
  
  return (
    <main>
      <RunningMatch />
    </main>
  )
}

function RunningMatch() {
  const [runningMatch, setRunningMatch] = useState(0)

/*   useEffect(() => {
    getRunningMatch()
  }, [])

  async function getRunningMatch() {
    try {
      const res: Response = await fetch("http://localhost:5000/matches/get-running-match",{
        method: 'GET'
      });
      const data = await res.json();

      if (data["success"]) {
        setRunningMatch(data["matchNumber"])
      }
    } catch (err) {
      console.log(err)
    }
  } */

  return (
    <div className="running-match">
      <h2>Running Match</h2>
      <p>{runningMatch}</p>
    </div>
  )
}

export default Home

