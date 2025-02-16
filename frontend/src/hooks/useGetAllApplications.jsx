import { useEffect } from 'react';
import axios from 'axios';
import { APPLICATION_API_ENDPOINT } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { setAllApplications } from '../redux/applicationSlice';
import { useParams } from 'react-router-dom';

const useGetAllApplications = () => {
    const dispatch = useDispatch();
    const params = useParams();
    useEffect(() => {
        const fetchAllApplications = async (jobId) => {
            try {
                const res = await axios.get(`${APPLICATION_API_ENDPOINT}/applicants/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllApplications(res.data.job.application));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchAllApplications(params.job);
    }, [params, dispatch]);
    
};

export default useGetAllApplications;