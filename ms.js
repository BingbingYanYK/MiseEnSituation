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
    currentSizeId == "Classic" ||
    currentSizeId == "Mini 2017"
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

function setFrameWidthAndPosition() {
  if (frameWidth > 0) {
    //get frame img by currentFrameId , add them into frame-*
    var imgHeight = Math.ceil($(".image-wrapper img").outerHeight()) + 2;
    var imgWidth = Math.ceil($(".image-wrapper img").outerWidth()) + 2;
    // 4 corners
    $(".frame-tl").css("width", frameWidth);
    $(".frame-tl").css("height", frameWidth);
    $(".frame-tl").css("left", 0);
    $(".frame-tl").css("top", 0);

    $(".frame-tr").css("width", frameWidth);
    $(".frame-tr").css("height", frameWidth);
    $(".frame-tr").css("right", 0);
    $(".frame-tr").css("top", 0);

    $(".frame-bl").css("width", frameWidth);
    $(".frame-bl").css("height", frameWidth);
    $(".frame-bl").css("left", 0);
    $(".frame-bl").css("bottom", 0);

    $(".frame-br").css("width", frameWidth);
    $(".frame-br").css("height", frameWidth);
    $(".frame-br").css("right", 0);
    $(".frame-br").css("bottom", 0);

    //4 sides
    $(".frame-tc").css("width", imgWidth);
    $(".frame-tc").css("height", frameWidth);
    $(".frame-tc").css("left", frameWidth);
    $(".frame-tc").css("top", 0);

    $(".frame-ml").css("width", frameWidth);
    $(".frame-ml").css("height", imgHeight + "px");
    $(".frame-ml").css("left", 0);
    $(".frame-ml").css("top", frameWidth);

    $(".frame-mr").css("width", frameWidth);
    $(".frame-mr").css("height", imgHeight + "px");
    $(".frame-mr").css("right", 0);
    $(".frame-mr").css("top", frameWidth);

    $(".frame-bc").css("width", imgWidth + "px");
    $(".frame-bc").css("height", frameWidth);
    $(".frame-bc").css("left", frameWidth);
    $(".frame-bc").css("bottom", 0);
  }
}

function composeProduct(img) {
  var imageWrapper = document.createElement("div");
  imageWrapper.className = "image-wrapper";
  if (currentSizeId == "Classic") {
    $(imageWrapper).css("padding", "12%");
    //set image wrapper background and border color
    $(imageWrapper).css("background-color", currentArtshotFinishColor);
    $(imageWrapper).css("border", "3px solid " + currentArtshotFrameColor);
  } else if (currentSizeId != "Mini 2017") {
    if (frameWidth > 0) {
      $(imageWrapper).css("padding", frameWidth + "px");
      //set product wrapper background image 
      //set image background graident 
      var tl = document.createElement("div");
      tl.className = "frame-tl";
      var tc = document.createElement("div");
      tc.className = "frame-tc";
      var tr = document.createElement("div");
      tr.className = "frame-tr";
      var ml = document.createElement("div");
      ml.className = "frame-ml";
      var mr = document.createElement("div");
      mr.className = "frame-mr";
      var bl = document.createElement("div");
      bl.className = "frame-bl";
      var bc = document.createElement("div");
      bc.className = "frame-bc";
      var br = document.createElement("div");
      br.className = "frame-br";
      // get 8 parts of frame image
      imageWrapper.appendChild(tl);
      imageWrapper.appendChild(tc);
      imageWrapper.appendChild(tr);
      imageWrapper.appendChild(ml);
      imageWrapper.appendChild(mr);
      imageWrapper.appendChild(bl);
      imageWrapper.appendChild(bc);
      imageWrapper.appendChild(bl);
      imageWrapper.appendChild(br);
    }
  }
  // create frame div
  imageWrapper.appendChild(img);

  var productWrapper = document.getElementsByClassName("product-wrapper")[0];
  productWrapper.innerHTML = "";
  productWrapper.appendChild(imageWrapper);
}

var currentWidth,
  currentSizeId,
  currentFinishId,
  currentArtshotFinishColor,
  currentArtshotFrameColor,
  currentFrameId,
  productImg,
  currentDecoSize;

var frameWidth = 0;

window.onload = function() {
  setRoomBackground();
  // get current product width id, finish id and frame color id from ean/product id 
  // call DMZ api 
  currentWidth = $(".size-selector option:selected").data("width");
  currentSizeId = $(".size-selector option:selected").val();
  currentArtshotFinishColor = $(
    ".artshotFinish-selector option:selected"
  ).val();
  currentArtshotFrameColor = $(".artshotFrame-selector option:selected").val();
  //load product image
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

$(".size-selector").change(function(event) {
  //updateViewOnSizeChnage(sizeId);
  currentWidth = $(".size-selector option:selected").data("width");
  currentSizeId = $(".size-selector option:selected").val();
  // if (currentSizeId=='Classic'||currentSizeId=='Mini 2017'){
  //   frameWidth = 0;
  // }
  composeProduct(productImg);
  setProductWrapperSize();
  setFrameWidthAndPosition();
  setProductPosition();
});

$(".artshotFinish-selector").change(function(event) {
  if ($(".size-selector option:selected").val() === "Classic") {
    currentArtshotFinishColor = event.target.value;
    setImageWrapperBackgroundColor(currentArtshotFinishColor);
  }
});

$(".artshotFrame-selector").change(function(event) {
  if ($(".size-selector option:selected").val() === "Classic") {
    currentArtshotFrameColor = event.target.value;
    setImageWrapperBorder(currentArtshotFrameColor);
  }
});

$(".frame-selector").change(function(event) {
  currentFrameId = event.target.value;
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
