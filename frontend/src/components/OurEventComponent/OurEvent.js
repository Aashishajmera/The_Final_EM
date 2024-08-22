import axios from "axios";
import { useEffect, useState } from "react";
import FooterComponent from "../FooterComponent/FooterComponent";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import Swal from "sweetalert2";
import "./OurEvent.css"
import { useNavigate } from "react-router-dom";

export default function OurEventComponent() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    //   for new event create
    function newEvent() {
        navigate("/newEvent")
    }

    useEffect(() => {
        const value = sessionStorage.getItem("user");

        if (!value) {
            setError("User not logged in or session expired.");
            setLoading(false);
            return;
        }

        const jsObject = JSON.parse(value);
        const userId = jsObject._id;

        if (!userId) {
            setError("Invalid user data.");
            setLoading(false);
            return;
        }

        const fetchEvents = async () => {
            try {
                const response = await axios.post(
                    "http://localhost:3000/event/ourEvent",
                    { userId }
                );
                if (!response.data.allEvents) {
                    Swal.fire({
                        icon: 'info',
                        title: 'No Events Found',
                        text: 'There are no events available for the given user ID.',
                        confirmButtonText: 'OK'
                    });
                }
                setEvents(response.data.allEvents);
            } catch (err) {
                setError("Failed to fetch events.");
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    const formatDate = (isoDate) => {
        if (!isoDate) return "N/A";
        const date = new Date(isoDate);
        return date.toISOString().split("T")[0];
    };

    if (loading) {
        return (
            <>
                <HeaderComponent />
                <p>Loading events...</p>
                <FooterComponent />
            </>
        );
    }

    if (error) {
        return (
            <>
                <HeaderComponent />
                <p>Error: {error}</p>
                <FooterComponent />
            </>
        );
    }

    return (
        <>
            <HeaderComponent />
            {events ? (<h2 className="m-3">Event List</h2>
            ) : ""}

            {!events ? (
                <>
                    <h1 className="ms-2">No events found.</h1>
                    <button className="btn btn-outline-primary m-2">Create Event</button>
                </>
            ) : (
                <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">S.no</th>
                                <th scope="col">Title</th>
                                <th scope="col">Description</th>
                                <th scope="col">Date</th>
                                <th scope="col">Time</th>
                                <th scope="col">Location</th>
                                <th scope="col">Capacity</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.map((event, index) => (
                                <tr key={event._id || index}>
                                    <td>{index + 1}</td>
                                    <td>{event.title || "N/A"}</td>
                                    <td>{event.description || "N/A"}</td>
                                    <td>{formatDate(event.date)}</td>
                                    <td>{event.time || "N/A"}</td>
                                    <td>{event.location || "N/A"}</td>
                                    <td>{event.capacity || "N/A"}</td>
                                    <td>
                                        <button className="btn btn-outline-primary btn-sm">Edit</button>
                                    </td>
                                    <td>
                                        <button className="btn btn-outline-danger btn-sm">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button className="btn btn-primary" onClick={newEvent}>Create Event</button>

                </div>

            )}
            <FooterComponent />
        </>
    );
}
