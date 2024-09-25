import { useState, useEffect } from 'react';
import { Avatar, Badge, TextField, InputAdornment, IconButton } from '@mui/material';
import { FaComments, FaSearch, FaSun, FaMoon, FaInbox, FaBars } from 'react-icons/fa';
import Link from 'next/link';

type HeaderProps = {
  toggleSidebar: () => void;
};

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const [isDarkMode, setIsDarkMode] = useState(false); // 다크모드 상태 관리

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <header className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center dark:bg-gray-900">
      {/* 좌측: 타이틀 및 모바일용 메뉴 버튼 */}
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="text-white focus:outline-none md:hidden">
          <FaBars className="w-6 h-6" />
        </button>
        {/* PC에서는 검색창 추가 */}
        <div className="hidden md:flex items-center ml-4">
          <TextField
            variant="outlined"
            placeholder="Search..."
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaSearch />
                </InputAdornment>
              ),
              sx: { color: 'black', backgroundColor: 'white', borderRadius: '4px' },
            }}
          />
        </div>
      </div>
      <div className="flex items-center space-x-6">
        <Link href="#">
          <Badge badgeContent={6} color="error">
            <FaInbox className="w-6 h-6" />
          </Badge>
        </Link>
        <Link href="/messages">
          <Badge badgeContent={3} color="error">
            <FaComments className="w-6 h-6" />
          </Badge>
        </Link>
        <IconButton onClick={toggleDarkMode} color="inherit">
          {isDarkMode ? <FaSun className="w-6 h-6" /> : <FaMoon className="w-6 h-6" />}
        </IconButton>
        <Link href="/users/profile">
          <Avatar
            alt="Profile"
            className="cursor-pointer"
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
