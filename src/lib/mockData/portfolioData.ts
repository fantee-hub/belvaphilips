import { portfolios as originalPortfolios, categories } from ".";

export { categories };

export const shootTypes = {
  CLOTHING: ["FLATLAY", "GHOST", "PINNED", "MODEL", "VIDEO"],
  SHOES: ["MODEL", "CATALOGUE", "VIDEO"],
  BAGS: ["MODEL", "CATALOGUE", "HANGED", "VIDEO"],
  BEAUTY: ["MODEL", "CATALOGUE", "SWATCH", "VIDEO"],
  JEWELY: ["MODEL", "CATALOGUE", "VIDEO"],
  DRINKS: ["CATALOGUE", "VIDEO"],
};

// Assign shootType to each portfolio item
const assignShootTypes = () => {
  // Copy original portfolios to avoid mutating them
  const enhancedPortfolios = [...originalPortfolios];

  // For each portfolio item, assign a shoot type based on its category and some heuristics
  return enhancedPortfolios.map((item) => {
    // Default shoot type
    let shootType = "CATALOGUE"; // Default fallback

    // Assign shoot types based on category and some pattern matching in details or title
    switch (item.category) {
      case "CLOTHING":
        if (item.details?.toLowerCase().includes("flatlay")) {
          shootType = "FLATLAY";
        } else if (
          item.title?.toLowerCase().includes("shirt") ||
          item.id % 5 === 0
        ) {
          shootType = "GHOST";
        } else if (item.id % 4 === 0) {
          shootType = "PINNED";
        } else if (item.id % 3 === 0) {
          shootType = "MODEL";
        } else if (item.id % 7 === 0) {
          shootType = "VIDEO";
        } else {
          shootType = "FLATLAY"; // Default for clothing
        }
        break;

      case "BAGS":
        if (item.id % 4 === 0) {
          shootType = "MODEL";
        } else if (item.id % 3 === 0) {
          shootType = "HANGED";
        } else if (item.id % 7 === 0) {
          shootType = "VIDEO";
        } else {
          shootType = "CATALOGUE";
        }
        break;

      case "SHOES":
        if (item.id % 3 === 0) {
          shootType = "MODEL";
        } else if (item.id % 7 === 0) {
          shootType = "VIDEO";
        } else {
          shootType = "CATALOGUE";
        }
        break;

      case "BEAUTY":
        if (item.title?.toLowerCase().includes("model") || item.id % 3 === 0) {
          shootType = "MODEL";
        } else if (
          item.title?.toLowerCase().includes("swatch") ||
          item.id % 4 === 0
        ) {
          shootType = "SWATCH";
        } else if (item.id % 7 === 0) {
          shootType = "VIDEO";
        } else {
          shootType = "CATALOGUE";
        }
        break;

      case "JEWELY":
        if (
          item.id % 3 === 0 ||
          item.details?.toLowerCase().includes("model")
        ) {
          shootType = "MODEL";
        } else if (item.id % 7 === 0) {
          shootType = "VIDEO";
        } else {
          shootType = "CATALOGUE";
        }
        break;

      case "DRINKS":
        if (item.id % 7 === 0) {
          shootType = "VIDEO";
        } else {
          shootType = "CATALOGUE";
        }
        break;
    }

    return {
      ...item,
      shootType,
    };
  });
};

// Export the enhanced portfolios with shoot types
export const portfolios = assignShootTypes();

// Helper function to get products by category and shoot type
export const getProductsByTypeAndShoot = (
  category: string,
  shootType: string
) => {
  return portfolios.filter(
    (item) => item.category === category && item.shootType === shootType
  );
};

// Helper function to get the first image for each category
export const getCategoryFirstImage = (category: string) => {
  const product = portfolios.find((item) => item.category === category);
  return product ? product.image : null;
};

// Helper function to get the first image for each shoot type in a category
export const getShootTypeFirstImage = (category: string, shootType: string) => {
  const product = portfolios.find(
    (item) => item.category === category && item.shootType === shootType
  );
  return product ? product.image : null;
};

// Get products by category
export const getProductsByCategory = (category: string) => {
  return portfolios.filter((item) => item.category === category);
};
