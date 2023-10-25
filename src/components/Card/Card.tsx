import './CardStyle.scss';
import axios from 'axios';
import { Component, ReactNode } from 'react';
import CardProps from '../../types/CardProps';
import PokemonsData from '../../types/PokemonsData';
import PokeBall from '../../assets/image/png/pokemon-logo-png-1446.png';

class Card extends Component<CardProps> {
  constructor(props: Readonly<{ pokemonsName: string }>) {
    super(props);
  }

  state: Readonly<{ pokemonsData: PokemonsData | null }> = {
    pokemonsData: null,
  };

  componentDidMount(): void {
    try {
      const data = axios.get(
        `https://pokeapi.co/api/v2/pokemon/${this.props.pokemonsName}`
      );
      data.then((response) => this.setState({ pokemonsData: response.data }));
    } catch (error) {
      console.error(error);
    }
  }

  render(): ReactNode {
    return (
      <div className="card">
        <img src={PokeBall} alt="pokeball-icon" className="image" />
        <div className="card-wrapper">
          <div className="name">
            {this.props.pokemonsName[0].toUpperCase() +
              this.props.pokemonsName.slice(1)}
          </div>
          <div className="param-list">
            <div className="param-item">
              <span className="title">Height: </span>
              {this.state.pokemonsData?.height} inch
            </div>
            <div className="param-item">
              <span className="title">Weight: </span>
              {this.state.pokemonsData?.weight} lb
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
