export type CategoryId = "winter" | "summer" | "monsoon" | "postMonsoon" | "spring" | "aqua" | "fog" | "june" | "july" | "august" | "september" | "october" | "november" | "december";

export type Theme = {
  id: CategoryId;
  name: string;
  imageUrl: string;
  primaryColor: string;
  imagePosition?: string;
};

export const seasonThemes: Record<CategoryId, Theme> = {
  winter: {
    id: "winter",
    name: "Winter",
    // Custom local uploaded snowy mountain resort
    imageUrl: "/january.png",
    primaryColor: "slate",
  },
  spring: {
    id: "spring",
    name: "Spring",
    imageUrl: "https://i.pinimg.com/736x/a6/bf/d7/a6bfd7df18fc53ddd1ada19be5ac266a.jpg",
    primaryColor: "lime",
  },
  summer: {
    id: "summer",
    name: "Summer",
    imageUrl: "https://i.pinimg.com/736x/7e/3c/6c/7e3c6cef58dd6235ac40b4055428b70c.jpg",
    primaryColor: "orange",
  },
  aqua: {
    id: "aqua",
    name: "Aqua",
    imageUrl: "/april.jpg",
    primaryColor: "aqua",
  },
  fog: {
    id: "fog",
    name: "Fog",
    imageUrl: "https://i.pinimg.com/1200x/7e/c0/82/7ec082225592e135c5ca2553b0923cc6.jpg",
    primaryColor: "fog",
  },
  monsoon: {
    id: "monsoon",
    name: "Monsoon",
    imageUrl: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&q=80&w=1200",
    primaryColor: "blue",
  },
  postMonsoon: {
    id: "postMonsoon",
    name: "Post-Monsoon",
    imageUrl: "https://images.unsplash.com/photo-1428366890462-ff4ba59ed082?auto=format&fit=crop&q=80&w=1200",
    primaryColor: "emerald",
  },
  june: {
    id: "june",
    name: "Monsoon",
    imageUrl: "https://i.pinimg.com/1200x/d3/ea/61/d3ea61bca2af8dfba72768bfe49da6e3.jpg",
    primaryColor: "june",
  },
  july: {
    id: "july",
    name: "Rainfall",
    imageUrl: "https://i.pinimg.com/1200x/e5/7d/50/e57d509746579cd54b6cb4c6df97dc5e.jpg",
    primaryColor: "july",
    imagePosition: "object-center",
  },
  august: {
    id: "august",
    name: "Humidity",
    imageUrl: "https://i.pinimg.com/736x/98/d9/6a/98d96ada5e4ad2ce8650b814f87b3f88.jpg", // placeholder as user will set this
    primaryColor: "august",
    imagePosition: "object-center",
  },
  september: {
    id: "september",
    name: "Breeze",
    imageUrl: "https://i.pinimg.com/1200x/32/7b/7a/327b7afaf4a93b97745a8af89b323b7d.jpg",
    primaryColor: "september",
    imagePosition: "object-center",
  },
  october: {
    id: "october",
    name: "Festive",
    imageUrl: "https://i.pinimg.com/736x/93/91/4c/93914c0c495dd7089e64d431e3500516.jpg", // placeholder as user will set this
    primaryColor: "october",
    imagePosition: "object-center",
  },
  november: {
    id: "november",
    name: "Late Autumn",
    imageUrl: "https://i.pinimg.com/1200x/75/c1/e2/75c1e28ab31f77b207be582d15b60070.jpg", // user will provide this
    primaryColor: "november",
    imagePosition: "object-center",
  },
  december: {
    id: "december",
    name: "Cool Breeze",
    imageUrl: "https://i.pinimg.com/1200x/3c/cf/bb/3ccfbbec402dc800b354a9a28d5c9dd0.jpg",
    primaryColor: "december",
    imagePosition: "object-center",
  }
};

export const themes = Object.values(seasonThemes);

export function getThemeForMonth(month: number): Theme {
  // month is 0-indexed (0 = Jan, 11 = Dec)
  if (month === 0) return seasonThemes.winter;
  if (month === 1) return seasonThemes.spring;
  if (month === 2) return seasonThemes.summer;
  if (month === 3) return seasonThemes.aqua;
  if (month === 4) return seasonThemes.fog; // May gets fog
  if (month === 5) return seasonThemes.june;
  if (month === 6) return seasonThemes.july;
  if (month === 7) return seasonThemes.august;
  if (month === 8) return seasonThemes.september;
  if (month === 9) return seasonThemes.october;
  if (month === 10) return seasonThemes.november;
  if (month === 11) return seasonThemes.december;
  return seasonThemes.winter;
}

export const quotesMap: Record<number, string> = {
  0: "Step into January with a bright heart, fresh energy, and endless possibilities ahead.",
  1: "Let your days be filled with warmth, joy, and unstoppable positive energy.",
  2: "Step into brighter days filled with fresh energy, gentle warmth, and blooming happiness.",
  3: "Grow through every moment with positivity, energy, and a spirit full of life.",
  4: "Shine boldly, stay vibrant, and let your energy light up every day.",
  5: "Embrace the warmth, stay active, and fill your days with lively energy.",
  6: "Find joy in every moment and let your energy flow freely with happiness.",
  7: "Stay grounded, refreshed, and let every day bring calm and renewed energy.",
  8: "Slow down, reflect, and move forward with calm strength and clarity.",
  9: "Embrace change with confidence and let your energy evolve beautifully.",
  10: "Be grateful, stay warm in spirit, and carry quiet strength every day.",
  11: "Celebrate the moments, cherish the warmth, and end the year with joy."
};
