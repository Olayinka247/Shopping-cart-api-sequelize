import Review from "./reviews.js";
import Product from "./products.js";

Product.hasMany(Review);
Review.belongsTo(Product);

export default { Product, Review };
