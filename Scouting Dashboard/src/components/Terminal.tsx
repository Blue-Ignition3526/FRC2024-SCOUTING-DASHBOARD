import { useEffect, useState } from "react";
import "../styles/Terminal.css"

function Terminal () {
  const [data, setData] = useState("");
  const apiUrl = localStorage.getItem('apiURL') ? localStorage.getItem('apiURL')+"/"! : "Url not set";

  useEffect(() => {
    console.log(data)
  }, [data])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget)
    const endpoint = ""+form.get('command')
    const method = form.get('method')
    const body = form.get('body')

    const headers = {
      "Content-Type": "application/json",
      "Password": localStorage.getItem('apiPassword')
    }

    let info = {}

    if (method === "GET" || method === "DELETE") {
      info = {
        method: method,
        headers: headers,
      }
    } else {
      info = {
        method: method,
        headers: headers,
        body: JSON.stringify(body),
      }
    }

    performRequest(endpoint, info);
  }

  async function performRequest(endpoint: string | null, info: object) {
    if (!endpoint) {
      console.error("Endpoint not set");
      return;
    }

    try {
      const res: Response = await fetch(endpoint, info);
      const resData = await res.json();
      setData(JSON.stringify(resData, null, 2));
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <main>
      <div id="terminal" className="card">
        <form onSubmit={handleSubmit}>
          <div className="line">
            <input type="text" id="command" name="command" placeholder="Enter command here" defaultValue={apiUrl} />
            <select name="method" id="method">
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="PATCH">PATCH</option>
              <option value="DELETE">DELETE</option>
            </select>
          </div>
          <div className="line">
            <input type="text" id="body" name="body" placeholder="Body of the request formated as JSON (Not used in GET and DELETE requests)" />
            <input type="submit" value="Submit" />
          </div>
        </form>
        <div id="response">
          <pre>
            {data}
          </pre>
        </div>
      </div>
    </main>
  );
}

export default Terminal;