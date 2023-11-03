import './PaginationStyle.scss';
import PaginationProps from '../../types/PaginationProps';

export const Pagination = (props: PaginationProps) => {
  return (
    <div className="pagination">
      <div className="button button_prev-page" onClick={props.changePage}>
        &larr;
      </div>
      <div className="button button_current-page">{props.currentPage}</div>
      <div className="button button_next-page" onClick={props.changePage}>
        &rarr;
      </div>
    </div>
  );
};
