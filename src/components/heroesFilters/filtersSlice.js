import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const initialState = {
    filters: [],
    filtersLoadingStatus: 'idle',
    selectedFilters: 'all'
}

export const fetchFilters = createAsyncThunk(
    'filters/fetchHeroes',
    async () => {
        const { request } = useHttp()
        return await request("http://localhost:3001/filters")
    }
)

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        // filtersFetching: state => { state.filtersLoadingStatus = 'loading'
        // },
        // filtersFetched: (state, action) => {
        //     state.filtersLoadingStatus = 'idle';
        //     state.filters = action.payload;
        // },
        // filtersFetchingError: (state, action) => {
        //     state.filtersLoadingStatus = 'error';
        //     state.selectedFilter = action.payload
        // },
        filterSelected: (state, action) => {
            state.selectedFilter = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilters.pending, state => { state.filtersLoadingStatus = 'loading' })
            .addCase(fetchFilters.fulfilled, (state, action) => {
                state.filtersLoadingStatus = 'idle';
                state.filters = action.payload;
            })
            .addCase(fetchFilters.rejected, (state, action) => {
                state.filtersLoadingStatus = 'error';
                state.selectedFilter = action.payload
            })
    }
})

const { actions, reducer } = filterSlice;

export default reducer
export const {
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    filterSelected
} = actions;
