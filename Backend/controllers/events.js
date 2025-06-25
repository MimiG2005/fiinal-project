import {
    QueryListOfEvents,
    QueryEventById,
    QueryCreateEvent,
    QueryUpdateEvent,
    QueryDeleteEvent,
    QueryEventsByClientId,
    QueryGetEventTypes,
    QueryEventWithClientNames
} from '../services/events.js'; // ודאי שהנתיב נכון

export const getAllEvents = async (req, res) => {
    console.log('getAllEvents', req.user);
    try {
        const events = await QueryListOfEvents();
        res.status(200).json(events);
    } catch (err) {
        console.error('Error in getAllEvents:', err);
        res.status(500).json({ error: 'Failed to retrieve events', details: err.message });
    }
};

export const getEventById = async (req, res) => {
    try {
        const event = await QueryEventById(req.params.id);
        if (event.length === 0) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(event[0]);
    } catch (err) {
        console.error('Error in getEventById:', err);
        res.status(500).json({ error: 'Failed to retrieve event', details: err.message });
    }
};

export const getEventsByClientId = async (req, res) => {
    try {
        const events = await QueryEventsByClientId(req.params.id);
        res.status(200).json(events);
    } catch (err) {
        console.error('Error in getEventsByClientId:', err);
        res.status(500).json({ error: 'Failed to retrieve events for client', details: err.message });
    }
};

export const createEvent = async (req, res) => {
    try {
        const result = await QueryCreateEvent(req.body); // req.body צריך להכיל clientId, date, type, supplierIds...
        res.status(201).json({ message: 'Event created successfully', id: result.insertId });
    } catch (err) {
        console.error('Error in createEvent:', err);
        res.status(500).json({ error: 'Failed to create event', details: err.message });
    }
};

export const updateEvent = async (req, res) => {
    try {
        const result = await QueryUpdateEvent(req.params.id, req.body);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Event not found or no changes made' });
        }
        res.status(200).json({ message: 'Event updated successfully', data: result });
    } catch (err) {
        console.error('Error in updateEvent:', err);
        res.status(500).json({ error: 'Failed to update event', details: err.message });
    }
};

export const deleteEvent = async (req, res) => {
    try {
        const result = await QueryDeleteEvent(req.params.id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json({ message: 'Event deleted successfully', data: result });
    } catch (err) {
        console.error('Error in deleteEvent:', err);
        res.status(500).json({ error: 'Failed to delete event', details: err.message });
    }}

    export const getEventTypes = async (req, res) => {
  try {
    const types = await QueryGetEventTypes();
    res.json(types);
  } catch (error) {
    console.error('Error fetching event types:', error);
    res.status(500).json({ message: 'Failed to fetch event types' });
  }
};
export const getEventWithClientNames = async (req, res) => {
  try {
    const event = await QueryEventWithClientNames(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (err) {
    console.error('Error in getEventWithClientNames:', err);
    res.status(500).json({ error: 'Failed to retrieve event with client names', details: err.message });
  }
};

export default {
    getAllEvents,
    getEventById,
    getEventsByClientId,
    createEvent,
    updateEvent,
    deleteEvent,
    getEventTypes,
    getEventWithClientNames
};
