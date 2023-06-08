import { useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { addHours } from 'date-fns';
import { CalendarEvent, CalendarModal, Navbar } from "../";

import { localizer, getMessagesEs } from '../../helpers';
import { useUiStore } from '../../hooks';

const events = [{
  title: 'Cumpleaños del jefe',
  notes: 'Hay que comprar el pastel',
  start: new Date(),
  end: addHours( new Date(), 1),
  bgColor: '#fafafa',
  user: {
    _id: '123',
    name: 'Nemecio'
  }
}]

export const CalendarPage = () => {

  const { openDateModal } = useUiStore();
  const [lastView, setLastView] = useState(localStorage.getItem('lastview') || 'week')

  const eventStyleGetter = ( event, start, end, isSelected) => {
    // console.log({event, start, end, isSelected});

    const style = {
      backgroundColor: '#347cf7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return {
      style
    }
  }

  const onDoubleClick = (event) => {
    //console.log({doubleClick: event});
    openDateModal();
  }

  const onSelect = (event) => {
    console.log({ click:event });
  }

  const onViewChanged = (event) => {
    localStorage.setItem('lastview', event);
    setLastView(event);
  }

  return (
    <>
      <Navbar/>

      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px)' }}
        messages={ getMessagesEs() }
        eventPropGetter={ eventStyleGetter }
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={ onViewChanged }
      />
      
      <CalendarModal/>

    </>
  )
}
