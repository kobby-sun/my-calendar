
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'


import { useSelector, useDispatch } from 'react-redux';
import { CalendarState, removeEvent, searchEvents, clearSearch, searchedItems } from '~/calendar_store';
import { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { useNavigate } from '@remix-run/react';


export default function Index() {
  const searched = useSelector(searchedItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [tooltipContent, setTooltipContent] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleEventAdd = (addInfo: any) => {
    console.log('handleEventAdd', addInfo)
  }

  const clear = () => {
    setSearchKeyword('')
    dispatch(clearSearch())
  }

  const search = (evt: any) => {
    evt.preventDefault();
    dispatch(searchEvents(searchKeyword))
  }

  const gotoAddEvent = () => {
    navigate("/add_event")
  }

  const handleEventClick = (clickInfo: any) => {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
      dispatch(removeEvent(clickInfo.event.id))
    }
  }

  const handleMouseEnterInfo = (arg: any) => {
    console.log(arg)
    console.log(arg.event.extendedProps.description)
    // var tooltip = new Tooltip(arg.el, {
    //   title: arg.event.extendedProps.description,//you can give data for tooltip
    //   placement: 'top',
    //   trigger: 'hover',
    //   container: 'body'
    // });

    // setTooltipContent(arg.event.extendedProps.description)

    arg.el.setAttribute('data-tooltip-html', '<div><strong>' + arg.event.title + '</strong><ul><li>' + arg.event.extendedProps.description + '</li></ul></div>');
  }

  const handleEventDidMount  = (arg: any) => {
    console.log(arg)
    // setTooltipContent(arg.event.extendedProps.description)

    arg.el.setAttribute('data-tooltip-html', '<div><strong>' + arg.event.title + '</strong><ul><li>' + arg.event.extendedProps.description + '</li></ul></div>');

    arg.el.setAttribute('data-tooltip-id', 'my-tooltip');
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9">
          <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
            My Calendar 
          </h1>
        
        </header>
        <div className='flex flex-row'>
          <div className='flex-auto w-32'>          <button onClick={gotoAddEvent} style={{border: '1px solid', padding: '8px', borderColor: 'white'}}>Add Event</button></div>
        </div>
        <form onSubmit={search}>
          <div className='flex flex-row'>
            <div className='flex-auto w-64'>          <input type='text' value={searchKeyword} required onChange={evt => setSearchKeyword(evt.target.value)}></input></div>
            <div className='flex-auto w-32'>          <button type='submit' style={{border: '1px solid', paddingLeft: '8px', paddingRight: '8px',borderColor: 'white'}}>Search</button></div>
            <div className='flex-auto w-32'>          <button type='button' onClick={clear} style={{border: '1px solid', paddingLeft: '8px', paddingRight: '8px',borderColor: 'white'}}>Reset</button></div>
          </div>
        </form>

        <div style={{width: '100%'}}>


        <Tooltip
          id="my-tooltip"
          style={{'zIndex': 9999999}}
          content={tooltipContent}
        />

        <FullCalendar
            plugins={[ dayGridPlugin ]}
            events={searched}
            initialView="dayGridMonth"  
            eventClick={handleEventClick}
            eventMouseEnter={handleMouseEnterInfo}
            eventDidMount ={handleEventDidMount}
            />


          </div>
      </div>
    </div>
  );
}
