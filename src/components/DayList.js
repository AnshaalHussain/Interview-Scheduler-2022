import React from "react";
import DayListItem from "./DayListItem";

const DayList = (props) => {
  let daysArr = props.days.map((dayData) => {
    return (
      <DayListItem
        key={dayData.id}
        name={dayData.name}
        spots={dayData.spots}
        selected={dayData.name === props.day}
        setDay={props.setDay}
      />
    );
  });

  return <ul>{daysArr}</ul>;
};

export default DayList;
