'use client';

import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

import { Plus } from 'lucide-react';
// import { useParams, useRouter } from 'next/navigation';

import { DataTable } from '@/components/ui/data-table';

import { euroColumns } from './euro-columns';

interface EuroClientProps {
  data: {
    country: string;
    icon: string;
  }[];
  group?: string;
}

const EuroClient = ({ data, group }: EuroClientProps) => {
  return (
    <div className='pt-2 '>
      <DataTable
        searchKey='teamHome'
        columns={euroColumns}
        data={data}
        className='hidden'
        group={group}
      />
    </div>
  );
};

export default EuroClient;
