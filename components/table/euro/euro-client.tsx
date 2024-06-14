'use client';

import { DataTable } from '@/components/ui/data-table';

import { euroColumns } from './euro-columns';

interface EuroClientProps {
  data?: {
    country: string;
    icon: string;
  }[];
  group?: string;
  footerClassName?: string;
  euroClassName?: string;
  className?: string;
  euCardClassName?: string;
  trashClassName?: string;
}

const EuroClient = ({
  data,
  group,
  footerClassName,
  euroClassName,
  className,
  euCardClassName,
  trashClassName,
}: EuroClientProps) => {
  return (
    <div className='pt-2 border-0'>
      <DataTable
        searchKey='teamHome'
        columns={euroColumns}
        data={data}
        className={className}
        group={group}
        footerClassName={footerClassName}
        euroClassName={euroClassName}
        euCardClassName={euCardClassName}
        trashClassName={trashClassName}
      />
    </div>
  );
};

export default EuroClient;
