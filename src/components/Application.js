import React from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import {
  getAppointmentsForDay,
  getInterviewersForDay,
  getInterview,
} from "helpers/selectors";

import useApplicationData from "hooks/useApplicationData";

export default function Application() {
  const { state, setDay, bookInterview, cancelInterview } =
    useApplicationData();

  console.log("state", state);

  const interviewers = getInterviewersForDay(state, state.day);

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const appointmentsArray = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
        key={appointment.id}
        {...appointment}
        interview={interview}
        interviewers={interviewers}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
        <div className="sidebar__credit sidebar--centered">
          Link to{" "}
          <a
            className="sidebar__link"
            target="_blank"
            href="https://github.com/AnshaalHussain/Interview-Scheduler-2022#interview-scheduler"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </div>
        <div className="sidebar__credit sidebar--centered">
          <a
            className="sidebar__link"
            target="_blank"
            href="https://icons8.com/icon/s4Xt7WXfxRMk/scheduler"
            rel="noopener noreferrer"
          >
            Scheduler{" "}
          </a>
          icon by{" "}
          <a
            className="sidebar__link"
            target="_blank"
            href="https://icons8.com"
            rel="noopener noreferrer"
          >
            Icons8
          </a>
        </div>
      </section>
      <section className="schedule">{appointmentsArray}</section>
    </main>
  );
}
