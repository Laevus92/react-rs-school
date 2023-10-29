import './ResultTableStyle.scss';
import Card from '../Card/Card';
import { Component, ReactNode } from 'react';
import PokemonsArray from '../../types/PokemonsArray';
import LoadSpinner from '../LoadSpinner/LoadSpinner';
import ResultTableProps from '../../types/ResultTableProps';
import GetPokemonsData from '../../services/GetPokemonsData';
import { AxiosError } from 'axios';

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

  fetchData = async (offset: number = 0) => {
    this.setState({ isLoading: true });
    const getPokemonsData = new GetPokemonsData();
    if (this.props.searchValue || localStorage.getItem('searchQuery')) {
      try {
        const response = await getPokemonsData.getPokemosData(
          this.props.searchValue.toLowerCase() ||
            localStorage.getItem('searchQuery')?.toLowerCase()
        );
        this.setState({ data: [response], isLoading: false });
        this.props.searchingStatus(false);
      } catch (error: unknown) {
        if (error instanceof AxiosError && error.response?.status === 404) {
          this.props.searchingStatus(true);
        } else {
          throw new Error("Can't load pokemons data");
        }
      }
    } else {
      try {
        const response = await getPokemonsData.getPokemonsList(offset);
        this.setState({
          data: response.results,
          totalCount: response.count,
          isLoading: false,
        });
        this.props.searchingStatus(false);
      } catch (error) {
        throw new Error("Can't load pokemons list");
      }
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
