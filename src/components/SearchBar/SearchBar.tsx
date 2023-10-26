import { ChangeEvent, Component, ReactNode, MouseEvent } from 'react';
import './SearchBarStyle.scss';

type SearchProps = {
  names: string[];
  searchQuery(query: string): void;
};

class SearchBar extends Component<SearchProps> {
  state = {
    value: '',
  };

  handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({ value: event.target.value });
  }

  handleSubmitClick() {
    this.props.searchQuery(this.state.value);
  }

  handleVariantsClick(event: MouseEvent<HTMLDivElement>): void {
    this.setState({ value: event.currentTarget.innerText });
  }

  render(): ReactNode {
    return (
      <div className="search-bar">
        <input
          className="input"
          type="text"
          value={this.state.value}
          onChange={this.handleInputChange.bind(this)}
        />
        {!this.props.names.filter(
          (name) => name.toLowerCase() === this.state.value.toLowerCase()
        ).length && this.state.value ? (
          <div className="list">
            {this.props.names
              .filter((name) =>
                name.toLowerCase().includes(this.state.value.toLowerCase())
              )
              .map((name) => (
                <div
                  key={name}
                  className="list-item"
                  onClick={this.handleVariantsClick.bind(this)}
                >
                  {name[0].toUpperCase() + name.slice(1)}
                </div>
              ))}
          </div>
        ) : null}
        <button className="button" onClick={this.handleSubmitClick.bind(this)}>
          Search
        </button>
      </div>
    );
  }
}

export default SearchBar;
