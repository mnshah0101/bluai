import express from 'express';
import {makeGPTCall } from '../controllers/apiController.js';

const router = express.Router();




router.get('/gpt-4', makeGPTCall);


export default router;
