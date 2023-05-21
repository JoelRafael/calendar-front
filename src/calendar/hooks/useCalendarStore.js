import { useDispatch, useSelector } from "react-redux";
import calendarApi from "../../api/calendarApi";
import {
  onAUpdateEvent,
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
} from "../../store/calendar/calendarSlice";
import { convertEventsToDateEvents } from "../../helpers/convertEventsToDateEvents";
import Swal from "sweetalert2";

export const useCalendarStore = () => {
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const setActiveEvent = (eventCalendar) => {
    dispatch(onSetActiveEvent(eventCalendar));
  };

  const startSavingEvent = async (calendarEvent) => {
    try {
      if (calendarEvent.id) {
        await calendarApi.put(`events/${calendarEvent.id}`, calendarEvent);
        dispatch(onAUpdateEvent({ ...calendarEvent, user }));
        return;
      }
      const { data } = await calendarApi.post("events", calendarEvent);
      console.log(data);
      dispatch(onAddNewEvent({ ...calendarEvent, id: data.data.id, user }));
    } catch (error) {
      Swal.fire("Erro al guardar", error.response.data.message, "error");
    }
  };

  const startDeletingEvent = async () => {
   try {
     await calendarApi.delete(`events/${activeEvent.id}`);
     dispatch(onDeleteEvent());
   } catch (error) {
    Swal.fire("Erro al eliminar", error.response.data.message, "error");
   }
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get("events");
      const events = convertEventsToDateEvents(data.data);
      dispatch(onLoadEvents(events));
    } catch (error) {
      console.log("Error cargando ventos");
      console.log(error);
    }
  };
  return {
    //* Properties
    events,
    activeEvent,
    hasEventSelectd: !!activeEvent,

    //* Methods
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents,
  };
};
