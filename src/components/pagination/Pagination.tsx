import './PaginationStyle.scss';
import { Component, ReactNode } from 'react';
import PaginationProps from '../../types/PaginationProps';

class Pagination extends Component<PaginationProps> {
  render(): ReactNode {
    return (
      <div className="pagination">
        <div
          className="button button_prev-page"
          onClick={this.props.changePage}
        >
          &larr;
        </div>
        <div className="button button_current-page">
          {this.props.currentPage}
        </div>
        <div
          className="button button_next-page"
          onClick={this.props.changePage}
        >
          &rarr;
        </div>
      </div>
    );
  }
}

export default Pagination;
