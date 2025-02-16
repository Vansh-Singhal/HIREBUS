import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
    name: "application",
    initialState: {
        applications: [],
    },
    reducers: {
        setAllApplications: (state, action) => {
            state.applications = action.payload;
        },
        updateApplicationStatus: (state, action) => {
            const { id, status } = action.payload;
            const index = state.applications.findIndex(app => app._id === id);
            if (index !== -1) {
                state.applications[index].status = status;
            }
        }
    }
});

export const { setAllApplications, updateApplicationStatus } = applicationSlice.actions;
export default applicationSlice.reducer;
