const express = require("express");
const Item = require("../models/Item");
const auth = require("../middleware/auth");

const router = express.Router();

// ADD ITEM (Protected)
router.post("/", auth, async (req, res) => {
  try {
    const newItem = new Item({
      ...req.body,
      userId: req.user.id
    });

    await newItem.save();
    res.json(newItem);

  } catch (err) {
    res.status(500).json({ msg: "Error adding item" });
  }
});

// GET ALL ITEMS
router.get("/", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// GET ITEM BY ID
router.get("/:id", async (req, res) => {
  const item = await Item.findById(req.params.id);
  res.json(item);
});

// UPDATE ITEM (Protected)
router.put("/:id", auth, async (req, res) => {
  const updatedItem = await Item.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updatedItem);
});

// DELETE ITEM (Protected)
router.delete("/:id", auth, async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ msg: "Item deleted" });
});

// SEARCH ITEM
router.get("/search/name", async (req, res) => {
  const items = await Item.find({
    itemName: { $regex: req.query.name, $options: "i" }
  });

  res.json(items);
});

module.exports = router;