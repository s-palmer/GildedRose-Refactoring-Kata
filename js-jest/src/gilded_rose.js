class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const calculateSellInChange = ({ sellIn, name }) => {
  const isSulfuras = name == "Sulfuras, Hand of Ragnaros";

  if (!isSulfuras) return -1;

  return sellIn;
};

const calculateQualityChangeNormalItem = ({ sellIn, quality }) => {
  const isQualityBiggerThan0 = quality > 0;
  const noDaysToSell = sellIn < 0;

  if (isQualityBiggerThan0 && noDaysToSell) return -2;
  if (isQualityBiggerThan0) return -1;

  return 0;
};

const calculateQualityChangeBackstagePass = ({ sellIn, quality }) => {
  const daysToSellLessThan11 = sellIn < 11;
  const daysToSellLessThan6 = sellIn < 6;
  const areNoDaysToSell = sellIn < 0;

  if (areNoDaysToSell) return -quality;
  if (daysToSellLessThan6) return +3;
  if (daysToSellLessThan11) return +2;

  return +1;
};

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach((item) => {
      item.sellIn += calculateSellInChange(item);

      const isBrie = item.name == "Aged Brie";
      const isBackstagePass =
        item.name == "Backstage passes to a TAFKAL80ETC concert";
      const isSulfuras = item.name == "Sulfuras, Hand of Ragnaros";
      const isQualityLessThan50 = item.quality < 50;
      const isRegularItem = !isSulfuras && !isBackstagePass && !isBrie;

      if (isRegularItem) {
        item.quality += calculateQualityChangeNormalItem(item);
      } else if (isBackstagePass) {
        item.quality += calculateQualityChangeBackstagePass(item);
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
