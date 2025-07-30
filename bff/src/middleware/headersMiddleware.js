/**
 * Simple headers middleware
 */
const addCustomHeaders = (req, res, next) => {
  res.setHeader('X-Service', 'shop-bff');
  res.setHeader('X-Version', '1.0.0');
  next();
};

module.exports = {
  addCustomHeaders
};
