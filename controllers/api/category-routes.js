const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', async (req, res) => { // Find all Categories
  try {
    const categoryData = await Category.findAll({ include: [{ model: Product }] });
    if (!categoryData) {
      res.status(404).json({ message: 'No categories found!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => { // Find one Category by id
  try {
    const categoryData = await Category.findByPk(req.params.id, { include: [{ model: Product }] });
    if (!categoryData) {
      res.status(404).json({ message: 'No category found by that id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.post('/', async (req, res) => { // Creates a new Category
    try {
      const categoryData = await Category.create(req.body);
      res.status(200).json({ message: `New category: ${categoryData.category_name} successfully created!` });
      }
      catch(err) {
        console.log(err);
        res.status(500).json(err);
      }
});

router.put('/:id', async (req, res) => { // Updates a single Category by id
  try {
    const categoryData = await Category.update(req.body, { where: {id: req.params.id } } );
    
    if (!categoryData) {
      res.status(404).json({ message: 'No category found by that id!' });
      return;
    }

    res.status(200).json({ message: `${req.body.category_name} category has been successfully updated!` });
    } catch(err) {
      console.log(err);
      res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => { // Deletes a single Category by id
  // delete a category by its `id` value
  try {
    const categoryName = await Category.findByPk(req.params.id);
    const categoryData = await Category.destroy({ where: { id: req.params.id } });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found by that id!' });
      return;
    }

    res.status(200).json({ message: `${categoryName.category_name} category has been successfully deleted.` });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
