import axios from 'axios';
import './ResultTableStyle.scss';
import Card from '../Card/Card';
import { Component, ReactNode } from 'react';
import PokemonsArray from '../../types/PokemonsArray';
import LoadSpinner from '../LoadSpinner/LoadSpinner';

class ResultsTable extends Component {
  state: Readonly<{
    data: PokemonsArray[];
    isLoading: boolean;
  }> = {
    data: [],
    isLoading: true,
  };

  componentDidMount(): void {
    try {
      axios
        .get('https://pokeapi.co/api/v2/pokemon?limit=150&offset=0')
        .then((response) => {
          this.setState({ data: response.data.results });
        })
        .finally(() => this.setState({ isLoading: false }));
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
        {this.state.isLoading ? <LoadSpinner /> : null}
      </div>
    );
  }
}

export default ResultsTable;
