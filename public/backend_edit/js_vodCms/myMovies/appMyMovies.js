import { doApiGet } from "../../services/apiSer.js";
import { auth } from "../../services/authSer.js";
import { getUrlVars } from "../../services/miscServ.js";
import { createMovieTr } from "./moviesManager.js";

let userId

$(() => {
  init();
})

const init = async () => {
  let dataAuth = await auth();
  let getPageNum = getUrlVars();
  if (!getPageNum["page"]) { getPageNum["page"] = 0 }

  let myUrl = `http://localhost:3000/movies/ofUser?page=${getPageNum["page"]}`;
  let userMoviesData = await doApiGet(myUrl);
  console.log(userMoviesData);
  createMovieTr(userMoviesData)
  createPagenation();
}

const createPagenation = async () => {
  let myUrl = `http://localhost:3000/movies/ofUser/countMovies`;
  let dataCounts = await doApiGet(myUrl);
  dataCounts = dataCounts.counts;
  
    
    for (let i = 0; i < dataCounts / 5; i++) {
      let linkPage = `<a href="myMovies.html?page=${i}">${i}</a>`
      // $("#id_pages").append(linkPage + " | ");
      $("#id_pages2").append(linkPage + " | ");
    }
  
  
}