'use client';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '../ui/command';
import Link from 'next/link';
import {
  dashboardAdminMenu,
  dashboardSettingMenu,
  dashboardUserMenu,
} from '@/lib/helper';
import { notFound, usePathname, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import ClientOnly from '@/lib/client-only';
import { useMessageStore } from '@/store/use-message-store';
import ClientSideNav from '../navbar/client-side-nav';

type DashboardSidebarProps = {
  userId?: string;
  userRole?: 'admin' | 'user';
};

export type ContainerProps = {
  container: 'outbox' | 'inbox';
};

const DashboardSidebar = ({ userId, userRole }: DashboardSidebarProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { unreadCount } = useMessageStore((state) => ({
    unreadCount: state.unreadCount,
  }));

  const isOutbox = searchParams?.get('container') === 'outbox';

  const container = isOutbox ? 'outbox' : 'inbox';

  if (!userId) {
    notFound();
    return null;
  }
  // const menuItems = dashboardUserMenu(userId);

  const linksTitle = ['Deposits', 'Wds', 'Messages'];

  const dashboardMenu =
    userRole === 'admin' ? dashboardAdminMenu : dashboardUserMenu;

  const userDepo = dashboardMenu.filter((item) =>
    linksTitle.includes(item.title)
  );
  const userDepoNot = dashboardMenu.filter(
    (item) => !linksTitle.includes(item.title)
  );
  const userDepoMessagesLink = userDepo.map((item) => {
    if (typeof item.link === 'function') {
      if (item.title === 'Deposits' || item.title === 'Wds') {
        return item.link(userId);
      } else if (item.title === 'Messages') {
        return item.link(container);
      }
    }
  });
  const userDepoItem = dashboardUserMenu.find(
    (item) => item.title === 'Deposits'
  );
  const userWdItem = dashboardUserMenu.find((item) => item.title === 'Wds');

  const userMessageItem = dashboardUserMenu.find(
    (item) => item.title === 'Messages'
  );

  const userDepoLink =
    typeof userDepoItem?.link === 'function'
      ? userDepoItem.link(userId)
      : userDepoItem?.link;

  const userWdLink =
    typeof userWdItem?.link === 'function'
      ? userWdItem.link(userId)
      : userWdItem?.link;

  const userMessageLink =
    typeof userMessageItem?.link === 'function'
      ? userMessageItem.link(container)
      : userMessageItem?.link;

  const resolveMessageLink = (
    link: string | ((container: string) => string),
    container: string
  ): string => {
    if (typeof link === 'function') {
      return link(container);
    }
    return link;
  };
  const resolveDepoLink = (
    link: string | ((userId: string) => string),
    userId: string
  ): string => {
    if (typeof link === 'function') {
      return link(userId);
    }
    return link;
  };

  const resolveWdLink = (
    link: string | ((userId: string) => string),
    userId: string
  ): string => {
    if (typeof link === 'function') {
      return link(userId);
    }
    return link;
  };
  // const url = isOutbox ? '?container=outbox' : '?container=inbox';

  // Find the Messages item and resolve the link dynamically
  const adminMessagesItem = dashboardAdminMenu?.find(
    (item) => item.title === 'Messages'
  );

  const adminMessagesLink =
    typeof adminMessagesItem?.link === 'function'
      ? adminMessagesItem.link(container)
      : adminMessagesItem?.link;

  const resolveLink = (
    link: string | ((container: string) => string),
    container: string
  ): string => {
    if (typeof link === 'function') {
      return link(container);
    }
    return link;
  };

  const isActiveRoute = (
    currentPath: string,
    menuPath: string | ((arg: string) => string)
  ) => {
    let path =
      typeof menuPath === 'function' ? menuPath(userId || container) : menuPath;

    // Special case for dashboard root
    if (path === '/dashboard') {
      return currentPath === path;
    }

    // Special case for messages
    if (
      path.startsWith('/dashboard/messages') ||
      path.startsWith('/dashboard/admin/messages')
    ) {
      return currentPath.split('?')[0] === path.split('?')[0];
    }

    // For other routes
    return currentPath.startsWith(path);
  };

  return (
    <ClientOnly>
      <ClientSideNav>
        {({ pathname }) => (
          <Command className='bg-stone-100 rounded-none h-screen'>
            <CommandInput placeholder='Type a command or search...' />
            <CommandList className='max-h-[100vh]'>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading='Member' className='p-0 pl-1'>
                {dashboardUserMenu.map(({ title, icon: Icon, link }) => {
                  const depoLink = title === 'Deposits' ? userDepoLink : link;
                  if (!depoLink) return null;

                  const wdLink = title === 'Wds' ? userWdLink : link;
                  if (!wdLink) return null;

                  const messageLink =
                    title === 'Messages' ? userMessageLink : link;
                  if (!messageLink) return null;

                  const resolvedDepoWdLink =
                    title === 'Deposits'
                      ? resolveDepoLink(depoLink, userId)
                      : resolveWdLink(wdLink, userId);

                  return (
                    <CommandItem
                      key={title}
                      className={cn(
                        'w-full pl-2 h-8 group hover:!bg-orange-100/70 cursor-pointer ',
                        isActiveRoute(pathname || '', resolvedDepoWdLink)
                          ? ' text-white-50  bg-orange-500 shadow-lg text-shadow border-r-4 border-solid aria-selected:bg-orange-500 aria-selected:text-white  border-amber-600 transition font-semibold'
                          : 'text-gray-600 bg-stone-100'
                      )}>
                      <Icon
                        className={cn(
                          'svg mr-2 h-4 w-4 group-hover:text-black',
                          isActiveRoute(pathname || '', resolvedDepoWdLink)
                            ? 'text-white '
                            : 'fill-gray-300'
                        )}
                      />
                      <Link
                        href={resolvedDepoWdLink}
                        className={cn(
                          'svg mr-2 h-4 w-4 group-hover:text-black group-hover:font-normal',
                          isActiveRoute(pathname || '', resolvedDepoWdLink)
                            ? 'text-yellow-50 font-light'
                            : 'fill-gray-300'
                        )}>
                        <span>{title}</span>
                        {userRole === 'user' &&
                          resolvedDepoWdLink.startsWith(
                            '/dashboard/messages'
                          ) &&
                          unreadCount > 0 && (
                            <span className='ml-1 text-emerald-400 font-bold'>
                              ({unreadCount})
                            </span>
                          )}
                      </Link>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading='Settings' className='p-0 py-1.5'>
                {dashboardSettingMenu.map(
                  ({ title, icon: Icon, link, shortcut }) => (
                    <CommandItem
                      key={title}
                      className={cn(
                        'w-full pl-2 h-8 group cursor-pointer hover:!bg-green-200',
                        pathname === link
                          ? 'text-white-50 !bg-emerald-500 aria-selected:bg-emerald-500 aria-selected:text-white shadow-lg text-shadow border-r-4 border-solid  border-emerald-600 transition font-semibold'
                          : 'text-gray-600 bg-stone-100'
                      )}>
                      <Icon
                        className={cn(
                          'svg mr-2 h-4 w-4 group-hover:text-black',
                          pathname === link ? 'text-white ' : 'fill-gray-300'
                        )}
                      />
                      <Link
                        href={link}
                        className={cn(
                          'svg mr-2 h-4 w-4 group-hover:text-black group-hover:font-normal',
                          pathname === link
                            ? 'text-yellow-50 font-light'
                            : 'fill-gray-300'
                        )}>
                        {title}
                      </Link>
                      <CommandShortcut
                        className={cn(
                          'svg mr-2 h-4 w-4 group-hover:text-black group-hover:font-normal',
                          pathname === link
                            ? 'text-yellow-50 font-light'
                            : 'fill-gray-300'
                        )}>
                        {shortcut}
                      </CommandShortcut>
                    </CommandItem>
                  )
                )}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading='Admin' className='p-0 pl-1'>
                {dashboardAdminMenu.map(({ title, icon: Icon, link }) => {
                  const itemLink =
                    title === 'Messages' ? adminMessagesLink : link;
                  if (!itemLink) return null;

                  const resolvedLink = resolveLink(itemLink, container);
                  return (
                    <CommandItem
                      key={title}
                      className={cn(
                        'w-full pl-2 h-8 group cursor-pointer hover:!bg-sky-200',
                        isActiveRoute(pathname || '', resolvedLink)
                          ? 'text-white-50 !bg-sky-500 aria-selected:bg-sky-500 aria-selected:text-white shadow-lg text-shadow border-r-4 border-solid  border-sky-800 transition font-semibold'
                          : 'text-gray-600 bg-stone-100'
                      )}>
                      <Icon
                        className={cn(
                          'svg mr-2 h-4 w-4 group-hover:text-black',
                          isActiveRoute(pathname || '', resolvedLink)
                            ? 'text-white '
                            : 'fill-gray-300'
                        )}
                      />
                      <Link
                        href={resolvedLink}
                        className={cn(
                          'svg mr-2 h-4 w-4 group-hover:text-black group-hover:font-normal',
                          isActiveRoute(pathname || '', resolvedLink)
                            ? 'text-yellow-50 font-light'
                            : 'fill-gray-300'
                        )}>
                        <span>{title}</span>
                        {userRole === 'admin' &&
                          resolvedLink.startsWith(
                            '/dashboard/admin/messages'
                          ) &&
                          unreadCount > 0 && (
                            <span className='ml-1 text-emerald-400 font-bold'>
                              ({unreadCount})
                            </span>
                          )}
                      </Link>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        )}
      </ClientSideNav>
    </ClientOnly>
  );
};

export default DashboardSidebar;
