const paletteManager = (function(){
  const defaultColor = 'rgb(120, 120, 255)';
  let palette = [];

  const createBlankPalette = function() {
    if (palette !== [] || palette.length < 1) {
      palette = [];
    }

    for (let pIndex = 0; pIndex < 12; pIndex++) {
      palette.push(defaultColor);
    }
  }
  return {
    init: function() {
      createBlankPalette();
    },

    getPalette: function() {
      return palette;
    }
  }
}());

export default paletteManager;