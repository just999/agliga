'use client';

import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../avatar';

import { RoutesProps, SafeUser } from '@/types/types';
import useModal from '@/hooks/use-modal';
import { useClickOutside } from '@/hooks/use-click-outside';

import { PiUserCirclePlusLight } from 'react-icons/pi';

import SidebarRoutes from './sidebar-routes';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { logOut } from '@/actions/auth-actions';
import UserAvatar from '../user-avatar';

type UserNavMenuProps = {
  user: { name: string | null; image: string | null } | null;
};

const UserNavMenu = ({ user }: UserNavMenuProps) => {
  const router = useRouter();
  // const [userStatus, setUserStatus] = useState<string>();

  const { toggle, isToggle, onOpen } = useModal((state) => ({
    toggle: state.toggle,
    isToggle: state.isToggle,
    onOpen: state.onOpen,
  }));

  const ref = useClickOutside(() => {
    if (isToggle) {
      toggle(isToggle);
    }
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost'>
          {/* <AiOutlineMenu /> */}
          {/* <Avatar
            src={user?.image}
            className='w-10 h-10 object-cover resize-none'
          /> */}
          {user?.image && user.name && (
            <UserAvatar src={user?.image} alt={user?.name} />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => onOpen('profile')}
            className='cursor-pointer'>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Keyboard shortcuts
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Email</DropdownMenuItem>
                <DropdownMenuItem>Message</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>More...</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            New Team
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>GitHub</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuItem disabled>API</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => logOut()} className='cursor-pointer '>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNavMenu;
