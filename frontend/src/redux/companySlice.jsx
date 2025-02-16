import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name: 'company',
    initialState: {
        companies: []
    },
    reducers: {
        setAllCompanies: (state, action) => {
            state.companies = action.payload;
        },
        removeCompany: (state, action) => {
            state.companies = state.companies.filter(company => company._id !== action.payload);
        }
    }
});

export const { setAllCompanies, removeCompany } = companySlice.actions;
export default companySlice.reducer;