import { Link } from "react-router-dom";
import './BookingList.styles.scss';

const BookingList = ({ data }) => {
  // Sample data for demonstration
  // const data = [
  //   { id: 1, name: "John Doe", email: "john@example.com", room: "101" },
  //   { id: 2, name: "Jane Doe", email: "jane@example.com", room: "102" },
  //   // Add more data as needed
  // ];



  return (
    <div className="container">
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Room</th>
              <th>Confirmed</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.roomId ? item.roomId.name : 'Room Not Available'}</td>
                <td>{item.confirmed ? "Yes" : "No"}</td>
                <td>
                  <Link to={`/bookings/${item._id}`}>View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingList;
