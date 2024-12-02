const { Router } = require('express');
const {auth} = require('../middleware/authMiddleware')
const { getRooms,createRoom, getRoom, updateRoom, deleteRoom } = require('../controllers/roomController'); // Make sure the path and function name are correct

const router = Router();

//Get all rooms
router.get('/', getRooms);

//create room
router.post('/',auth,createRoom)

//Get single room
router.get('/:id',getRoom)

//update room
router.put('/:id',auth, updateRoom);

//Delete room 
router.delete('/:id',auth,deleteRoom)



module.exports = router;
