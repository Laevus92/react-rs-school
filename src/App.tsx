import './App.scss';
import { SearchBar } from './components/SearchBar/SearchBar';
// import { ResultsTable } from './components/ResultsTable/ResultsTable';
import { useState, useEffect } from 'react';
import PokemonsArray from './types/PokemonsArray';
import { LoadSpinner } from './components/LoadSpinner/LoadSpinner';
import Logo from './assets/image/svg/62cf234679dbabe18fa50a1e_pokeapi_256 1.svg';
// import { Pagination } from './components/pagination/Pagination';
import GetPokemonsData from './services/GetPokemonsData';
import { AppRoutes } from './routes/AppRoutes';
import { useNavigate } from 'react-router-dom';

export const App = () => {
  const [pokemonsData, setPokemonsData] = useState<string[]>([]);
  const [isPokemonNotFound, setIsPokemonNotFound] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>(
    localStorage.getItem('searchQuery') || ''
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const navigate = useNavigate();

  useEffect(() => {
    const getPokemonsData = new GetPokemonsData();
    navigate('/page/1');
    let loading = true;
    setIsLoading(true);
    if (loading) {
      try {
        const data = getPokemonsData.getNamesArray();
        data.then((response: PokemonsArray[]) => {
          setPokemonsData(response.map((el) => el.name));
          setIsLoading(false);
        });
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }
    return () => {
      loading = false;
    };
  }, [searchQuery, offset]);
  return (
    <div className="main-wrapper">
      <img className="logo" src={Logo} alt="Logo" />
      <SearchBar
        names={pokemonsData}
        searchQuery={setSearchQuery}
        searchingStatus={setIsPokemonNotFound}
      />
      {isLoading ? (
        <LoadSpinner />
      ) : isPokemonNotFound ? (
        <div className="error-message">
          Pokemon
          <span className="title">{` ${
            localStorage.getItem('searchQuery') || searchQuery
          } `}</span>
          not found 😭
          <br />
          Check pokemons name!
        </div>
      ) : (
        <AppRoutes
          searchValue={searchQuery.toLowerCase()}
          offset={offset}
          searchingStatus={setIsPokemonNotFound}
          currentPage={currentPage}
          pokemonsData={pokemonsData}
          setOffset={setOffset}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};
