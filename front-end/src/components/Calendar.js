import {useState, useEffect, useCallback}  from 'react';
/**
 * This code imports the FullCalendar library and plugins for dayGrid, timeGrid, and interaction.
 * It defines some events, and then renders a FullCalendar component with properties specifying the plugins to use, the initial view, the header toolbar, custom buttons, the events, and event colors.
 * 
 */

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { formatDate } from '@fullcalendar/core'
import "../css/Calendar.css";
import { useDispatch, useSelector } from "react-redux";

import {create as createSession, getAll as getAllSessions} from "../slices/session";
import {update as updateSession} from "../slices/session";
import { current } from '@reduxjs/toolkit';
import axios from "axios";
import clientIds from "../common/clientIds.js";
import { gapi } from "gapi-script";
import { getMicrosoftToken, getGoogleToken } from "../common/Auth";
const { Client } = require("@microsoft/microsoft-graph-client");

let eventGuid = 0

export function createEventId() {
  return String(eventGuid++)
}



const events = [
  {
    id: 1,
    title: 'event 1',
    start: '2023-06-14T10:00:00',
    end: '2023-06-14T12:30:00',
    status: 'busy'
    
  },
  {
    id: 2,
    title: 'event 2',
    start: '2023-06-16T13:00:00',
    end: '2023-06-16T18:00:00',
    status: 'available', 

  },
  { id: 3, title: 'event 3', start: '2023-06-17T13:00:00', end: '2023-06-20T17:00:00' , status: 'tentative'},
  {
    id: 4,
    title: 'event 4',
    start: '2023-07-16T13:00:00',
    end: '2023-07-16T18:00:00',
  }
]
;


const Calendar = () => {

  const [modalView, setModalView] = useState(false);
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [title, setTitle] = useState('');
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [startTime, setStartTime] = useState('12:30 pm');
  const [endTime, setEndTime] = useState('1:00 pm');
  const [isStartTime, setIsStartTime] = useState(true);
  const [editEvent, setEditEvent] = useState(null);
  const [clickedInfo, setClickedInfo] = useState(null);


  const dispatch = useDispatch();

  const sessions = useSelector((state) => state.session.sessions);

    const getMicrosoftCalendarsList = async () => {
        try {
            const token = await getMicrosoftToken();
            console.log(
            "googleCalendar.js 49 | getting calendar events with token",
            token
            );
                    // Initialize the Microsoft Graph API client using the user access token
        // @azure/identity
            // const credential = new OnBehalfOfCredential({
            //     tenantId: clientIds.microsoft.tenantId,
            //     clientId: clientIds.microsoft.clientId,
            //     clientSecret: clientIds.microsoft.clientSecret,
            //     userAssertionToken: token,
            // });
            
            // // @microsoft/microsoft-graph-client/authProviders/azureTokenCredentials
            // const authProvider = new TokenCredentialAuthenticationProvider(credential, {
            //     scopes: ['https://graph.microsoft.com/.default', 'https://graph.microsoft.com/Calendar.read'],
            // });
            
            // const graphClient = Client.initWithMiddleware({ authProvider: authProvider });

            const client = Client.init({
                authProvider: (done) => {
                done(null, token);
                },
            });
    
            const request = client
                .api('/me/calendar/events')
                .get();
        
                const data = await request.json();
            
        } catch (error) {
            console.log("googleCalendar.js 35 | error getting calendar data", error);
            return error.message;
        }
    };


    
    const getGoogleCalendarsList = async () => {
    try {
        const token = await getGoogleToken();
        console.log(
        "googleCalendar.js 49 | getting calendar events with token",
        token
        );
        const request = await fetch(
        `https://www.googleapis.com/calendar/v3/users/me/calendarList`,
        {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        }
        );

        const data = await request.json();
        console.log("googleCalendar.js 24 | got calendar events", data);
        return data;
    } catch (error) {
        console.log("googleCalendar.js 35 | error getting calendar data", error);
        return error.message;
    }
    };

  useEffect(() => {
    let sessionsArray = [];
    if (sessions) {
        sessionsArray.concat(sessions);
    }
    console.log(localStorage.getItem("google_access_token"))
    if (localStorage.getItem("googleAccessToken")) {
        const googleEvents = getGoogleCalendarsList();
        console.log(googleEvents);
        // sessionsArray.concat(googleEvents);
    } 
    if (localStorage.getItem("microsoftAccessToken")) {
        console.log("hit");
        const googleEvents = getMicrosoftCalendarsList();
        console.log(googleEvents);
        // sessionsArray.concat(googleEvents);
    }
    console.log(sessionsArray);
}, [sessions]);


  const saveSession = (session, calendarApi) => {
    console.log(session);
    dispatch(createSession(session))
        .unwrap()
        .then(data => {
            console.log(data)
            calendarApi.addEvent({
            id: data._id,
            title,
            start: data.start,
            end: data.end,
            status: data.status
          })
            dispatch(getAllSessions());
        })
        .catch(e => {
            console.log(e);
        });
};

const editSession = (session, id) => {
  dispatch(updateSession({ id: id, data: session }))
      .unwrap()
      .then(data => {
        console.log(data); // Optional: Log the response data from the server

      // Assuming the server returns the updated session data in 'data' variable
      // Update the event on the front end using 'editEvent'
      if (editEvent) {
        editEvent.setProp('title', data.title);
        editEvent.setStart(data.start);
        editEvent.setEnd(data.end);
      }
    })
      .catch(e => {
          console.log(e);
      });
};

  const convertTimeToDate = (time, selectedInfo, editEvent, isStartTime) => {
    const [hourMinute, meridiem] = time.split(' ');
    const [hours, minutes] = hourMinute.split(':');
    
    let convertedHours = parseInt(hours);
    if (meridiem.toLowerCase() === 'pm' && convertedHours !== 12) {
      convertedHours += 12;
    } else if (meridiem.toLowerCase() === 'am' && convertedHours === 12) {
      convertedHours = 0;
    }
    
    let selectedDate;

    console.log(editEvent);
    if (editEvent) {
      // For updating an existing event, use the event's start or end date directly
      selectedDate = isStartTime ? editEvent.start : editEvent.end;
    } else {
      // For creating a new event, use the selected date from selectInfo
      selectedDate = isStartTime ? selectedInfo.start : selectedInfo.end;
    }
    
    // Set the hours, minutes, seconds, and milliseconds of the selected date
    selectedDate.setHours(convertedHours);
    selectedDate.setMinutes(parseInt(minutes));
    selectedDate.setSeconds(0);
    selectedDate.setMilliseconds(0);
  
    // Format the date in the desired format: YYYY-MM-DDTHH:mm:ss
    const formattedDateTime = `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}-${selectedDate.getDate().toString().padStart(2, '0')}T${selectedDate.getHours().toString().padStart(2, '0')}:${selectedDate.getMinutes().toString().padStart(2, '0')}:${selectedDate.getSeconds().toString().padStart(2, '0')}`;
  
    return formattedDateTime;
  };
  


  // function convertClickedTime(dateString) {
  //   const dateObj = new Date(dateString);
  //   const year = dateObj.getUTCFullYear();
  //   const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
  //   const day = String(dateObj.getUTCDate()).padStart(2, '0');
  //   const hours = String(dateObj.getUTCHours()).padStart(2, '0');
  //   const minutes = String(dateObj.getUTCMinutes()).padStart(2, '0');
  //   const seconds = String(dateObj.getUTCSeconds()).padStart(2, '0');
  
  //   return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  // }
  function editConvertToTime(dateString) {
    const dateObj = new Date(dateString);
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
  
    // Convert hours to 12-hour format
    const meridiem = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  
    // Pad minutes with leading zero if needed
    const formattedMinutes = String(minutes).padStart(2, '0');
  
    return `${formattedHours}:${formattedMinutes} ${meridiem}`;
  }
  


  const modalViewClass = modalView === true
    ? 'modal-background'
    : 'hidden';


    // handles showing weekends on the calendar if needed
  const handleWeekendsToggle = () => {
    setWeekendsVisible(!weekendsVisible)
    }

    // this sets the info of the selected date when creating a new event
   const handleDateSelect = (selectInfo) => {
  
    setModalView(true);
    setSelectedDate(selectInfo.startStr);
    setSelectedInfo(selectInfo);

  }

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };

  const handleSubmit = (event, clickedInfo, selectedInfo, startTime, endTime) => {
    event.preventDefault();
    const convertedStartDateTime = convertTimeToDate(startTime, selectedInfo, editEvent, isStartTime);
    setIsStartTime(false);
    const convertedEndDateTime = convertTimeToDate(endTime, selectedInfo, editEvent, isStartTime);
    let info;
    if (editEvent) {
      info = clickedInfo;
    } else {
      info = selectedInfo;
    }
    let calendarApi = info.view.calendar;

    calendarApi.unselect() // clear date selection
    const sessionData = {
        title,
        start: convertedStartDateTime,
        end: convertedEndDateTime,
        allDay: false,
        status: 'available'
    };
    
    if (title) {
      if (editEvent) {
        // If editEvent has a value, call editSession without passing sessionData
        editSession(sessionData, editEvent.id);
      } else {
        // Otherwise, call saveSession to create a new event
        saveSession(sessionData, calendarApi);
      }

    }

    setModalView(false);
    setSelectedDate(null);
    setIsStartTime(true);
    setTitle('')
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  }

  const handleEventClick = (clickInfo) => {
    setClickedInfo(clickInfo);
    const convertedEditStartTime = editConvertToTime(clickInfo.event.start);
    const convertedEditEndTime = editConvertToTime(clickInfo.event.end);
    setEditEvent(clickInfo.event);
    setStartTime(convertedEditStartTime);
    setEndTime(convertedEditEndTime);
    setModalView(true);
    setTitle(clickInfo.event.title);
  }

  const handleEvents = (events) => {
    setCurrentEvents(events);
  }

  const handleCancel = (event) => {
    event.preventDefault();
    setModalView(false);
    setSelectedDate(null);
    setIsStartTime(true);
    setEditEvent(false);
    setStartTime('12:30 pm');
    setEndTime('1:00 pm');
    setTitle('')

  };

  const handleEventDrop = (info) => {
    const start = convertTimeToDate(editConvertToTime(info.event.start), info.event);
    const end = convertTimeToDate(editConvertToTime(info.event.end), info.event );
    const sessionData = {
      start: start,
      end: end,
      allDay: false,
      status: 'available'
    };

    editSession(sessionData, info.event.id);
  }

  const handleEventResize = (info) => {
    setIsStartTime(false);
    const sessionData = {
      title: info.event.title,
      end: convertTimeToDate(editConvertToTime(info.event.end), info.event, null, isStartTime),
      allDay: false,
      status: 'available'
  };
    
    editSession(sessionData, info.event.id);
  }

function renderEventContent(eventInfo) {
  // event color checks for status and displays appropriate event color
  let eventColor = '';

  if (eventInfo.event.extendedProps.status === 'busy') {
    eventColor = '#cWd2026';
  } else if (eventInfo.event.extendedProps.status === 'available') {
    eventColor = '#4aa564';
  } else if (eventInfo.event.extendedProps.status === 'tentative') {
    eventColor = '#f9c642';
  }  
  return (
    <>
      <div className="event-content" style={{ backgroundColor: eventColor, height: '100%'}}>
        <b>{eventInfo.timeText + ' '}</b>
        <i>{eventInfo.event.title}</i>
      </div>
    </>
  );
}
    return (
      <div className='demo-app'>
        {/* {this.renderSidebar()} */}
        <div className='demo-app-main'>
          {currentEvents !== undefined &&
          currentEvents.length > 0 &&
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView='dayGridMonth'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            eventDrop={handleEventDrop}
            weekends={weekendsVisible}
            //events={currentEvents} // alternatively, use the `events` setting to fetch from a feed
            initialEvents={currentEvents}
            select={handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={handleEventClick}
            eventsSet={handleEvents} // called after events are initialized/added/changed/removed
            eventResize={handleEventResize}
            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
          />
        }
        </div>
        <div className={modalViewClass}>
            <div className='modal-window'>
              <h1 className='ml-2 mt-2 mb-2 text-xl'>
                {editEvent ? 'Update Entry' : 'Add Entry'}
              </h1>
              <hr></hr>
            <form onSubmit={(e) => handleSubmit(e, clickedInfo, selectedInfo, startTime, endTime)}>
              <div className='form-container'>
                <div className='w-full flex'>
                  <label className='ml-2'>
                    Title:
                    <input className='border-solid form-border-color border-2' type="text" value={title} onChange={handleTitleChange}></input>
                  </label>
                  <label htmlFor="startTime">
                    <input
                      className='form-border-color border-solid border-2 w-16 ml-3 mr-1'
                      type="text"
                      id="startTime"
                      value={startTime}
                      onChange={handleStartTimeChange}
                    />
                    -
                    </label>
                    <label htmlFor="endTime">
                      <input
                      className='form-border-color border-solid border-2 w-16 ml-1'
                      type="text"
                      id="endTime"
                      value={endTime}
                      onChange={handleEndTimeChange}
                      />
                    </label>
                  </div>
                </div>
                <hr className='mt-16'></hr>
                <div className='flex w-full justify-end mt-2'>
                  <button className='p-1 text-blue' type='button' onClick={handleCancel}>Cancel</button>
                  <button  className=' bg-light-blue p-1 ml-2 mr-2 w-16 text-white rounded-sm' onClick={()=> setModalView(false)}>
                    {editEvent ? "Update" : "ADD"}
                  </button>
                </div>
              </form>
            </div>
        </div>
      </div>
    )
  }

// const renderSidebar = () => {
//     return (
//       <div className='demo-app-sidebar'>
//         <div className='demo-app-sidebar-section'>
//           <label>
//             <input
//               type='checkbox'
//               checked={this.state.weekendsVisible}
//               onChange={this.handleWeekendsToggle}
//             ></input>
//             toggle weekends
//           </label>
//         </div>
//         <div className='demo-app-sidebar-section'>
//           <h2>All Events ({this.state.currentEvents.length})</h2>
//           <ul>
//             {this.state.currentEvents.map(renderSidebarEvent)}
//           </ul>
//         </div>
//       </div>
//     )
//   }


// function renderSidebarEvent(event) {
//   return (
//     <li key={event.id}>
//       <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
//       <i>{event.title}</i>
//     </li>
//   )
// }


export default Calendar;