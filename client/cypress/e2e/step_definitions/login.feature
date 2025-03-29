Feature: login

Scenario: Valid login
Given I'm on the front page
When I type the username and the password
Then I should see the bookworms logo