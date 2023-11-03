// import { MouseEvent } from 'react';

type PaginationProps = {
  // changePage: (event: MouseEvent<HTMLDivElement>) => void;
  currentPage: number;
  pokemonsData: string[];
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export default PaginationProps;
