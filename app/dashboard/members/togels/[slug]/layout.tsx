import TogelSidebar from '@/components/dashboard/members/togels/togel-sidebar';

type TogelLayoutProps = {
  children: React.ReactNode;
  params: {
    slug: string;
  };
};

const TogelLayout = ({ children, params }: TogelLayoutProps) => {
  return (
    <div className='grid grid-cols-4 gap-4 '>
      <div className='col-span-1'>
        <TogelSidebar slug={params.slug} />
      </div>
      <div className='col-span-3'>{children}</div>
    </div>
  );
};

export default TogelLayout;
