import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name : 'jobs',
    initialState : {
        alljobs : [],
        singleJob : null,
        adminjobs : [],
        searchedQuery : "",
    },
    reducers: {
        setAllJobs : (state,action) => {
            state.alljobs = action.payload;
        },
        setSingleJob : (state,action) => {
            state.singleJob = action.payload;
        },
        setAdminJobs : (state, action) => {
            state.adminjobs = action.payload;
        },
        removeAdminJob : (state, action) => {
            state.adminjobs = state.adminjobs.filter(job => job._id !== action.payload);
        },
        setSearchedQuery : (state, action) => {
            state.searchedQuery = action.payload;
        },
    }

});

export const {setAllJobs, setSingleJob, setAdminJobs, removeAdminJob, setSearchedQuery} = jobSlice.actions;
export default jobSlice.reducer;