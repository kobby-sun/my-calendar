import { useState } from "react";
import { useDispatch } from "react-redux";
import { addEvent, CalendarItem, createEventId } from "~/calendar_store";
import { useNavigate } from '@remix-run/react';

export default function AddEvent() {

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [date, setDate] = useState('');
    const [allday, setAllday] = useState(false);
    const [time, setTime] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const add = (evt: any) => {
        evt.preventDefault()
        console.log(date)
        console.log(time)
        dispatch(addEvent({
            id: createEventId(),
            title: title,
            start: allday ? date : date + 'T' + time,
            description: desc
        } as CalendarItem));
        navigate("/")
    }

    const back = () => {
        navigate("/")
    }

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="flex flex-col items-center gap-16">
                <header className="flex flex-col items-center gap-9">
                    <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
                        Add Calendar Event
                    </h1>

                </header>
                <form onSubmit={add}>
                    <div>
                        <div className='flex flex-row'>
                            <div className='flex-auto w-64'>          Event Title</div>
                            <div className='flex-auto w-32'>          <input type='text' required onChange={evt => setTitle(evt.target.value)}></input></div>
                        </div>
                        <br />
                        <div className='flex flex-row'>
                            <div className='flex-auto w-64'>          Event Description</div>
                            <div className='flex-auto w-32'>          <input type='text' required onChange={evt => setDesc(evt.target.value)}></input></div>
                        </div>
                        <br />
                        <div className='flex flex-row'>
                            <div className='flex-auto w-64'>          Event Date</div>
                            <div className='flex-auto w-32'>          <input type='date' required onChange={evt => setDate(evt.target.value)}></input></div>
                        </div>
                        <br />
                        <div className='flex flex-row'>
                            <div className='flex-auto w-64'>          All day event?</div>
                            <div className='flex-auto w-32'>          <input type='checkbox' checked={allday} onChange={evt => setAllday(!allday)}></input></div>
                        </div>
                        <br />
                        {!allday && <>
                            <div className='flex flex-row'>
                                <div className='flex-auto w-64'>          Event Time</div>
                                <div className='flex-auto w-32'>          <input type='time' required onChange={evt => setTime(evt.target.value)}></input></div>
                            </div>
                            <br />
                        </>}

                        <div className='flex flex-row'>
                            <div className='flex-auto w-32'>          <button type="submit" style={{ border: '1px solid', padding: '8px', borderColor: 'white' }}>Add Event</button></div>
                            <div className='flex-auto w-32'>          <button type='button' onClick={back} style={{ border: '1px solid', padding: '8px', borderColor: 'white' }}>Back</button></div>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    );
}
