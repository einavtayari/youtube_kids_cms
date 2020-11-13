import { doApiGet } from "../services/apiSer.js";
import {auth} from "../services/authSer.js";

let movId;
let movieCode;

$(() => {
  init();
})

const init = async() => {
  let data = await auth();

  getMovieData()
  declareViewEvents()
}

const getMovieData = async() => {
  //console.log(window.location.href)
  // אוסף מהקווראי סטרינג של הצד לקוח כדי שנדע 
  // איזה סרטון צריך לערוך
  let urlQuries = getUrlVars();
  movId = urlQuries["editId"]
  // console.log(movId)
  let myUrl = `http://localhost:3000/movies/single/${movId}`
  try{
    let movData = await doApiGet(myUrl);
    console.log(movData)
    $("#id_title_input").val(movData.title);
    movieCode = movData.movieCode
   
    $("#id_info_input").val(movData.info);
    $("#id_cat_select").val(movData.category);

  }
  catch(err){
    console.log(err.response)
  }

}

const declareViewEvents = () => {
  $("#id_form").on("submit",(evt) => {
    evt.preventDefault();
    //console.log("form work")
   sendData();
  })
}




const sendData = () => {

  let myUrl = "http://localhost:3000/movies/edit/";

    let dataBody = {
      id:movId,
      title:$("#id_title_input").val(),
      movieCode:movieCode,
      info:$("#id_info_input").val(),
      category:$("#id_cat_select").val()

     
    }
  axios({
    method: 'PUT',
    url:myUrl,
    data: dataBody,
    headers: {
      "x-auth-token": localStorage["token"],
    }
  })
   .then(myData => {
     alert("Movie edit succesfuly")
     location.reload();
    //  window.location.href = "login.html"
   })
   .catch(error => {
      console.log(error.response)
     alert("Movie edit error, try log in again")
     // כדי להציג שגיאה עם פירוט
    //  console.log(error.response)
   })
}


// יודעת לפרק את הקווארי סטרינג
// ביו אר אל שקיבלנו
//למשל בכתובת http://127.0.0.1:5500/editMovies.html?editId=222
// appEditMovies.js:14 ["editId", editId: "222"] נקבל

const getUrlVars = () => {
  var vars = [];
  var hash;
  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for (var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split('=');
    vars.push(hash[0]);
    vars[hash[0]] = hash[1];
  }
  return vars;
}
