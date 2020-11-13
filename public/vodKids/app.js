import {doApiGet} from "../services/apiSer.js"
import { createMovies } from "./moviesManager.js";
 
$(() => {
  init();
  $(document).lightBox()
})

const init = async() => {
  let myUrlAbc = "http://localhost:3000/movies/cat/abc"
  let dataAbc = await doApiGet(myUrlAbc)
  createMovies("#id_abc",dataAbc)
  
  let myUrl2 = "http://localhost:3000/movies/cat/numbers"
  let datanumbers = await doApiGet(myUrl2)
  createMovies("#id_numbers",datanumbers)

  let myUrl3 = "http://localhost:3000/movies/cat/misc"
  let datamisc = await doApiGet(myUrl3)
  createMovies("#id_misc",datamisc)
}