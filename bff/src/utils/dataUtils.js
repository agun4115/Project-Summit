/**
 * Data transformation and filtering utilities
 */

/**
 * Filter product data to include only specified attributes for cart items
 * @param {Object} productData - The full product data object
 * @returns {Object|null} - Filtered product object or null if input is invalid
 */
const filterProductForCart = (productData) => {
  if (!productData) {
    return null;
  }

  return {
    id: productData.id,
    title: productData.title,
    description: productData.description,
    amount: productData.amount,
    amountType: productData.amountType,
    pricePerUnit: productData.pricePerUnit,
    categoryId: productData.categoryId,
    images: productData.images
  };
};

module.exports = {
  filterProductForCart
};
