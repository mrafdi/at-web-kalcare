Feature: Kalcare Test
    QA Test for AT website

    @positive @signIn
    Scenario: I login to Kalcare website
        Given I open Kalcare website
        When I click the Masuk button
        And I do login at Kalcare website
        Then I can see I am logged in to the Kalcare homepage