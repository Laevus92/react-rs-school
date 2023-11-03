type PaginationProps = {
  currentPage: number;
  pokemonsData: string[];
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export default PaginationProps;
