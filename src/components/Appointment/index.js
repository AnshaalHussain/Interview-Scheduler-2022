import React, { Fragment } from "react";
import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import { useVisualMode } from "hooks/useVisualMode";
import Confirm from "./Confirm";

const Appointment = (props) => {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const CONFIRM = "CONFIRM";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    // console.log("save", interview);

    props.bookInterview(props.id, interview);
    transition(SHOW);
  }

  function onDelete() {
    transition(CONFIRM);
  }

  function onConfirm() {
    props.cancelInterview(props.id);
    transition(EMPTY);
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={onDelete}
        />
      )}
      {mode === CREATE && (
        <Form onSave={save} interviewers={props.interviewers} onCancel={back} />
      )}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete?"
          onConfirm={onConfirm}
          onCancel={() => transition(SHOW)}
        />
      )}
    </article>
  );
};

export default Appointment;
