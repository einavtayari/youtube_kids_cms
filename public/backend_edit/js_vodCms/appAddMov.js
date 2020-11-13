import {auth} from "../services/authSer.js";

let userId

$(() => {
  init();
})

const init = async() => {
  let data = await auth();
  declareViewEvents()
}

const declareViewEvents = () => {
  $("#id_form").on("submit",(evt) => {
    evt.preventDefault();
    console.log("form work")

    //יזהה כתובת יו.אר.אל יוטיוב ויקח משם את הקוד סרטון
    let codeInp = $("#id_code_input").val();
    if(codeInp.includes("v=")){
      console.log("its url youtube")
      if(codeInp.includes("&")){
        let startV = codeInp.indexOf("v=")
        let endAnd = codeInp.indexOf("&",startV)
        let substr = codeInp.substring(startV+2,endAnd);
        $("#id_code_input").val(substr)
      }
      else{
        let startV = codeInp.indexOf("v=")
        let substr = codeInp.substring(startV+2);
        $("#id_code_input").val(substr)
      }
    }

    sendData();
  })

 // $("#id_code_input").on("input",())
}




const sendData = () => {

  let myUrl = "http://localhost:3000/movies/add/";

    let dataBody = {
      title:$("#id_title_input").val(),
      movieCode:$("#id_code_input").val(),
      info:$("#id_info_input").val(),
      category:$("#id_cat_select").val()

     
    }
  axios({
    method: 'POST',
    url:myUrl,
    data: dataBody,
    headers: {
      "x-auth-token": localStorage["token"],
    }
  })
   .then(myData => {
     alert("Movie added succesfuly")
     location.reload();
    //  window.location.href = "login.html"
   })
   .catch(error => {
      console.log(error.response)
     alert("Movie error")
     // כדי להציג שגיאה עם פירוט
    //  console.log(error.response)
   })
}