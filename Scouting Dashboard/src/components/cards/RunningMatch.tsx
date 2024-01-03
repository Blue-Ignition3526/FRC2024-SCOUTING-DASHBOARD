import CircularProgress from "./graphics/CircularProgress.tsx";
import { useEffect, useState } from "react";
import "../../styles/cards/RunningMatch.css";

function RunningMatch() {
  const [runningMatch, setRunningMatch] = useState(0)
  const [matchPercentage, setMatchPercentage] = useState(0)

  useEffect(() => {
    if (runningMatch === 0 || !localStorage.getItem('totalMatches')) {
      return
    }
    setMatchPercentage((runningMatch*100)/parseInt(localStorage.getItem('totalMatches')!))
  }, [runningMatch])

  useEffect(() => {
    getRunningMatch()
  }, [])

  async function getRunningMatch() {
    const url = localStorage.getItem('apiURL');
    if (!url) {
      console.error("API URL not set");
      return;
    }

    try {
      const res: Response = await fetch(url+"/matches/get-running-match",{
        method: 'GET'
      });
      const data = await res.json();

      if (data["success"]) {
        setRunningMatch(data["matchNumber"])
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div id="running-match" className="card dashboard-card">
      <h2>Running Match</h2>
      <CircularProgress percentage={matchPercentage} text={`M: ${runningMatch}`} />
    </div>
  )
}

export default RunningMatch