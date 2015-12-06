var debounce, throttle;

window.closest = function(el, fn) {
  return el && (fn(el) ? el : closest(el.parentNode, fn));
};

(function() {
  var msie, ua;
  ua = window.navigator.userAgent;
  msie = ua.indexOf("MSIE ");
  return window.isIE = msie > 0;
})();

window.debounce = debounce = function(fn, delay) {
  var timer;
  timer = null;
  return function() {
    var args, context;
    context = this;
    args = arguments;
    clearTimeout(timer);
    return timer = setTimeout(function() {
      return fn.apply(context, args);
    }, delay);
  };
};

window.throttle = throttle = function(fn, threshhold, scope) {
  var deferTimer, last;
  threshhold || (threshhold = 250);
  last = void 0;
  deferTimer = void 0;
  return function() {
    var args, context, now;
    context = scope || this;
    now = +(new Date);
    args = arguments;
    if (last && now < last + threshhold) {
      clearTimeout(deferTimer);
      return deferTimer = setTimeout(function() {
        last = now;
        return fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      return fn.apply(context, args);
    }
  };
};

window.TripGuide = (function() {
  TripGuide.prototype.config = {
    delay: -1,
    tripTheme: "white",
    animation: "fadeIn",
    onEnd: function() {
      var e;
      e = document.createEvent("Event");
      e.initEvent("trip.ended", true, true);
      return document.dispatchEvent(e);
    }
  };

  function TripGuide() {
    this.trip = new Trip(tripElements, this.config);
  }

  TripGuide.prototype.start = function() {
    return this.trip.start();
  };

  TripGuide.prototype.next = function() {
    return this.trip.next();
  };

  TripGuide.prototype.index = function() {
    return this.trip.tripIndex;
  };

  return TripGuide;

})();

(function() {
  var Footer;

  Footer = (function() {
    Footer.prototype.catEffectsRendered = {};

    function Footer(blockName) {
      this.blockName = blockName;
      this.block = document.querySelector("." + this.blockName);
      if (!this.block) {
        return;
      }
      this.cacheDom();
      this.bindEvents();
    }

    Footer.prototype.cacheDom = function() {
      return this.catItems = this.block.querySelector(".footer__list");
    };

    Footer.prototype.bindEvents = function() {
      return this.block.addEventListener("click", this.blockClickHandler.bind(this));
    };

    Footer.prototype.blockClickHandler = function(e) {
      var itemBack, itemCat, itemEffect, itemRemove;
      if (e == null) {
        e = window.event;
      }
      itemCat = closest(e.target, (function(_this) {
        return function(el) {
          return _this.hasClass(el, "footer__item_cat");
        };
      })(this));
      itemBack = closest(e.target, (function(_this) {
        return function(el) {
          return _this.hasClass(el, "footer__item_back");
        };
      })(this));
      itemEffect = closest(e.target, (function(_this) {
        return function(el) {
          return _this.hasClass(el, "footer__item_effect");
        };
      })(this));
      itemRemove = closest(e.target, (function(_this) {
        return function(el) {
          return _this.hasClass(el, "footer__item_remove");
        };
      })(this));
      switch (false) {
        case !itemCat:
          return this.itemCatClick(itemCat);
        case !itemEffect:
          return this.itemEffectClick(itemEffect);
        case !itemBack:
          return this.itemBackClick();
        case !itemRemove:
          return this.itemRemoveClick();
      }
    };

    Footer.prototype.itemCatClick = function(cat) {
      var effectCatName, effects, effectsWrapper;
      effects = cat.querySelector("[type='template']");
      if (!effects) {
        return;
      }
      effectCatName = effects.getAttribute("name");
      if (!this.catEffectsRendered[effectCatName]) {
        effectsWrapper = document.createElement("ul");
        effectsWrapper.className = "footer__list footer__list_effects " + effectCatName;
        effectsWrapper.innerHTML = "<li class=\"footer__item footer__item_back\"></li>\n" + effects.innerHTML;
        this.block.appendChild(effectsWrapper);
        this.catEffectsRendered[effectCatName] = effectsWrapper;
      }
      this.catItems.classList.remove("active");
      this.catEffectsRendered[effectCatName].classList.add("active");
      return CanvasEditor.nextStep(3);
    };

    Footer.prototype.itemEffectClick = function(effect) {
      var effectData, effectImage;
      effectData = effect.querySelector(".footer__effect-img").dataset;
      effectImage = CanvasEditor.blendingSupport ? effectData.image : effectData.fallbackImage;
      return CanvasEditor.addEffect(effectImage);
    };

    Footer.prototype.itemBackClick = function() {
      var item, key, ref;
      ref = this.catEffectsRendered;
      for (key in ref) {
        item = ref[key];
        item.classList.remove("active");
      }
      return this.catItems.classList.add("active");
    };

    Footer.prototype.hasClass = function(el, className) {
      return el.classList && el.classList.contains(className);
    };

    return Footer;

  })();

  document.addEventListener("DOMContentLoaded", function() {
    return window.footer = new Footer("footer");
  });

}).call(this);

(function() {
  var Header;

  Header = (function() {
    function Header(blockName) {
      this.blockName = blockName;
      this.block = document.querySelector("." + this.blockName);
      if (!this.block) {
        return;
      }
      this.cacheDom();
      this.bindEvents();
    }

    Header.prototype.cacheDom = function() {
      this.saveBtn = this.block.querySelector(".header__save");
      return this.filtres = this.block.querySelector(".header__filters");
    };

    Header.prototype.bindEvents = function() {
      this.saveBtn.addEventListener("click", function() {
        return CanvasEditor.saveImage();
      });
      return this.filtres.addEventListener("click", (function(_this) {
        return function(e) {
          var filterFunction, num;
          if (e == null) {
            e = window.event;
          }
          filterFunction = e.target.dataset && e.target.dataset.filter;
          num = _this.whichChild(e.target);
          return CanvasEditor.applyFilter(filterFunction, num);
        };
      })(this));
    };

    Header.prototype.whichChild = function(elem) {
      var i;
      i = 0;
      while ((elem = elem.previousSibling) !== null) {
        ++i;
      }
      return i;
    };

    return Header;

  })();

  document.addEventListener("DOMContentLoaded", function() {
    return new Header("header");
  });

}).call(this);

(function() {
  document.addEventListener("DOMContentLoaded", function() {
    var likely;
    likely = document.querySelector(".likely");
    if (likely) {
      return likely.addEventListener("click", function(e) {
        e.preventDefault();
        return CanvasEditor.setOGTags();
      });
    }
  });

}).call(this);

(function() {
  var CanvasEditor;

  CanvasEditor = (function() {
    function CanvasEditor(id) {
      this.id = id;
      this.reader = new FileReader();
      this.imgObj = new Image();
      this.f = fabric.Image.filters;
      this.cacheDom();
      this.bindEvents();
      this.configFabricCtrl();
      this.blendingSupport = this.blendingSupport();
      if (window.localStorage && !localStorage.getItem("toureShown")) {
        this.startTrip();
      }
      this.initSlider();
    }

    CanvasEditor.prototype.cacheDom = function() {
      this.main = document.querySelector(".main");
      this.mainWrapper = document.querySelector(".main__canvas");
      this.slider = document.querySelector(".main__slider");
      this.watermarkImg = this.mainWrapper.dataset.watermark;
      this.inputImage = document.querySelector(".main__input");
      return this.zoomItem = document.querySelectorAll(".main__zoom-item");
    };

    CanvasEditor.prototype.initFabric = function() {
      this.mainWrapper.classList.add("active");
      this.canvas = new fabric.Canvas(this.id);
      this.canvas.setHeight(this.oImgSizes.height);
      this.canvas.setWidth(this.oImgSizes.width);
      this.f = fabric.Image.filters;
      this.upperCanvas = this.mainWrapper.querySelector(".upper-canvas");
      this.cont = this.mainWrapper.querySelector(".canvas-container");
      this.tourHelper = document.createElement("div");
      this.tourHelper.className = "main__tour-helper";
      this.cont.appendChild(this.tourHelper);
      if (this.supportDrag()) {
        this.draggie = new Draggabilly(".canvas-container", {});
      }
      this.cont.classList.add("moving");
      this.canvas.on("object:selected", (function(_this) {
        return function(obj) {
          if (_this.supportDrag()) {
            _this.draggie.disable();
          }
          _this.cont.classList.remove("moving");
          return _this.setSliderValue(obj.target.get("opacity") * 100);
        };
      })(this));
      this.canvas.on("selection:cleared", (function(_this) {
        return function() {
          if (_this.supportDrag()) {
            _this.draggie.enable();
          }
          return _this.cont.classList.add("moving");
        };
      })(this));
      if (this.trip) {
        this.canvas.on("object:scaling", this.objectScalingCB.bind(this));
        this.canvas.on("object:rotating", (function(_this) {
          return function() {
            if (_this.trip) {
              return _this.nextStep(6, _this.getMoveCoor());
            }
          };
        })(this));
        return this.canvas.on("object:moving", (function(_this) {
          return function() {
            if (_this.trip) {
              return _this.nextStep(7);
            }
          };
        })(this));
      }
    };

    CanvasEditor.prototype.objectScalingCB = function() {
      var trip;
      if (!this.trip) {
        return;
      }
      trip = document.querySelector(".trip-block");
      trip.classList.remove("fadeIn");
      trip.classList.remove("animated");
      trip.style.opacity = 0;
      return this.canvas.on("mouse:up", (function(_this) {
        return function() {
          return _this.nextStep(5, _this.getRotateCoor());
        };
      })(this));
    };

    CanvasEditor.prototype.bindEvents = function() {
      this.inputImage.addEventListener("change", this.fileAdded.bind(this));
      this.reader.addEventListener("load", (function(_this) {
        return function(e) {
          if (e == null) {
            e = window.event;
          }
          return _this.imgObj.src = e.target.result;
        };
      })(this));
      this.imgObj.addEventListener("load", this.imageLoaded.bind(this));
      [].forEach.call(this.zoomItem, (function(_this) {
        return function(item) {
          return item.addEventListener("click", _this.zoomItemClickHandler.bind(_this));
        };
      })(this));
      document.addEventListener("keydown", (function(_this) {
        return function(e) {
          if (e == null) {
            e = e || window.event;
          }
          if (e.keyCode === 46) {
            return _this.removeActive();
          }
        };
      })(this));
      return document.addEventListener("trip.ended", (function(_this) {
        return function(e) {
          return _this.trip = null;
        };
      })(this), false);
    };

    CanvasEditor.prototype.setSizes = function() {
      if (!this.canvas) {
        return;
      }
      this.canvas.setHeight(this.mainWrapper.clientHeight - 2);
      this.canvas.setWidth(this.mainWrapper.clientWidth - 2);
      this.canvas.renderAll();
      if (this.originalImg) {
        this.setImageSize();
        this.canvas.setHeight(this.originalImg.height);
        this.canvas.setWidth(this.originalImg.width);
        return this.centerCanvas();
      }
    };

    CanvasEditor.prototype.setImageSize = function() {
      var cHeight, cWidth, iHeight, iWidth;
      if (this.originalImg) {
        cWidth = this.canvas.width;
        cHeight = this.canvas.height;
        iWidth = this.oImgSizes.width;
        iHeight = this.oImgSizes.height;
        if (iWidth > cWidth || iHeight > cHeight) {
          this.oImgSizes.scale = Math.max(iWidth / cWidth, iHeight / cHeight);
        }
        return this.originalImg.set({
          width: iWidth / this.oImgSizes.scale,
          height: iHeight / this.oImgSizes.scale
        });
      }
    };

    CanvasEditor.prototype.mouseDown = function() {
      return this.selectAll();
    };

    CanvasEditor.prototype.mouseUp = function() {
      return this.unSelect();
    };

    CanvasEditor.prototype.centerCanvas = function() {
      this.canvas.wrapperEl.style.marginLeft = -this.canvas.width / 2 + "px";
      return this.canvas.wrapperEl.style.marginTop = -this.canvas.height / 2 + "px";
    };

    CanvasEditor.prototype.fileAdded = function(e) {
      if (e == null) {
        e = window.event;
      }
      this.reader.readAsDataURL(e.target.files[0]);
      return this.main.classList.add("image-added");
    };

    CanvasEditor.prototype.imageLoaded = function() {
      this.originalImg = new fabric.Image(this.imgObj);
      this.saveImageSizes();
      this.originalImg.selectable = false;
      this.originalImg.hasBorders = false;
      this.originalImg.hasControls = false;
      this.initFabric();
      this.setSizes();
      this.canvas.add(this.originalImg);
      this.addWatermark();
      return this.nextStep(1);
    };

    CanvasEditor.prototype.saveImage = function() {
      var img, win;
      if (!this.canvas) {
        return;
      }
      if (fabric.Canvas.supports("toDataURL")) {
        img = this.canvas2img();
        win = window.open();
        win.document.body.innerHTML = "<img src='" + img + "'></img>";
        return win.document.close();
      } else {
        return alert("Sorry but you browser not support saving image from canvas");
      }
    };

    CanvasEditor.prototype.setOGTags = function() {
      var base64;
      if (fabric.Canvas.supports("toDataURL") && this.ogTags) {
        base64 = this.canvas2img();
        return [].forEach.call(this.ogTags, (function(_this) {
          return function(item) {
            return item.content = base64;
          };
        })(this));
      }
    };

    CanvasEditor.prototype.canvas2img = function() {
      return this.canvas.toDataURL("image/jpeg;base64;");
    };

    CanvasEditor.prototype.addEffect = function(image) {
      if (!this.canvas) {
        return;
      }
      return fabric.Image.fromURL(image, (function(_this) {
        return function(oImg) {
          _this.setCenter(oImg);
          if (_this.blendingSupport) {
            oImg.set("globalCompositeOperation", "screen");
          }
          _this.canvas.add(oImg);
          _this.canvas.setActiveObject(oImg);
          oImg.applyFilters(_this.canvas.renderAll.bind(_this.canvas));
          return _this.nextStep(4, _this.getScaleCoor());
        };
      })(this));
    };

    CanvasEditor.prototype.blendingSupport = function() {
      var ctx;
      ctx = document.createElement("canvas").getContext("2d");
      ctx.globalCompositeOperation = "screen";
      return ctx.globalCompositeOperation === "screen";
    };

    CanvasEditor.prototype.setCenter = function(el) {
      var cHeight, cWidth;
      cWidth = this.canvas.width;
      cHeight = this.canvas.height;
      return el.set({
        originX: "center",
        originY: "center",
        top: cHeight / 2,
        left: cWidth / 2
      });
    };

    CanvasEditor.prototype.applyFilter = function(filterString, num) {
      return this.canvas.getObjects().map((function(_this) {
        return function(obj, i) {
          var filterFunc, filterRes;
          if (i === 0) {
            return;
          }
          filterFunc = new Function("f", filterString);
          filterRes = filterFunc(_this.f);
          obj.filters[num] = filterRes;
          return obj.applyFilters(_this.canvas.renderAll.bind(_this.canvas));
        };
      })(this));
    };

    CanvasEditor.prototype.saveImageSizes = function() {
      return this.oImgSizes = {
        width: this.originalImg.width,
        height: this.originalImg.height,
        scale: 1
      };
    };

    CanvasEditor.prototype.addWatermark = function() {
      return fabric.Image.fromURL(this.watermarkImg, (function(_this) {
        return function(img) {
          img.selectable = false;
          img.set({
            originX: "center",
            originY: "center",
            left: _this.canvas.width - 50,
            top: _this.canvas.height - 50,
            hasBorders: false,
            hasControls: false,
            width: 50,
            height: 50
          });
          return _this.canvas.add(img);
        };
      })(this));
    };

    CanvasEditor.prototype.zoomItemClickHandler = function(e) {
      var scale;
      if (e == null) {
        e = window.event;
      }
      scale = .1;
      this.nextStep(2);
      if (e.target.classList.contains("main__zoom-item_plus")) {
        this.zoomIt(1 + scale);
      }
      if (e.target.classList.contains("main__zoom-item_minus")) {
        this.zoomIt(1 - scale);
      }
      if (e.target.classList.contains("main__zoom-item_remove")) {
        return this.removeActive();
      }
    };

    CanvasEditor.prototype.zoomIt = function(factor) {
      var bi, i, left, objects, scaleX, scaleY, tempLeft, tempScaleX, tempScaleY, tempTop, top;
      this.canvas.setHeight(this.canvas.getHeight() * factor);
      this.canvas.setWidth(this.canvas.getWidth() * factor);
      if (this.canvas.backgroundImage) {
        bi = this.canvas.backgroundImage;
        bi.width = bi.width * factor;
        bi.height = bi.height * factor;
      }
      objects = this.canvas.getObjects();
      for (i in objects) {
        scaleX = objects[i].scaleX;
        scaleY = objects[i].scaleY;
        left = objects[i].left;
        top = objects[i].top;
        tempScaleX = scaleX * factor;
        tempScaleY = scaleY * factor;
        tempLeft = left * factor;
        tempTop = top * factor;
        objects[i].scaleX = tempScaleX;
        objects[i].scaleY = tempScaleY;
        objects[i].left = tempLeft;
        objects[i].top = tempTop;
        objects[i].setCoords();
      }
      this.canvas.renderAll();
      this.canvas.calcOffset();
      return this.centerCanvas();
    };

    CanvasEditor.prototype.configFabricCtrl = function(obj) {
      fabric.Object.prototype.setControlsVisibility({
        mt: false,
        mb: false,
        ml: false,
        mr: false,
        tl: false,
        tr: false,
        bl: false
      });
      fabric.Object.prototype.transparentCorners = false;
      fabric.Object.prototype.borderColor = "#161616";
      return fabric.Object.prototype.cornerColor = "#161616";
    };

    CanvasEditor.prototype.updFabricCtrl = function() {
      this.canvas.hasControlCallback = {
        mtr: true
      };
      return this.canvas.controlCallback = {
        mtr: function(ctx, left, top, size) {
          var image, x, y;
          image = new Image(30, 30);
          image.src = "assets/i/rotate.svg";
          x = left - (image.width / 2) + size / 2;
          y = top - (image.height / 2) + size / 2;
          return ctx.drawImage(image, x, y, 30, 30);
        }
      };
    };

    CanvasEditor.prototype.removeActive = function() {
      var obj;
      obj = this.canvas.getActiveObject();
      if (obj) {
        return obj.remove();
      }
    };

    CanvasEditor.prototype.selectAll = function() {
      var objs;
      objs = this.canvas.getObjects().map(function(o) {
        return o.set("active", true);
      });
      this.group = new fabric.Group(objs);
      this.group.set({
        hasControls: false,
        hasBorders: false,
        originX: "center",
        originY: "center"
      });
      this.canvas._activeObject = null;
      return this.canvas.setActiveGroup(this.group.setCoords()).renderAll();
    };

    CanvasEditor.prototype.unSelect = function() {
      var i, items;
      items = this.group._objects;
      this.group._restoreObjectsState();
      this.canvas.remove(this.group);
      i = 0;
      while (i < items.length) {
        this.canvas.add(items[i]);
        i++;
      }
      return this.canvas.renderAll();
    };

    CanvasEditor.prototype.startTrip = function() {
      localStorage.setItem("toureShown", true);
      this.trip = new TripGuide();
      return this.trip.start();
    };

    CanvasEditor.prototype.nextStep = function(i, coor) {
      if (coor) {
        this.tourHelper.style.top = coor.y + "px";
        this.tourHelper.style.left = coor.x + "px";
      }
      if (this.trip && this.trip.index() === i - 1) {
        return this.trip.next();
      }
    };

    CanvasEditor.prototype.initSlider = function() {
      noUiSlider.create(this.slider, {
        start: 100,
        connect: "lower",
        direction: "rtl",
        animate: true,
        orientation: "vertical",
        range: {
          "min": 0,
          "max": 100
        }
      });
      return this.slider.noUiSlider.on("change", this.setEffectOpacity.bind(this));
    };

    CanvasEditor.prototype.setSliderValue = function(val) {
      if (val == null) {
        val = 100;
      }
      return this.slider.noUiSlider.set(val);
    };

    CanvasEditor.prototype.setEffectOpacity = function(arr, lower, high) {
      var obj;
      obj = this.canvas.getActiveObject();
      if (obj) {
        obj.setOpacity(high / 100);
        return this.canvas.renderAll();
      }
    };

    CanvasEditor.prototype.getScaleCoor = function() {
      var obj;
      obj = this.canvas.getActiveObject();
      if (obj) {
        return {
          x: obj.oCoords.br.x,
          y: obj.oCoords.br.y + 10
        };
      }
    };

    CanvasEditor.prototype.getRotateCoor = function() {
      var obj;
      obj = this.canvas.getActiveObject();
      if (obj) {
        return {
          x: obj.oCoords.mtr.x,
          y: obj.oCoords.mtr.y - 10
        };
      }
    };

    CanvasEditor.prototype.getMoveCoor = function() {
      return {
        x: this.canvas.width * .9,
        x: this.canvas.height * .2
      };
    };

    CanvasEditor.prototype.supportDrag = function() {
      return 'function' === typeof DataTransfer.prototype.setDragImage;
    };

    return CanvasEditor;

  })();

  document.addEventListener("DOMContentLoaded", function() {
    return setTimeout((function(_this) {
      return function() {
        return window.CanvasEditor = new CanvasEditor("photo-editor");
      };
    })(this), 0);
  });

}).call(this);
