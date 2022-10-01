import './App.css';
import Main from './pages/Main';
import Game from './pages/Game'
/* React Router */
import {BrowserRouter, Route, Routes} from 'react-router-dom'


function App() {
  
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route exact path="/" element={<Main/>}/>
        <Route path='/Game' element={<Game/>}/>
      </Routes>
    </BrowserRouter>    

  );
}

export default App;
