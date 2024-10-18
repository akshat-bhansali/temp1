const { google } = require("googleapis");
const stream = require("stream");
const fs = require("fs");

// Upload files to Google Drive
async function fileUploader(keyFileLocation, parentId, file) {
  const auth = new google.auth.GoogleAuth({
    keyFile: keyFileLocation,
    scopes: ["https://www.googleapis.com/auth/drive"],
  });
  const drive = google.drive({ version: "v3", auth });
  const bufferStream = new stream.PassThrough();
  bufferStream.end(file.buffer);
  const response = await drive.files.create({
    requestBody: {
      name: file.originalname,
      mimeType: file.mimetype,
      parents: [parentId],
    },
    media: {
      body: bufferStream,
    },
  });
  return response.data;
}

// Download a file from Google Drive
async function downloadFile(keyFileLocation, fileId, res) {
    const auth = new google.auth.GoogleAuth({
      keyFile: keyFileLocation,
      scopes: ["https://www.googleapis.com/auth/drive"],
    });
    const drive = google.drive({ version: "v3", auth });
  
    try {
      // Request to download the file as a stream
      const response = await drive.files.get({ fileId, alt: "media" }, { responseType: "stream" });
  
      // Pipe the file stream directly to the client response
      response.data.pipe(res);
  
      // Handle the events to log or catch any stream errors
      response.data.on('end', () => {
        console.log('File download completed.');
      });
  
      response.data.on('error', (error) => {
        console.error('Error downloading file:', error.message);
        res.status(500).json({ error: "Failed to stream the file." });
      });
  
    } catch (error) {
      console.error("Error downloading file from Google Drive:", error.message);
      throw new Error("Failed to download the file from Google Drive.");
    }
  }
  

// Delete a file from Google Drive
async function deleteFile(keyFileLocation, fileId) {
  const auth = new google.auth.GoogleAuth({
    keyFile: keyFileLocation,
    scopes: ["https://www.googleapis.com/auth/drive"],
  });
  const drive = google.drive({ version: "v3", auth });
  await drive.files.delete({ fileId });
  return `File with ID: ${fileId} deleted successfully`;
}

module.exports = { fileUploader, downloadFile, deleteFile };
