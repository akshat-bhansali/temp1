import React from "react";

const DownloadFile = () => {
  const handleDownload = async () => {
    const fileId = "1kB0Ru72OZByhcF78HhOylijz6IY3HVpk";
    const response = await fetch(`http://localhost:8080/api/drive/download/${fileId}`);

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `downloaded_file.png`); // Adjust file extension based on the file
      document.body.appendChild(link);
      link.click();
      link.remove();
    } else {
      const errorMessage = await response.json();
      console.error("Failed to download the file:", errorMessage.error);
    }
  };

  return (
    <div>
      <button onClick={handleDownload}>Download File</button>
    </div>
  );
};

export default DownloadFile;
