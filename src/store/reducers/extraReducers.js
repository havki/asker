import { cluesFetch,categoriesFetch } from "../asyncActions/clues";

export const  extraReducers = {
  [categoriesFetch.pending]: (state) => {
    state.loading = "loading";
  },
  [categoriesFetch.fulfilled]: (state, action) => {
    state.categories = action.payload;

    state.loading = "complete";
  },
  [categoriesFetch.rejected]: (state) => {
    state.loading = "loading";
  },

  [cluesFetch.pending]: (state) => {
    state.loading = "loading";
  },
  [cluesFetch.fulfilled]: (state, action) => {
    const { data, id, title } = action.payload;
    if (data.clues.length > 5) {
      data.clues.length = 5;
    }
     
    let clues = data.clues.map((item) => {
      return {
        ...item,
        right: null,
      };
    });

    // const newData = 

    let datas = {
      id,
      title,
      clues,
    };
    
    state.categs.push(datas);
    // if(state.categories.length===10){

    //   state.categories.splice(0, 5);
    // }
    // console.log(state.categories);

    state.loading = "complete";
  },
  [cluesFetch.rejected]: (state) => {
    state.loading = "loading";
  },
}