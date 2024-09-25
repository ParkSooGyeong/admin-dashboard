"use client";

import React from "react";
import { useRecoilState } from "recoil";
import { popupState } from "../../recoil/atoms";

const DeleteUserModal = ({ onConfirm }: { onConfirm: () => void }) => {
  const [popup, setPopup] = useRecoilState(popupState); // Recoil 상태 사용

  const handleClose = () => {
    setPopup({ isOpen: false, userId: null });
  };

  return (
    popup.isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">삭제하시겠습니까?</h2>
          <div className="flex justify-end space-x-4">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              onClick={handleClose}
            >
              No
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={onConfirm}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default DeleteUserModal;
