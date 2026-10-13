export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  description?: string;
  venueBadge?: string;
  iconName: 'sparkles' | 'cake' | 'mic' | 'music' | 'disc' | 'heart' | 'gift' | 'utensils';
}

export const SCHEDULE_ITEMS: ScheduleItem[] = [
  {
    id: "sched-1",
    time: "09:30 AM",
    title: "Inauguration",
    description: "The grand ceremonial commencement of AVYRA 2K26. Lighting of the lamp and presidential address.",
    iconName: "sparkles",
    venueBadge: "Venue: E-101 • MGIT",
  },
  {
    id: "sched-2",
    time: "09:40 AM",
    title: "Cake Cutting",
    description: "A sweet celebration uniting seniors and freshers for a momentous beginning.",
    iconName: "cake",
    venueBadge: "Venue: E-101 • MGIT",
  },
  {
    id: "sched-3",
    time: "10:00 AM",
    title: "Speeches",
    description: "Inspiring words of wisdom, encouragement, and stories from our respected guests and seniors.",
    iconName: "mic",
    venueBadge: "Venue: E-101 • MGIT",
  },
  {
    id: "sched-4",
    time: "10:10 AM",
    title: "Dances",
    description: "High-octane energetic choreography, electrifying beats, and synchronized rhythm on stage.",
    iconName: "disc",
    venueBadge: "Venue: E-101 • MGIT",
  },
  {
    id: "sched-5",
    time: "11:30 AM",
    title: "Singing",
    description: "Soulful acoustic melodies, crowd anthems, and musical performances to elevate the energy.",
    iconName: "music",
    venueBadge: "Venue: E-101 • MGIT",
  },
  {
    id: "sched-6",
    time: "11:40 AM",
    title: "Roses Ceremony",
    description: "A heartfelt tradition welcoming every fresher with flowers, warm smiles, and everlasting bonds.",
    iconName: "heart",
    venueBadge: "Venue: E-101 • MGIT",
  },
  {
    id: "sched-7",
    time: "12:25 PM",
    title: "Exciting Gifts for You All",
    description: "Curated surprises and commemorative mementos to make this day truly unforgettable.",
    iconName: "gift",
    venueBadge: "Venue: E-101 • MGIT",
  },
  {
    id: "sched-8",
    time: "Event Day",
    title: "Lunch & Refreshments",
    description: "Lunch and venue details will be updated live on the day of the event.",
    iconName: "utensils",
    venueBadge: "Venue: To be announced on event day",
  },
];
