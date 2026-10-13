export interface Coordinator {
  id: string;
  name: string;
  role: string;
  image?: string;
}

export const COORDINATORS: Coordinator[] = Array.from({ length: 15 }, (_, i) => {
  const num = i + 1 < 10 ? `0${i + 1}` : `${i + 1}`;
  return {
    id: `coord-${num}`,
    name: `Coordinator ${num}`,
    role: "Coordinator",
    image: `/images/coordinators/coord-${num}.jpg`,
  };
});
