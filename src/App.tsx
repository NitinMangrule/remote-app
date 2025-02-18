import "./App.css";
import MusicLibrary from "./components/MusicLibrary/MusicLibrary";

function App() {
  return (
    <div className="inset-0 z-50  flex items-center justify-center antialiased bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400">
      <MusicLibrary />
    </div>
  );
}

export default App;
