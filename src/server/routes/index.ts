import * as express from 'express';
import chirps_router from './chirps'
import users_router from './users'


const router = express.Router();

router.use('/chirps', chirps_router);
router.use('/users', users_router);

export default router;