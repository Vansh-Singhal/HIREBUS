import { useEffect } from 'react';
import axios from 'axios';
import { JOB_API_ENDPOINT } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { setAdminJobs } from '../redux/jobSlice';

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllAdminJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_ENDPOINT}/admin/get`, { withCredentials: true });
    
                if (res.data.success) {
                    dispatch(setAdminJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchAllAdminJobs();
    }, [dispatch]);
    
};

export default useGetAllAdminJobs;