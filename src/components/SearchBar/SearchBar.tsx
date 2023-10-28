import './SearchBarStyle.scss';
import SearchProps from '../../types/SearchProps';
import { ChangeEvent, Component, ReactNode, MouseEvent } from 'react';

class SearchBar extends Component<SearchProps> {
  state = {
    value: localStorage.getItem('searchQuery') || '',
  };

  handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({ value: event.target.value });
  }

  handleSubmitClick() {
    this.props.searchQuery(this.state.value);
    localStorage.setItem('searchQuery', this.state.value);
    this.props.searchingStatus(false);
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
