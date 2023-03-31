const router = require("express").Router();

const { checkRecipeId } = require("./recipes-middleware");

router.get("/:id", checkRecipeId, (req, res, next) => {
  try {
    res.json(req.recipe);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
