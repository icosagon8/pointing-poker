import { createSlice } from '@reduxjs/toolkit';
import { IssueModel } from '../../models/issueModel';

interface IssuesInitialState {
  issues: IssueModel[];
}

const initialState: IssuesInitialState = {
  issues: [],
};

const issuesSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    addIssues: (state, action) => {
      state.issues = action.payload;
    },
    cleanIssues: (state) => {
      state.issues = [];
    },
  },
});

export const { addIssues, cleanIssues } = issuesSlice.actions;

export default issuesSlice.reducer;
