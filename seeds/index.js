const sequelize = require('../config/connection');
const { Category, Product, ProductTag, Tag } = require('../models');

const categoryData = require('./categorySeeds.json');
const productData = require('./productSeeds.json');
const tagData = require('./tagSeeds.json');
const productTagData = require('./productTagSeeds.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const seedCategories = await Category.bulkCreate(categoryData);

  const seedProducts = await Product.bulkCreate(productData);

  const seedTags = await Tag.bulkCreate(tagData);

  const seedProductTags = await ProductTag.bulkCreate(productTagData);

  process.exit(0);
};

seedDatabase();

module.exports = { seedDatabase } ;