type SearchProps = {
  names: string[];
  searchQuery(query: string): void;
  searchingStatus(status: boolean): void;
};
export default SearchProps;
