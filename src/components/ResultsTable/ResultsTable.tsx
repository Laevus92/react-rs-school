import axios from 'axios';
import './ResultTableStyle.scss';
import Card from '../Card/Card';
import { Component, ReactNode } from 'react';
import PokemonsArray from '../../types/PokemonsArray';
import LoadSpinner from '../LoadSpinner/LoadSpinner';

type ResultTableProps = {
  searchValue: string;
};

class ResultsTable extends Component<ResultTableProps> {
  state: Readonly<{
    data: PokemonsArray[];
    isLoading: boolean;
  }> = {
    data: [],
    isLoading: true,
  };

  componentDidMount(): void {
    this.fetchData();
  }

  componentDidUpdate(prevProps: Readonly<ResultTableProps>): void {
    if (this.props.searchValue !== prevProps.searchValue) {
      this.fetchData();
    }
  }

  fetchData = () => {
    this.setState({ isLoading: true });

    if (this.props.searchValue) {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${this.props.searchValue}`)
        .then((response) => {
          this.setState({ data: [response.data] });
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => this.setState({ isLoading: false }));
    } else {
      axios
        .get('https://pokeapi.co/api/v2/pokemon?limit=150&offset=0')
        .then((response) => {
          this.setState({ data: response.data.results });
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => this.setState({ isLoading: false }));
    }
  };

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
