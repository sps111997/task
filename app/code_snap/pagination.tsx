//@ts-nocheck
import React, {useState, useCallback, useEffect} from 'react';
import Dropdown from '../Dropdown';
import './index.less';
import IconButton from '../IconButton';

export interface PaginationProps {
  id?: string;
  name?: string;
  total?: number;
  defaultPageSize?: string[] | number[];
  value: {currentActivePage: number; currentPageSize: number};
  onPageSizeChange?: (value: string) => any;
  onPreviousClick?: () => any;
  onNextClick?: () => any;
  className?: string;
}

const Pagination = (props: PaginationProps) => {
  const {
    id,
    name,
    defaultPageSize = ['10', '20', '50', '100'],
    total = 1,
    value,
    onPageSizeChange,
    onPreviousClick,
    onNextClick,
    className,
    ...rest
  } = props;

  const [currentActivePage, setCurrentActivePage] = useState(() => {
    if (value !== undefined) {
      return value.currentActivePage;
    } else {
      return 1;
    }
  });
  const [currentPageSize, setPageSize] = useState(() => {
    if (value !== undefined) {
      return value.currentPageSize;
    } else {
      return 10;
    }
  });

  useEffect(() => {
    setCurrentActivePage(value.currentActivePage);
    setPageSize(value.currentPageSize);
  }, [value]);

  const nextPage = () => {
    setCurrentActivePage(currentActivePage + 1);
    onNextClick?.({
      pageSize: currentPageSize,
      currentPage: currentActivePage + 1,
    });
  };
  const prevPage = () => {
    setCurrentActivePage(currentActivePage - 1);
    onPreviousClick?.({
      pageSize: currentPageSize,
      currentPage: currentActivePage - 1,
    });
  };

  const handlePageSizeChange = (values) => {
    setPageSize(values.value);
    onPageSizeChange?.(values);
  };


  const getFormattedOption = useCallback(() => {
    return defaultPageSize.map((value: string | number) => ({
      value: typeof value === 'number' ? value - 0 : value,
      name: typeof value === 'number' ? value - 0 : value,
    }));
  }, [defaultPageSize]);

  const getPaginationData = () => {
    const currentPageFrom = (currentActivePage - 1) * currentPageSize + 1;
    const currentPageTo =
      currentActivePage * currentPageSize > total
        ? total
        : currentActivePage * currentPageSize;
    return `${currentPageFrom}-${currentPageTo} of ${total} `;
  };

  return (
    <div className={`fds-pagination-wrapper`}>
      <div>
        <span className="fds-pagination-info">Showing </span>
        {getPaginationData()}
        <span className="fds-pagination-info">items</span>
      </div>
      <div className="fds-pagination-left-container">
        <div className="fds-pagination-dropdown-wrapper">
          <span className="fds-pagination-info">Rows per page</span>
          <Dropdown
            value={{value: currentPageSize, name: currentPageSize}}
            className="fds-pagination-dropdown"
            options={getFormattedOption()}
            disabled={total <= 10}
            placeholder={currentPageSize}
            placement="top"
            size="s"
            onChange={(e, value: any) => {
              handlePageSizeChange(value);
            }}
          />
        </div>
        {total > 10 && (
          <div className="fds-pagination-button-container">
            <IconButton
              kind={'tertiary'}
              onClick={prevPage}
              disabled={currentActivePage === 1}
              size={'l'}
              icon={
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  transform="rotate(-180)"
                >
                  <path
                    d="M9.99994 17.0002C9.86833 17.0009 9.73787 16.9757 9.61603 16.926C9.4942 16.8762 9.38338 16.8029 9.28994 16.7102C9.19621 16.6172 9.12182 16.5066 9.07105 16.3848C9.02028 16.2629 8.99414 16.1322 8.99414 16.0002C8.99414 15.8682 9.02028 15.7375 9.07105 15.6156C9.12182 15.4937 9.19621 15.3831 9.28994 15.2902L12.5899 12.0002L9.28994 8.71019C9.10164 8.52188 8.99585 8.26649 8.99585 8.00019C8.99585 7.86833 9.02182 7.73776 9.07228 7.61594C9.12274 7.49411 9.1967 7.38342 9.28994 7.29019C9.38318 7.19695 9.49387 7.12299 9.61569 7.07253C9.73751 7.02207 9.86808 6.99609 9.99994 6.99609C10.2662 6.99609 10.5216 7.10188 10.7099 7.29019L14.7099 11.2902C14.8037 11.3831 14.8781 11.4937 14.9288 11.6156C14.9796 11.7375 15.0057 11.8682 15.0057 12.0002C15.0057 12.1322 14.9796 12.2629 14.9288 12.3848C14.8781 12.5066 14.8037 12.6172 14.7099 12.7102L10.7099 16.7102C10.6165 16.8029 10.5057 16.8762 10.3838 16.926C10.262 16.9757 10.1315 17.0009 9.99994 17.0002Z"
                    fill="#B5B5B5"
                  ></path>
                </svg>
              }
            ></IconButton>
            <IconButton
              kind={'tertiary'}
              onClick={nextPage}
              size={'l'}
              disabled={
                currentActivePage === Math.ceil(total / currentPageSize)
              }
              icon={
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.99994 17.0002C9.86833 17.0009 9.73787 16.9757 9.61603 16.926C9.4942 16.8762 9.38338 16.8029 9.28994 16.7102C9.19621 16.6172 9.12182 16.5066 9.07105 16.3848C9.02028 16.2629 8.99414 16.1322 8.99414 16.0002C8.99414 15.8682 9.02028 15.7375 9.07105 15.6156C9.12182 15.4937 9.19621 15.3831 9.28994 15.2902L12.5899 12.0002L9.28994 8.71019C9.10164 8.52188 8.99585 8.26649 8.99585 8.00019C8.99585 7.86833 9.02182 7.73776 9.07228 7.61594C9.12274 7.49411 9.1967 7.38342 9.28994 7.29019C9.38318 7.19695 9.49387 7.12299 9.61569 7.07253C9.73751 7.02207 9.86808 6.99609 9.99994 6.99609C10.2662 6.99609 10.5216 7.10188 10.7099 7.29019L14.7099 11.2902C14.8037 11.3831 14.8781 11.4937 14.9288 11.6156C14.9796 11.7375 15.0057 11.8682 15.0057 12.0002C15.0057 12.1322 14.9796 12.2629 14.9288 12.3848C14.8781 12.5066 14.8037 12.6172 14.7099 12.7102L10.7099 16.7102C10.6165 16.8029 10.5057 16.8762 10.3838 16.926C10.262 16.9757 10.1315 17.0009 9.99994 17.0002Z"
                    fill="#B5B5B5"
                  />
                </svg>
              }
            ></IconButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pagination;
