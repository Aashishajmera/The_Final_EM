import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AllEventList() {
    // State to store events data
    const [events, setEvents] = useState([]);
    // State to handle loading and error
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    // Fetch data when component mounts
    useEffect(() => {
        // Define an async function to fetch data
        const fetchEvents = async () => {
            try {
                // Replace this URL with the actual API endpoint
                const response = await axios.get('http://localhost:3000/event/allevents');
                setEvents(response.data.allEvents); // Set the events data
            } catch (err) {
                setError(err.message); // Set error message if something goes wrong
            } finally {
                setLoading(false); // Set loading to false after the data is fetched
            }
        };

        fetchEvents(); // Call the async function
    }, []); // Empty dependency array means this effect runs once after the initial render

    // Handle loading state
    if (loading) {
        return <h2>Loading...</h2>;
    }

    // Handle error state
    if (error) {
        return <h2>Error: {error}</h2>;
    }

    // Function to format date
    const formatDate = (isoDate) => {
        if (!isoDate) return 'N/A'; // Handle missing date
        const date = new Date(isoDate);
        return date.toISOString().split('T')[0]; // Extract only the date part
    };

    return (
        <>
            <h2 className='m-3'>Event List.....</h2>

          <div className='table-responsive'>
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
                        <th scope="col">Registration</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((event, index) => (
                        <tr key={event.id || index}> 
                            <td>{index + 1}</td> 
                            <td>{event.title || 'N/A'}</td>
                            <td>{event.description || 'N/A'}</td> 
                            <td>{formatDate(event.date) || 'N/A'}</td> 
                            <td>{event.time || 'N/A'}</td> 
                            <td>{event.location || 'N/A'}</td>
                            <td>{event.capacity || 'N/A'}</td>
                            <td><button className='btn btn-outline-primary' onClick={()=>{navigate('/registrationForm',{state: {event}})}} >Apply</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
          </div>
        </>
    );
}
