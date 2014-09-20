function fisheye() {
  function report(failing_message) {
    return(list + 1) * failing_message / (list * failing_message + 1);
  }
  function clip(min) {
    var diffCosAngle = (cosAngle > min ? parent : pool) - cosAngle;
    var n = min - cosAngle;
    return report(n / diffCosAngle) * diffCosAngle + cosAngle;
  }
  var parent = 0;
  var pool = 1;
  var list = 3;
  var cosAngle = 0;
  return clip.extent = function(d) {
    return arguments.length ? (parent = +d[0], pool = +d[1], clip) : [parent, pool];
  }, clip.distortion = function(recurring) {
    return arguments.length ? (list = +recurring, clip) : list;
  }, clip.focus = function(ui) {
    return arguments.length ? (cosAngle = +ui, clip) : cosAngle;
  }, clip;
}

!function() {

}(), 
!function() {
	
  function resize() {
    cWidth = chartHTML.node().clientWidth;
    chartHTML.select("canvas").attr("width", (cWidth + 2) * scaler).style("width", cWidth + 2 + "px").each(function(options) {
      var context = options.context = this.getContext("2d");
      context.scale(scaler, scaler);
      drawBorder(context);
      if (options.enabled) {
        options.resize();
      }
    });
    var timeout = Math.round(0.8 * innerHeight / 1.5);
    var hEdge = timeout + 320;
    var t = Math.min(innerWidth, timeout);
    doEnable();
  }
  
  function drawBorder(ctx){
    function doDraw(context, style, mtX, mtY, ltX, ltY){
      context.strokeStyle = style;
      context.beginPath();
      context.moveTo(mtX, mtY);
      context.lineTo(ltX, ltY);    
    }
    
    doDraw(ctx, "#444", 0.5, 0.5, 0.5, height + 1.5);
    ctx.moveTo(cWidth + 1.5, 0.5);
    ctx.lineTo(cWidth + 1.5, height + 1.5);
    
    ctx.stroke();
    doDraw(ctx, "#000", 0.5, 0.5, cWidth + 1.5, 0.5);
    
    ctx.stroke();
    doDraw(ctx, "#555", 0.5, height + 1.5, cWidth + 1.5, height + 1.5);
    
    ctx.stroke();
    ctx.strokeStyle = "rgba(0,0,0,0.8)";
    ctx.translate(1, 1);
  } 
  
  function doEnable() {
    var offset = innerHeight;
    if (!element.filter(function() {
      var rect = this.getBoundingClientRect();
      return rect.bottom > 0 && rect.top < offset;
    }).each(update).empty()) {
      element = element.filter(function($animator) {
        return!$animator.enabled;
      });
    }
  }
  
  function update(self) {
    function init() {
      k = -1;
      d3.select(el).on("click", callback).on("mouseover", show).on("mousemove", show).on("mouseout", successCallback).on("touchstart", f).on("touchmove", show).on("touchend", handler);
      doUpdate();
    }
    
    function drawImage(context, i){
      var left = round(i * sWidth);
      var x = round((i + 1) * sWidth);
      var width = Math.min(size, x - left);
      context.drawImage(background, Math.round((i * size + (size - width) / 2) * scale), 0, width * scale, end * scale, left, 0, width, height);
      if (i) {
        context.beginPath();
        context.moveTo(left, 0);
        context.lineTo(left, height);
        context.stroke();
      }
      if (val1) {
        if (right > left) {
          if (x >= right) {
            context.save();
            context.strokeStyle = "#888";
            context.beginPath();
            context.moveTo(left + 0.5, height + 1.5);
            context.lineTo(x - 0.5, height + 1.5);
            context.stroke();
            context.restore();
          }
        }
      }
    }
    
    function doUpdate() {
      list.style("left", function(token) {
        return Math.round(round(token.range[0] * sWidth)) - 4 + "px";
      }).style("width", function(token) {
        return Math.round(round((token.range[token.range.length - 1] + 1) * sWidth)) - Math.round(round(token.range[0] * sWidth)) - 1 + "px";
      }).select(".label").style("left", function(token) {
        return Math.min(0, cWidth - 90 - (round(token.range[0] * sWidth) - 4)) + "px";
      });
      var context = self.context;
      context.clearRect(0, 0, cWidth, height);
      context.clearRect(0, height + 1, cWidth, height + 2);
      var i = 0;
      var len = self.size;
      for (;len > i;++i) {
        drawImage(context, i);
      }
    }
    function initialize() {
      if (!started){
        var touchIcon = d3.select(".touch-icon");
        touchIcon.style("visibility", "hidden")
        console.log("hiding icon");
        started = true;
      }
      right = Math.max(0, Math.min(cWidth - 1E-6, d3.mouse(el)[0]));
      if (last) {
        d3.timer(function() {
          var val2 = round.distortion();
          var left = val2 ? round.focus() : right;
          return last = Math.abs(val1 - val2) < 0.01 && Math.abs(right - left) < 0.5, round.distortion(last ? val1 : val2 + 0.14 * (val1 - val2)), round.focus(last ? right : left + 0.14 * (right - left)), doUpdate(), last;
        });
      }
    }
    function successCallback() {
      val1 = 0;
      initialize();
    }
    function show() {
      val1 = size / sWidth - 1;
      initialize();
    }
    function callback() {
      successCallback();
      var i = 0;
      var len = self.size;
      for (;len > i && round(i * sWidth) < right;++i) {
      }
      init(self, i);
      d3.event.preventDefault();
    }
    function f() {
      d3.event.preventDefault();
      show();
      time = Date.now();
    }
    function handler() {
      return!d3.event.touches.length && Date.now() - time < 500 ? void callback() : (successCallback(), void 0);
    }
    self.enabled = true;
    var time;
    var right;
    var el = this;
    var p = el.parentNode;
    var parent = p.parentNode;
    var sWidth = cWidth / self.size; //sector width
    var background = new Image;
    var size = 225; //sector width
    var end = 225;
    var val1 = 0;
    var k = 0;
    var last = true;
    var round = fisheye().distortion(0).extent([0, cWidth]);
    var list = d3.select(parent).selectAll("li");
    background.src = "img/scale-" + scale + "/" + self.collectionId + ".jpg";
    background.onload = init;
    d3.timer(function() {
      if (0 > k) {
        return true;
      }
      var ctx = self.context;
      ctx.clearRect(0, 0, cWidth, 2);
      ctx.fillStyle = "#777";
      ctx.fillRect(0, 0, ++k, 2);
    });
    self.resize = function() {
      var z0 = round.focus() / round.extent()[1];
      var time = size / sWidth - 1;
      var speed = round.distortion() / time;
      sWidth = cWidth / self.size;
      round.distortion(speed * time).extent([0, cWidth]).focus(z0 * cWidth);
      doUpdate();
    };
  }
  
  // variables
  var started = false;
  var cWidth; // client width
  var height = 225;
  var theChart = d3.select(".interactive");
  var chartHTML = theChart.selectAll(".faceset .fisheye").datum(function() {
    return {
      collectionId : this.getAttribute("data-collection-id"),
      size : +this.getAttribute("data-size")
    };
  });
  var element = chartHTML.insert("a", ".description").attr("href", function(utils) {
    return "http://anna.vc/";
  }).append("canvas");
  var scale = 1; // big or small
  var scaler = 1;
  if (window.devicePixelRatio >= 2) {
    if (screen.availWidth >= 1280) {
      if (2 !== element.node().getContext("2d").webkitBackingStorePixelRatio) {
        scale = 2;
        scaler = 2;
      }
    }
  }
  element.attr("height", (height + 3) * scaler).style("height", height + 3 + "px").style("margin-bottom", "-1px");
  d3.select(window).on("scroll", doEnable).on("resize", resize);
  resize();
}();
