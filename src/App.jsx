import MovieCard from './components/MovieCard';
import './App.css'
import Home from './pages/Home';
import {Route, Routes} from "react-router-dom";
import {MovieProvider} from "./contexts/MovieContext"
import Favorites from './pages/Favorites.jsx';
import NavBar from './components/NavBar';
import './css/App.css';
import './css/Favorites.css';
import './css/Home.css';
import './css/NavBar.css';
import './css/MovieCard.css';

// movie = {blah} -> here blah is variable; movie={{blah}} here it is an object
function App() {
    // const [count, setCount] = useState(0)
    const movieNumber = 1;
    return (
        <MovieProvider>
            <NavBar/>
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/favorites" element={<Favorites/>}/>
                </Routes>
            </main>
        </MovieProvider>
    )
}

function Text({display}) {
    return (
        <div>
            <p>{display}</p>
        </div>
    )
}

// {movieNumber ? <MovieCard movie={{title: "Yash's film", release_date: "2024"}}></MovieCard>
//     : <MovieCard movie={{title: "Joe's film", release_date: "2020"}}></MovieCard>}
// <Home></Home>
export default App
