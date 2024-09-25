"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Avatar from '@mui/material/Avatar';
import { IconButton } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const Profile = () => {
  const [backgroundImage, setBackgroundImage] = useState('/images/profile-back.webp');

  const handleBackgroundChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBackgroundImage(imageUrl);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white shadow-md rounded-lg overflow-hidden w-full max-w-screen-lg relative" style={{ maxWidth: '1000px' }}>
        <div className="relative">
          <div className="w-full h-48 relative">
            <Image
              src={backgroundImage}
              alt="Profile background"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="absolute inset-0 flex justify-center" style={{ top: '70%', transform: 'translateY(-50%)' }}>
            <Avatar
              alt="Profile"
              src="/profile-picture.jpg"
              sx={{ width: 150, height: 150 }}
            />
          </div>
          <div className="absolute bottom-2 right-2">
            <input
              type="file"
              id="upload-background"
              accept="image/*"
              className="hidden"
              onChange={handleBackgroundChange}
            />
            <label htmlFor="upload-background">
              <IconButton component="span" className="bg-white p-2 rounded-full">
                <CameraAltIcon />
              </IconButton>
            </label>
          </div>
        </div>

        <div className="text-center p-8 mt-16 pb-16">
          <h1 className="font-bold text-xl text-gray-600">Front-End Back-End Developer</h1>
          <div className="mt-4 text-sm text-gray-400 space-y-4 leading-relaxed px-5">
            <p>프론트엔드 개발을 중심으로 다양한 기술 스택을 활용한 경험을 쌓아왔습니다. React.js와 Vue.js를 주로 사용하며, TypeScript 도입과 활용 경험이 있습니다.</p>
            <p>Node.js(Express, Nest.js), Python(Django), Ruby(Rails), PHP(CodeIgniter) 등 여러 백엔드 언어와 프레임워크를 실무에서 다루었습니다.</p>
            <p>DevOps, 데이터베이스 마이그레이션, 데이터 시각화, 실시간 데이터 처리 등 다양한 기술적 문제를 해결해왔습니다.</p>
            <p>기획자, 디자이너와의 협업을 통해 목표와 방향성을 명확히 공유하며, 프로젝트의 일정 준수를 중요하게 생각합니다.</p>
            <p>React Native로 간단한 앱을 배포하고, Flutter 학습도 진행했습니다. 현재는 Next.js와 TypeScript를 활용한 웹 애플리케이션 개발에 집중하고 있습니다.</p>
            <p>저는 프론트엔드뿐만 아니라 풀스택 개발자로서도 기여할 수 있으며, 새로운 기술을 꾸준히 배우고 적용해 나가는 중입니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
