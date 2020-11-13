export const doApiGet = async(_url) => {
  let myData = await axios.get(_url,{
    headers: {
      "x-auth-token": localStorage["token"],
    }
  })
  try{
    // הנקודה דאטא כי זה אקסיוס
    // והוא מקבל במכה אחת כל המידע 
    // והמידע של האיי פי איי עצמו של הגייסון
    // נמצא תמיד במאפיין דאטא
    return myData.data
  }
  catch(err){
    alert("There is problem");
   // localStorage.removeItem("token");
   // return window.location.href = "login.html"
  }
}