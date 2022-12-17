export function getAppointmentsForDay(state, day) {
  const daysObj = state.days.filter((filterDay) => filterDay.name == day);

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
