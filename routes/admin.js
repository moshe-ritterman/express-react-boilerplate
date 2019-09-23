import express from 'express';
const router = express.Router();

router.get('/', (req, res) => res.send('in the admin'));

export default router;
