function setProductPosition() {
  // center product wrapper vertically and horizontally
  var productHeight = $(".product-wrapper").outerHeight();
  var availableHeight =
    $(".room-view").outerHeight() - $(".deco-container").outerHeight();
  var productTop =
    productHeight - availableHeight > 0
      ? 0
      : (availableHeight - productHeight) / 2;
  $(".product-wrapper").css("top", productTop + "px");
}

function showProductWrapper() {
  $(".product-wrapper").show();
}

function setRoomBackground() {
  // set background color
  var optionSelected = $(".color-selector option:selected");
  var type = optionSelected.data("type");
  var backgroundValue =
    type === "color"
      ? optionSelected.val()
      : "url('" + optionSelected.val() + "')";
  $(".room-view").css("background", backgroundValue);
}

function setProductWrapperSize() {
  //set width of productWrapper, given real width of image (currentWidth)
  // width of deco: 70% -> 200cm
  var productWrapperWidthPercent = currentWidth / 200 * 70;
  var productWrapperWidth =
    frameWidth == 0 ||
    currentSizeLabel == "Classic" ||
    currentSizeLabel == "Mini 2017"
      ? productWrapperWidthPercent + "%"
      : "calc(" + productWrapperWidthPercent + "% + " + frameWidth * 2 + "px)";
  $(".product-wrapper").css("width", productWrapperWidth);
}

function setImageWrapperBorder(color) {
  $(".image-wrapper").css("border", "3px solid " + color);
}

function setImageWrapperBackgroundColor(color) {
  // blackout
  $(".image-wrapper").css("background-color", color);
}

// function setFrameWidthAndPosition() {
//   if (frameWidth > 0) {
//     //get frame img by currentFrameId , add them into frame-*
//     var imgHeight = Math.ceil($(".image-wrapper img").outerHeight()) + 2;
//     var imgWidth = Math.ceil($(".image-wrapper img").outerWidth()) + 2;
//     // 4 corners
//     $(".frame-tl").css("width", frameWidth);
//     $(".frame-tl").css("height", frameWidth);
//     $(".frame-tl").css("left", 0);
//     $(".frame-tl").css("top", 0);

//     $(".frame-tr").css("width", frameWidth);
//     $(".frame-tr").css("height", frameWidth);
//     $(".frame-tr").css("right", 0);
//     $(".frame-tr").css("top", 0);

//     $(".frame-bl").css("width", frameWidth);
//     $(".frame-bl").css("height", frameWidth);
//     $(".frame-bl").css("left", 0);
//     $(".frame-bl").css("bottom", 0);

//     $(".frame-br").css("width", frameWidth);
//     $(".frame-br").css("height", frameWidth);
//     $(".frame-br").css("right", 0);
//     $(".frame-br").css("bottom", 0);

//     //4 sides
//     $(".frame-tc").css("width", imgWidth);
//     $(".frame-tc").css("height", frameWidth);
//     $(".frame-tc").css("left", frameWidth);
//     $(".frame-tc").css("top", 0);

//     $(".frame-ml").css("width", frameWidth);
//     $(".frame-ml").css("height", imgHeight + "px");
//     $(".frame-ml").css("left", 0);
//     $(".frame-ml").css("top", frameWidth);

//     $(".frame-mr").css("width", frameWidth);
//     $(".frame-mr").css("height", imgHeight + "px");
//     $(".frame-mr").css("right", 0);
//     $(".frame-mr").css("top", frameWidth);

//     $(".frame-bc").css("width", imgWidth + "px");
//     $(".frame-bc").css("height", frameWidth);
//     $(".frame-bc").css("left", frameWidth);
//     $(".frame-bc").css("bottom", 0);
//   }
// }

function composeProduct(img) {
  var imageWrapper = document.createElement("div");
  imageWrapper.className = "image-wrapper";
  if (currentSizeLabel == "Classic") {
    var currentFrame = attributes.frames.currentArtshotFrameId;
    var currentFrameColor = currentFrame.color;
    $(imageWrapper).css("padding", "12%");
    //set image wrapper background and border color
    $(imageWrapper).css("background-color", attributes.finishes[currentArtshotFinishId].color);
    $(imageWrapper).css("border", "3px solid " + currentFrameColor);
  } else if (currentSizeLabel != "Mini 2017" && currentSizeLabel!='Colorful' && currentSizeLabel!= 'Exception' ) {
    var currentFrame = attributes.frames.currentFrameId;
    var currentFrameImg = currentFrame.image_url;
    var innerColor = currentFrame.color;
    var productWrapper = document.getElementsByClassName("product-wrapper")[0];
    if (frameWidth > 0) {
      $(imageWrapper).css("padding", frameWidth + "px");

      var lighterColor = shadeColor2(innerColor, 0.3);
      var darkerColor = shadeColor2(innerColor, -0.5);
      var bcGradient = 'linear-gradient(to left, '+darkerColor+', '+darkerColor +' 5px, '+ innerColor +' 15px, '+innerColor+' 99%,'+ lighterColor +' 100%)';
      //set image background graident
      $(imageWrapper).css('background', bcGradient);
      //set product wrapper background image 
      $(productWrapper).css("background", "url("+ currentFrameImg +")" );
       

      // var tl = document.createElement("div");
      // tl.className = "frame-tl";
      // var tc = document.createElement("div");
      // tc.className = "frame-tc";
      // var tr = document.createElement("div");
      // tr.className = "frame-tr";
      // var ml = document.createElement("div");
      // ml.className = "frame-ml";
      // var mr = document.createElement("div");
      // mr.className = "frame-mr";
      // var bl = document.createElement("div");
      // bl.className = "frame-bl";
      // var bc = document.createElement("div");
      // bc.className = "frame-bc";
      // var br = document.createElement("div");
      // br.className = "frame-br";
      // // get 8 parts of frame image
      // imageWrapper.appendChild(tl);
      // imageWrapper.appendChild(tc);
      // imageWrapper.appendChild(tr);
      // imageWrapper.appendChild(ml);
      // imageWrapper.appendChild(mr);
      // imageWrapper.appendChild(bl);
      // imageWrapper.appendChild(bc);
      // imageWrapper.appendChild(bl);
      // imageWrapper.appendChild(br);
    }
  }
  // create frame div
  imageWrapper.appendChild(img);
  productWrapper.innerHTML = "";
  productWrapper.appendChild(imageWrapper);
}

var currentWidth,
  currentSizeLabel,
  currentFinishId,
  currentArtshotFinishId = 5,
  currentArtshotFrameId = 8,
  currentFrameId,
  productImg,
  currentDecoSize;

var frameWidth = 0;
var attributes= {
  "finishes": {
      5:{
          "finishing_id": 5, //artshot
          "color" : "#f0f8ff"
      },
      6:{
          "finishing_id": 6, //blackout
          "color" : "#444b4f"
      }
  }, 
  "frames":{
      25: {
          "mounting_id" : 3,  //SHADOWBOX
          "mounting_color_id" : 25, // GRAPHISTE
          "color" : "",
          "image_url" : ""
      },
      24: {
          "mounting_id" : 3, 
          "mounting_color_id" : 24, //WENGE
          "color" : "",            
          "image_url" : ""
      },
      4: {
          "mounting_id" : 3, //shadowbox
          "mounting_color_id" : 4, //Black Satin 
          "color" : "",     
          "image_url" : ""  
      },
      5: {
          "mounting_id" : 3, //shadowbox
          "mounting_color_id" : 5 , //oak
          "color" : "",   
          "image_url" : ""  
      },
      7: {
          "mounting_id" : 3, //shadowbox
          "mounting_color_id" : 7, //white Satin 
          "color" : "",     
          "image_url" : ""  
      },
      
      3: {
          "mounting_id" : 3, //shadowbox
          "mounting_color_id" : 3, // black oak
          "color" : "",   
          "image_url" : ""  
      },
      6: {
          "mounting_id" : 3, //shadowbox
          "mounting_color_id" : 6, //walnut
          "color" : "",   
          "image_url" : ""  
      },

      8: {
          "mounting_id" : 9, //framed
          "mounting_color_id" : 8, //Black aluminium
          "color" : "",   
          "image_url" : ""  
      },
      10: {
          "mounting_id" : 9, //shadowbox
          "mounting_color_id" : 10, //Matt mahogany
          "color" : "",   
          "image_url" : ""  
      },
      11: {
          "mounting_id" : 9, //shadowbox
          "mounting_color_id" :11, //White wood
          "color" : "",   
          "image_url" : ""  
      },
      21: {
          "mounting_id" : 9, //shadowbox
          "mounting_color_id" :21, //White wood
          "color" : "",   
          "image_url" : ""  
      }
  }
}

window.onload = function() {
  setRoomBackground();
  // get variation attribute info (family, finishing, mounting, mounting_color )

  // get current product width id, finish id and frame color id from given ean/product id 

  // call DMZ api with ean /visuel_id 

  currentWidth = $(".size-selector option:selected").data("width");
  currentSizeLabel = $(".size-selector").val();
  currentFrameId = $(".frame-selector").val();
  currentFinishId = $(".finish-selector").val();
  // load product image
  productImg = new Image();
  productImg.src =
    "http://storage.yellowkorner.com/TRAVEL/58/38558/image_20171012121212.jpg";
  productImg.onload = function(event) {
    composeProduct(event.target);
    setProductWrapperSize();
    setProductPosition();
    showProductWrapper();
  };
};

window.onresize = function() {
  setProductWrapperSize();
  setProductPosition();
  if ($(".frame-tl").length > 0) {
    setFrameWidthAndPosition();
  }
};

$(".deco-image").on("load", function() {
  setProductPosition();
});

$(".color-selector").change(function() {
  setRoomBackground();
});

$(".room-selector").change(event, function(event) {
  $(".deco-image").attr("src", event.target.value);
});

function updateViewOnSizeChange(selectedWidth, selectedSizeLabel){
    currentWidth = selectedWidth;
    currentSizeLabel = selectedSizeLabel;
    composeProduct(productImg);
    setProductWrapperSize();
    setFrameWidthAndPosition();
    setProductPosition();
}
function updateViewOnFinishChange(finishId){
  if (selectedSizeLabel === "Classic") {
    currentArtshotFinishId = finishId;
    setImageWrapperBackgroundColor(attributes.finishes[currentFinishId].color);
  }
  else{
    //  alu, plexi ...
  }
}

$(".size-selector").change(function(event) {
  updateViewOnSizeChange($(".size-selector option:selected").data("width"), event.target.value); 
});

$(".finish-selector").change(function(event) {
  if(event.target.value){
    updateViewOnFinishChange(event.target.value);
  }
});

// $(".artshotFrame-selector").change(function(event) {
//   if ($(".size-selector option:selected").val() === "Classic") {
//     currentArtshotFrameColor = event.target.value;
//     setImageWrapperBorder(currentArtshotFrameColor);
//   }
// });

$(".frame-selector").change(function(event) {
  if (selectedSizeLabel === "Classic") {
    currentArtshotFrameId = event.target.value;
  }else{
    currentFrameId = event.target.value;
  }
  if (currentFrameId == "2") {
    frameWidth = 0;
  } else {
    frameWidth = 20;
  }
  composeProduct(productImg);
  setProductWrapperSize();
  setFrameWidthAndPosition();
  setProductPosition();
});

$(".view-selector li").click(function(event) {
  if (!$(this).hasClass("selected")) {
    var view = $(event.target).data("view");
    $(".view-selector li.selected").removeClass("selected");
    $(this).addClass("selected");
    if (view == "full-view") {
      $(".room-view").css("opacity", 0);
      $(".full-view").css("opacity", 1);
    } else {
      $(".full-view").css("opacity", 0);
      $(".room-view").css("opacity", 1);
    }
  }
});
