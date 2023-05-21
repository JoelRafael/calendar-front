import { useMemo, useState } from "react";
import { addHours, differenceInSeconds } from "date-fns";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useCalendarStore } from "./useCalendarStore";

export const useCalendarModal = () => {
  const { startSavingEvent } = useCalendarStore();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formValue, setFormValue] = useState({
    title: "",
    notes: "",
    start: new Date(),
    end: addHours(new Date(), 2),
  });
  const titleClass = useMemo(() => {
    if (!formSubmitted) return "";
    return formValue.title.length > 0 ? "is-valid" : "is-invalid";
  }, [formValue.title, formSubmitted]);

  const onInputChanged = ({ target }) => {
    setFormValue({
      ...formValue,
      [target.name]: target.value,
    });
  };
  const onDateChanged = (event, changing) => {
    setFormValue({
      ...formValue,
      [changing]: event,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    const difference = differenceInSeconds(formValue.end, formValue.start);

    if (isNaN(difference) || difference <= 0) {
      Swal.fire("Fechas incorrectas", "Revisar las fechas ingresadad", "error");
      return;
    }
    if (formValue.title.length <= 0) return;
    
    startSavingEvent(formValue);
  };

  return {
    formSubmitted,
    formValue,
    setFormValue,
    titleClass,
    onInputChanged,
    onDateChanged,
    onSubmit,
  };
};
