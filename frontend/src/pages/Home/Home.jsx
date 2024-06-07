import { createContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDebounce } from 'use-debounce';
import './Home.css';
import 'nprogress/nprogress.css';
import { MovieDialog } from '../../components/MovieDialog/MovieDialog';
import { SearchResults } from '../../components/SearchResults/SearchResults';
import { Recommandation } from '../../components/Recommandation/Recommandation';
import { FilterSearch } from '../../components/FilterSearch/FilterSearch';
import { useLoading } from '../../Hook/useLoading';
import { useConnection } from '../../Hook/useConnection';

export const API_KEY =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjlmNjAwMzY4MzMzODNkNGIwYjNhNzJiODA3MzdjNCIsInN1YiI6IjY0NzA5YmE4YzVhZGE1MDBkZWU2ZTMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Em7Y9fSW94J91rbuKFjDWxmpWaQzTitxRKNdQ5Lh2Eo';

export const usePage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = parseInt(searchParams.get('page') || '1');

  const navigate = useNavigate();

  const setPage = (p) => navigate(`?page=${p}`);

  return [page, setPage];
};

const useFetchMovies = (movieName) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(null);
  const [page] = usePage();

  useLoading(loading);

  useEffect(() => {
    if (!movieName) {
      return;
    }
    setLoading(true);
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?query=${movieName}&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      )
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [movieName, page]);

  return { movies, loading };
};
export const MovieSelectedContext = createContext([]);
export const RatingContext = createContext([]);

function Home() {
  const [, setPage] = usePage();
  useConnection();

  const [movieName, setMovieName] = useState('');
  const [debouncedMovieName] = useDebounce(movieName, 300);

  const { movies, loading } = useFetchMovies(debouncedMovieName);

  const [movieSelected, setMovieSelected] = useState(null);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieName]);

  return (
    <MovieSelectedContext.Provider value={[movieSelected, setMovieSelected]}>
      <RatingContext.Provider value={[rating, setRating]}>
        <div className="App">
          <div id="searchDiv">
            <input
              id="search"
              placeholder="Rechercher..."
              type="text"
              value={movieName}
              onChange={(e) => {
                setMovieName(e.target.value);
                setPage(1);
              }}
            />
          </div>
          {debouncedMovieName === '' ? (
            <>
              <Recommandation />
              <FilterSearch />
            </>
          ) : (
            <SearchResults loading={loading} movies={movies} showButtons />
          )}
        </div>
        {createPortal(<MovieDialog />, document.body)}
      </RatingContext.Provider>
    </MovieSelectedContext.Provider>
  );
}

// TODO: améliorer le code
// TODO: faire le .env pour la prod
// TODO: afficher sur le front les erreurs du back
// TODO: validation formulaires serveur (en cours, reste que la vérification du mail)
// TODO: Empecher le back de chnaner l'url
// TODO: Envoyer la page en query pour détails des films
// TODO: Changer la page dans l'url ne la change pas => utiliser useNavigate, faire idem pour la recherche

export default Home;
