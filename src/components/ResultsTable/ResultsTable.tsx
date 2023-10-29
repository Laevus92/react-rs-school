import './ResultTableStyle.scss';
import Card from '../Card/Card';
import { Component, ReactNode } from 'react';
import PokemonsArray from '../../types/PokemonsArray';
import LoadSpinner from '../LoadSpinner/LoadSpinner';
import ResultTableProps from '../../types/ResultTableProps';
import GetPokemonsData from '../../services/GetPokemonsData';

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
    const getPokemonsData = new GetPokemonsData();
    if (this.props.searchValue || localStorage.getItem('searchQuery')) {
      getPokemonsData
        .getPokemosData(
          this.props.searchValue.toLowerCase() ||
            localStorage.getItem('searchQuery')?.toLowerCase()
        )
        .then((response) => {
          this.setState({ data: [response] });
          this.props.searchingStatus(false);
        })
        .catch(() => {
          this.props.searchingStatus(true);
          throw new Error("Can't load pokemons data");
        })
        .finally(() => this.setState({ isLoading: false }));
    } else {
      getPokemonsData
        .getPokemonsList(offset)
        .then((response) => {
          this.setState({
            data: response.results,
            totalCount: response.count,
          });
          this.props.searchingStatus(false);
        })
        .catch(() => {
          throw new Error("Can't load pokemons list");
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
