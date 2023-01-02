export function getAppointmentsForDay(state, day) {
  const stateDaysCopy = [...state.days];
  const daysObj = stateDaysCopy.filter((filterDay) => filterDay.name === day);

  if (daysObj.length === 0) {
    return [];
  }
  const daysAppointArray = daysObj[0].appointments;

  const stateAppointsArray = Object.values(state.appointments);
  const filteredAppointsArray = stateAppointsArray.filter((appointObj) =>
    daysAppointArray.includes(appointObj.id)
  );

  return filteredAppointsArray;
}

// The function should return a new object containing the interview data when we pass it an object that contains the interviewer. Otherwise, the function should return null.

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const newInterviewersCopy = { ...state.interviewers };
  const interviewersList = Object.values(newInterviewersCopy);

  const filteredArray = interviewersList.filter(
    (interviewersObj) => interviewersObj.id === interview.interviewer
  );

  let newInterviewerObj = { ...interview };
  newInterviewerObj.interviewer = filteredArray[0];

  return newInterviewerObj;
}

export function getInterviewersForDay(state, day) {
  const daysObj = state.days.filter((filterDay) => filterDay.name === day);

  if (daysObj.length === 0) {
    return [];
  }

  const daysInterviewersArray = daysObj[0].interviewers;

  const stateInterviewersArray = Object.values(state.interviewers);

  const filteredInterviewersArray = stateInterviewersArray.filter(
    (interviewerObj) => daysInterviewersArray.includes(interviewerObj.id)
  );

  return filteredInterviewersArray;
}
