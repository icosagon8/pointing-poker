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
  },
});

export const { addIssues } = issuesSlice.actions;

export default issuesSlice.reducer;
