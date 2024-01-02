import { useEffect, useState } from "react"
import "../styles/List.css"

function List () {
  const [list, setList] = useState([])
  const [headers, setHeaders] = useState<JSX.Element[]>([])
  const [teamInfo, setTeamInfo] = useState([])

  useEffect(() => {
    getList()
  }, [])

  async function getList() {
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
        setList(data["teams"])

        const titles = Object.keys(data["teams"][0])
        const newHeaders = titles.map((title: string) => <th key={title}>{title}</th>);
        setHeaders(newHeaders);
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
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}

export default List