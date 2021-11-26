class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }
  updateQuality() {
    this.items.forEach((item) => {
      const isSulfuras = item.name == "Sulfuras, Hand of Ragnaros";
      const isBrie = item.name == "Aged Brie";
      const isBackstagePass =
        item.name == "Backstage passes to a TAFKAL80ETC concert";
      const isQualityBiggerThan0 = item.quality > 0;
      const isQualityLessThan50 = item.quality < 50;
      const daysToSellLessThan11 = item.sellIn < 11;
      const daysToSellLessThan6 = item.sellIn < 6;
      const isRegularItem = !isSulfuras && !isBackstagePass && !isBrie;
      // const noDaysToSell = item.sellIn < 0;

      // Sell In only impacts items that are not Sulfuras

      if (!isSulfuras) {
        item.sellIn--;
      }

      if (isRegularItem) {
        if (isQualityBiggerThan0) {
          item.quality--;
          if (item.sellIn < 0) {
            item.quality--;
          }
        }
      } else if (isBackstagePass) {
        item.quality++;
        if (daysToSellLessThan11) {
          item.quality++;
        }
        if (daysToSellLessThan6) {
          item.quality++;
        }
        if (item.sellIn < 0) {
          item.quality = 0;
        }
      } else if (isBrie && isQualityLessThan50) {
        item.quality++;
      }
    });
    return this.items;
  }
}

module.exports = {
  Item,
  Shop,
};
