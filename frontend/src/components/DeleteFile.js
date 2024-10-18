import React, { useState } from "react";

const DeleteFile = () => {
  const [message, setMessage] = useState("");
  const fileId = "1kB0Ru72OZByhcF78HhOylijz6IY3HVpk";
  const handleDelete = async () => {
    if (!fileId) {
      setMessage("Please enter a file ID.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/drive/delete/${fileId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const result = await response.json();
        setMessage(result.message);
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.error}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Delete a File</h2>
      <button onClick={handleDelete}>Delete File</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DeleteFile;
