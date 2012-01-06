/*
 * DoomSwipe
 *
 * @author Dumitru Glavan
 * @link http://dumitruglavan.com/doom-swipe
 * @version 1.0 (21-DEC-2011)
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 */

window.DoomSwipe = function(element, options) {

  // return immediately if element doesn't exist
  if (!element) return null;

  var _this = this;

  // retreive options
  this.options           = options || {};
  this.options.threshold = this.options.threshold || 20;
  this.options.timeout   = this.options.timeout || 250;
  this.options.onSwipe   = this.options.onSwipe || false;

  // add a swipe event to the element
  this.addSwipeEvent(element)
    
  // set the DOM element
  this.element           = element;

  // add event listeners
  if (this.element.addEventListener) {
    this.element.addEventListener('touchstart', this, false);
    this.element.addEventListener('touchmove', this, false);
    this.element.addEventListener('touchend', this, false);
  }

};

DoomSwipe.prototype = {
  
  addSwipeEvent: function (element) {

    if (!element.swipe) {
      that = this;
      element.swipe = function (swipeType, deltaX, deltaY) {
        this.swipe.call(that, swipeType, deltaX, deltaY);
      };
    }

  },

  handleEvent: function(e) {
    switch (e.type) {
      case 'touchstart': this.onTouchStart(e); break;
      case 'touchmove': this.onTouchMove(e); break;
      case 'touchend': this.onTouchEnd(e); break;
    }
  },

  onTouchStart: function(e) {
    
    this.start = {

      // get touch coordinates for delta calculations in onTouchMove
      pageX: e.touches[0].pageX,
      pageY: e.touches[0].pageY,

      // set initial timestamp of touch sequence
      time: Number( new Date() )

    };

    // used for testing first onTouchMove event
    this.isScrolling = undefined;
    
    // reset deltaX
    this.deltaX = 0;
    
    // reset deltaY
    this.deltaY = 0;

  },

  onTouchMove: function(e) {

    // ensure swiping with one touch and not pinching
    if(e.touches.length > 1 || e.scale && e.scale !== 1) return;

    this.deltaX = e.touches[0].pageX - this.start.pageX;
    this.deltaY = e.touches[0].pageY - this.start.pageY;

    // stop default scrolling of the page
    e.preventDefault();

  },

  onTouchEnd: function(e) {
    
    // call swipe function with swipe end value
    if (this.isValidSwipe()) {
      
      // determine the swipe type
      swipeType = this.getSwipeType(this.deltaX, this.deltaY)

      // trigger a swipe
      this.swipe(swipeType, this.deltaX, this.deltaY);
    }

  },
  
  isValidSwipe: function () {

    // determine if it is a valid swipe movement
    var isValidSwipe = 
          Number(new Date()) - this.start.time < this.options.timeout  // if swipe duration is less than the timeout
          && ((Math.abs(this.deltaX) > this.options.threshold) || (Math.abs(this.deltaY) > this.options.threshold));  // and if swipe distance is greater than threshold

    return isValidSwipe;

  },
  
  getSwipeType: function (deltaX, deltaY) {

    swipeType = false;

    // determine the swipe type by the swiped distance
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      swipeType = deltaX < 0 ? "LEFT" : "RIGHT";
    } else {
      swipeType = deltaY < 0 ? "UP"   : "DOWN";      
    }

    return swipeType;
    
  },
  
  swipe: function (swipeType, deltaX, deltaY) {
    
    // call the swipe callback if any
    if (typeof this.options.onSwipe === "function") {
      this.options.onSwipe.call(this, swipeType, deltaX, deltaY);
    }
  
  }

};
