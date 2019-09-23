import express from 'express';
import { getLoggedinUser } from "../model/user";

const router = express.Router();

router.get('/loggedinUser', async (req, res) => {
    const userData = await getLoggedinUser(req.user);
    res.json(userData);
});

export default router;
