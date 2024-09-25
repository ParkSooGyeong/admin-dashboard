import { useState, useEffect } from 'react';
import { Avatar, Badge, TextField, InputAdornment, IconButton } from '@mui/material';
import { FaComments, FaSearch, FaSun, FaMoon, FaInbox } from 'react-icons/fa'; // 새로운 아이콘 추가
import Link from 'next/link';

type HeaderProps = {
  toggleSidebar: () => void;
};

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const [isDarkMode, setIsDarkMode] = useState(false); // 다크모드 상태 관리

  useEffect(() => {
    // 다크 모드 활성화 시 HTML 태그에 'dark' 클래스를 추가
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
        {/* 모바일에서는 햄버거 메뉴 버튼 */}
        <button onClick={toggleSidebar} className="text-white focus:outline-none md:hidden">
          <FaSearch className="w-6 h-6" />
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

      {/* 우측: 메일 아이콘, 알림 아이콘, 프로필, 다크모드 토글 */}
      <div className="flex items-center space-x-6">
        {/* 메일 아이콘과 알림 배지 */}
        <Link href="#">
          <Badge badgeContent={6} color="error">
            <FaInbox className="w-6 h-6" />
          </Badge>
        </Link>

        {/* 알림 아이콘과 배지 */}
        <Link href="/messages">
          <Badge badgeContent={3} color="error">
            <FaComments className="w-6 h-6" />
          </Badge>
        </Link>
        {/* 다크모드 토글 버튼 */}
        <IconButton onClick={toggleDarkMode} color="inherit">
          {isDarkMode ? <FaSun className="w-6 h-6" /> : <FaMoon className="w-6 h-6" />}
        </IconButton>

        {/* 프로필 아바타 */}
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
