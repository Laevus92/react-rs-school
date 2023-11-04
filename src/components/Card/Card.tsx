import './CardStyle.scss';
import { useEffect, useState } from 'react';
import CardProps from '../../types/CardProps';
import PokemonsData from '../../types/PokemonsData';
import GetPokemonsData from '../../services/GetPokemonsData';

export const Card = ({ pokemonsName }: CardProps) => {
  const getPokemonsData = new GetPokemonsData();

  const [pokemonsData, setPokemonsData] = useState<PokemonsData | null>(null);

  useEffect(() => {
    const data = getPokemonsData.getPokemosData(pokemonsName);
    data
      .then((response) => setPokemonsData(response))
      .catch(() => {
        throw new Error('Something went wrong');
      });
  }, [pokemonsName]);

  return (
    <div className="card">
      <div className="name">
        {pokemonsName[0].toUpperCase() + pokemonsName.slice(1)}
      </div>
      <div
        className="image"
        style={{
          backgroundImage: `url(${pokemonsData?.sprites.other['official-artwork']?.front_default})`,
        }}
      />
      <div className="card-wrapper">
        <div className="param-list">
          <div className="param-item">
            <span className="title">Height: </span>
            {pokemonsData?.height}
          </div>
          <div className="param-item">
            <span className="title">Weight: </span>
            {pokemonsData?.weight}
          </div>
          <div className="param-item">
            <span className="title">HP: </span>
            {pokemonsData?.stats[0].base_stat}
          </div>
          <div className="param-item">
            <span className="title">Attack: </span>
            {pokemonsData?.stats[1].base_stat}
          </div>
        </div>
      </div>
      <div className={`type type_${pokemonsData?.types[0].type.name}`}>
        {pokemonsData?.types[0].type.name}
      </div>
    </div>
  );
};
