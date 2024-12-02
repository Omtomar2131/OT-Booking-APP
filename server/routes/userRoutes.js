const {Router} = require('express');
const { getUsers, createUser, loginUser, logoutUser } = require('../controllers/userController');
const {auth} = require('../middleware/authMiddleware')
const router = Router();

router.get('/',auth,getUsers)
router.post('/',createUser)
///login user
router.post('/login',loginUser)
///logout user
router.get('/logout',logoutUser)

module.exports = router;