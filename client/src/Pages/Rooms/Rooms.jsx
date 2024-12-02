import React from 'react'
import { getRooms, reset } from '../../features/room/roomSlice'
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from 'react'
import RoomList from '../../component/RoomList/RoomList'

const Rooms = () => {
  const dispatch = useDispatch();
  const {rooms} = useSelector((state)=>state.room)
  useEffect(()=>{
    dispatch(getRooms())
    dispatch(reset())
  },[]);
    return (
      <div>
          {rooms && rooms.length > 0 ? (
              <RoomList data={rooms} />
          ) : (
              <p>No rooms available.</p>
          )}
      </div>
  );
}

export default Rooms
