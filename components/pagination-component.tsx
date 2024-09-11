'use client';

import { useEffect } from 'react';
import { Pagination } from './ui/pagination';

import { cn } from '@/lib/utils';
import { usePaginationStore } from '@/store/use-pagination-store';

type PaginationComponentProps = {
  totalCount: number;
};

const PaginationComponent = ({ totalCount }: PaginationComponentProps) => {
  // const [active, setActive] = useState(3);

  // const totalCOunt = 20;

  const { setPage, setPageSize, setPagination, pagination } =
    usePaginationStore((state) => ({
      setPage: state.setPage,
      setPageSize: state.setPageSize,
      setPagination: state.setPagination,
      pagination: state.pagination,
    }));

  const { pageNumber, pageSize, totalPages } = pagination;
  useEffect(() => {
    setPagination(totalCount);
  }, [setPagination, totalCount]);

  const start = (pageNumber - 1) * pageSize + 1;

  const end = Math.min(pageNumber * pageSize, totalCount);

  const resultText = `Showing ${start}-${end} of ${totalCount} results`;

  return (
    <div className='border-t-2 w-full mt-5 '>
      <div className='flex flex-row justify-between items-center py-5 '>
        <div> {resultText}</div>
        <Pagination
        // total={totalPages}
        // page={pageNumber}
        // variant='bordered'
        // onChange={setPage}
        />
        <div className='flex flex-row gap-1 items-center'>
          Page size:
          {[3, 6, 12].map((size) => (
            <div
              key={size}
              onClick={() => setPageSize(size)}
              className={cn(
                'page-size-box',
                pageSize === size &&
                  'bg-secondary  text-white hover:bg-secondary hover:text-white'
                // 'cursor-pointer border-2 hover:bg-gray-100 items-center justify-center rounded-lg shadow-sm min-w-[36px] w-9 h-9 text-sm'
              )}>
              {size}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaginationComponent;