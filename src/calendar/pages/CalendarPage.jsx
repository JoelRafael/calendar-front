import { Calendar} from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Navbar } from "../components/Navbar"
import { getMessagesEs } from "../../helpers/getMessages";
import { localizer } from '../../helpers/calendarLocalizer';
import { CalendarEventBox } from '../components/CalendarEventBox';
import { useEffect, useState } from 'react';
import {CalendarModal } from '../components/CalendarModal';
import { useUiStore } from '../hooks/useUiStore';
import { useCalendarStore } from '../hooks/useCalendarStore';
import { FabAddNew } from '../components/FabAddNew';
import { FabDelete } from '../components/FabDelete';
import { useAutStore } from '../hooks/useAuthStore';





export const CalendarPage = () => {
  const { user } = useAutStore();
  const { openDateModal } = useUiStore();
  const {  events, setActiveEvent, startLoadingEvents } = useCalendarStore();

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month')

  const eventStyleGetter = (event, start, end, isSelected) => {

    const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid) ;
    const style = {
      backgroundColor: isMyEvent? '#347CF7' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      color:'white'
    }
    return {
      style
    }
  }

  const onDoubleClick = (event) => {
  console.log({doubleClick:event})
}
  const onSelect = (event) => {
  console.log({Click:event})
}
  const onViewChange = (event) => {
    localStorage.setItem('lastView', event);
  }
  
  useEffect(() => {
    startLoadingEvents();
  }, [])
  

  return (
    <>
      <Navbar></Navbar>
      
      
        <Calendar
      culture='es'
      localizer={ localizer }
      events={events}
      defaultView={lastView}    
      startAccessor="start"
      endAccessor="end"
      style={{ height: 'calc( 100vh - 80px )' }}
      messages={getMessagesEs()}
      eventPropGetter={eventStyleGetter}
          components={{
            event:CalendarEventBox
          }}
      onDoubleClickEvent={openDateModal}
      onSelectEvent={setActiveEvent}
      onView={onViewChange}
        />
      
      <CalendarModal></CalendarModal>
      <FabAddNew></FabAddNew>
      <FabDelete></FabDelete>
    </>
  )
}
