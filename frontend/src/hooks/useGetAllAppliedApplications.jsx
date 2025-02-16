import { useEffect } from 'react';
import axios from 'axios';
import { APPLICATION_API_ENDPOINT } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { setAllApplications } from '../redux/applicationSlice';

const useGetAllAppliedApplications = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllApplications = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_ENDPOINT}/get`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllApplications(res.data.applications));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchAllApplications();
    }, [dispatch]);
    
};

export default useGetAllAppliedApplications;