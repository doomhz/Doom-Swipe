module SwipeHelpers
  def swipe(type)
    raise Capybara::NotSupportedByDriverError unless Capybara::Selenium::Driver == page.driver.class
    page.execute_script("window.swipe('#{type}')")
  end
end

World(SwipeHelpers)
