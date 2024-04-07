import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ExampleInitialState {
  example: string;
  section: 'borrow' | 'lend' | null;
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
    setSection: (state, action: PayloadAction<'borrow' | 'lend' | null>) => {
      state.section = action.payload;
    },
  },
});

export const { setExample, setSection } = exampleSlice.actions;

export default exampleSlice.reducer;