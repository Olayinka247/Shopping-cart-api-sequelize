import Review from "./reviews.js";
import Product from "./products.js";
import User from "./user.js";
import Category from "./category.js";
// import productCategory from "./productCategory.js";

Product.hasMany(Review);
Review.belongsTo(Product);

// User.hasMany(Review);
// Review.belongsTo(User);

// Category.belongsToMany(Product, {
//   through: { model: productCategory, unique: false },
// });
// Product.belongsToMany(Category, {
//   through: { model: productCategory, unique: false },
// });

export default { Product, Review, Category, User };
