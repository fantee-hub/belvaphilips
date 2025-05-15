import { portfolios as originalPortfolios, categories } from ".";

export { categories };

export const shootTypes = {
  CLOTHING: ["FLATLAY", "GHOST", "PINNED", "MODEL", "VIDEO"],
  SHOES: ["MODEL", "CATALOGUE", "VIDEO"],
  BAGS: ["MODEL", "CATALOGUE", "HANGED", "VIDEO"],
  BEAUTY: ["MODEL", "CATALOGUE", "SWATCH", "VIDEO"],
  JEWELRY: ["MODEL", "CATALOGUE", "VIDEO"],
  DRINKS: ["CATALOGUE", "VIDEO"],
};

// Assign shootType and finish to each portfolio item
// const assignShootTypesAndFinishes = () => {
//   const enhancedPortfolios = [...originalPortfolios];

//   return enhancedPortfolios.map((item, index) => {
//     let shootType = "CATALOGUE";
//     let finish = "BASIC END FINISH";

//     switch (item.category) {
//       case "CLOTHING":
//         if (item.details?.toLowerCase().includes("flatlay")) {
//           finish =
//             index % 4 === 0
//               ? "BASIC END FINISH"
//               : index % 4 === 1
//               ? "MEDIUM END FINISH"
//               : index % 4 === 2
//               ? "HIGH END FINISH"
//               : "PREMIUM END FINISH";
//         } else {
//           finish =
//             index % 3 === 0
//               ? "MEDIUM END FINISH"
//               : index % 3 === 1
//               ? "HIGH END FINISH"
//               : "PREMIUM END FINISH";
//         }
//         break;

//       case "BAGS":
//       case "SHOES":
//       case "BEAUTY":
//       case "JEWELRY":
//         finish =
//           index % 3 === 0
//             ? "MEDIUM END FINISH"
//             : index % 3 === 1
//             ? "HIGH END FINISH"
//             : "PREMIUM END FINISH";
//         break;

//       case "DRINKS":
//         finish =
//           index % 4 === 0
//             ? "BASIC END FINISH"
//             : index % 4 === 1
//             ? "MEDIUM END FINISH"
//             : index % 4 === 2
//             ? "HIGH END FINISH"
//             : "PREMIUM END FINISH";
//         break;
//     }

//     return {
//       ...item,
//       shootType,
//       finish,
//     };
//   });
// };

// Export the enhanced portfolios with shoot types and finishes
// export const portfolios = assignShootTypesAndFinishes();

// Helper function to get products by category, shoot type, and finish
export const getProductsByTypeAndShootAndFinish = (
  category: string,
  shootType: string,
  finish: string
) => {
  let filtered = originalPortfolios.filter(
    (item) =>
      item.category === category &&
      item.shootType === shootType &&
      item.finish === finish
  );

  // Fallback: If no items match the finish, try other valid finishes for MODEL
  if (filtered.length === 0 && shootType === "MODEL") {
    filtered = originalPortfolios.filter(
      (item) =>
        item.category === category &&
        item.shootType === shootType &&
        ["MEDIUM END FINISH", "HIGH END FINISH", "PREMIUM END FINISH"].includes(
          item.finish
        )
    );
  }

  // Fallback: If still no items, get any items for the shoot type
  if (filtered.length === 0) {
    filtered = originalPortfolios.filter(
      (item) => item.category === category && item.shootType === shootType
    );
  }

  return filtered;
};

// Helper function to get products by category and shoot type
export const getProductsByTypeAndShoot = (
  category: string,
  shootType: string
) => {
  return originalPortfolios.filter(
    (item) => item.category === category && item.shootType === shootType
  );
};

// Helper function to get the first image for each category
export const getCategoryFirstImage = (category: string) => {
  const product = originalPortfolios.find((item) => item.category === category);
  return product ? product.image : null;
};

// Helper function to get the first image for each shoot type in a category
export const getShootTypeFirstImage = (category: string, shootType: string) => {
  const product = originalPortfolios.find(
    (item) => item.category === category && item.shootType === shootType
  );
  return product ? product.image : null;
};

// Get products by category
export const getProductsByCategory = (category: string) => {
  return originalPortfolios.filter((item) => item.category === category);
};

export const getAvailableFinishes = (category: string, shootType: string) => {
  if (category === "CLOTHING") {
    if (shootType === "FLATLAY") {
      return ["BASIC END FINISH", "MEDIUM END FINISH"];
    } else {
      return ["MEDIUM END FINISH"];
    }
  } else if (category === "JEWELRY") {
    return ["HIGH END FINISH", "PREMIUM END FINISH"];
  } else {
    return [
      "BASIC END FINISH",
      "MEDIUM END FINISH",
      "HIGH END FINISH",
      "PREMIUM END FINISH",
    ];
  }
};

export const isVideoAvailable = (category: string) => {
  return category === "SHOES" || category === "JEWELRY";
};
