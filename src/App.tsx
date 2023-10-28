import './App.scss';
import axios from 'axios';
import SearchBar from './components/SearchBar/SearchBar';
import ResultsTable from './components/ResultsTable/ResultsTable';
import { Component, ReactNode } from 'react';
import PokemonsArray from './types/PokemonsArray';
import LoadSpinner from './components/LoadSpinner/LoadSpinner';
import Logo from './assets/image/svg/62cf234679dbabe18fa50a1e_pokeapi_256 1.svg';

class App extends Component {
  state: Readonly<{
    allPokemonsNames: string[];
    isLoading: boolean;
    searchQuery: string;
  }> = {
    allPokemonsNames: [],
    isLoading: true,
    searchQuery: '',
  };

  componentDidMount(): void {
    try {
      axios
        .get('https://pokeapi.co/api/v2/pokemon?limit=2000&offset=0')
        .then((response) => {
          this.setState({
            ...this.state,
            allPokemonsNames: response.data.results.map(
              (el: PokemonsArray) => el.name
            ),
          });
        })
        .finally(() => this.setState({ isLoading: false }));
    } catch (error) {
      console.error(error);
    }
  }

  setSearchQuery(query: string) {
    this.setState({ searchQuery: query });
  }

  render(): ReactNode {
    return (
      <div className="main-wrapper">
        <img className="logo" src={Logo} alt="Logo" />
        <SearchBar
          names={this.state.allPokemonsNames}
          searchQuery={this.setSearchQuery.bind(this)}
        />
        {this.state.isLoading ? (
          <LoadSpinner />
        ) : (
          <ResultsTable searchValue={this.state.searchQuery.toLowerCase()} />
        )}
      </div>
    );
  }
}

export default App;
