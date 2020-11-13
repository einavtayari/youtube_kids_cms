import MovieItem from "./movieItem.js"

export const createMovieTr = (_ar) => {
  _ar.map((item,i) => {
    
    let movie = new MovieItem("#id_parent",item,i)
  })
}