import { ChangeEvent, Component, ReactNode } from 'react';
import './SearchBarStyle.scss';

class SearchBar extends Component {
  state = {
    value: '',
  };

  handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({ value: event.target.value });
  }

  handleSubmitClick() {
    console.log(this.state.value);
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
        <button className="button" onClick={this.handleSubmitClick.bind(this)}>
          Search
        </button>
      </div>
    );
  }
}

export default SearchBar;
