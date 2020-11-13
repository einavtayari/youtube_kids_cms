class Movie{
  constructor(_parent,{title,movieCode,info,likes}){
    this.parent = _parent;
    this.title = title;
    this.movieCode = movieCode;
    this.info = info;
    this.likes = likes;

    this.render()
  }

  render(){
    let newDiv = $("<div class='col-lg-2 border'></div>");
    $(this.parent).append(newDiv);

    $(newDiv).css("cursor","pointer")

    $(newDiv).append(`
      <img class="w-100" src="https://i.ytimg.com/vi/${this.movieCode}/hqdefault.jpg" />
      <h4>${this.title}</h4>
      <div>Likes: ${this.likes.length}</div>
    `)
    $(newDiv).on("click",() => {
      showLightBox(this.movieCode,this.info);
    })
  }
}

export default Movie