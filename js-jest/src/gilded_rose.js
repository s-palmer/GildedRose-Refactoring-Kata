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

      // quality loop
      if (!isBrie && !isBackstagePass) {
        if (isQualityBiggerThan0) {
          if (!isSulfuras) {
            item.quality--;
          }
        }
      } else {
        if (isQualityLessThan50) {
          item.quality++;
          if (isBackstagePass) {
            if (daysToSellLessThan11) {
              if (isQualityLessThan50) {
                item.quality++;
              }
            }
            if (daysToSellLessThan6) {
              if (isQualityLessThan50) {
                item.quality++;
              }
            }
          }
        }
      }

      // sellIn loop
      if (!isSulfuras) {
        item.sellIn = item.sellIn - 1;
      }
      if (item.sellIn < 0) {
        if (!isBrie) {
          if (!isBackstagePass) {
            if (isQualityBiggerThan0) {
              if (!isSulfuras) {
                item.quality--;
              }
            }
          } else {
            item.quality = 0;
          }
        } else {
          if (isQualityLessThan50) {
            item.quality++;
          }
        }
      }
    });

    return this.items;
  }
}

module.exports = {
  Item,
  Shop,
};
