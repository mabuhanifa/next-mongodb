"use client";

import { useState } from "react";

export default function AttributeManager({
  title,
  items,
  onFetch,
  onCreate,
  onUpdate,
  onDelete,
}) {
  const [newItemName, setNewItemName] = useState("");
  const [editingItem, setEditingItem] = useState(null); // { _id, name }

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    try {
      await onCreate({ name: newItemName });
      setNewItemName("");
      onFetch();
    } catch (error) {
      console.error(`Failed to create ${title}:`, error);
    }
  };

  const handleUpdate = async (id, name) => {
    if (!name.trim()) return;
    try {
      await onUpdate(id, { name });
      setEditingItem(null);
      onFetch();
    } catch (error) {
      console.error(`Failed to update ${title}:`, error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm(`Are you sure you want to delete this ${title}?`)) {
      try {
        await onDelete(id);
        onFetch();
      } catch (error) {
        console.error(`Failed to delete ${title}:`, error);
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <form onSubmit={handleCreate} className="flex gap-2 mb-4">
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder={`New ${title} Name`}
          className="flex-grow border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Add
        </button>
      </form>
      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item._id}
            className="flex items-center justify-between p-2 border rounded-md"
          >
            {editingItem?._id === item._id ? (
              <input
                type="text"
                value={editingItem.name}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, name: e.target.value })
                }
                onBlur={() => handleUpdate(editingItem._id, editingItem.name)}
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  handleUpdate(editingItem._id, editingItem.name)
                }
                autoFocus
                className="border-gray-300 rounded-md py-1 px-2 text-black"
              />
            ) : (
              <span className="text-gray-800">{item.name}</span>
            )}
            <div className="space-x-2">
              <button
                onClick={() =>
                  setEditingItem({ _id: item._id, name: item.name })
                }
                className="text-indigo-600 hover:text-indigo-900"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="text-red-600 hover:text-red-900"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
