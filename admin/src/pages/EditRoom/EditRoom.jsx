import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateRoom, reset } from "../../features/room/roomSlice";
import { useSelector, useDispatch } from "react-redux";

const EditRoom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSuccess } = useSelector((state) => state.room);
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    desc: "",
    roomNumbers: "",
  });

  const { name, price, desc, roomNumbers } = formData;

  useEffect(() => {
    const getRoom = async () => {
      try {
        const res = await fetch(`/api/rooms/${id}`);
        if (!res.ok) throw new Error("Failed to fetch room data");
        const data = await res.json();

        if (data.roomNumbers) {
          const roomMap = data.roomNumbers.map((item) => item.number);
          const roomString = roomMap.join(",");
          setFormData({
            ...data,
            roomNumbers: roomString,
          });
        } else {
          console.error("Invalid room data format", data);
        }
      } catch (error) {
        console.log("Error fetching room:", error);
      }
    };
    getRoom();
  }, [id]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
    }
  }, [isSuccess, dispatch, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price || !roomNumbers) {
      alert("Please fill all required fields");
      return;
    }

    const roomArray = roomNumbers.split(",").map((item) => {
      const number = parseInt(item.trim());
      if (isNaN(number)) {
        alert("Invalid room number: " + item);
        return null;
      }
      return { number, unavailableDates: [] };
    }).filter(Boolean);

    const dataToSubmit = {
      name,
      price,
      desc,
      roomNumbers: roomArray,
      roomId: id,
    };

    dispatch(updateRoom(dataToSubmit));

          navigate("/rooms");

  };

  return (
    <div className="container">
      <h1 className="heading center">Edit Room</h1>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              placeholder="Enter room name"
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="price">Price</label>
            <input
              type="text"
              name="price"
              value={price}
              placeholder="Enter room price"
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="desc">Description</label>
            <textarea
              name="desc"
              onChange={handleChange}
              value={desc}
            ></textarea>
          </div>

          <div className="input-group">
            <label htmlFor="roomNumbers">Room Numbers</label>
            <textarea
              name="roomNumbers"
              onChange={handleChange}
              value={roomNumbers}
              placeholder="Enter room numbers separated by commas (e.g., 202, 203)"
            ></textarea>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default EditRoom;
