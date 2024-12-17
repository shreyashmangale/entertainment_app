import './App.css';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/Register';
import DetailsPage from './pages/DetailsPage';
import SearchedMovies from './components/SearchedMovies';
import Home from './pages/Home';
import Movies from './pages/Movies';
import TvSeries from './pages/TvSeries';
import Bookmarked from './pages/Bookmarked';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route index element={<Home />} />
          <Route path="/trending" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={<DetailsPage />} />
          <Route path="/searchmovies/:searchedName" element={<SearchedMovies />} />
          <Route path="/tvseries" element={<TvSeries />} />
          <Route path="/tvseries/:id" element={<DetailsPage />} />
          <Route path="/bookmarked" element={<Bookmarked />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<SignUp />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
