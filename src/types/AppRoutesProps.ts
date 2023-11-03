import { Dispatch, SetStateAction } from 'react';

export type AppRoutesProps = {
  searchValue: string;
  offset: number;
  searchingStatus: Dispatch<SetStateAction<boolean>>;
  currentPage: number;
  pokemonsData: string[];
  setOffset: Dispatch<SetStateAction<number>>;
  setCurrentPage: Dispatch<SetStateAction<number>>;
};
