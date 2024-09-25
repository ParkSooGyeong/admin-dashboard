"use client";

import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { cardsState, currentCardState } from "../../recoil/atoms";
import AddCardModal from "../components/AddCardModal";
import EditCardModal from "../components/EditCardModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import Image from "next/image";

const calculateDaysLeft = (dueDate: Date | null) => {
  if (!dueDate) return null;
  const today = new Date();
  const differenceInTime = new Date(dueDate).getTime() - today.getTime();
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
  return differenceInDays > 0 ? `${differenceInDays}일 남음` : "기한이 지났습니다";
};

const Kanban = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [columnToAdd, setColumnToAdd] = useState<string | null>(null);
  const [cards, setCards] = useRecoilState(cardsState);
  const [, setCurrentCard] = useRecoilState(currentCardState);
  const [cardToDelete, setCardToDelete] = useState<{ column: string; cardId: string } | null>(null);

  const addNewCard = (task: { name: string; description: string; image: string | null; dueDate: Date | null }) => {
    if (columnToAdd) {
      const newId = `${columnToAdd}-${cards[columnToAdd].length + 1}`;
      setCards({
        ...cards,
        [columnToAdd]: [
          ...cards[columnToAdd],
          { id: newId, name: task.name, description: task.description, image: task.image, dueDate: task.dueDate },
        ],
      });
      setIsModalOpen(false);
      setColumnToAdd(null);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const openEditModal = (card: any) => {
    setCurrentCard(card);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (column: string, cardId: string) => {
    setCardToDelete({ column, cardId });
    setIsDeleteModalOpen(true);
  };

  const deleteCard = () => {
    if (cardToDelete) {
      const { column, cardId } = cardToDelete;
      setCards((prevCards) => ({
        ...prevCards,
        [column]: prevCards[column].filter((card) => card.id !== cardId),
      }));
      setIsDeleteModalOpen(false);
      setCardToDelete(null);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceColumn = Array.from(cards[source.droppableId]);
    const destinationColumn = Array.from(cards[destination.droppableId]);
    const [removed] = sourceColumn.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceColumn.splice(destination.index, 0, removed);
      setCards({
        ...cards,
        [source.droppableId]: sourceColumn,
      });
    } else {
      destinationColumn.splice(destination.index, 0, removed);
      setCards({
        ...cards,
        [source.droppableId]: sourceColumn,
        [destination.droppableId]: destinationColumn,
      });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-3 gap-4">
          {Object.keys(cards).map((columnKey) => (
            <Droppable droppableId={columnKey} key={columnKey}>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="p-4">
                  <h2 className="text-lg font-semibold mb-4 capitalize">
                    {columnKey.replace(/([A-Z])/g, " $1")}
                  </h2>
                  {cards[columnKey].map((card, index) => (
                    <Draggable key={card.id} draggableId={card.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-white shadow-md rounded-lg p-4 mb-4"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-md font-semibold">{card.name}</h3>
                            <div className="flex space-x-2">
                              <FaEdit className="text-gray-500 cursor-pointer" onClick={() => openEditModal(card)} />
                              <FaTrashAlt
                                className="text-gray-500 cursor-pointer"
                                onClick={() => openDeleteModal(columnKey, card.id)}
                              />
                            </div>
                          </div>
                          {card.image && (
                            <Image
                              src={card.image}
                              alt="task"
                              width={400}
                              height={128}
                              className="w-full h-32 object-cover rounded-md mb-2"
                            />
                          )}
                          <p className="text-sm text-gray-500">{card.description}</p>
                          <div className="flex items-center mt-4">
                            {card.dueDate && (
                              <span className="text-purple-500 text-sm ml-auto">
                                {calculateDaysLeft(card.dueDate)}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  <button
                    className="border-2 border-dashed border-gray-400 p-4 w-full py-2 rounded-lg mt-4"
                    onClick={() => {
                      setColumnToAdd(columnKey);
                      setIsModalOpen(true);
                    }}
                  >
                    + Add another card
                  </button>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {isModalOpen && <AddCardModal onClose={() => setIsModalOpen(false)} onAdd={addNewCard} />}
      {isEditModalOpen && <EditCardModal onClose={() => setIsEditModalOpen(false)} />}
      {isDeleteModalOpen && (
        <DeleteConfirmModal
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={deleteCard}
        />
      )}
    </div>
  );
};

export default Kanban;
