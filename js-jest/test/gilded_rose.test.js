const { Shop, Item } = require("../src/gilded_rose");

describe("Gilded Rose", function () {
  const gildedRose = new Shop();

  beforeEach(() => {
    gildedRose.items = [];
  });

  it("should store items", function () {
    gildedRose.items.push(new Item("+5 Dexterity Vest", 10, 20));
    expect(gildedRose.items[0].name).toBe("+5 Dexterity Vest");
    expect(gildedRose.items[0].sellIn).toBe(10);
    expect(gildedRose.items[0].quality).toBe(20);
  });

  it("not allow an item to have a negative value of quality", function () {
    gildedRose.items.push(new Item("Elixir of the Mongoose", 5, 7));
    for (let i = 0; i < 30; i++) {
      gildedRose.updateQuality();
    }
    expect(gildedRose.items[0].quality).toBe(0);
  });

  it("should degrade quality 2x faster when Sell by date is passed", function () {
    gildedRose.items.push(new Item("Elixir of the Mongoose", 5, 7));
    for (let i = 0; i < 6; i++) {
      gildedRose.updateQuality();
      // console.log("Day " + i);
      // console.log("Sell In " + gildedRose.items[0].sellIn);
      // console.log("Quality " + gildedRose.items[0].quality);
    }
    expect(gildedRose.items[0].sellIn).toBe(-1);
    expect(gildedRose.items[0].quality).toBe(0);
  });

  it("should increase the quality of Aged Brie over time", function () {
    gildedRose.items.push(new Item("Aged Brie", 2, 0));
    gildedRose.updateQuality();

    expect(gildedRose.items[0].quality).toBe(1);
  });

  it("should allow a maximum quality of 50", function () {
    gildedRose.items.push(new Item("Aged Brie", 2, 0));
    for (let i = 0; i < 100; i++) {
      gildedRose.updateQuality();
    }

    expect(gildedRose.items[0].quality).toBe(50);
  });

  it("should never decrease the quality of Sulfuras", function () {
    gildedRose.items.push(new Item("Sulfuras, Hand of Ragnaros", 0, 80));
    for (let i = 0; i < 100; i++) {
      gildedRose.updateQuality();
    }

    expect(gildedRose.items[0].quality).toBe(80);
  });

  it("Sulfuras never has to be sold", function () {
    gildedRose.items.push(new Item("Sulfuras, Hand of Ragnaros", 0, 80));
    for (let i = 0; i < 100; i++) {
      gildedRose.updateQuality();
    }

    expect(gildedRose.items[0].sellIn).toBe(0);
  });

  it("Backstage passes increase in Quality by 2 when 5 < SellIn >= 10", function () {
    gildedRose.items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20));
    for (let i = 0; i < 9; i++) {
      gildedRose.updateQuality();
    }
    expect(gildedRose.items[0].sellIn).toBe(6);
    expect(gildedRose.items[0].quality).toBe(33);
  });

  it("Backstage passes increase in Quality by 3 when SellIn <= 5", function () {
    gildedRose.items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20));
    for (let i = 0; i < 15; i++) {
      gildedRose.updateQuality();
    }
    expect(gildedRose.items[0].sellIn).toBe(0);
    expect(gildedRose.items[0].quality).toBe(50);
  });

  it("Backstage passes quality drops to 0 when Sell In = -1", function () {
    gildedRose.items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20));
    for (let i = 0; i < 16; i++) {
      gildedRose.updateQuality();
      // console.log("Day " + i);
      // console.log("Sell In " + gildedRose.items[0].sellIn);
      // console.log("Quality " + gildedRose.items[0].quality);
    }
    expect(gildedRose.items[0].sellIn).toBe(-1);
    expect(gildedRose.items[0].quality).toBe(0);
  });

  it("Conjured items degrade in quality 2x as normal items", function () {
    gildedRose.items.push(new Item("Conjured Mana Cake", 3, 6));
    gildedRose.updateQuality();
    expect(gildedRose.items[0].sellIn).toBe(2);
    expect(gildedRose.items[0].quality).toBe(4);
  });

  
});
