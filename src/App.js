import './App.css';
import { Heatmap } from './components/heatmap/main';
import { Navbar } from './components/navbar/index'


function App() {
  return (
    <>
      <div className='nav'>
        <Navbar />
        <div style={{ "position": "absolute" }}> hello world </div>
      </div>
      <div className='nav'>
        <Heatmap />
      </div>


    </>
  );
}

export default App;
