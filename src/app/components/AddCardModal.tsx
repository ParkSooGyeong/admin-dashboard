import React, { useState } from "react";
import { FaUpload, FaTrashAlt } from "react-icons/fa";
import { Button, TextField } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface AddCardModalProps {
  onClose: () => void;
  onAdd: (task: { name: string; description: string; image: string | null; dueDate: Date | null }) => void;
}

const AddCardModal: React.FC<AddCardModalProps> = ({ onClose, onAdd }) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dueDate, setDueDate] = useState<Date | null>(null);

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

  const handleSubmit = () => {
    const imageUrl = image ? URL.createObjectURL(image) : null; // URL 생성
    if (taskName.trim() && description.trim()) {
      onAdd({ name: taskName, description, image: imageUrl, dueDate });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>
          X
        </button>
        <h2 className="text-lg font-semibold mb-4">Add new task</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium">Task name</label>
          <TextField
            fullWidth
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Task name"
            variant="outlined"
            size="small"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Enter a description</label>
          <TextField
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter a description"
            variant="outlined"
            size="small"
            multiline
            rows={3}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Due Date</label>
          <DatePicker
            selected={dueDate}
            onChange={(date: Date) => setDueDate(date)}
            dateFormat="yyyy/MM/dd"
            minDate={new Date()}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholderText="Select due date"
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

        <div className="flex justify-end space-x-4">
          <Button variant="contained" color="secondary" onClick={onClose}>
            Close
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!taskName.trim() || !description.trim()}
          >
            + Add card
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCardModal;
