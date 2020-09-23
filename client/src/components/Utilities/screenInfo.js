const screenInfo = (function(){
  let height = 0;
  let width = 0;

  let mode = 'PC';

  const setScreenInfo = function() {
    const app = document.querySelector('.App');
    const docDimensions = app.getBoundingClientRect();
    height = docDimensions.height;
    width = docDimensions.width;

    if (width <= 976) {
      if (width < 768) {
        mode = 'Mobile';
      } else {
        mode = 'Tablet'
      }
    } else if (width > 976) {
      mode = 'PC';
    }
    
  }

  return {
    init: function() {
      setScreenInfo();
    },

    getMode: function() {
      return mode;
    }
  }
}());

export default screenInfo;