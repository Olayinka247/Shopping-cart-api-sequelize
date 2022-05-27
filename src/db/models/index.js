import Review from "./reviews.js";
import Product from "./products.js";
import User from "./user.js";
import Category from "./category.js";
import productCategory from "./productCategory.js";
import Like from "./likes.js";
import Cart from "./cart.js";

Product.hasMany(Review);
Review.belongsTo(Product);

User.hasMany(Review);
Review.belongsTo(User);

Category.belongsToMany(Product, {
  through: { model: productCategory, unique: false },
});
Product.belongsToMany(Category, {
  through: { model: productCategory, unique: false },
});

Product.belongsTo(User);
User.hasMany(Product);

Product.belongsToMany(User, {
  through: { model: Like, unique: false },
  onDelete: "CASCADE",
});

User.belongsToMany(Product, {
  through: { model: Like, unique: false },
  onDelete: "CASCADE",
});

User.hasMany(Cart, { onDelete: "CASCADE" });
Cart.belongsTo(User, { onDelete: "CASCADE" });

Product.hasMany(Cart, { onDelete: "CASCADE" });
Cart.belongsTo(Product, { onDelete: "CASCADE" });

export default { Product, Review, Category, User, productCategory, Like, Cart };
