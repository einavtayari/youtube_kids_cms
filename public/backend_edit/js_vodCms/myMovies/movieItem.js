class MovieItem{
                      // עשינו דיסטרקשין בתוך הפרמטר למאפייני אובייקט
  constructor(_parent,{_id,title,movieCode,info,category,likes},_index){
    this.parent = _parent;
    this._id = _id;
    this.title = title;
    this.movieCode = movieCode;
    this.info = info;
    this.category = category;
    this.likes = likes;
    this.index = _index;

    this.render();
  }

  render(){
    let newTr = $("<tr></tr>")
    $(this.parent).append(newTr);

    $(newTr).append(`
    <td>${this.index + 1}</td>
    <td>${this.title}</td>
    <td><img src="https://i.ytimg.com/vi/${this.movieCode}/hqdefault.jpg"  alt="movie pic" height="60"></td>
    <td>${this.movieCode}</td>
    <td>${this.info}</td>
    <td>${this.category}</td>
    <td>${this.likes.length}</td>
    `)

    let delBtnTd = $("<td><button class='btn btn-danger'>del</button></td>");
    $(newTr).append(delBtnTd);

    $(delBtnTd).on("click",() => {
      let r = confirm(`Are you sure you want to delete ${this.title} ?`);
      if(r){
        del(this._id)
      }
    })
    $(newTr).append(`
      <td>
        <a class="btn btn-info" href="editMovies.html?editId=${this._id}">edit</a>
      </td>
    `)
  }
}



const del = (_id) => {
  
  let myUrl = "http://localhost:3000/movies/del/"+_id;

  axios({
    method: 'DELETE',
    url:myUrl,
    headers: {
      "x-auth-token": localStorage["token"],
    }
  })
   .then(myData => {
     alert("Movie deleted")
     location.reload();
    //  window.location.href = "login.html"
   })
   .catch(error => {
      console.log(error.response)
     alert("There is error, cant delete")
     // כדי להציג שגיאה עם פירוט
    //  console.log(error.response)
   })
}

export default MovieItem

