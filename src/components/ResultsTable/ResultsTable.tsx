import axios from 'axios';
import './ResultTableStyle.scss';
import Card from '../Card/Card';
import { Component, ReactNode } from 'react';
import PokemonsArray from '../../types/PokemonsArray';

class ResultsTable extends Component {
  state: Readonly<{
    data: PokemonsArray[];
  }> = {
    data: [],
  };

  componentDidMount(): void {
    try {
      axios
        .get('https://pokeapi.co/api/v2/pokemon?limit=50&offset=0')
        .then((response) => {
          this.setState({ data: response.data.results });
        });
    } catch (error) {
      console.error(error);
    }
  }

  render(): ReactNode {
    return (
      <div className="wrapper">
        {this.state.data.map((pokemon, index) => (
          <Card key={index} pokemonsName={pokemon.name} />
        ))}
      </div>
    );
  }
}

export default ResultsTable;
