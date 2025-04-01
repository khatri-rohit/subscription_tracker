import { Router } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

import {
    getUsers,
    getUser,
    updateUser,
    updateImage,
    updatePassword,
    deleteUser
} from '../controller/user.controller.js';
import authorize from '../middleware/auth.middleware.js';

const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.post('/', authorize, getUser);

userRouter.put('/:id', authorize, updateUser);

const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        // Get file extension correctly
        const ext = path.extname(file.originalname);
        // Create filename without duplicating extensions
        cb(null, `${Date.now()}${ext}`);
    }
});

// Add file filter for image formats
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(new Error('Unsupported file format. Please upload JPEG or PNG images only.'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5MB limit
    }
});
userRouter.put('/img/:id', authorize, upload.single('profileImage'), updateImage);

userRouter.put('/isagi/:id', authorize, updatePassword);

userRouter.delete('/:id', authorize, deleteUser);

export default userRouter;