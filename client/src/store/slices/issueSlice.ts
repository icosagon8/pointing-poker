import { createSlice } from '@reduxjs/toolkit';

interface IssueState {
  id: string;
  title: string;
  priority: string;
  roomId: string;
}

interface IssueInitialState {
  issue: IssueState | null;
}

const initialState: IssueInitialState = {
  issue: null,
};

const issueSlice = createSlice({
  name: 'issue',
  initialState,
  reducers: {
    addIssue: (state, action) => {
      state.issue = action.payload;
    },
    // deleteIssue: (state, action) => {
    //   state.issue = state.issue.filter((issue) => issue.id !== action.payload);
    // },
  },
});

export const { addIssue } = issueSlice.actions;

export default issueSlice.reducer;
