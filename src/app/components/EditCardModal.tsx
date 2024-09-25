import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { currentCardState, cardsState } from "../../recoil/atoms";
import { FaTrashAlt, FaUpload } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EditCardModal = ({ onClose }: { onClose: () => void }) => {
  const [currentCard, ] = useRecoilState(currentCardState);
  const [cards, setCards] = useRecoilState(cardsState);

  const [name, setName] = useState(currentCard?.name || "");
  const [description, setDescription] = useState(currentCard?.description || "");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(currentCard?.image || null);
  const [dueDate, setDueDate] = useState<Date | null>(currentCard?.dueDate ? new Date(currentCard.dueDate) : null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDeleteImage = () => {
    setImage(null);
    setPreview(null);
  };

  const handleSave = () => {
    if (currentCard) {
      const updatedCards = { ...cards };
      const columnKey = Object.keys(cards).find((key) =>
        cards[key].find((card) => card.id === currentCard.id)
      );

      if (columnKey) {
        const imageUrl = image ? URL.createObjectURL(image) : preview;
        updatedCards[columnKey] = updatedCards[columnKey].map((card) =>
          card.id === currentCard.id
            ? { ...card, name, description, image: imageUrl, dueDate }
            : card
        );
        setCards(updatedCards);
      }
      onClose();
    }
  };

  if (!currentCard) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>
          X
        </button>
        <h2 className="text-lg font-semibold mb-4">Edit task</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium">Task name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded w-full px-3 py-2 mt-1"
            placeholder="Task name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded w-full px-3 py-2 mt-1"
            placeholder="Enter a description"
            rows={3}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Upload an image (optional)</label>
          <div className="border-dashed border-2 border-gray-300 rounded-lg p-4">
            {preview ? (
              <div className="relative">
                <img src={preview} alt="Preview" className="w-full h-32 object-cover rounded-md" />
                <button
                  className="absolute top-2 right-2 text-red-600 bg-white rounded-full p-1 shadow-md"
                  onClick={handleDeleteImage}
                >
                  <FaTrashAlt />
                </button>
              </div>
            ) : (
              <label className="cursor-pointer flex flex-col items-center space-y-2">
                <FaUpload className="text-gray-400" />
                <span className="text-gray-400">Click or drag file to this area to upload</span>
                <input type="file" className="hidden" onChange={handleImageUpload} />
              </label>
            )}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Due Date</label>
          <DatePicker
            selected={dueDate}
            onChange={(date: Date | null) => setDueDate(date)}
            dateFormat="yyyy/MM/dd"
            minDate={new Date()}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholderText="Select due date"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button className="bg-gray-200 px-4 py-2 rounded" onClick={onClose}>
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

export default EditCardModal;
