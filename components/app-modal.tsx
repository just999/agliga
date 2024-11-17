import { ReactNode } from 'react';

import { Button, ButtonProps } from './shadcn/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from './shadcn/ui/dialog';

type AppModalProps = {
  isOpen: boolean;
  onClose: () => void;
  header?: string;
  body: ReactNode;
  footerButtons?: ButtonProps[];
  imageModal?: boolean;
};

const AppModal = ({
  isOpen,
  header,
  onClose,
  body,
  imageModal,
  footerButtons,
}: AppModalProps) => {
  const handleClose = () => {
    setTimeout(() => onClose(), 10);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>Edit Profile</Button>
      </DialogTrigger>
      <DialogContent>
        {!imageModal && (
          <DialogHeader className='flex flex-col gap-1 text-gray-700'>
            {header}
          </DialogHeader>
        )}
        <DialogContent className='text-stone-600'>{body}</DialogContent>
        {!imageModal && (
          <DialogFooter>
            {footerButtons?.map((props: ButtonProps, i) => (
              <Button {...props} key={i}>
                {props.children}
              </Button>
            ))}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AppModal;
