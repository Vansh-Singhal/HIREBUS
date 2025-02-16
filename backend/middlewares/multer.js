import multer from "multer";

// Create a memory storage instance
const storage = multer.memoryStorage();

// Initialize multer with the memory storage
export const upload = multer({ storage });

// Use the same upload instance for single file upload
export const singleUpload = upload.single("file");
export const companyLogo = upload.single("logo");

// Use the same upload instance for multiple file uploads
export const multipleUploads = upload.fields([
  { name: 'profilepic', maxCount: 1 },
  { name: 'resume', maxCount: 1 }
]);
