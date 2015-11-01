fabric.Image.filters.BrightnessContrast = fabric.util.createClass(fabric.Image.filters.BaseFilter, {
  type: 'BrightnessContrast',
  initialize: function(options) {
    options || (options = { });
    this.contrast = options.contrast || 0;
    this.brightness = options.brightness || 0;
  },

  applyTo: function(canvasEl) {
      var brightMul = 1 + Math.min(150,Math.max(-150,this.brightness)) / 150,
          contrast = Math.max(0,this.contrast+1),
          context = canvasEl.getContext('2d'),
          imageData = context.getImageData(0, 0, canvasEl.width, canvasEl.height),
          data = imageData.data,
          p = canvasEl.width * canvasEl.height,
          pix = p*4, pix1, pix2, mul, add, r, g, b;

      if (contrast != -1) {
         mul = brightMul * contrast;
         add = - contrast * 128 + 128;
      }
      else {
         mul = brightMul;
         add = 0;
      }

      while (p--) {
         if ((r = data[pix-=4] * mul + add) > 255 )
            data[pix] = 255;
         else if (r < 0)
            data[pix] = 0;
         else
            data[pix] = r;

         if ((g = data[pix1=pix+1] * mul + add) > 255 )
            data[pix1] = 255;
         else if (g < 0)
            data[pix1] = 0;
         else
            data[pix1] = g;

         if ((b = data[pix2=pix+2] * mul + add) > 255 )
            data[pix2] = 255;
         else if (b < 0)
            data[pix2] = 0;
         else
            data[pix2] = b;
      }

      context.putImageData(imageData, 0, 0);
  },

toObject: function() {
    return extend(this.callSuper('toObject'), {
       contrast: this.contrast,
       brightness: this.brightness
    });
  }
});