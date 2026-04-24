/**
 * @license
 * SPDX-License-Identifier: MIT
 */

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: "Propulsion" | "Telemetry" | "Systems" | "Fuel";
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CheckoutFormData {
  firstName?: string;
  lastName?: string;
  email?: string;
  emailConfirm?: string;
  phone?: string;
  street1?: string;
  street2?: string;
  city?: string;
  state?: string;
  zip?: string;
  cardType?: string;
  cardNumber?: string;
  expMonth?: string;
  expYear?: string;
  comments?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "ac-1",
    name: "Ion Drive Vanguard MK-IV",
    description: "High-efficiency continuous thrust engine for deep space transport vessels. Features regenerative cooling.",
    price: 4500000.00,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9XD6SM5T7pnQKrh1sF3wyfWZNw-KmFShlVFv_N3y8ln_rCW1DX6v_qho99t9a8oeZ4IqPEq9WhYvmHaPqO39sE8XxFeHkb-ME9BGj9QdjVSWUqgRAyF4nSdQ9wFD6ZJTHrW6rMdwh-ACp_PV6nPfnm3FehekD51Xx1Y9jJmLzkrqdoiP64xgiu19KMc3U4DkYW2zr58-BS5BUOOB4Vr8_O-guT2EpxD1gNvqc3xfvCEFq1gjEnZ6JZqSw-wY5ZBWbizeSu1nDWLM",
    category: "Propulsion"
  },
  {
    id: "ac-2",
    name: "Nova Cluster Booster X-9",
    description: "Heavy-lift first stage cluster capable of lofting 150 metric tons to Low Earth Orbit.",
    price: 18200000.00,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBBnRfZnAssm1Ek2qB2iA_4xsLvZ850T5BStjiwIpdBBs-WPQjS868h_65BhbjdyqJ41YWzoeLv0GBk0TrbkkHbRzl9_MXa_RxMKEhm2Jy9gTDLWsSa_xdiK2qR6xk9c6j-cVeIax2knACnK_SpHZQsCbPYJzam-tC_niQJgYi6zrgdXUwO9_5GPCiCFM_l68stBSa-wTUFP5zbKeLP-rYSiku2GTD8yEdekiKv1XMWkADEX4hUzHsUzIOGtucucUx5tDFj1B5P1wk",
    category: "Propulsion"
  },
  {
    id: "ac-3",
    name: "Hydrazine Flow Regulator valve",
    description: "Precision CNC-machined titanium flow control for hypergolic mixtures.",
    price: 45000.00,
    image: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?q=80&w=800&auto=format&fit=crop",
    category: "Systems"
  },
  {
    id: "ac-4",
    name: "Star-Tracker Sensor Array",
    description: "Multi-band autonomous navigation tracking module.",
    price: 89000.99,
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=800&auto=format&fit=crop",
    category: "Telemetry"
  },
  {
    id: "ac-5",
    name: "Solid Rocket Motor Casing (Carbon)",
    description: "Filament-wound carbon fiber SRM casing. High burst pressure rating.",
    price: 1200000.40,
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=800&auto=format&fit=crop",
    category: "Systems"
  },
  {
    id: "ac-6",
    name: "Cryogenic LOX Tank Liner",
    description: "Thermal acoustic insulation foam specifically graded for liquid oxygen environments.",
    price: 5500.50,
    image: "https://images.unsplash.com/photo-1518364538800-6bae3c2ea0f2?q=80&w=800&auto=format&fit=crop",
    category: "Systems"
  },
  {
    id: "ac-7",
    name: "Orbital Maneuvering Thruster",
    description: "RCS quad-pack thruster for delicate orbital rendezvous.",
    price: 155000.00,
    image: "https://images.unsplash.com/photo-1633519807572-c0cb4b2bfce4?q=80&w=800&auto=format&fit=crop",
    category: "Propulsion"
  },
  {
    id: "ac-8",
    name: "Avionics Flight Computer Core",
    description: "Radiation-hardened triple-redundant logic unit for active guidance.",
    price: 2100000.00,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
    category: "Telemetry"
  }
];
