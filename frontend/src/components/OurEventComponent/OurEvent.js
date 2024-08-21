import { useEffect, useState } from "react";
import FooterComponent from "../footerComponent/FooterComponent";
import HeaderComponent from "../headerComponent/HeaderComponent";
import axios from "axios";

export default function OurEventComponent() {

    // for set the event 
    const [events, setEvents] = useState([]);
    // State to handle loading and error
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState({});


    // for the getting the our events
    useEffect(() => {

        // FOR GET THE CURRENT USER DATA
        const value = sessionStorage.getItem('user');

        // Check if the value exists and is valid JSON
        if (value) {
            try {
                const jsObject = JSON.parse(value);
                setUser(jsObject);
               
            } catch (error) {
                console.error('Error parsing JSON from session storage:', error);
            }
        } else {
            console.log('No user data found in session storage.');
        }

    }, []) // for render the data only one time 


    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.post("http://localhost:3000/event/ourEvent", {userId: user._id});
                console.log(response)
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, [user])
    console.log(user._id)
    return (
        <>
            <HeaderComponent />

            <FooterComponent />
        </>
    )
}