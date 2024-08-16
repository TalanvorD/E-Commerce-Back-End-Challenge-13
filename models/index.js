// Importing models
const Category = require('./Category');
const Product = require('./Product');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Creates a "has many" relationship between Category and Product.
Category.hasMany(Product,
  {
    foreignKey: 'category_id',
    onDelete: 'CASCADE'
  });

// Creates a "belongs to" relationship between Product and Category.
Product.belongsTo(Category,
  {
    foreignKey: 'category_id',
    onDelete: 'CASCADE'
  });

// Creates a "belongs to many" relationship between Product and Tag through the ProductTag model.
Product.belongsToMany(Tag,
  {
    through: ProductTag,
    foreignKey: 'product_id',
    onDelete: 'CASCADE'
  });

// Creates a "belongs to many" relationship between Tag and Product through the ProductTag model.
Tag.belongsToMany(Product,
  {
    through: ProductTag,
    foreignKey: 'tag_id',
    onDelete: 'CASCADE'
  });

module.exports = { Product, Category, Tag, ProductTag };
