import './CardStyle.scss';
import axios from 'axios';
import { Component, ReactNode } from 'react';
import CardProps from '../../types/CardProps';
import PokemonsData from '../../types/PokemonsData';

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

  componentDidUpdate(prevProps: Readonly<CardProps>): void {
    if (this.props.pokemonsName !== prevProps.pokemonsName) {
      try {
        const data = axios.get(
          `https://pokeapi.co/api/v2/pokemon/${this.props.pokemonsName}`
        );
        data.then((response) => this.setState({ pokemonsData: response.data }));
      } catch (error) {
        console.error(error);
      }
    }
  }

  render(): ReactNode {
    return (
      <div className="card">
        <div className="name">
          {this.props.pokemonsName[0].toUpperCase() +
            this.props.pokemonsName.slice(1)}
        </div>
        <div
          className="image"
          style={{
            backgroundImage: `url(${this.state.pokemonsData?.sprites.other['official-artwork']?.front_default})`,
          }}
        />
        <div className="card-wrapper">
          <div className="param-list">
            <div className="param-item">
              <span className="title">Height: </span>
              {this.state.pokemonsData?.height}
            </div>
            <div className="param-item">
              <span className="title">Weight: </span>
              {this.state.pokemonsData?.weight}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
