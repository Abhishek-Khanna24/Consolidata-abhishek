
import  JsonForm  from './JsonFormlib';
import './App.css';
import firebase from 'firebase/app';
import config from './config.json';

function App() {
  firebase.initializeApp(config)
  return (
    <div className="App">
      <JsonForm type= {'form1'} />
    </div>
  );
}

export default App;
