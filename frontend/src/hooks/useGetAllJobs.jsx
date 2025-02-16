import { useEffect } from 'react';
import { setAllJobs } from '../redux/jobSlice';
import axios from 'axios';
import { JOB_API_ENDPOINT } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchedQuery } = useSelector(state => state.jobs) || { searchedQuery: "" }; // Ensure default value

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const queryParam = searchedQuery ? `?keyword=${encodeURIComponent(searchedQuery)}` : "";
                const res = await axios.get(`${JOB_API_ENDPOINT}/get${queryParam}`, { withCredentials: true });

                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchAllJobs();
    }, [dispatch, searchedQuery]); // Include searchedQuery in dependencies
};

export default useGetAllJobs;
