import { useEffect, useState } from 'react';
import '../styles/Pits.css';
import { Link } from 'react-router-dom';

function Pits () {
  const [teams, setTeams] = useState<JSX.Element[]>([]);
  const apiUrl = localStorage.getItem('apiURL');

  useEffect(() => { 
    getTeams();
  }, [])

  async function getTeams() {
    const res: Response = await fetch(apiUrl+"/teams/get-all-teams-simple/0", {
      method: "GET",
    });
    const resData = await res.json();
    const teamList = resData.teams.map((team: any) => {
      return (
        <li className="team">
          <Link to={"/pits/"+team.team_number}> 
            <h3>{team.team_name}</h3>
            <p>{team.team_number}</p>
          </Link>
        </li>
      )
    })
    setTeams(teamList);
    console.log(resData.teams);
  }

  return (
    <main>
      <div id="pits" className="card">
        <ul>
          {teams}
        </ul>
      </div>
    </main>
  )
}

export default Pits;