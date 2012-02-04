# Doom Swipe

Swipe event handler for touch devices.

### Example:

```javascript
new DoomSwipe( document.getElementById('swipeable'), { onSwipe: function (swipeType) { alert(swipeType); } } );
```

### All options example:

```javascript
new DoomSwipe(
  document.getElementById('swipeable'),
  {
    threshhold: 20,
    timeout:    250,
    onSwipe:    function (swipeType, horizontalSwipedDistance, verticalSwipedDistance) {
      alert(swipeType);
    }
  }
);
```


### Trigger a swipe event in Selenium:

```javascript
selenium.getEval("document.getElementById('swipeable').swipe('LEFT')");
```

### With Capybara:

```ruby
page.execute_script("document.getElementById('swipeable').swipe('LEFT')")
```

or you can use the SwipeHelpers:

```ruby
When /^I swipe the page to the right$/ do
  swipe("RIGHT")
end
```
