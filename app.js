const catalogue = require('./catalogue');
const rules = require('./rules');

/**
 * Given a list of product SKUs, calculate their total price and apply discount as defined by rules
 *
 * @param {string[]} items      - List of product SKUs
 *
 * @return {number} Discounted price of the all the items
 *
 * @example
 *
 *      total(['mbp', 'ipd', 'vga'])
 */
function total(items = []) {
    const itemsGroupedBySku = items
        .reduce((acc, item) => ({...acc, [item] : (acc[item] || 0) + 1}), {});

    const totalPrice = Object
        .keys(itemsGroupedBySku)
        .reduce((total, sku) => (total + catalogue[sku]['price'] * itemsGroupedBySku[sku]), 0);

    const discount = applyRules({
        catalogue,
        itemsGroupedBySku,
        rules,
    })

    return totalPrice - discount;
}

/**
 *  Given a list of items and their catalogue, apply the rules and calculate the discount amount
 *
 * @param {Object} options                      - See below
 * @param {Object} options.catalogue            - Products listed by SKUs, containing name & price
 * @param {Object} options.itemsGroupedBySku    - All the items grouped by sku, having total count
 * @param {Object[]} options.rules              - Array of rules
 *
 * @return {number} Total discount for rules applied
 */
function applyRules({
    catalogue,
    itemsGroupedBySku,
    rules,
}) {
    return rules
        .reduce((discount, {type, items}) => (
            discount + items
                .reduce((total, item) => {
                    const {sku, dependsOn, qualifyingQnt} = item;
                    const itemCount = itemsGroupedBySku[sku];

                    // If complex rules are to be supported,
                    // this piece of logic can be its own module, something like rule.evaluate()
                    switch (type) {
                        case 'bulk':
                            total += itemCount >= qualifyingQnt
                                ? itemCount * (catalogue[sku].price - item.price)
                                : 0;
                            break;

                        case 'free':
                            total += itemCount && itemsGroupedBySku[dependsOn]
                                ? Math.min(itemsGroupedBySku[dependsOn], itemCount) * catalogue[sku]['price']
                                : 0;
                            break;

                        case 'multiplesOf':
                            total += parseInt((itemCount || 0) / qualifyingQnt)
                                * catalogue[sku]['price'] * (qualifyingQnt - item.billingQnt);
                            break;
                    }

                    return total;
                }, 0)
        ), 0);
}

module.exports = total;