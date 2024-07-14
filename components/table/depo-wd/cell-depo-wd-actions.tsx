'use client';

import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
// import { ScheduleColumn } from './columns';
import toast from 'react-hot-toast';

import useModal from '@/hooks/use-modal';
import { useSession } from 'next-auth/react';
import { DepoWdProps } from '@/types';
import { Button } from '@/components/ui/button';
import { Depo, Wd } from '@prisma/client';

type CellDepoWdActionsProps = {
  data: DepoWdProps;
};

const CellDepoWdActions = ({ data }: CellDepoWdActionsProps) => {
  // const [depoWd, setDepoWd] = useState<DepoWdProps | {}>({});
  // const onCopy = (id: string) => {
  //   navigator.clipboard.writeText(id);
  //   toast.success('Billboard Id copied to clipboard');
  // };

  const { modalType, onOpen, setGroup, isOpen } = useModal();
  const { data: session, status } = useSession();
  const role = session?.user.curUser.role;

  // useEffect(() => {
  //   if (!data?.depoAmount || !data?.wdAmount) {
  //     return;
  //   }
  //   setDepoWd(data);
  // }, [setDepoWd]);

  // const week = data.week;

  // const period = data.name;
  // const newPeriod = period.slice(0, 2) + period.slice(3);
  const newDeleteModalType = 'delete-depo' || 'delete-wd';
  const newEditModalType = `edit-depo` || `edit-wd`;

  const id = data.id;
  const handleEditDepoWd = () => {
    if (!id) throw new Error('No data id found');

    onOpen('edit-depo', (data as Depo).id);
    // setGroup('edit-depo', isOpen === false, id);
    if ((data as Wd).wdAmount) {
      onOpen('edit-wd', id);
      // setGroup('edit-euro', isOpen === false, id);
    } else if (
      newEditModalType === 'edit-depo' ||
      newEditModalType === 'edit-wd'
    ) {
      onOpen(newEditModalType, id);
      // setGroup(newEditModalType, isOpen === false, week.toString(), data.name);
    }
  };
  // const title = `${modalType}`;

  const handleDeleteDepoWd = () => {
    const id = data.id;
    const deleteDepoTitle = 'delete depo';
    const deleteWdTitle = 'delete wd';
    if ((data as Depo).depoAmount) onOpen('delete-depo', id, deleteDepoTitle);
    // setGroup(newDeleteModalType, isOpen === false, week, period);
  };
  return (
    <DropdownMenu>
      {role === 'admin' && data.id && (
        <>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-4 w-4 p-0'>
              <span className='sr-only '>Open Menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align='end'
            className='backdrop-blur-sm bg-white/20'
          >
            {/* <DropdownMenuLabel className='text-xs '></DropdownMenuLabel> */}
            {/* <DropdownMenuItem
          onClick={() => onCopy(data.id)}
          className='text-[10px] cursor-pointer '
          >
          <Copy className='mr-4 h-4 w-4 ' />
          Copy Id
        </DropdownMenuItem> */}
            <DropdownMenuItem
              onClick={() => handleEditDepoWd()}
              className='text-xs text-slate-500 hover:text-black cursor-pointer hover:bg-emerald-100 '
            >
              <Edit className='mr-4 h-4 w-4' />
              Update
            </DropdownMenuItem>
            {newDeleteModalType && (
              <DropdownMenuItem
                onClick={() => handleDeleteDepoWd()}
                className='text-xs text-slate-500 hover:text-black hover:bg-emerald-100 cursor-pointer '
              >
                <Trash className='mr-4 h-4 w-4 ' />
                Delete
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </>
      )}
    </DropdownMenu>
  );
};

export default CellDepoWdActions;
