import './App.scss';
import SearchBar from './components/SearchBar/SearchBar';

function App() {
  return (
    <div className="wrapper">
      <SearchBar />
      <div className="search-result">search-result</div>
    </div>
  );
}

export default App;
