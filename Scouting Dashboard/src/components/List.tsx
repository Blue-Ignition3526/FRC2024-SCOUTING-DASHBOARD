import { useEffect, useState } from "react"
import "../styles/List.css"

function List () {
  const [headers, setHeaders] = useState<JSX.Element[]>([])
  const [teamInfo, setTeamInfo] = useState<JSX.Element[]>([])

  getData()

  

  async function getData() {
    const url = localStorage.getItem('apiURL');
    if (!url) {
      console.error("API URL not set");
      return;
    }

    try {
      const res: Response = await fetch(url+"/teams/get-all-teams",{
        method: 'GET'
      });
      const data = await res.json();

      if (Boolean(data["success"])) {

        const titles = Object.keys(data["teams"][0])
        const newHeaders = titles.map((title: string) => {
          const formattedTitle = title.charAt(0).toUpperCase() + title.slice(1).replace(/_/g, ' ');
          return <th key={title}>{formattedTitle}</th>;
        });
        setHeaders(newHeaders);

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
    <main>
      <div id="team-list" className="card">
        <div id="DO-NOT-REMOVE">
          <table>
            <thead>
              <tr>
                {headers}
              </tr>
            </thead>
            <tbody>
              {teamInfo}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}

export default List