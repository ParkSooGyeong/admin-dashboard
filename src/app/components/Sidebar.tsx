"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import Link from 'next/link';
import { FaTachometerAlt, FaTasks, FaUserFriends, FaComments, FaChartLine, FaUser } from 'react-icons/fa';

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const [openUsersMenu, setOpenUsersMenu] = useState(false);
  const pathname = usePathname();

  // /users 경로일 때 대분류가 열리도록 설정
  useEffect(() => {
    if (pathname.includes('/users')) {
      setOpenUsersMenu(true);
    }
  }, [pathname]);

  const toggleUsersMenu = () => {
    setOpenUsersMenu(!openUsersMenu); // 대분류를 다시 클릭하면 소분류 메뉴가 닫힘
  };

  const isActive = (path: string) => pathname.includes(path);

  // 링크 클릭 시 대분류를 닫지 않음
  const handleLinkClick = () => {
    onClose();
  };

  return (
    <div
      className={`sidebar fixed inset-y-0 left-0 bg-gray-800 text-white transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out md:translate-x-0 md:static overflow-y-auto`}
      style={{ width: '260px', zIndex: 9999 }}
    >
      <div className="px-4 py-4 text-xl font-bold">
        <Link href="/" onClick={handleLinkClick}>Admin Dashboard</Link>
      </div>
      <nav className="mt-10">
        <ul>
          <li className={`px-4 py-2 flex items-center hover:bg-gray-700 ${isActive('/dashboard') ? 'bg-gray-700' : ''}`}>
            <FaTachometerAlt className="mr-2" />
            <Link href="/dashboard" onClick={handleLinkClick}>Dashboard</Link>
          </li>
          <li className={`px-4 py-2 flex items-center hover:bg-gray-700 ${isActive('/kanban') ? 'bg-gray-700' : ''}`}>
            <FaTasks className="mr-2" />
            <Link href="/kanban" onClick={handleLinkClick}>Kanban</Link>
          </li>
          <li className={`px-4 py-2 flex items-center hover:bg-gray-700 ${isActive('/stock') ? 'bg-gray-700' : ''}`}>
            <FaChartLine className="mr-2" />
            <Link href="/stock" onClick={handleLinkClick}>Stock</Link>
          </li>
          <li className={`px-4 py-2 flex items-center hover:bg-gray-700 ${isActive('/profile') ? 'bg-gray-700' : ''}`}>
            <FaUser className="mr-2" />
            <Link href="/profile" onClick={handleLinkClick}>Profile</Link>
          </li>
          <li
            className={`px-4 py-2 flex items-center justify-between hover:bg-gray-700 cursor-pointer ${
              isActive('/users') ? 'bg-gray-700' : ''
            }`}
            onClick={toggleUsersMenu}
          >
            <div className="flex items-center">
              <FaUserFriends className="mr-2" />
              <span>Users</span>
            </div>
            {openUsersMenu ? <ExpandLess /> : <ExpandMore />}
          </li>
          {openUsersMenu && (
            <ul className="ml-6">
              <li className={`px-4 py-2 hover:bg-gray-700 ${isActive('/users/userlist') ? 'bg-gray-700' : ''}`}>
                <Link href="/users/userlist" onClick={handleLinkClick}>User List</Link>
              </li>
            </ul>
          )}
          <li className={`px-4 py-2 flex items-center hover:bg-gray-700 ${isActive('/messages') ? 'bg-gray-700' : ''}`}>
            <FaComments className="mr-2" />
            <Link href="/messages" onClick={handleLinkClick}>Messages</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
