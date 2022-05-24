import Review from "./reviews.js";
import Product from "./product.js";

Product.hasMany(Review);
Review.belongsTo(Product);

export default { Review, Product };
