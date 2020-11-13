

$.fn.lightBox = function(){


  createLightBox();
  //showLightBox("http://monkeys.co.il/wp-content/uploads/2015/04/b2f09af56404a9b1adfdbdd850ef0dbe_large2-300x187.jpeg","text text text text");

  $(".light_box button").on("click",function(){
    closeLightBox();
  })
  // רק תמונות שיש להם אטריביוט דאטא לייט יגיבו ללחיצה
  // עליהם בפלאג אין
  $("img[data-light]").on("click",function(){
    console.log("aaaa")
    let imgSrc = $(this).attr("src");
    let imgAlt = $(this).attr("alt");
    showLightBox(imgSrc,imgAlt);
  })
}

const showLightBox = (_code,_txt) => {
  $(".light_box #youtube").html(
    `<iframe width="70%" height="315" src="https://www.youtube.com/embed/${_code}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `
  );
  $(".light_box .light_txt").html(_txt);


  $(".light_box").fadeIn(700);
  $(".light_box").css("display", "flex");
}

const closeLightBox = () => {
  $(".light_box").fadeOut(700);

}
 

const createLightBox = () => {
  $("body").prepend(`
  <div class="light_box">
  <div class="light_inside">
  <div id="youtube">
  <iframe width="70%" height="315" src="" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </div>
    <p class="light_txt">test</p>
    <button>Close</button>
  </div>
</div>
  `)


  let lightCss = {
    position: "fixed",
    display: "none",
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.7)",
    zIndex: 999,
    justifyContent: "center",
    alignItems: "center",
    padding: "8px"
  }
  // ואז לתת לאלמנט את האובייקט עם כל המאפיינים
  $(".light_box").css(lightCss);

  let insideCss = {
    maxWidth: "600px",
    width: "100%",
    background: "white",
    border: "2px solid grey",
    minHeight: "300px",
    padding:"8px",
    textAlign:"center"
    // height:"300px"
  }

  $(".light_inside").css(insideCss);
}


// $(() => {
//   $(document).lightBox()

// })