import React from "react";
import clsx from "clsx";
import { navigate } from "react-big-calendar/lib/utils/constants";
import { Button } from "@material-ui/core";

const RecCalendarToolbar = ({
  date,
  view,
  views,
  label,
  onView,
  onNavigate,
  localizer: { messages }
}) => {
  const isPreviousValid = () => {
    const targetViewDate = date;
    switch (view) {
      case "week":
        targetViewDate.setDate(targetViewDate.getDate() - 7);
        break;
      case "month":
        targetViewDate.setMonth(targetViewDate.getMonth() - 1);
        break;
      default:
        break;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // Fail if the target date is in the past.
    return targetViewDate >= today;
  };

  const isNextValid = () => {
    const targetViewDate = date;
    switch (view) {
      case "week":
        targetViewDate.setDate(targetViewDate.getDate() + 7);
        break;
      case "month":
        targetViewDate.setMonth(targetViewDate.getMonth() + 1);
        break;
      default:
        break;
    }
    const maxFutureDate = new Date();
    maxFutureDate.setMonth(maxFutureDate.getMonth() + 3);
    // Fail if the target date is more than three months in the future.
    return targetViewDate < maxFutureDate;
  };

  const onClickPrevious = () => {
    onNavigate(navigate.PREVIOUS);
  };
  const onClickToday = () => {
    onNavigate(navigate.TODAY);
  };
  const onClickNext = () => {
    onNavigate(navigate.NEXT);
  };

  const onClickView = view => () => {
    onView(view);
  };

  const createViewGroup = () => {
    if (views.length > 1) {
      return views.map(name => (
        <Button
          type="button"
          key={name}
          className={clsx({ "rbc-active": view === name })}
          onClick={onClickView(name)}
        >
          {messages[name]}
        </Button>
      ));
    }
  };

  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        <Button onClick={onClickPrevious} disabled={!isPreviousValid()}>
          {messages.previous}
        </Button>
        <Button onClick={onClickToday}>{messages.today}</Button>
        <Button onClick={onClickNext} disabled={!isNextValid()}>
          {messages.next}
        </Button>
      </span>

      <span className="rbc-toolbar-label">{label}</span>

      <span className="rbc-btn-group">{createViewGroup()}</span>
    </div>
  );
};

export default RecCalendarToolbar;
