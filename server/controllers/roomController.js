const Room = require('../models/roomModel')


// roomController.js
const getRooms = async (req, res,next) => {
    try{
        const rooms = await Room.find();

        if(!rooms){
            res.status(400);
            throw new Error('Rooms not found')
        }
      return res.status(200).json(rooms)
    }
    catch(err){
        next(err)
    }
};

//create Room
const createRoom = async(req,res, next)=>{
    
    try{
        //todo validate data from user with joi
        const room = await Room.create(req.body)

        if(!room) {
            res.status(400);
            throw new Error('there was a problem creating room')
        }
        const rooms = await Room.find();
        return res.status(201).json(rooms)
    }
    catch(err){
        next(err)
    }
}


//Get single rooms
const getRoom = async(req,res,next)=>{
    try{
        const room =await Room.findById(req.params.id);

        if(!room) {
            res.status(400);
            throw new Error('Room not found')
        }
        return res.status(200).json(room);
    }
    catch(err){
        next(err)
    }
}


//update rooms
const updateRoom = async(req,res,next)=>{
    try{
        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id,{
                $set: req.body
            },
            {new: true}
        );
        if(!updatedRoom){
            res.status(400);
            throw new Error('Canot update room')
        }
        return res.status(200).json(updatedRoom);

    }
    catch(err){
        next(err)
    }
}
const deleteRoom = async (req, res, next) => {
    try {
        const deletedRoom = await Room.findByIdAndDelete(req.params.id);
        if (!deletedRoom) {
            res.status(404);
            throw new Error('Room not found or already deleted');
        }
        return res.status(200).json({ message: 'Room deleted successfully' });
    } catch (err) {
        next(err);
    }
};
module.exports = { getRooms,createRoom,getRoom ,updateRoom,deleteRoom};
