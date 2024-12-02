import { useEffect, useState } from "react";
import "./booking.styles.scss";
import { useParams, useNavigate } from "react-router-dom";
import {
  confirmBooking,
  deleteBooking,
  reset,
} from "../../features/booking/bookingSlice";
import { useDispatch, useSelector } from "react-redux";

const Booking = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.booking
  );

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true); // For showing a loader

  useEffect(() => {
    if (isSuccess || isError) {
      dispatch(reset());
    }
  }, [isSuccess, isLoading, message, isError, dispatch]);

  useEffect(() => {
    dispatch(reset());
    const getBooking = async () => {
      try {
        const res = await fetch(`/api/bookings/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch booking data");
        }
        const data = await res.json();
        setBooking(data);
      } catch (error) {
        console.error("Error fetching booking:", error.message);
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    };
    getBooking();
  }, [id, dispatch]);

  const handleDelete = () => {
    dispatch(deleteBooking(id));
    navigate("/dashboard");
  };

  const handleConfirm = () => {
    dispatch(confirmBooking(id));
    navigate("/dashboard");
  };

  if (loading) {
    return (
      <div id="booking">
        <h1 className="heading center">Loading...</h1>
      </div>
    );
  }

  if (!booking) {
    return (
      <div id="booking">
        <h1 className="heading center">No booking found.</h1>
      </div>
    );
  }

  return (
    <div id="booking">
      <h1 className="heading center">Booking</h1>

      <div className="content-wrapper">
        <div className="text-wrapper">
          <h1 className="heading">{booking.name || "N/A"}</h1>
          <p className="email">Room: {booking?.roomId?.name || "N/A"}</p>
          <p className="email">Email: {booking.email || "N/A"}</p>
          <p className="email">
            Check-In:{" "}
            {booking.checkInDate &&
              new Date(booking.checkInDate).toLocaleDateString("en-CA")}
          </p>
          <p className="email">
            Check-Out:{" "}
            {booking.checkOutDate &&
              new Date(booking.checkOutDate).toLocaleDateString("en-CA")}
          </p>
        </div>

        <div className="cta-wrapper">
          <button onClick={handleConfirm}>Confirm</button>
          <button className="danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Booking;
