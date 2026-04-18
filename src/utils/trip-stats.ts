interface Day {
  location: string;
  accommodation?: { name: string };
  meals: unknown[];
}

export interface TripStats {
  cities: number;
  nights: number;
  hotels: number;
  restaurants: number;
}

export function computeStats(days: Day[]): TripStats {
  const cities = new Set(days.map(d => d.location)).size;
  const nights = days.length;
  const hotels = new Set(
    days.filter(d => d.accommodation).map(d => d.accommodation!.name)
  ).size;
  const restaurants = days.reduce((sum, d) => sum + d.meals.length, 0);
  return { cities, nights, hotels, restaurants };
}
