/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  return knex("recipes")
    .insert({ recipe_name: "Spagetti Bolonex" })
    .then((idList) => {
      return knex("steps")
        .insert([
          {
            step_sequence: 1,
            step_instruction: "Büyük bir tencereyi orta ateşe koyun",
            recipe_id: idList[0],
          },
          {
            step_sequence: 2,
            step_instruction: "1 yemek kaşığı zeytinyağı ekleyin",
            recipe_id: idList[0],
          },
        ])
        .then((stepsIdList) => {
          return knex("contents")
            .insert({
              contents_name: "zeytinyağı",
              amount: 0.014,
            })
            .then((contentIdList) => {
              return knex("contents_steps").insert([
                { contents_id: contentIdList[0], step_id: stepsIdList[0] },
                { contents_id: contentIdList[0], step_id: stepsIdList[1] },
              ]);
            });
        });
    });
};
