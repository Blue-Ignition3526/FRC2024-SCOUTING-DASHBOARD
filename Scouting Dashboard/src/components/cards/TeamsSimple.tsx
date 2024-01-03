import { useEffect, useState } from 'react'
import "../../styles/cards/TeamsSimple.css"

function TeamsSimple() {
  const [teamInfo, setTeamInfo] = useState<JSX.Element[]>([])

  useEffect(() => {
    getData()
  }, [])

  

  async function getData() {
    const url = localStorage.getItem('apiURL');
    if (!url) {
      console.error("API URL not set");
      return;
    }

    let limit = 8;
    try {
      const res: Response = await fetch(url+"/teams/get-all-teams-simple/"+limit,{
        method: 'GET'
      });
      const data = await res.json();

      if (Boolean(data["success"])) {

        const newTeamInfo = data["teams"].map((team: any, index: number) => (
          <tr key={index}>
            {Object.values(team).map((value, i) => <td key={i}>{value as React.ReactNode}</td>)}
          </tr>
        ));
        setTeamInfo(newTeamInfo);
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div id="teams-simple" className="card dashboard-card">
      <h2>Teams</h2>
      <div id="DO-NOT-REMOVE">
          <table>
            <tbody>
              {teamInfo}
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default TeamsSimple