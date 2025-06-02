interface Place {
  name: string;
  code: string;
}

const origins: Place[] = [
  { name: "BANDUNG", code: "BDG" },
  { name: "JAKARTA", code: "JKT" },
  { name: "SURABAYA", code: "SBY" },
  { name: "DENPASAR", code: "DPS" },
  { name: "MALANG", code: "MLG" },
];

const destinations: Place[] = [
  { name: "MEDAN", code: "MDN" },
  { name: "BANJARMASIN", code: "BJM" },
  { name: "PEKANBARU", code: "PKU" },
  { name: "PALEMBANG", code: "PLB" },
  { name: "BALIKPAPAN", code: "BPN" },
];

export type { Place };
export { origins, destinations };
