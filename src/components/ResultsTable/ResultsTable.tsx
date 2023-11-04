import './ResultTableStyle.scss';
import { Card } from '../Card/Card';
import { useEffect, useState } from 'react';
import PokemonsArray from '../../types/PokemonsArray';
import { LoadSpinner } from '../LoadSpinner/LoadSpinner';
import ResultTableProps from '../../types/ResultTableProps';
import GetPokemonsData from '../../services/GetPokemonsData';
import { AxiosError } from 'axios';

export const ResultsTable = ({
  offset,
  searchValue,
  searchingStatus,
}: ResultTableProps) => {
  const [pokemonsData, setPokemonsData] = useState<PokemonsArray[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    let loading = true;
    if (loading) {
      setIsLoading(true);
      const getPokemonsData = new GetPokemonsData();
      if (searchValue) {
        const data = getPokemonsData.getPokemosData(searchValue.toLowerCase());
        data
          .then((response) => {
            setPokemonsData([response]);
          })
          .catch((error) => {
            if (error instanceof AxiosError && error.response?.status === 404) {
              searchingStatus(true);
            } else {
              throw new Error("Can't load pokemons data");
            }
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        const data = getPokemonsData.getPokemonsList(offset);
        data
          .then((response) => {
            setPokemonsData(response.results);
            searchingStatus(false);
          })
          .catch(() => {
            throw new Error("Can't load pokemons list");
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
      return () => {
        loading = false;
      };
    }
  }, [offset, searchValue]);

  return (
    <div className="wrapper">
      {pokemonsData.map((pokemon, index) => (
        <Card key={index} pokemonsName={pokemon.name} />
      ))}
      {isLoading ? <LoadSpinner /> : null}
    </div>
  );
};
