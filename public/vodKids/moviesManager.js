import Movie from "./movieClass.js"

export const createMovies = (_parent_id,_ar) => {
  _ar.map(item => {
    let newMov = new Movie(_parent_id,item);
  })
}