import { useEffect } from 'react';
import {setAllJobs} from '../redux/jobSlice';
import axios from 'axios';
import { JOB_API_ENDPOINT } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const {searchedQuery} = useSelector(state => state.jobs)
    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_ENDPOINT}/get?keyword=${searchedQuery}`, { withCredentials: true });

                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllJobs();
    },[dispatch])
};

export default useGetAllJobs