import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ExampleInitialState {
    example: string;
}

const initialState: ExampleInitialState = {
    example: 'example',
};

const exampleSlice = createSlice({
    name: 'example',
    initialState,
    reducers: {
        setExample: (state, action: PayloadAction<string>) => {
            state.example = action.payload;
        },
    },
});

export const { setExample } = exampleSlice.actions;

export default exampleSlice.reducer;