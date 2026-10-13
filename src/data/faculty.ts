export interface FacultyMember {
  id: string;
  name: string;
  role: string;
  department?: string;
  image: string;
}

export const FACULTY_MEMBERS: FacultyMember[] = [
  {
    id: "fac-1",
    name: "Prof. G. ChandraMohan Reddy",
    role: "Respected Principal",
    department: "Mahatma Gandhi Institute of Technology",
    image: "/images/faculty/principal.jpg",
  },
  {
    id: "fac-2",
    name: "Prof. T. V. Rajini Kanth",
    role: "Honourable HOD",
    department: "Department of Computer Science & Engineering",
    image: "/images/faculty/hod.jpg",
  },
  {
    id: "fac-3",
    name: "R. Mohan Krishna",
    role: "Beloved Faculty Coordinator",
    department: "Department of Computer Science & Engineering",
    image: "/images/faculty/coordinator.jpg",
  },
];
