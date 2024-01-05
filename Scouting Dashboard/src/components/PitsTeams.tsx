import '../styles/PitsTeams.css';
import { useParams } from "react-router-dom";

function PitsTeams () {
  const { team } = useParams();

  return (
    <main>
      <div id="pits-teams" className="card">
        <div id='team-list'>

        </div>
      </div>
    </main>
  )
}

export default PitsTeams;