/* Bug Fixed */
/* Boopathy@AlphaSolutions */

async function generateShopId(count) {
    const shopId = `SH${String(count).padStart(3, '0')}`;
    return shopId;
}

module.exports = generateShopId;