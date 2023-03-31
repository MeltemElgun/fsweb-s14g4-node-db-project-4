const recipeModel = require("./recipes-model");

const checkRecipeId = async (req, res, next) => {
  try {
    const isExist = await recipeModel.getByIdRecipe(req.params.id);
    if (isExist.length === 0) {
      res
        .status(404)
        .json({ message: `${req.params.id} id'li tarif bulunamadı` });
    } else {
      req.recipe = isExist;
      next();
    }
  } catch (error) {
    next(error);
  }
};
module.exports = { checkRecipeId };
