import axios from 'axios';

class GetPokemonsData {
  public async getNamesArray() {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=2000&offset=0';
    const response = await axios.get(url);
    return response.data.results;
  }
  public async getPokemosData(name: string | undefined) {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    const response = await axios.get(url);
    return response.data;
  }
  public async getPokemonsList(offset: number, limit: number = 16) {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    const response = await axios.get(url);
    return response.data;
  }
  public async makeFakeRequest() {
    const url = `https://pokeapi.co/api.pipi/v2/pokemon`;
    const response = await axios.get(url);
    return response.data;
  }
}

export default GetPokemonsData;
