export interface Coordinator {
  id: string;
  name: string;
  role?: string;
  image: string;
}

export const COORDINATORS: Coordinator[] = [
  {
    id: "m-arshavardhan-reddy",
    name: "M.ARSHAVARDHAN REDDY",
    image: "/images/coordinators/arshavardhan.png",
  },
  {
    id: "kasarla-deekshitha",
    name: "KASARLA DEEKSHITHA",
    image: "/images/coordinators/deekshitha.jpg",
  },
  {
    id: "a-akhil-sai",
    name: "A.AKHIL SAI",
    image: "/images/coordinators/akhil-sai.jpg",
  },
  {
    id: "tirumala-shiva",
    name: "TIRUMALA SHIVA",
    image: "/images/coordinators/shiva.png",
  },
  {
    id: "mandra-srinikesh",
    name: "MANDRA SRINIKESH",
    image: "/images/coordinators/srinikesh.jpg",
  },
];
