export type ExpertInfo = {
  name: string
  address: string
  lat: number
  lng: number
  phone: string
  email: string
}


export const expertsByZip: Record<string, ExpertInfo[]> = {
  "33602": [
    {
      name: "Alterations World",
      address: "120 Main St, Tampa, FL 33602",
      lat: 27.9506,
      lng: -82.4572,
      phone: "(813) 555-1001",
      email: "alterationsworld@example.com",
    },
    {
      name: "Alterations by Seamstress Lena",
      address: "45 River Ave, Tampa, FL 33602",
      lat: 27.9489,
      lng: -82.4586,
      phone: "(813) 555-1002",
      email: "lena.alterations@example.com",
    },
    {
      name: "Tailor Made Alterations",
      address: "88 Downtown Blvd, Tampa, FL 33602",
      lat: 27.9518,
      lng: -82.4561,
      phone: "(813) 555-1003",
      email: "tailormade@example.com",
    },
    {
      name: "Affordable Sewing Services",
      address: "210 Harbor Rd, Tampa, FL 33602",
      lat: 27.9467,
      lng: -82.4599,
      phone: "(813) 555-1004",
      email: "affordablesewing@example.com",
    },
    {
      name: "Kathleen's Kreations",
      address: "33 Palm St, Tampa, FL 33602",
      lat: 27.9532,
      lng: -82.4553,
      phone: "(813) 555-1005",
      email: "kathleen.kreations@example.com",
    },
  ],

  "33544": [
    {
      name: "Ella's Alterations LLC",
      address: "10 Westview Dr, Wesley Chapel, FL 33544",
      lat: 28.1871,
      lng: -82.3563,
      phone: "(813) 555-2001",
      email: "ellas.alterations@example.com",
    },
    {
      name: "Kim's Tailor Shop",
      address: "55 Oak Ln, Wesley Chapel, FL 33544",
      lat: 28.1862,
      lng: -82.3581,
      phone: "(813) 555-2002",
      email: "kim.tailorshop@example.com",
    },
    {
      name: "Sew Good",
      address: "120 Market St, Wesley Chapel, FL 33544",
      lat: 28.1884,
      lng: -82.3549,
      phone: "(813) 555-2003",
      email: "sewgood@example.com",
    },
    {
      name: "Alexander's Alterations & Tailoring",
      address: "9 Heritage Pkwy, Wesley Chapel, FL 33544",
      lat: 28.1855,
      lng: -82.3592,
      phone: "(813) 555-2004",
      email: "alexanders.tailoring@example.com",
    },
  ],
}