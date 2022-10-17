import './App.css';
import { Heatmap } from './components/heatmap/main';
import { Navbar } from './components/navbar/index';
import { Habit } from './components/habbit/index'


function App() {
  return (
    <div className='page'>
      <Navbar />
      <div style={{ "position": "absolute" }}> hello world </div>
      <Heatmap />
      <Habit />

    </div>
  );
}

export default App;
