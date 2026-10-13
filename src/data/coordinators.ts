export interface Coordinator {
  id: string;
  name: string;
  role: string;
  department: string;
  image?: string;
  social?: string;
}

/**
 * EDITABLE COORDINATOR DATA:
 * To add real photos and names:
 * 1. Place coordinator photos in /public/images/coordinators/ (e.g., alex.jpg)
 * 2. Update the `name` and `image` fields below.
 */
export const COORDINATORS: Coordinator[] = [
  {
    id: "coord-1",
    name: "Coordinator 01",
    role: "Lead Coordinator",
    department: "CSE 1",
    image: "/images/coordinators/coord-01.jpg",
  },
  {
    id: "coord-2",
    name: "Coordinator 02",
    role: "Event Management",
    department: "CSE 1",
    image: "/images/coordinators/coord-02.jpg",
  },
  {
    id: "coord-3",
    name: "Coordinator 03",
    role: "Stage & Tech",
    department: "CSE 1",
    image: "/images/coordinators/coord-03.jpg",
  },
  {
    id: "coord-4",
    name: "Coordinator 04",
    role: "Cultural Affairs",
    department: "CSE 1",
    image: "/images/coordinators/coord-04.jpg",
  },
  {
    id: "coord-5",
    name: "Coordinator 05",
    role: "Design & Media",
    department: "CSE 1",
    image: "/images/coordinators/coord-05.jpg",
  },
  {
    id: "coord-6",
    name: "Coordinator 06",
    role: "Hospitality",
    department: "CSE 1",
    image: "/images/coordinators/coord-06.jpg",
  },
  {
    id: "coord-7",
    name: "Coordinator 07",
    role: "Public Relations",
    department: "CSE 1",
    image: "/images/coordinators/coord-07.jpg",
  },
  {
    id: "coord-8",
    name: "Coordinator 08",
    role: "Logistics",
    department: "CSE 1",
    image: "/images/coordinators/coord-08.jpg",
  },
];
