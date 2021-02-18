import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { Fab, Grid } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { Link } from 'react-router-dom';

export default function Calendar(props) {

    // Handlers
    const handleDayClick = () => {
        // TODO: show event
    }

    // Parses Shift objects to FullCalendars's Event objects
    // Shifts are assumed to always be a Shift array/list
    const parseEvents = (props) => {
        var events = props.shifts.map(shift => {            
            var unavailable = {
                id: shift.shiftId,
                title: "Pré-embarque",
                start: shift.unavailabilityStartDate,
                end: shift.boardingDate,
                display: "block",
                backgroundColor: "rgb(255,92,0)",
                allDay: "true",
                extendedProps: {
                    group: shift.shiftId
                }
            };

            var onBoard = {
                id: "board" + shift.shiftId,
                title: "A bordo",
                start: shift.boardingDate,
                end: shift.leavingDate,
                display: "block",
                backgroundColor: "rgb(170,0,0)",
                allDay: "true",
                extendedProps: {
                    group: shift.shiftId
                }
            };

            var available = {
                id: "available" + shift.shiftId,
                title: "Pós-embarque",
                start: shift.leavingDate,
                end: shift.unavailabilityEndDate,
                display: "block",
                backgroundColor: "rgb(0,185,185)",
                allDay: "true",
                extendedProps: {
                    group: shift.shiftId
                }             
            }

            return [unavailable, onBoard, available];
        });
        
        return events.flat();
    }


    return (
        <Grid container spacing={3}>
            <Grid item>
                <FullCalendar
                    plugins={[ dayGridPlugin, interactionPlugin ]}
                    initialView="dayGridMonth"
                    selectable={true}
                    height="auto"
                    contentHeight="auto"
                    locale="pt-br"
                    events={parseEvents(props)}
                />
            </Grid>
            <Grid container item justify="flex-end">
                <Fab 
                    variant="extended"
                    color="primary" 
                    aria-label="add"
                    component={Link}
                    to="/shift"
                >
                    <Add />
                    Escala
                </Fab>
            </Grid>
        </Grid>
    );
}