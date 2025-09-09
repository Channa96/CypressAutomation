Feature: End to end Ecommerce validatios

@Regression
Scenario: Ecommerce products purchase
Given I am on the ecommerce page
When I login to the ecommerce Scenario
And I add items to the cart & checkout
And I validate the total prices
Then select the country submit and verify Thankyou message

@Smoke
Scenario Outline: Ecommerce products purchase using parameterization
Given I am on the ecommerce page
When I login to the ecommerce Scenario using parameterization
  | username               | password  |
  | rahulshettyacademy     | learning  |
And I add items to the cart & checkout
And I validate the total prices
Then select the country submit and verify Thankyou message