export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  description?: string;
  iconName: 'sparkles' | 'cake' | 'mic' | 'music' | 'disc' | 'heart' | 'gift';
}

export const SCHEDULE_ITEMS: ScheduleItem[] = [
  {
    id: "sched-1",
    time: "09:30 AM",
    title: "Inauguration",
    description: "The grand ceremonial commencement of AVYRA 2K26. Lighting of the lamp and opening address.",
    iconName: "sparkles",
  },
  {
    id: "sched-2",
    time: "09:40 AM",
    title: "Cake Cutting",
    description: "A sweet celebration uniting seniors and freshers for a momentous beginning.",
    iconName: "cake",
  },
  {
    id: "sched-3",
    time: "10:00 AM",
    title: "Speeches",
    description: "Inspiring words of wisdom, encouragement, and stories from our respected guests and seniors.",
    iconName: "mic",
  },
  {
    id: "sched-4",
    time: "10:10 AM",
    title: "Dances",
    description: "High-octane energetic choreography, electrifying beats, and synchronized rhythm on stage.",
    iconName: "disc",
  },
  {
    id: "sched-5",
    time: "11:30 AM",
    title: "Singing",
    description: "Soulful acoustic melodies, crowd anthems, and musical performances to elevate the energy.",
    iconName: "music",
  },
  {
    id: "sched-6",
    time: "11:40 AM",
    title: "Rose Ceremony",
    description: "A heartfelt tradition welcoming every fresher with flowers, warm smiles, and everlasting bonds.",
    iconName: "heart",
  },
  {
    id: "sched-7",
    time: "12:25 PM",
    title: "Exciting Gifts for You All",
    description: "Curated surprises and commemorative mementos to make this day truly unforgettable.",
    iconName: "gift",
  },
];
