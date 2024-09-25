"use client";

import { useState } from "react";
import { FaStar, FaTrashAlt, FaRegSmile, FaSyncAlt, FaCog } from "react-icons/fa";

interface Email {
  id: number;
  sender: string;
  subject: string;
  date: string;
  starred: boolean;
}

const initialEmails: Email[] = [
  { id: 1, sender: "Musharof Chowdhury", subject: "Some note & Lorem Ipsum available alteration in some form.", date: "17 Oct, 2024", starred: false },
  { id: 2, sender: "Naimur Rahman", subject: "Lorem Ipsum available alteration in some form.", date: "25 Nov, 2024", starred: true },
  { id: 3, sender: "Juhan Ahamed", subject: "Lorem Ipsum available alteration in some form.", date: "25 Nov, 2024", starred: true },
  { id: 4, sender: "Mahbub Hasan", subject: "Lorem Ipsum available alteration in some form.", date: "19 Dec, 2024", starred: false },
  { id: 5, sender: "Shafiq Hammad", subject: "Lorem Ipsum available alteration in some form.", date: "20 Dec, 2024", starred: false },
];

const InboxPage = () => {
  const [emails, setEmails] = useState<Email[]>(initialEmails);

  const toggleStarred = (id: number) => {
    setEmails(emails.map(email => email.id === id ? { ...email, starred: !email.starred } : email));
  };

  return (
    <div className="flex h-[calc(100vh-72px)] bg-gray-50">
      {/* 좌측 사이드바 */}
      <div className="w-1/4 bg-white p-6 border-r border-gray-300">
        <button className="w-full bg-purple-600 text-white py-2 rounded-lg mb-6">Compose</button>
        <ul className="space-y-4">
          <li className="flex items-center space-x-2 text-gray-700">
            <FaRegSmile />
            <span>Inbox</span>
          </li>
          <li className="flex items-center space-x-2 text-gray-700">
            <FaStar />
            <span>Started</span>
          </li>
          <li className="flex items-center space-x-2 text-gray-700">
            <FaSyncAlt />
            <span>Snoozed</span>
          </li>
          <li className="flex items-center space-x-2 text-gray-700">
            <FaTrashAlt />
            <span>Trash</span>
          </li>
        </ul>
      </div>

      {/* 메일 리스트 */}
      <div className="w-3/4 bg-white p-6">
        {/* 상단 메뉴바 */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            <button className="text-gray-600">
              <FaTrashAlt />
            </button>
            <button className="text-gray-600">
              <FaSyncAlt />
            </button>
            <button className="text-gray-600">
              <FaRegSmile />
            </button>
          </div>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Search for user, email address..."
              className="p-2 border rounded-lg text-sm w-72"
            />
            <button className="text-gray-600">
              <FaCog />
            </button>
          </div>
        </div>

        {/* 이메일 테이블 */}
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left text-gray-500 text-sm">
              <th className="py-2 px-4">Sender</th>
              <th className="py-2 px-4">Subject</th>
              <th className="py-2 px-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {emails.map((email) => (
              <tr key={email.id} className="border-t">
                <td className="py-2 px-4 flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <button onClick={() => toggleStarred(email.id)} className="mr-2">
                    {email.starred ? (
                      <FaStar className="text-yellow-500" />
                    ) : (
                      <FaStar className="text-gray-300" />
                    )}
                  </button>
                  <span className="font-semibold">{email.sender}</span>
                </td>
                <td className="py-2 px-4">{email.subject}</td>
                <td className="py-2 px-4 text-gray-500">{email.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InboxPage;
