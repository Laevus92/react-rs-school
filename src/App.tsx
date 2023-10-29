import './App.scss';
import SearchBar from './components/SearchBar/SearchBar';
import ResultsTable from './components/ResultsTable/ResultsTable';
import { Component, ReactNode, MouseEvent } from 'react';
import PokemonsArray from './types/PokemonsArray';
import LoadSpinner from './components/LoadSpinner/LoadSpinner';
import Logo from './assets/image/svg/62cf234679dbabe18fa50a1e_pokeapi_256 1.svg';
import Pagination from './components/pagination/Pagination';
import GetPokemonsData from './services/GetPokemonsData';

class App extends Component {
  state: Readonly<{
    allPokemonsNames: string[];
    isLoading: boolean;
    searchQuery: string;
    offset: number;
    currentPage: number;
    pokemonNotFound: boolean;
  }> = {
    allPokemonsNames: [],
    isLoading: true,
    searchQuery: '',
    offset: 0,
    currentPage: 1,
    pokemonNotFound: false,
  };

  componentDidMount(): void {
    const getPokemonsData = new GetPokemonsData();
    getPokemonsData
      .getNamesArray()
      .then((response) => {
        this.setState({
          ...this.state,
          allPokemonsNames: response.map((el: PokemonsArray) => el.name),
        });
      })
      .catch(() => {
        throw new Error("Something went wrong, can't get pokemons names");
      })
      .finally(() => this.setState({ isLoading: false }));
  }

  setSearchQuery(query: string) {
    this.setState({ searchQuery: query });
  }

  changePage(event: MouseEvent<HTMLDivElement>) {
    if (
      event.currentTarget.classList.contains('button_prev-page') &&
      this.state.currentPage > 1
    ) {
      this.setState({
        currentPage: this.state.currentPage - 1,
        offset: this.state.offset - 16,
      });
    } else if (
      event.currentTarget.classList.contains('button_next-page') &&
      this.state.currentPage <
        Math.ceil(this.state.allPokemonsNames.length / 16)
    ) {
      this.setState({
        currentPage: this.state.currentPage + 1,
        offset: this.state.offset + 16,
      });
    }
  }

  changeSearchingStatus(status: boolean) {
    this.setState({ pokemonNotFound: status });
  }

  render(): ReactNode {
    return (
      <div className="main-wrapper">
        <img className="logo" src={Logo} alt="Logo" />

        <SearchBar
          names={this.state.allPokemonsNames}
          searchQuery={this.setSearchQuery.bind(this)}
          searchingStatus={this.changeSearchingStatus.bind(this)}
        />
        {this.state.isLoading ? (
          <LoadSpinner />
        ) : this.state.pokemonNotFound ? (
          <div className="error-message">
            Pokemon
            <span className="title">{` ${
              localStorage.getItem('searchQuery') || this.state.searchQuery
            } `}</span>
            not found 😭
            <br />
            Check pokemons name!
          </div>
        ) : (
          <ResultsTable
            searchValue={this.state.searchQuery.toLowerCase()}
            offset={this.state.offset}
            searchingStatus={this.changeSearchingStatus.bind(this)}
          />
        )}
        {this.state.searchQuery ||
        localStorage.getItem('searchQuery') ? null : (
          <Pagination
            changePage={this.changePage.bind(this)}
            currentPage={this.state.currentPage}
          />
        )}
      </div>
    );
  }
}

export default App;
