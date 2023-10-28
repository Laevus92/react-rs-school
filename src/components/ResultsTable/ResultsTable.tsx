import axios from 'axios';
import './ResultTableStyle.scss';
import Card from '../Card/Card';
import { Component, ReactNode } from 'react';
import PokemonsArray from '../../types/PokemonsArray';
import LoadSpinner from '../LoadSpinner/LoadSpinner';

type ResultTableProps = {
  searchValue: string;
  offset: number;
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
    this.fetchData(this.props.offset);
  }

  componentDidUpdate(prevProps: Readonly<ResultTableProps>): void {
    if (
      this.props.searchValue !== prevProps.searchValue ||
      this.props.offset !== prevProps.offset
    ) {
      this.fetchData(this.props.offset);
    }
  }

  fetchData = (offset: number = 0) => {
    this.setState({ isLoading: true });

    if (this.props.searchValue || localStorage.getItem('searchQuery')) {
      axios
        .get(
          `https://pokeapi.co/api/v2/pokemon/${
            this.props.searchValue ||
            localStorage.getItem('searchQuery')?.toLowerCase()
          }`
        )
        .then((response) => {
          this.setState({ data: [response.data] });
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => this.setState({ isLoading: false }));
    } else {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon?limit=16&offset=${offset}`)
        .then((response) => {
          this.setState({
            data: response.data.results,
            totalCount: response.data.count,
          });
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
