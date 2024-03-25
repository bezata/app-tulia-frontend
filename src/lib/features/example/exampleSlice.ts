import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ExampleInitialState {
    example: string;
    section: "barrow" | "lend" | null;
}

const initialState: ExampleInitialState = {
    example: 'example',
    section: null,
};

const exampleSlice = createSlice({
    name: 'example',
    initialState,
    reducers: {
        setExample: (state, action: PayloadAction<string>) => {
            state.example = action.payload;
        },
        setSection: (state, action: PayloadAction<"barrow" | "lend" | null>) => {
            state.section = action.payload;
        }
    },
});

export const { setExample, setSection } = exampleSlice.actions;

export default exampleSlice.reducer;