# Gilded Rose

This is the Gilded Rose kata in JavaScript with Jest

## Project Outline

Language: JavaScript

## Getting started

Install dependencies
git statu
```sh
npm install
```
## Approach

* I started by writing tests for each of the cases outlined in the requirements. I later on discovered that my tests were overcomplicated and causing me issues later on. This was because I had injected the items with the values given in the original example. I had then used for loops within my tests to iterate through a certain number of iterations to try and calculate expected outcomes. However, I realised that this was counter-productive, and modified the tests to just require one usage of the updateQuality method to get to the expected result.

* I started by simplying the loop from a for loop to the forEach loop as it would help readability.

* I then changed the code to use ++ or -- iterators.

* I then extracted variables into simple to read consts that would return a boolean true/false value so that it would make their usage inside the conditionals far more legible and easy to understand the program layout. This included the checks for item names as well as the checks for quality and sellIn values.

* Some logic was then combined into single lines using the && operand to reduce the number of nested conditionals where possible.

* New functions were then extracted from the updateQuality function to handle specific calculations (i.e. calculate sellIn change, or quality changes for specific item types). This meant a lot of the logic could be removed from the updateQuality function and it would simply check what the item type is instead.

* Finally this was changed even further so that updateQuality simply runs a map function that passes the item into separate functions to handle sellIn and quality logic. The sellIn function is quite simple and just needs to check if an item is Sulfuras or not. The calculateQualityChange function now handles the logic for checking the item type, and then passes the item into different functions based on the type. These functions then return a number to alter the quality value by which is then fed back into the item in the map function in the updateQuality function.

I did use several resources in this challenge which helped me to better understand the code, its functions and a good process for refactoring. I'd like to redo the challenge again in another language in order to further consolidate my understanding.

- https://dev.to/patferraggi/the-noble-art-of-refactoring-part-0-2k58
- https://refactoring.guru/refactoring/techniques

## Requirements

```
======================================
Gilded Rose Requirements Specification
==========================  ============

Hi and welcome to team Gilded Rose. As you know, we are a small inn with a prime location in a
prominent city ran by a friendly innkeeper named Allison. We also buy and sell only the finest goods.
Unfortunately, our goods are constantly degrading in quality as they approach their sell by date. We
have a system in place that updates our inventory for us. It was developed by a no-nonsense type named
Leeroy, who has moved on to new adventures. Your task is to add the new feature to our system so that
we can begin selling a new category of items. First an introduction to our system:

	- All items have a SellIn value which denotes the number of days we have to sell the item
	- All items have a Quality value which denotes how valuable the item is
	- At the end of each day our system lowers both values for every item

Pretty simple, right? Well this is where it gets interesting:

	- Once the sell by date has passed, Quality degrades twice as fast
	- The Quality of an item is never negative
	- "Aged Brie" actually increases in Quality the older it gets
	- The Quality of an item is never more than 50
	- "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
	- "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches;
	Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
	Quality drops to 0 after the concert

We have recently signed a supplier of conjured items. This requires an update to our system:

	- "Conjured" items degrade in Quality twice as fast as normal items

Feel free to make any changes to the UpdateQuality method and add any new code as long as everything
still works correctly. However, do not alter the Item class or Items property as those belong to the
goblin in the corner who will insta-rage and one-shot you as he doesn't believe in shared code
ownership (you can make the UpdateQuality method and Items property static if you like, we'll cover
for you).

Just for clarification, an item can never have its Quality increase above 50, however "Sulfuras" is a
legendary item and as such its Quality is 80 and it never alters.
```

## Running tests

To run all tests

```sh
npm test
```

To run all tests in watch mode

```sh
npm run test:watch
```

To generate test coverage report

```sh
npm run test:coverage
```
