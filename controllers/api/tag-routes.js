const router = require('express').Router();
const { Tag, Product } = require('../../models');

router.get('/', async (req, res) => { // Find all Tags
  try {
    const tagData = await Tag.findAll({ include: [{ model: Product }] });
    if (!tagData) {
      res.status(404).json({ message: 'No tags found!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => { // Find a single Tag by id
  try {
    const tagData = await Tag.findByPk(req.params.id, { include: [{ model: Product }] });
    if (!tagData) {
      res.status(404).json({ message: 'No products found by that tag id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.post('/', async (req, res) => { // Creates a new Tag
    try {
      const tagData = await Tag.create(req.body);
      res.status(200).json({ message: `New tag: ${tagData.tag_name} successfully created!` });
      }
      catch(err) {
        console.log(err);
        res.status(500).json(err);
      }
});

router.put('/:id', async (req, res) => { // Updates a single Tag by id
  try {
    const tagData = await Tag.update(req.body, { where: {id: req.params.id } } );
    
    if (!tagData) {
      res.status(404).json({ message: 'No tag found by that id!' });
      return;
    }

    res.status(200).json({ message: `${req.body.tag_name} tag has been successfully updated!` });
    } catch(err) {
      console.log(err);
      res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => { // Deletes a single Tag by id
  try {
    const tagName = await Tag.findByPk(req.params.id);
    const tagData = await Tag.destroy({ where: { id: req.params.id } });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found by that id!' });
      return;
    }

    res.status(200).json({ message: `${tagName.tag_name} tag has been successfully deleted.` });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;