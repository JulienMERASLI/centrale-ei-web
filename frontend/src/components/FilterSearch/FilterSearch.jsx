import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_KEY } from '../../pages/Home/Home';
import './FilterSearch.css';
import { SearchResults } from '../../SearchResults/SearchResults';

const sortChoices = [
  { value: 'original_title', label: 'Titre original' },
  { value: 'popularity', label: 'Popularité' },
  { value: 'revenue', label: 'Revenus' },
  { value: 'primary_release_date', label: 'Date de sortie' },
  { value: 'title', label: 'Titre' },
  { value: 'vote_average', label: 'Note moyenne' },
  { value: 'vote_count', label: 'Nombre de votes' },
];

const useFetchCategories = (currentCategories, sortBy, setMovies) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', {
      headers: { Authorization: `Bearer ${API_KEY}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.genres);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const category_filter = currentCategories.join('%2C'); // %2C is the URL encoding for a comma
    let url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&language=en-US&page=1&sort_by=${sortBy}.desc`;
    if (currentCategories.length !== 0) {
      console.log(category_filter);
      url += `&with_genres=${category_filter}`;
    }

    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      })
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentCategories, sortBy, setMovies]);

  return categories;
};

export const FilterSearch = () => {
  const [sortBy, setSortBy] = useState('popularity');
  const [currentCategories, setCurrentCategories] = useState([]);
  const [movies, setMovies] = useState([]);
  const categories = useFetchCategories(currentCategories, sortBy, setMovies);

  return (
    <div className="global">
      <div className="filters">
        <h2>Filtres</h2>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          {sortChoices.map((choice) => (
            <option key={choice.value} value={choice.value}>
              {choice.label}
            </option>
          ))}
        </select>
        <h3>Catégories</h3>
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              <input
                type="checkbox"
                id={category.id}
                checked={currentCategories.includes(category.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setCurrentCategories([...currentCategories, category.id]);
                  } else {
                    setCurrentCategories(
                      currentCategories.filter((id) => id !== category.id)
                    );
                  }
                }}
              />
              <label htmlFor={category.id}>{category.name}</label>
            </li>
          ))}
        </ul>
      </div>
      <div className="movies">
        <SearchResults loading={false} movies={movies} />
      </div>
    </div>
  );
};
