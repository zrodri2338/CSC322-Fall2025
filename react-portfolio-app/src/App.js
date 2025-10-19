import logo from './logo.svg';
import './App.css';
import MovieList from './Movielist';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>My React Portfolio App</h1>
        <p>
          Welcome! This is a small React app demonstrating my skills.
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

      {/* Movie list component */}
      <section>
        <h2>My Favorite Movies</h2>
        <MovieList />
      </section>
    </div>
  );
}

export default App;
