import axios from "axios";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// Lazy load the HeaderComponent and FooterComponent
const HeaderComponent = lazy(() =>
  import("../HeaderComponent/HeaderComponent")
);
const FooterComponent = lazy(() =>
  import("../FooterComponent/FooterComponent")
);

export default function SeeFeedback() {
  const [feedback, setFeedbackList] = useState([]);
  const navigate = useNavigate();

  const user = sessionStorage.getItem("user");
  const jsObjectUser = JSON.parse(user);
  const userId = jsObjectUser._id;

  useEffect(() => {
    const feedbackList = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/feedback/seeUserFeedback",
          { userId }
        );

        if (response.status === 204) {
          Swal.fire({
            title: "No Feedback Found",
            text: "There are no feedbacks for this event yet.",
            icon: "warning",
            confirmButtonText: "OK",
          });
        }

        if (response.status === 200) {
          setFeedbackList(response.data.feedbackList);
          console.log(response.data.feedbackList);
        }
      } catch (error) {
        console.log("Error while getting feedback list", error);
      }
    };

    feedbackList();
  }, [userId]);

  // for deleting the feedback
  const deleteFeedback = async (item) => {
    console.log(item);
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this feedback? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.delete(
          'http://localhost:3000/feedback/deleteParticularFeedback',
          {
            data: { _id: item._id },
          }
        );

        if (response.status === 200) {
          const updateFeedback = feedback.filter((feedbackParticular) => {
            return feedbackParticular._id !== item._id;
          });
          setFeedbackList(updateFeedback);
          Swal.fire("Deleted!", "The feedback has been deleted.", "success");
        } else {
          Swal.fire(
            "Error!",
            "There was an issue deleting the feedback.",
            "error"
          );
        }
      } catch (error) {
        Swal.fire(
          "Error!",
          "An error occurred while trying to delete the feedback.",
          "error"
        );
        console.error(error); // Log the error for debugging purposes
      }
    }
  };

  // for edit the feedback
  const editFun = (item) =>{
    navigate('/updateFeedback',{state: {item}})
  }

  return (
    <>
      <Suspense fallback={<div>Loading header...</div>}>
        <HeaderComponent />
      </Suspense>

      <div className="container border rounded border-secondary mt-3 mb-3 p-4">
        <h3 className="text-center border-bottom border-secondary pb-4">
          YOUR FEEDBACK
        </h3>
        {feedback.length === 0 ? (
          <p>No feedback available.</p>
        ) : (
          feedback.map((item, index) => (
            <div
              key={index}
              className=" border-bottom border-secondary p-2 mb-3">
              <div>
                <span className="fw-bold">Name: </span>
                {item.eventId.title}
              </div>
              <div>
                <span className="fw-bold">Date: </span>
                {new Date(item.dateTime).toLocaleDateString()}
              </div>
              <div>
                <span className="fw-bold">Time: </span>
                {new Date(item.dateTime).toLocaleTimeString()}
              </div>
              <p>
                <span className="fw-bold">Review: </span>
                {item.review}
              </p>
              <button onClick={()=>{editFun(item)}} className="btn btn-primary">Edit</button>{" "}
              <button
                onClick={() => {
                  deleteFeedback(item);
                }}
                className="btn btn-outline-danger ms-2">
                Delete
              </button>
            </div>
          ))
        )}
        <div className="row">
          <div className="col-md-3 p-0">
            <button
              onClick={() => navigate("/ourEvent")}
              className="btn btn-outline-secondary ps-4 pe-4 m-2">
              Back
            </button>
          </div>
        </div>
      </div>

      <Suspense fallback={<div>Loading footer...</div>}>
        <FooterComponent />
      </Suspense>
    </>
  );
}