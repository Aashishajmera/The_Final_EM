import axios from "axios";
import React, { lazy, Suspense, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// Lazy load the components
const HeaderComponent = lazy(() => import("../HeaderComponent/HeaderComponent"));
const FooterComponent = lazy(() => import("../FooterComponent/FooterComponent"));

// Fallback UI for Suspense
const fallbackUI = <div>Loading...</div>;

export default function UpdateFeedback() {
  const navigate = useNavigate();
  const item = useLocation().state.item;

  const [feedback, setFeedback] = useState(item.review || ""); // Initialize with existing review
  const [feedbackErr, setFeedbackErr] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation for feedback
    if (!feedback) {
      setFeedbackErr("Feedback is required");

      // Show SweetAlert for validation error
      await Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please provide your feedback before submitting.",
      });

      return;
    }
    setFeedbackErr("");

    // Show loading message while processing
    Swal.fire({
      title: "Submitting...",
      text: "Please wait while we process your feedback.",
      icon: "info",
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await axios.patch(process.env.REACT_APP_UPDATE_FEEDBACK, {
        _id: item._id,
        review: feedback, // Use state variable here
      });

      if (response.status === 201) {
        Swal.close(); // Close the loading message

        // Show success message
        await Swal.fire({
          icon: "success",
          title: "Feedback Updated",
          text: "Thank you for updating the feedback!",
        });

        navigate("/seeUserFeedback");

        // Clear feedback input field after submission (optional)
        setFeedback("");
      }
    } catch (error) {
      // Handle submission error
      Swal.close(); // Close the loading message

      await Swal.fire({
        icon: "error",
        title: "Submission Error",
        text: "There was an error submitting your feedback. Please try again.",
      });
    }
  };

  return (
    <>
      <Suspense fallback={fallbackUI}>
        <HeaderComponent />
      </Suspense>
      <div className="container border p-3 mt-4 mb-4 border-secondary rounded">
        <h2 className="text-center mb-4">Update Feedback Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-12">
              <div className="form-floating">
                <textarea
                  className="form-control"
                  id="feedback"
                  placeholder="Leave your feedback here"
                  value={feedback} // Use the state variable here
                  onChange={(e) => setFeedback(e.target.value)}
                  rows="8"
                />
                <small className="text-danger fs-7">{feedbackErr}</small>
                <label htmlFor="feedback">Feedback</label>
              </div>
            </div>
          </div>
          <div className="">
            <button
              style={{
                backgroundColor: "rgb(0, 156, 167)",
                color: "white",
                fontSize: "16px",
              }}
              type="submit"
              className="btn"
            >
              Update
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn btn-outline-secondary ms-2 ps-4 pe-4"
              style={{ fontSize: "16px" }}
            >
              Back
            </button>
          </div>
        </form>
      </div>
      <Suspense fallback={fallbackUI}>
        <FooterComponent />
      </Suspense>
    </>
  );
}