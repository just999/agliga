'use client';

import { DataTable } from '@/components/shadcn/ui/data-table';
import { wdColumns } from '@/components/table/depo-wd/wd-columns';
import { User, Wd } from '@prisma/client';

type WdClientProps = {
  wds: Wd[];
  users?: User[];
  className?: string;
};

const WdClient = ({ wds, users, className }: WdClientProps) => {
  return (
    <div>
      <DataTable columns={wdColumns} eu={wds} className={className} />
    </div>
  );
};

export default WdClient;
