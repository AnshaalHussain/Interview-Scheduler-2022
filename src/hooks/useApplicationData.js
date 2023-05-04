import { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  const setDay = (day) => {
    setState({ ...state, day });
  };

  function spotsRemaining(id, book = false, cancel = false) {
    for (let item in state.days) {
      if (state.days[item].name === state.day) {
        if (book) {
          const calcSpots = (state.days[item].spots -= 1);

          const newDayObj = { ...state.days[item], spots: calcSpots };

          const newDaysArray = [...state.days];

          const mappedNewDaysArray = newDaysArray.map((dayObj) => {
            if (dayObj.name === state.day) {
              return newDayObj;
            } else {
              return dayObj;
            }
          });

          const newState = { ...state, days: mappedNewDaysArray };
          setState(newState);
        }

        if (cancel) {
          const calcSpots = (state.days[item].spots += 1);

          const newDayObj = { ...state.days[item], spots: calcSpots };

          const newDaysArray = [...state.days];

          const mappedNewDaysArray = newDaysArray.map((dayObj) => {
            if (dayObj.name === state.day) {
              return newDayObj;
            } else {
              return dayObj;
            }
          });

          const newState = { ...state, days: mappedNewDaysArray };
          setState(newState);
        }
      }
    }
  }

  async function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
    };

    appointment.interview = null;

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    await axios.delete(`/api/appointments/${id}`).then((res) => {
      spotsRemaining(id, false, true);
      setState({ ...state, appointments });
    });
  }

  async function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    await axios.put(`/api/appointments/${id}`, { interview }).then((res) => {
      spotsRemaining(id, true);
      setState({ ...state, appointments });
    });
  }
  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
