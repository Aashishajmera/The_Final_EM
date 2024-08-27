import { FeedbackModel } from "../model/FeedbackModel.js"; // Adjust the path as needed

// create new feedback
export const createFeedback = async (req, res) => {
  try {
    // Destructure fields from request body
    const { userId, eventId, review, dateTime } = req.body;

    // Basic validation
    if (!userId || !eventId || !review || !dateTime) {
      return res.status(400).json({ msg: "All fields are required." });
    }

    // Remove any extra characters from the dateTime string
    const fixedDateTime = dateTime.split("Z")[0] + "Z"; // Assumes 'Z' is the valid end character for the date string

    // Validate that the fixed date-time is a valid date
    const parsedDateTime = new Date(fixedDateTime);
    if (isNaN(parsedDateTime.getTime())) {
      return res.status(400).json({ msg: "Invalid date-time format." });
    }

    // Create new feedback
    const feedback = new FeedbackModel({
      userId,
      eventId,
      review,
      dateTime: parsedDateTime, // Use parsed date-time
    });

    // Save feedback to the database
    await feedback.save();
    return res
      .status(201)
      .json({ msg: "Feedback submitted successfully.", feedback });
  } catch (err) {
    console.error("Error during feedback creation:", err);
    return res.status(500).json({ msg: "Internal server error." });
  }
};

// see the feedback
export const seeFeedbackList = async (req, res, next) => {
  try {
    const { eventId } = req.body;

    // Use find to fetch all feedbacks for a particular eventId
    const feedbackList = await FeedbackModel.find({ eventId }).populate(
      "userId"
    );

    if (!feedbackList || feedbackList.length === 0) {
      // Uncomment the return statement below
      return res.status(204).json({ msg: "No feedback found" }); // 204 is used to signify no content
    }
    return res.status(200).json({ msg: "Feedback list", feedbackList }); // 200 for a successful response
  } catch (error) {
    console.log("Internal server error", error);
    return res.status(500).json({ msg: "Internal server error" }); // 500 status code for server error
  }
};

// particular user feedback see
export const seeUserFeedbackList = async (req, res, next) => {
  try {
    const { userId } = req.body;

    // Use find to fetch all feedbacks for a particular eventId
    const feedbackList = await FeedbackModel.find({ userId }).populate(
      "eventId"
    );

    if (!feedbackList || feedbackList.length === 0) {
      // Uncomment the return statement below
      return res.status(204).json({ msg: "No feedback found" }); // 204 is used to signify no content
    }
    return res.status(200).json({ msg: "Feedback list", feedbackList }); // 200 for a successful response
  } catch (error) {
    console.log("Internal server error", error);
    return res.status(500).json({ msg: "Internal server error" }); // 500 status code for server error
  }
};

// delete the feedback
export const deleteParticularFeedback = async (req, res, next) => {
  try {
    const { _id } = req.body;
    const feedbackDelete = await FeedbackModel.deleteOne({ _id });
    if (feedbackDelete.deletedCount > 0) {
      return res.status(200).json({
        msg: "Feedback delete successfull...",
        feedbackDelete,
      });
    }
    return res.status(203).json({ msg: "event not found" });
  } catch (error) {
    console.log(error);
    return res.status(501).json({ msg: "Internal server error...", error });
  }
};

// update the feedback
export const updateFeedback = async (req, res, next) => {
  try {
    const {_id, review} = req.body;
    const updateFeedb = await FeedbackModel.findByIdAndUpdate({_id}, {review});
    if(updateFeedb){
      return res.status(201).json({msg: 'event successfully update', updateFeedb})
    }
    return res.status(203).json({msg: 'feedback not found'});
  } catch (error) {
    return res.status(501).json({msg: 'Internal server error..', error})
  }
}