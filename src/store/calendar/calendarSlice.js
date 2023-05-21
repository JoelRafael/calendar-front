import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

//const tempEvent = {
//  _id: new Date().getTime(),
//  title: "Cumpleano del jefe",
//  notes: "Hay que comprar el pastel",
//  start: new Date(),
//  end: addHours(new Date(), 2),
//  bgColor: "#fafafa",
//  user: {
//    __id: "123",
//    name: "Joel Rafael",
//  },
//};
export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    isLoadingEvents: true,
    events: [],
    activeEvent: null,
  },
  reducers: {
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },

    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
    onAUpdateEvent: (state, { payload }) => {
      state.events = state.events.map((event) => {
        if (event.id === payload.id) {
          return payload;
        }
        return event;
      });
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter(
          (events) => events.id !== state.activeEvent.id
        );
        state.activeEvent = null;
      }
    },

    onLoadEvents: (state, { payload = [] }) => {
      state.isLoadingEvents = false;
      //state.events = payload;
      payload.forEach((element) => {
        const exist = state.events.some((dbevent) => dbevent.id === element.id);

        if (!exist) {
          state.events.push(element);
        }
      });
    },

    onLogoutCalendar: (state) => {
      state.isLoadingEvents = true;
      state.events = [];
      state.activeEvent = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onSetActiveEvent,
  onAddNewEvent,
  onAUpdateEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar,
} = calendarSlice.actions;
