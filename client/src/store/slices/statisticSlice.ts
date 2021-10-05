import { createSlice } from '@reduxjs/toolkit';

interface StatisticInitialState {
  roomId: string;
  issueId: string;
  results: StatisticResults[];
}

interface StatisticResults {
  cardId: string;
  percent: number;
}

interface StatisticState {
  statistics: StatisticInitialState[];
}

const initialState: StatisticState = {
  statistics: [],
};

const statisticSlice = createSlice({
  name: 'statistic',
  initialState,
  reducers: {
    addStatistic: (state, action) => {
      state.statistics = [...action.payload];
    },
  },
});

export const { addStatistic } = statisticSlice.actions;

export default statisticSlice.reducer;
