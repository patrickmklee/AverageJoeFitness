
const nutrtientTable = {
    1008 : "Calories",
    1004 : "Total fat",
    1005 : "Carbohydrate",
    1003 : "Protein",
    1093 : "Sodium"
};
        
const filters = new Set([1008,1003,1004,1005,1093]);

export const filterNutrients = (foodNutrients) => foodNutrients.filter(({ nutrientId }) => filters.has(nutrientId));
