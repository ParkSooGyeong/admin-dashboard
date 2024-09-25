import { atom } from "recoil";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Card {
  id: string;
  name: string;
  description: string;
  image: string | null;
  dueDate: Date | null;
}
interface User {
  id: number;
  name: string;
  email: string;
  position: string;
  country: string;
  status: string;
  photo?: string;
}

export const userListState = atom<User[]>({
  key: "userListState",
  default: [
    { id: 1, name: "BTS 지민", email: "jimin@testmail.com", position: "Singer", country: "South Korea", status: "Active" },
    { id: 2, name: "아이유", email: "iu@testmail", position: "Singer", country: "South Korea", status: "Active" },
    { id: 3, name: "박보검", email: "bogum@testmail", position: "Actor", country: "South Korea", status: "Active" },
    { id: 4, name: "정해인", email: "haein@testmail", position: "Actor", country: "South Korea", status: "Active" },
    { id: 5, name: "전지현", email: "jihyun@testmail", position: "Actress", country: "South Korea", status: "Offline" },
    { id: 6, name: "송중기", email: "joongki@testmail", position: "Actor", country: "South Korea", status: "Active" },
    { id: 7, name: "윤아", email: "yoona@testmail", position: "Actress", country: "South Korea", status: "Active" },
    { id: 8, name: "박신혜", email: "shinhye@testmail", position: "Actress", country: "South Korea", status: "Active" },
    { id: 9, name: "김수현", email: "soohyun@testmail", position: "Actor", country: "South Korea", status: "Offline" },
    { id: 10, name: "김태희", email: "taehee@testmail", position: "Actress", country: "South Korea", status: "Active" },
  ],
});

export const popupState = atom({
  key: "popupState", // 고유한 key
  default: {
    isOpen: false,
    userId: null,
  },
});

export const selectedCardState = atom({
  key: 'selectedCardState',
  default: null, // 선택된 카드의 초기 상태
});

const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const cardsState = atom<Record<string, Card[]>>({
  key: "cardsState",
  default: {
    todo: [
      {
        id: "todo-1",
        name: "차트 자바스크립트 수정",
        description: "dachboard/page.tsx 에 들어가있는 차트들 디자인과 옵션들 설정 부탁드립니다. ",
        image: "/images/todo-2.webp",
        dueDate: addDays(new Date(), 7)
      },
      {
        id: "todo-2",
        name: "홈페이지 변경",
        description: "Admin DashBoard 홈페이지를 변경하세요.",
        image: "/images/todo-3.png",
        dueDate:addDays(new Date(), 42)
      },
    ],
    inProgress: [
      {
        id: "inProgress-1",
        name: "테이블 카드 디자인 변경",
        description: "kanban/page.tsx 39번 줄 부터 디자인 변경 부탁드립니다.",
        image: "/images/todo-1.webp",
        dueDate: addDays(new Date(), 38)
      },
    ],
    done: [
      {
        id: "done-1",
        name: "자바스크립트 요소 생성",
        description: "kanban/page.tsx 에 다른 버전이 필요합니다. 가로 버전 말고 todo list 느낌의 칸반이 필요합니다.",
        image: null,
        dueDate: addDays(new Date(), 20)
      },
    ],
  },
});

export const currentCardState = atom<Card | null>({
  key: "currentCardState",
  default: null,
});
