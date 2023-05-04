import React from "react";
import PropTypes from "prop-types";

import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

const InterviewerList = (props) => {
  let interviewersArr = props.interviewers.map((interviewerData) => {
    return (
      <InterviewerListItem
        setInterviewer={() => props.onChange(interviewerData.id)}
        selected={interviewerData.id === props.value}
        id={interviewerData.id}
        avatar={interviewerData.avatar}
        name={interviewerData.name}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewersArr}</ul>
    </section>
  );
};

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};

export default InterviewerList;
