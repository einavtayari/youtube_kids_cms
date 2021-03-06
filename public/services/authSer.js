export const auth = async() => {
  if(!localStorage["token"]){
    return window.location.href = "login.html"
  }
 
  try{
    let myData = await axios.get("http://localhost:3000/users/auth",{
      headers: {
        "x-auth-token": localStorage["token"],
      }
    })
    return myData.data
  }
  catch(err){
    
    alert("Token invalid or expired please try login again");
    localStorage.removeItem("token");
    return window.location.href = "login.html"
  }


  
}

// כל 2 דקות מפעיל את הפונקציה ואז אם הטוקן לא בתקוף כבר
// בעצם ישלח אותו ללוג אין וימחק את הטוקן
// setInterval(()=>{
//   auth();
// },120000)