/* eslint-disable @next/next/no-img-element */
// components/AddUserModal.tsx
"use client";

import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { userListState } from "../../recoil/atoms";

const AddUserModal = ({ onClose }: { onClose: () => void }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [country, setCountry] = useState("");
  const [, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null); // 미리보기용 상태

  const setUserList = useSetRecoilState(userListState);

  const handleSave = () => {
    const newUser = {
      id: Date.now(),
      name,
      email,
      position,
      country,
      status: "Active", // 기본 값
      photo: photoPreview, // 사용자가 넣은 이미지 저장
    };
  
    setUserList((prevList) => [newUser, ...prevList]);
    onClose(); // 저장 후 팝업 닫기
  };
  
  const handleCancel = () => {
    setName("");
    setEmail("");
    setPosition("");
    setCountry("");
    setPhoto(null);
    setPhotoPreview(null); // 취소 시 미리보기 초기화
    onClose(); // 취소 시 팝업 닫기
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file)); // 미리보기 설정
    } else {
      setPhoto(null);
      setPhotoPreview(null);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Add New User</h2>

        <div className="mb-4">
          <label className="block text-sm">Name</label>
          <input
            type="text"
            className="border p-2 rounded w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm">Email</label>
          <input
            type="email"
            className="border p-2 rounded w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm">Position</label>
          <input
            type="text"
            className="border p-2 rounded w-full"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm">Country</label>
          <input
            type="text"
            className="border p-2 rounded w-full"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm">Photo</label>
          <input type="file" accept="image/*" onChange={handlePhotoUpload} />
          {photoPreview && <img src={photoPreview} alt="Preview" className="mt-2 w-24 h-24 object-cover rounded-full" />}
        </div>

        <div className="flex justify-end space-x-2">
          <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" onClick={handleCancel}>
            Cancel
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
