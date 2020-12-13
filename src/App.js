import './App.css';
import SmsConsumptionReport from './sms-comsuption-report/smsConsumptionReport'
import fetch from 'node-fetch'
import { useEffect, useState } from 'react'

function App() {
  const [lastestTag, setLastestTag] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://api.github.com/repos/BaptisteLongy/ovh-sms-reports/tags');
      const json = await response.json();
      setLastestTag(json[0].name.substring(1));
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      {lastestTag && lastestTag !== process.env.REACT_APP_VERSION ? <p>Il y a une nouvelle version, fais la MAJ !</p> : null}
      <SmsConsumptionReport />
    </div>
  );
}

export default App;