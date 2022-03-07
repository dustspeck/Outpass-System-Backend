import express from 'express';
import { getDecSignedOutpass, getEncSignedOutpass } from '../controllers/outpass.controller';

const router = express.Router();

router.get('/:id', getEncSignedOutpass);
router.post('/verify', getDecSignedOutpass);

export default router;
