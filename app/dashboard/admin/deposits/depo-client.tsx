import { DataTable } from '@/components/shadcn/ui/data-table';
import { depoColumns } from '@/components/table/depo-wd/depo-columns';
import { Depo, User } from '@prisma/client';

type DepoClientProps = {
  depos: Depo[];
  className?: string;
  users?: User[];
};

const DepoClient = ({ depos, users, className }: DepoClientProps) => {
  return (
    <div>
      <DataTable columns={depoColumns} eu={depos} className={className} />
    </div>
  );
};

export default DepoClient;
