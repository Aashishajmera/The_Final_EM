import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import FooterComponent from "../FooterComponent/FooterComponent";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function EditEvent() {
    // for getting the event which is sent by the previous component for update
    const location = useLocation();
    const event = location.state.event;


    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [time24, setTime24] = useState(''); // 24-hour time for input field
    const [time12, setTime12] = useState(''); // 12-hour time for display  const [time, setTime] = useState("");
    const [locationInput, setLocationInput] = useState("");
    const [capacity, setCapacity] = useState("");

    const [titleErr, setTitleErr] = useState("");
    const [descriptionErr, setDescriptionErr] = useState("");
    const [dateErr, setDateErr] = useState("");
    const [timeErr, setTimeErr] = useState("");
    const [locationErr, setLocationErr] = useState("");
    const [capacityErr, setCapacityErr] = useState("");

    const navigate = useNavigate();

    // Use useEffect to populate the state with the event data
    useEffect(() => {
        const formatDate = (isDate) => {
            // Create a new Date object from the ISO string
            const date = new Date(isDate);
            // Extract the date part in YYYY-MM-DD format
            return date.toISOString().split('T')[0];
        }
        setTitle(event.title);
        setDescription(event.description);
        // Convert and set the date
        setDate(formatDate(event.date));
        setTime24(convertTo24HourFormat(event.time));
        setTime12(event.time)
        setLocationInput(event.location);
        setCapacity(event.capacity);
    }, [event]);

    // Validation functions
    const validateTitle = (value) => {
        if (!value) {
            setTitleErr("Title is required");
        } else if (!value.match("^[a-zA-Z]+$")) {
            setTitleErr("Title can contain only alphabet characters");
        } else if (value.length < 5 || value.length > 50) {
            setTitleErr("Title must be between 5 and 50 characters long");
        } else {
            setTitleErr("");
        }
    };

    const validateDescription = (value) => {
        if (!value) {
            setDescriptionErr("Description is required");
        } else {
            setDescriptionErr("");
        }
    };

    const validateDate = (value) => {
        const today = new Date().toISOString().split("T")[0];
        if (!value) {
            setDateErr("Date is required");
        } else if (value < today) {
            setDateErr("Date cannot be before today");
        } else {
            setDateErr("");
        }
    };

    const validateTime = (value) => {
        if (!value) {
            setTimeErr("Time is required");
        } else if (!/^([01]?[0-9]|2[0-3]):([0-5][0-9])\s?(AM|PM)$/.test(value)) {
            setTimeErr("Time must be in hh:mm AM/PM format with AM/PM in uppercase");
        } else {
            setTimeErr("");
        }
    };

    const validateLocation = (value) => {
        if (!value) {
            setLocationErr("Location is required");
        } else {
            setLocationErr("");
        }
    };

    const validateCapacity = (value) => {
        if (!value) {
            setCapacityErr("Capacity is required");
        } else if (isNaN(value) || value <= 0) {
            setCapacityErr("Capacity must be a positive number");
        } else {
            setCapacityErr("");
        }
    };

    // Handlers for input changes
    const handleTitleChange = (e) => {
        const value = e.target.value;
        setTitle(value);
        validateTitle(value);
    };

    const handleDescriptionChange = (e) => {
        const value = e.target.value;
        setDescription(value);
        validateDescription(value);
    };

    const handleDateChange = (e) => {
        const value = e.target.value;
        setDate(value);
        validateDate(value);
    };
    // ========================================================

    // Function to convert 24-hour time to 12-hour time with AM/PM
    const convertTo12HourFormat = (time24) => {
        const [hours, minutes] = time24.split(':').map(Number);
        const period = hours >= 12 ? 'PM' : 'AM';
        const adjustedHours = hours % 12 || 12; // Convert 0 hours to 12
        return `${String(adjustedHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${period}`;
    };

    // Function to convert 12-hour time back to 24-hour time
    const convertTo24HourFormat = (time12) => {
        const [time, period] = time12.split(' ');
        let [hours, minutes] = time.split(':').map(Number);
        if (period === 'PM' && hours < 12) hours += 12;
        if (period === 'AM' && hours === 12) hours = 0;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    };

    const handleTimeChange = (e) => {
        const value24Hour = e.target.value; // Time in 24-hour format (e.g., "13:00")
        const value12Hour = convertTo12HourFormat(value24Hour); // Convert to 12-hour format (e.g., "01:00 PM")
        setTime24(value24Hour); // Update 24-hour time state
        setTime12(value12Hour); // Update 12-hour formatted time state for display
        validateTime(time12)
    };
    // ========================================================



    const handleLocationChange = (e) => {
        const value = e.target.value;
        setLocationInput(value);
        validateLocation(value);
    };

    const handleCapacityChange = (e) => {
        const value = e.target.value;
        setCapacity(value);
        validateCapacity(value);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Run all validations before submission
        validateTitle(title);
        validateDescription(description);
        validateDate(date);
        validateTime(time12);
        validateLocation(locationInput);
        validateCapacity(capacity);

        // Wait until state updates are completed
        setTimeout(async () => {
            // Check if there are any errors
            if (
                titleErr ||
                descriptionErr ||
                dateErr ||
                timeErr ||
                locationErr ||
                capacityErr
            ) {
                await Swal.fire({
                    icon: "error",
                    title: "Validation Error",
                    text: "Please fix the errors in the form before submitting.",
                });
                return;
            }

            try {
                const response = await axios.put(
                    "http://localhost:3000/event/updateEvent", // Updated URL with http://
                    {
                        title,
                        description,
                        date,
                        time: time12,
                        location: locationInput,
                        capacity,
                        id: event._id,
                    }
                );

                // Show SweetAlert success message
                if (response.status === 200) {
                    await Swal.fire({
                        icon: "success",
                        title: "Success!",
                        text: response.data.msg,
                    });

                    navigate('/ourEvent'); // Navigate back to events list or wherever appropriate
                }
            } catch (error) {
                console.error(error);
                await Swal.fire({
                    icon: "error",
                    title: "Submission Error",
                    text: "There was an error updating the event. Please try again.",
                });
            }
        }, 0); // Timeout with 0 delay ensures the state is updated before the check
    };

    return (
        <>
            <HeaderComponent />
            <div className="container border p-3 mt-4 mb-4 border-secondary rounded">
                <h2 className="text-center mb-4">Update Event Details</h2>
                <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                        <div className="col-md-6 mb-3">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    value={title}
                                    onChange={handleTitleChange}
                                    className="form-control"
                                    id="title"
                                    placeholder="Event Title"
                                />
                                <small className="text-danger fs-7">{titleErr}</small>
                                <label htmlFor="title">Title</label>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    value={description}
                                    onChange={handleDescriptionChange}
                                    className="form-control"
                                    id="description"
                                    placeholder="Event Description"
                                />
                                <small className="text-danger fs-7">{descriptionErr}</small>
                                <label htmlFor="description">Description</label>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6 mb-3">
                            <div className="form-floating">
                                <input
                                    type="date"
                                    value={date}
                                    onChange={handleDateChange}
                                    className="form-control"
                                    id="date"
                                    placeholder="Event Date"
                                    min={new Date().toISOString().split("T")[0]} // Prevent past dates
                                    required
                                />
                                <small className="text-danger fs-7">{dateErr}</small>
                                <label htmlFor="date">Date</label>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-floating">
                                <input
                                    type="time"
                                    value={time24}
                                    onChange={handleTimeChange}
                                    className="form-control"
                                    id="time"
                                    placeholder="Event Time (hh:mm AM/PM)"
                                />
                                <small className="text-danger fs-7">{timeErr}</small>
                                <label htmlFor="time">Time</label>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6 mb-3">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    value={locationInput}
                                    onChange={handleLocationChange}
                                    className="form-control"
                                    id="location"
                                    placeholder="Event Location"
                                />
                                <small className="text-danger fs-7">{locationErr}</small>
                                <label htmlFor="location">Location</label>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-floating">
                                <input
                                    type="number"
                                    value={capacity}
                                    onChange={handleCapacityChange}
                                    className="form-control"
                                    id="capacity"
                                    placeholder="Event Capacity"
                                />
                                <small className="text-danger fs-7">{capacityErr}</small>
                                <label htmlFor="capacity">Capacity</label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button style={{
                            backgroundColor: 'rgb(0, 156, 167)', color: 'white'
                        }}   type="submit" className="btn">
                            Update Event
                        </button>
                    </div>
                </form>
            </div>
            <FooterComponent />
        </>
    );
}