Feature: Kalcare Test
    QA Test for AT website

    @positive @signIn
    Scenario: I login to Kalcare website
        Given I open Kalcare website
        When I click the Masuk button
        And I do login at Kalcare website
        Then I can see I am logged in to the Kalcare homepage
    
    Scenario: I search and add product to cart
        Given I open Kalcare website
        When I click the Masuk button
        And I do login at Kalcare website
        And I search product "diabetasol" in homepage
        Then I can see the search result page for "diabetasol"
        When I click the first product on the search result list
        Then I go to that product PDP
        When I choose the first list of the shop
        And I click Tambah ke Keranjang button
        Then I can see that the Cart is now have "1" item

     Scenario: I search and add product to cart
        Given I open Kalcare website
        When I click the Masuk button
        And I do login at Kalcare website
        And I search product "diabetasol" in homepage
        Then I can see the search result page for "diabetasol"
        When I click the first product on the search result list
        Then I go to that product PDP
        When I choose the first list of the shop
        And I click Beli Sekarang button
        Then I can see that I now in Keranjang Belanja
        When I click Beli button on Keranjang page
        And I click Pilih pengiriman on Keranjang page
        Then I can see the error message about the Pengiriman
    
