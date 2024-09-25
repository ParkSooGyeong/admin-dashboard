"use client";

import { useState, useEffect, useRef } from "react";
import { FaPaperclip, FaTelegramPlane, FaTimes } from "react-icons/fa";
import { format } from "date-fns";
import { io } from "socket.io-client";
import Image from 'next/image';
import Avatar from '@mui/material/Avatar'; 

// 서버와의 소켓 연결
const socket = io("http://localhost:3001", {
  autoConnect: false, // 자동 연결 비활성화
  reconnectionAttempts: 3 // 서버 재연결 시도 횟수 설정
}); 

interface Message {
  id: number;
  name: string;
  time: string;
  message?: string;
  imageUrl?: string;
}

interface Contact {
  id: number;
  name: string;
  message: string;
  isActive: boolean;
}

const initialContacts: Contact[] = [
  { id: 1, name: "홍길동", message: "안녕하세요, 잘 지내시죠?", isActive: true },
  { id: 2, name: "이순신", message: "기다리고 있어요.", isActive: false },
  { id: 3, name: "김유신", message: "지금 어디에 계신가요?", isActive: false },
  { id: 4, name: "장보고", message: "감사합니다!", isActive: false },
  { id: 5, name: "세종대왕", message: "안녕하세요, 어떻게 지내세요?", isActive: false },
];

const initialConversation: Message[] = [
  { id: 1, name: "홍길동", time: "1:55pm", message: "대화를 원하시면 https://github.com/ParkSooGyeong/chat-server 에서 코드 다운로드한 후 실행해 주세요" },
  { id: 2, name: "홍길동", time: "1:58pm", message: "첨부파일은 이미지만 가능합니다." },
];

const MessagesPage = () => {
  const [currentConversation, setCurrentConversation] = useState<Message[]>(initialConversation);
  const [newMessage, setNewMessage] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>(initialContacts);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const getCurrentTime = () => format(new Date(), "h:mma").toLowerCase();

  const handleSendMessage = () => {
    if (!newMessage.trim() && !selectedFile) return;
    const newTime = getCurrentTime();
    const newMessageObject: Message = {
      id: currentConversation.length + 1,
      name: "You",
      time: newTime,
    };

    // 첨부 파일이 있을 경우 파일을 Base64로 변환하여 전송
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        newMessageObject.imageUrl = e.target?.result as string;
        newMessageObject.message = newMessage; // 이미지와 함께 메시지도 전송

        if (isConnected) {
          socket.emit("sendMessage", newMessageObject);
        } else {
          setCurrentConversation((prev) => [...prev, newMessageObject]);
        }
        setImagePreview(null); 
        setSelectedFile(null);
        setNewMessage("");
      };
      reader.readAsDataURL(selectedFile); // 파일을 Base64로 읽음
    } else {
      // 이미지 없이 메시지만 전송
      newMessageObject.message = newMessage;
      if (isConnected) {
        socket.emit("sendMessage", newMessageObject);
      } else {
        setCurrentConversation((prev) => [...prev, newMessageObject]);
      }
      setNewMessage("");
    }
  };
  useEffect(() => {
    socket.connect();
    socket.on("receiveMessage", (message: Message) => {
      setCurrentConversation((prev) => [...prev, message]);
    });
    socket.on("connect", () => {
      setIsConnected(true);
      console.log('연결됨')
    });
    socket.on("disconnect", () => {
      setIsConnected(false);
      console.log('연결안됨')
    });
    return () => {
      socket.off("receiveMessage");
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  useEffect(() => {
    console.log(currentConversation)
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [currentConversation]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setSelectedFile(null);
  };


  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredContacts(initialContacts);
    } else {
      const filtered = initialContacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredContacts(filtered);
    }
  }, [searchTerm]);

  // 링크 감지 및 변환 함수
  const convertLinks = (message: string) => {
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    return message.split(urlPattern).map((part, index) => {
      if (part.match(urlPattern)) {
        return (
          <a key={index} href={part} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
            {part}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <div className="flex h-[calc(100vh-72px)]">
      <div className="w-1/4 bg-gray-100 p-4 border-r border-gray-300">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="w-full p-2 rounded-lg mb-4 border border-gray-300"
        />
        <ul>
          {filteredContacts.map((contact) => (
            <li
              key={contact.id}
              className={`flex items-center p-3 mb-2 rounded-lg cursor-pointer ${
                contact.isActive ? "bg-blue-50" : ""
              }`}
            >
              <Avatar className="w-10 h-10 mr-3">
                {contact.name.charAt(0)}
              </Avatar>
              <div>
                <p className="font-semibold">{contact.name}</p>
                <p className="text-sm text-gray-500">{contact.message}</p>
              </div>
              {contact.isActive && (
                <div className="ml-auto bg-blue-500 text-white text-xs px-2 py-1 rounded-full">3</div>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="w-3/4 bg-white p-6 flex flex-col">
        <div className="flex items-center mb-4">
          <Avatar className="w-10 h-10 mr-3">홍</Avatar>
          <div>
            <h3 className="text-lg font-semibold">홍길동</h3>
            <p className="text-sm text-gray-500">메시지에 답장하세요</p>
          </div>
        </div>

        <div ref={chatContainerRef} className="flex-1 bg-gray-50 p-4 rounded-lg overflow-y-auto mb-4">
          {currentConversation.map((msg, index) => {
            const isSenderYou = msg.name === "You";
            const isLastMessage = index === currentConversation.length - 1;
            const nextMessage = currentConversation[index + 1];
            const shouldDisplayTime = isLastMessage || nextMessage?.name !== msg.name || nextMessage?.time !== msg.time;
            return (
              <div
                key={msg.id}
                className={`mb-4 flex-col ${
                  isSenderYou ? "text-right items-end" : "text-left items-start"
                }`}
              >
                {/* 이름은 첫 번째 메시지에서만 표시 */}
                {index === 0 || currentConversation[index - 1]?.name !== msg.name ? (
                  <p className="text-sm text-gray-500">{msg.name}</p>
                ) : null}

                {/* 이미지가 있을 경우 이미지를 먼저 출력 */}
                {msg.imageUrl && (
                  <div className={`inline-block mb-2 ${isSenderYou ? "flex justify-end" : ""}`}>
                    <Image 
                      src={msg.imageUrl} 
                      alt="첨부 이미지" 
                      width={256} 
                      height={256} 
                      className="rounded-lg"
                    />
                  </div>
                )}

                {/* 메시지를 이미지 아래에 출력 */}
                {msg.message && (
                  <div
                    className={`inline-block px-4 py-2 rounded-lg mb-1 ${
                      isSenderYou ? "bg-indigo-100" : "bg-blue-100"
                    }`}
                  >
                    {convertLinks(msg.message)}
                  </div>
                )}
                {shouldDisplayTime && <p className="text-xs text-gray-400 mt-1">{msg.time}</p>}
              </div>
            );
          })}
        </div>

        {/* 메시지 입력창 및 파일 첨부 */}
        <div className="flex items-center border-t border-gray-300 pt-4">
          {imagePreview && (
            <div className="relative mr-4">
              <Image src={imagePreview} alt="이미지 미리보기" width={96} height={96} className="object-cover rounded-lg" />
              <button
                className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                onClick={handleRemoveImage}
              >
                <FaTimes />
              </button>
            </div>
          )}
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="메시지를 입력하세요..."
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none"
          />
          <input type="file" onChange={handleFileChange} className="hidden" id="fileInput" />
          <label htmlFor="fileInput" className="ml-5 text-2xl cursor-pointer">
            <FaPaperclip className="text-gray-500" />
          </label>
          <button className="ml-5 bg-blue-500 text-white p-3 rounded-full text-2xl" onClick={handleSendMessage}>
            <FaTelegramPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
