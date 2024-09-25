"use client";

import React, { useState } from "react";
import { FaTrash, FaEdit, FaCheckCircle, FaTimesCircle, FaPlus, FaFileExport, FaCog, FaTrashAlt, FaExclamationCircle, FaEllipsisV } from "react-icons/fa";
import Avatar from "@mui/material/Avatar";
import { useRecoilState } from "recoil";
import { userListState } from "../../../recoil/atoms";
import AddUserModal from "../../components/AddUserModal";
import { saveAs } from 'file-saver';
import Image from 'next/image';


const DeleteUserModal = ({ userName, onConfirm, onCancel }: { userName: string; onConfirm: () => void; onCancel: () => void }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-sm">
        <div className="flex justify-center mb-4">
          <FaExclamationCircle className="text-red-500 text-8xl" />
        </div>
        <h2 className="text-lg font-semibold text-center mb-2">삭제</h2>
        <p className="text-center text-gray-600 mb-6">{userName}을 삭제하시겠습니까?</p>
        <div className="flex justify-end gap-2">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            onClick={onCancel}
          >
            아니오
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            onClick={onConfirm}
          >
            예
          </button>
        </div>
      </div>
    </div>
  );
};

const UserList = () => {
  const [users, setUsers] = useRecoilState(userListState);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null);
  const [userNameToDelete, setUserNameToDelete] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1); // currentPage 상태 선언
  const usersPerPage = 10;

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lastUserIndex = currentPage * usersPerPage;
  const firstUserIndex = lastUserIndex - usersPerPage;
  const currentUsers = filteredUsers.slice(firstUserIndex, lastUserIndex);

  const toggleSelectAll = () => {
    if (selectedUsers.length === currentUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(currentUsers.map((user) => user.id));
    }
  };

  const toggleSelectUser = (id: number) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  const openDeletePopup = (userId: number, userName: string) => {
    setUserIdToDelete(userId);
    setUserNameToDelete(userName);
    setIsDeleteModalOpen(true);
  };

  const deleteUser = () => {
    if (userIdToDelete !== null) {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userIdToDelete));
      setIsDeleteModalOpen(false);
      setUserIdToDelete(null);
      setUserNameToDelete("");
      setSelectedUsers([]);
    }
  };

  const exportToCSV = () => {
    const csvData = [
      ["Name", "Email", "Position", "Country", "Status"],
      ...users.map((user) => [user.name, user.email, user.position, user.country, user.status])
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "users.csv");
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);


  const iconSize = 20;

  return (
    <div className="container mx-auto p-4 bg-white">
      {isModalOpen && <AddUserModal onClose={() => setIsModalOpen(false)} />}
      {isDeleteModalOpen && (
        <DeleteUserModal
          userName={userNameToDelete}
          onConfirm={deleteUser}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      )}

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search for users"
            className="border px-4 py-2 rounded-lg w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex space-x-4 text-gray-500">
            <FaCog className="cursor-pointer" size={iconSize} />
            <FaTrashAlt
              className="cursor-pointer"
              size={iconSize}
              onClick={() => setIsDeleteModalOpen(true)}
            />
            <FaExclamationCircle className="cursor-pointer" size={iconSize} />
            <FaEllipsisV className="cursor-pointer" size={iconSize} />
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600"
            onClick={() => setIsModalOpen(true)}
          >
            <FaPlus size={iconSize} />
            <span>Add user</span>
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-600"
            onClick={exportToCSV}
          >
            <FaFileExport size={iconSize} />
            <span>Export</span>
          </button>
        </div>
      </div>

      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 min-w-full divide-y divide-gray-200 dark:divide-gray-600">
        <thead className="group/head text-xs uppercase text-gray-700 dark:text-gray-400 bg-gray-100 dark:bg-gray-700">
          <tr>
            <th className="text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400 p-4">
              <input
                type="checkbox"
                onChange={toggleSelectAll}
                checked={selectedUsers.length === currentUsers.length && currentUsers.length > 0}
                className="h-4 w-4 border-gray-300 rounded"
              />
            </th>
            <th className="text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400 p-4">Name</th>
            <th className="text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400 p-4">Position</th>
            <th className="text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400 p-4">Country</th>
            <th className="text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400 p-4">Status</th>
            <th className="text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400 p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id} className="border-b last:border-none">
              <td className="p-4">
                <input
                  type="checkbox"
                  onChange={() => toggleSelectUser(user.id)}
                  checked={selectedUsers.includes(user.id)}
                  className="h-4 w-4 border-gray-300 rounded"
                />
              </td>
              <td className="p-4 flex items-center space-x-2">
                {user.photo ? (
                  <Image
                    src={user.photo}
                    alt={user.name}
                    width={40}
                    height={40}
                    className="object-cover rounded-full"
                  />
                ) : (
                  <Avatar sx={{ width: 40, height: 40 }}>{user.name.charAt(0)}</Avatar>
                )}
                <div>
                  <div className="text-base font-semibold text-gray-900 dark:text-white">{user.name}</div>
                  <div className="text-sm font-normal text-gray-500 dark:text-gray-400">{user.email}</div>
                </div>
              </td>
              <td className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">{user.position}</td>
              <td className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">{user.country}</td>
              <td className="whitespace-nowrap p-4 text-base font-normal text-gray-900 dark:text-white">
                {user.status === "Active" ? (
                  <div className="flex items-center"><FaCheckCircle className="text-green-500" /><span className="pl-2">{user.status}</span></div>
                ) : (
                  <div className="flex items-center"><FaTimesCircle className="text-red-500" /><span className="pl-2">{user.status}</span></div>
                )}
              </td>
              <td className="p-4 flex space-x-2">
                <button className="flex items-center space-x-1 bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600">
                  <FaEdit size={iconSize} />
                  <span>Edit user</span>
                </button>
                <button
                  className="flex items-center space-x-1 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                  onClick={() => openDeletePopup(user.id, user.name)}
                >
                  <FaTrash size={iconSize} />
                  <span>Delete user</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-3 py-1 border rounded-lg ${
              currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-white text-black"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserList;
