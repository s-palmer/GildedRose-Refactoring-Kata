const { Shop, Item } = require("../src/gilded_rose");

describe("Gilded Rose", function () {
  const gildedRose = new Shop();

  beforeEach(() => {
    gildedRose.items = [];
  });

  it("should return correct result", () => {
    // The original items passed to the method
    const storeItems = [
      new Item("+5 Dexterity Vest", 10, 20),
      new Item("Aged Brie", 2, 0),
      new Item("Elixir of the Mongoose", 5, 7),
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20)
    ];
    // The result the code returned
    const expectedResult = [
      new Item("+5 Dexterity Vest", 9, 19),
      new Item("Aged Brie", 1, 1),
      new Item("Elixir of the Mongoose", 4, 6),
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 14, 21)
    ];
    gildedRose.items.push(storeItems);
    gildedRose.updateQuality();
    const updateItems = gildedRose.items;
    console.log(gildedRose);
    console.log(gildedRose.items);

    expect(updateItems).toStrictEqual(expectedResult);
  });

  it("not allow an item to have a negative value of quality", () => {
    gildedRose.items.push(new Item("Elixir of the Mongoose", 5, 0));
    gildedRose.updateQuality();
  
    expect(gildedRose.items[0].quality).toBe(0);
  });

  it("should degrade quality 2x faster when SellIn date passes", () => {
    gildedRose.items.push(new Item("Elixir of the Mongoose", 0, 6));
    gildedRose.updateQuality();
    
    expect(gildedRose.items[0].sellIn).toBe(-1);
    expect(gildedRose.items[0].quality).toBe(4);
  });

  it("should increase the quality of Aged Brie over time", () => {
    gildedRose.items.push(new Item("Aged Brie", 2, 0));
    gildedRose.updateQuality();

    expect(gildedRose.items[0].quality).toBe(1);
  });

  it("Aged Brie increases in quality 2x after its SellIn passes", () => {
    gildedRose.items.push(new Item("Aged Brie", 2, 0));
    gildedRose.updateQuality();

    expect(gildedRose.items[0].quality).toBe(1);
  });

  it("should allow a maximum quality of 50", () => {
    gildedRose.items.push(new Item("Aged Brie", 2, 0));
    for (let i = 0; i < 100; i++) {
      gildedRose.updateQuality();
    }

    expect(gildedRose.items[0].quality).toBe(50);
  });

  it("should never decrease the quality of Sulfuras", () => {
    gildedRose.items.push(new Item("Sulfuras, Hand of Ragnaros", 0, 80));
    for (let i = 0; i < 100; i++) {
      gildedRose.updateQuality();
    }

    expect(gildedRose.items[0].quality).toBe(80);
  });

  it("Sulfuras never has to be sold", () => {
    gildedRose.items.push(new Item("Sulfuras, Hand of Ragnaros", 0, 80));
    for (let i = 0; i < 100; i++) {
      gildedRose.updateQuality();
    }

    expect(gildedRose.items[0].sellIn).toBe(0);
  });

  it("Backstage passes increase in Quality by 2 when 5 < SellIn >= 10", () => {
    gildedRose.items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20));
    for (let i = 0; i < 9; i++) {
      gildedRose.updateQuality();
    }
    expect(gildedRose.items[0].sellIn).toBe(6);
    expect(gildedRose.items[0].quality).toBe(33);
  });

  it("Backstage passes increase in Quality by 3 when SellIn <= 5", () => {
    gildedRose.items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20));
    for (let i = 0; i < 15; i++) {
      gildedRose.updateQuality();
    }
    expect(gildedRose.items[0].sellIn).toBe(0);
    expect(gildedRose.items[0].quality).toBe(50);
  });

  it("Backstage passes quality drops to 0 when Sell In = -1", () => {
    gildedRose.items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20));
    gildedRose.updateQuality();
    
    expect(gildedRose.items[0].sellIn).toBe(-1);
    expect(gildedRose.items[0].quality).toBe(0);
  });

  it("Conjured items degrade in quality 2x as normal items", () => {
    gildedRose.items.push(new Item("Conjured Mana Cake", 3, 6));
    gildedRose.updateQuality();
    expect(gildedRose.items[0].sellIn).toBe(2);
    expect(gildedRose.items[0].quality).toBe(4);
  });

  
});
