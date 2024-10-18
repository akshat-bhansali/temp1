const express = require("express");
const multer = require("multer");
const { fileUploader, downloadFile, deleteFile } = require("../gdriveService");
const path = require("path");
const fs = require("fs");

const router = express.Router();
const upload = multer();

const keyFileLocation = "./key.json"; // Path to your Service Account key

// Upload a file
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    const parentId = req.body.parentId; // Folder ID in Google Drive
    const result = await fileUploader(keyFileLocation, parentId, file);
    res.json(result);
    console.log(result)
  } catch (err) {
    res.status(500).json({ error: err.message });

    console.log(err)
  }
});

// Download a file
router.get("/download/:fileId", async (req, res) => {
    try {
      const { fileId } = req.params;
  
      // Set the content type headers before piping the stream
      res.set({
        'Content-Disposition': `attachment; filename="${fileId}.zip"`,
        'Content-Type': 'application/octet-stream',
      });
  
      // Call the downloadFileStream function and stream the file directly to the response
      await downloadFile(keyFileLocation, fileId, res);
  
    } catch (err) {
      console.error("Error in download route:", err.message);
      res.status(500).json({ error: err.message });
    }
  });

// Delete a file
router.delete("/delete/:fileId", async (req, res) => {
  try {
    const { fileId } = req.params;
    const result = await deleteFile(keyFileLocation, fileId);
    res.json({ message: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
