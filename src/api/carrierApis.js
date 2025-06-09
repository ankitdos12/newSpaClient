
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Get all jobs
export const getJobs = async () => {
    const response = await axios.get(`${API_URL}/post-job`);
    return response.data;
};

// Get job details by position
export const getJobDetails = async (id) => {
    const response = await axios.get(`${API_URL}/post-job/job-details/${id}`);
    return response.data;
};

// Apply for a job
export const appllyJob = async (payload, id) => {
    const response = await axios.post(`${API_URL}/apply-job/${id}`, payload);
    return response.data;
}