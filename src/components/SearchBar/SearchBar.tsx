import './SearchBarStyle.scss';
import SearchProps from '../../types/SearchProps';
import { ChangeEvent, MouseEvent, useState } from 'react';
import GetPokemonsData from '../../services/GetPokemonsData';

export const SearchBar = (props: SearchProps) => {
  const [inputValue, setInputValue] = useState<string>(
    localStorage.getItem('searchQuery') || ''
  );
  function changeInputValue(event: ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  function clickOnVariant(event: MouseEvent<HTMLDivElement>) {
    if (event.currentTarget.textContent) {
      setInputValue(event.currentTarget.textContent);
    }
  }

  function clickOnSearchButton() {
    props.searchQuery(inputValue);
    localStorage.setItem('searchQuery', inputValue);
    props.searchingStatus(false);
  }

  async function breakApp() {
    const getPokemonsData = new GetPokemonsData();
    try {
      await getPokemonsData.makeFakeRequest();
    } catch (error) {
      throw new Error('There is an error');
    }
  }

  return (
    <div className="search-bar">
      <input
        className="input"
        type="text"
        value={inputValue}
        onChange={changeInputValue}
      />
      {!props.names.filter(
        (name) => name.toLowerCase() === inputValue.toLowerCase()
      ).length && inputValue ? (
        <div className="list">
          {props.names
            .filter((name) =>
              name.toLowerCase().includes(inputValue.toLowerCase())
            )
            .map((name) => (
              <div key={name} className="list-item" onClick={clickOnVariant}>
                {name[0].toUpperCase() + name.slice(1)}
              </div>
            ))}
        </div>
      ) : null}
      <button className="button" onClick={clickOnSearchButton}>
        Search
      </button>
      <button className="button" onClick={breakApp}>
        Be careful!
      </button>
    </div>
  );
};

// class SearchBar extends Component<SearchProps> {
//   state = {
//     value: localStorage.getItem('searchQuery') || '',
//     error: false,
//   };

//   handleInputChange(event: ChangeEvent<HTMLInputElement>) {
//     this.setState({ value: event.target.value });
//   }

//   handleSubmitClick() {
//     this.props.searchQuery(this.state.value);
//     localStorage.setItem('searchQuery', this.state.value);
//     this.props.searchingStatus(false);
//   }

//   async breakApp() {
//     const getPokemonsData = new GetPokemonsData();
//     try {
//       await getPokemonsData.makeFakeRequest();
//     } catch (error) {
//       this.setState({ error: true });
//     }
//   }

//   handleVariantsClick(event: MouseEvent<HTMLDivElement>): void {
//     this.setState({ value: event.currentTarget.innerText });
//   }

//   render(): ReactNode {
//     const { error } = this.state;
//     if (error) {
//       throw new Error();
//     }
//     return (
//       <div className="search-bar">
//         <input
//           className="input"
//           type="text"
//           value={this.state.value}
//           onChange={this.handleInputChange.bind(this)}
//         />
//         {!this.props.names.filter(
//           (name) => name.toLowerCase() === this.state.value.toLowerCase()
//         ).length && this.state.value ? (
//           <div className="list">
//             {this.props.names
//               .filter((name) =>
//                 name.toLowerCase().includes(this.state.value.toLowerCase())
//               )
//               .map((name) => (
//                 <div
//                   key={name}
//                   className="list-item"
//                   onClick={this.handleVariantsClick.bind(this)}
//                 >
//                   {name[0].toUpperCase() + name.slice(1)}
//                 </div>
//               ))}
//           </div>
//         ) : null}
//         <button className="button" onClick={this.handleSubmitClick.bind(this)}>
//           Search
//         </button>
//         <button className="button" onClick={this.breakApp.bind(this)}>
//           Be careful!
//         </button>
//       </div>
//     );
//   }
// }

// export default SearchBar;
