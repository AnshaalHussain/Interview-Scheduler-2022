import React from "react";
import classNames from "classnames";
import "./InterviewerListItem.scss";

const InterviewerListItem = (props) => {
  const InterviewClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });
  return (
    <li onClick={props.setInterviewer} className={InterviewClass}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt="Sylvia Palmer"
      />
      {props.selected && props.name}
    </li>
  );
};

export default InterviewerListItem;
