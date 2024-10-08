const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// Finds all Products
router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll({ include: [{ model: Tag }, { model: Category }] });
    if (!productData) {
      res.status(404).json({ message: 'No products found!' });
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

// Finds a Product by id
router.get('/:id', async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, { include: [{ model: Tag }, { model: Category }] });
    if (!productData) {
      res.status(404).json({ message: 'No product found by that id!' });
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

// Creates a new Product
router.post('/', async (req, res) => {
  console.log(req);
  Product.create(req.body)
    .then((product) => {
      if (req.body.tagIds.length) { // If Product contains tags, tie them to the ProductTag model
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id, tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// Update Product by id
router.put('/:id', (req, res) => {
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {

        ProductTag.findAll({ // Creates a new filtered list of ProductTags
          where: { product_id: req.params.id }
        }).then((productTags) => {
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          const newProductTags = req.body.tagIds
            .filter((tag_id) => !productTagIds.includes(tag_id))
            .map((tag_id) => {
              return {
                product_id: req.params.id, tag_id,
              };
            });

          // Find ProductTags to remove
          const productTagsToRemove = productTags
            .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
            .map(({ id }) => id);
          // Delets old ProductTag and recreates the ProductTags category
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        });
      }

      return res.json(product);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// Deletes a Product by its id
router.delete('/:id', async (req, res) => {
  try {
    const productName = await Product.findByPk(req.params.id);
    const productData = await Product.destroy({ where: { id: req.params.id } });

    if (!productData) {
      res.status(404).json({ message: 'No product found by that id!' });
      return;
    }

    res.status(200).json({ message: `${productName.product_name} product has been deleted.` });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;