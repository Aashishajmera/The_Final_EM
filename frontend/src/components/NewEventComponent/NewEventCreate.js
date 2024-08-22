import { useState } from "react";
import Swal from "sweetalert2";
import FooterComponent from "../FooterComponent/FooterComponent";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import axios from "axios";

export default function CreateNewEvent() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [location, setLocation] = useState("");
    const [capacity, setCapacity] = useState("");

    const [titleErr, setTitleErr] = useState("");
    const [descriptionErr, setDescriptionErr] = useState("");
    const [dateErr, setDateErr] = useState("");
    const [timeErr, setTimeErr] = useState("");
    const [locationErr, setLocationErr] = useState("");
    const [capacityErr, setCapacityErr] = useState("");

    // Validation functions
    const validateTitle = (value) => {
        if (!value) {
            setTitleErr('Title is required');
        } else if (!value.match("^[a-zA-Z]+$")) {
            setTitleErr('Title can contain only alphabet characters');
        } else if (value.length < 5 || value.length > 50) {
            setTitleErr('Title must be between 5 and 50 characters long');
        } else {
            setTitleErr('');
        }
    };

    const validateDescription = (value) => {
        if (!value) {
            setDescriptionErr('Description is required');
        } else {
            setDescriptionErr('');
        }
    };

    const validateDate = (value) => {
        const today = new Date().toISOString().split('T')[0];
        if (!value) {
            setDateErr('Date is required');
        } else if (value < today) {
            setDateErr('Date cannot be before today');
        } else {
            setDateErr('');
        }
    };

    const validateTime = (value) => {
        // Check if the value is empty
        if (!value) {
            setTimeErr('Time is required');
        }
        // Check if the time is in the correct 12-hour format with uppercase AM/PM
        else if (!/^([01]?[0-9]|2[0-3]):([0-5][0-9])\s?(AM|PM)$/.test(value)) {
            setTimeErr('Time must be in hh:mm AM/PM format with AM/PM in uppercase');
        }
        else {
            setTimeErr('');
        }
    };




    const validateLocation = (value) => {
        if (!value) {
            setLocationErr('Location is required');
        } else {
            setLocationErr('');
        }
    };

    const validateCapacity = (value) => {
        if (!value) {
            setCapacityErr('Capacity is required');
        } else if (isNaN(value) || value <= 0) {
            setCapacityErr('Capacity must be a positive number');
        } else {
            setCapacityErr('');
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

    const handleTimeChange = (e) => {
        const value = e.target.value;
        console.log(value + 'time')
        setTime(value);
    };

    const handleLocationChange = (e) => {
        const value = e.target.value;
        setLocation(value);
        validateLocation(value);
    };

    const handleCapacityChange = (e) => {
        const value = e.target.value;
        setCapacity(value);
        validateCapacity(value);
    };

    let userId = sessionStorage.getItem("user");
    console.log(userId);
    userId = JSON.parse(userId)._id;
    console.log(userId);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Run all validations before submission
        validateTitle(title);
        validateDescription(description);
        validateDate(date);
        validateTime(time);
        validateLocation(location);
        validateCapacity(capacity);

        // Check if there are any errors
        if (titleErr || descriptionErr || dateErr || timeErr || locationErr || capacityErr) {
            // Show SweetAlert with error message
            await Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: 'Please fix the errors in the form before submitting.',
            });
            return;
        }


        console.log("i am titile", title)
        console.log('i am description', description);
        console.log('i am date', date)
        console.log('i am time', time)
        console.log('i am location', location)
        console.log('i am capacity', capacity)
        console.log("I am userid", userId)

        // If no errors, proceed with form submission


        // const jsonObject = JSON.stringify(eventObject)
        // console.log(jsonObject +"i am jsonobject")
        // const jsObject = JSON.parse(jsonObject);
        // console.log(jsObject +"i am object");

        try {
            const response = await axios.post('http://localhost:3000/event/addevent', {
                title: title,
                description: description,
                date: date,
                time: time,
                location: location,
                capacity: capacity,
                userId: userId
            });

            console.log(response.data)

            // Show SweetAlert success message
            await Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Event created successfully.',
            });

            // Reset form fields
            setTitle("");
            setDescription("");
            setDate("");
            setTime("");
            setLocation("");
            setCapacity("");
        } catch (error) {
            console.log(error);
            // Show SweetAlert error message
            await Swal.fire({
                icon: 'error',
                title: 'Submission Error',
                text: 'There was an error creating the event. Please try again.',
            });
        }
    };

    return (
        <>
            <HeaderComponent />
            <div className="container border p-3 mt-4 mb-4 border-secondary rounded">
                <h2 className="text-center mb-4">Create Event</h2>
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
                                    min={new Date().toISOString().split('T')[0]} // Prevent past dates
                                />
                                <small className="text-danger fs-7">{dateErr}</small>
                                <label htmlFor="date">Date</label>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    value={time}
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
                                    value={location}
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
                        <button type="submit" className="btn btn-primary">Create Event</button>
                    </div>
                </form>
            </div>
            <FooterComponent />
        </>
    );
}
