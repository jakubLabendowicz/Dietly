import express, { Router } from 'express';
import { authUser } from '../services/AuthorizationService';

const router: Router = express.Router();

router.post("/", async (req, res) => {
    authUser(req, res);
})

module.exports = router