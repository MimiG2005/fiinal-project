import {
    QueryListOfServiceTypes,
    QueryServiceTypeById,
    QueryCreateServiceType,
    QueryUpdateServiceType,
    QueryDeleteServiceType
} from '../services/service_type.js'; // ודא שהנתיב נכון

export const getAllServiceTypes = async (req, res) => {
    try {
        const types = await QueryListOfServiceTypes();
        res.status(200).json(types);
    } catch (err) {
        console.error('Error in getAllServiceTypes:', err);
        res.status(500).json({ error: 'Failed to retrieve service types', details: err.message });
    }
};

export const getServiceTypeById = async (req, res) => {
    try {
        const type = await QueryServiceTypeById(req.params.id);
        if (!type || type.length === 0) {
            return res.status(404).json({ message: 'Service type not found' });
        }
        res.status(200).json(type[0]);
    } catch (err) {
        console.error('Error in getServiceTypeById:', err);
        res.status(500).json({ error: 'Failed to retrieve service type', details: err.message });
    }
};

export const createServiceType = async (req, res) => {
    try {
        const result = await QueryCreateServiceType(req.body);
        res.status(201).json({ message: 'Service type created successfully', id: result.insertId });
    } catch (err) {
        console.error('Error in createServiceType:', err);
        res.status(500).json({ error: 'Failed to create service type', details: err.message });
    }
};

export const updateServiceType = async (req, res) => {
    try {
        const result = await QueryUpdateServiceType(req.params.id, req.body);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Service type not found or no changes made' });
        }
        res.status(200).json({ message: 'Service type updated successfully', data: result });
    } catch (err) {
        console.error('Error in updateServiceType:', err);
        res.status(500).json({ error: 'Failed to update service type', details: err.message });
    }
};

export const deleteServiceType = async (req, res) => {
    try {
        const result = await QueryDeleteServiceType(req.params.id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Service type not found' });
        }
        res.status(200).json({ message: 'Service type deleted successfully', data: result });
    } catch (err) {
        console.error('Error in deleteServiceType:', err);
        res.status(500).json({ error: 'Failed to delete service type', details: err.message });
    }
};

export default {
    getAllServiceTypes,
    getServiceTypeById,
    createServiceType,
    updateServiceType,
    deleteServiceType
};
