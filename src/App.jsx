import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react'

function App() {
  const [twitchClips, setTwitchClips] = useState([])

  const fetchTwitchClips = async () => {
    try {
      const response = await fetch('http://localhost:4000/getClips')
      const data = await response.json()
      setTwitchClips(data)
    }
    catch (e) {
      console.log('error:', e)
    }
  }

  useEffect(() => {
    fetchTwitchClips()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <br />
          {/* clips are: {twitchClips} */}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
