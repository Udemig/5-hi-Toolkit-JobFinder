import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jobs: [],
  filtredJobs: [],
  initialized: false,
};

const jobSlice = createSlice({
  name: 'jobSlice',
  initialState,
  reducers: {
    setJobs: (state, action) => {
      state.jobs = action.payload;
      state.filtredJobs = action.payload;
      state.initialized = true;
    },
    addJob: (state, action) => {
      state.jobs.push(action.payload);
    },
    // arama terimine göre filtreleme
    filterBySearch: (state, action) => {
      // arama terimini küçük harfe çevirme (aA duyarlılığı ortadan kaldırmak için)
      const query = action.payload.toLowerCase();

      //  aksiyonla gelen arama terimiyle eşeleşen objelerle yeni bir dizi oluştur
      const filtred = state.jobs.filter((job) =>
        job.company.toLowerCase().includes(query)
      );

      // store'u güncelle
      state.filtredJobs = filtred;
    },

    // duruma göre filtreleme
    filterByStatus: (state, action) => {
      // aksiyonun payload değieryle eşleşen işlerle yeni bir dizi oluştur
      state.filtredJobs = state.jobs.filter(
        (job) => job.status === action.payload
      );
    },

    // tipine göre filtreleme
    filterByType: (state, action) => {
      state.filtredJobs = state.jobs.filter(
        (job) => job.type === action.payload
      );
    },
  },
});

export const {
  setJobs,
  addJob,
  filterBySearch,
  filterByStatus,
  filterByType,
} = jobSlice.actions;

export default jobSlice.reducer;
