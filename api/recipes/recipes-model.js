/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const db = require("../../data/db-config");

const getContents = async function (step_id) {
  const contents = await db("contents_steps as cs")
    .leftJoin("contents as c", "cs.contents_id", "c.contents_id")
    .select("c.*")
    .where({ step_id });
  return contents;
};

const getByIdRecipe = async function (recipe_id) {
  const recipes = await db("recipes as r")
    .leftJoin("steps as s", "r.recipe_id", "s.recipe_id")
    .leftJoin("contents_steps as cs", "cs.step_id", "s.step_id")
    .leftJoin("contents as c", "c.contents_id", "cs.contents_id")
    .select(
      "r.*",
      "s.step_id",
      "s.step_sequence",
      "s.step_instruction",
      "c.contents_id",
      "c.contents_id",
      "c.amount"
    )
    .where("r.recipe_id", recipe_id);
  if (recipes.length === 0) {
    return [];
  }
  const recipeModel = {
    recipe_id: recipe_id,
    recipe_name: recipes[0].recipe_name,
    recipe_date: recipes[0].recipe_date,
    steps: [],
  };
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    const stepModel = {
      step_id: recipe.step_id,
      step_sequence: recipe.step_sequence,
      step_instruction: recipe.step_instruction,
      contents: [],
    };

    const contents = await getContents(recipe.step_id);
    stepModel.contents = contents;
    recipeModel.steps.push(stepModel);
  }
  return recipeModel;
};

module.exports = {
  getByIdRecipe,
};
