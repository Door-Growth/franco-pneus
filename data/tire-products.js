// Temporary product-card catalog shared by the offers carousel and vehicle
// finder. Replace these entries with Franco's confirmed SKUs, sizes, prices,
// availability and photos when that catalog is provided.
export const tireProducts = Array.from({ length: 15 }, (_, index) => {
  const number = String(index + 1).padStart(2, "0");
  return {
    id: `card-${number}`,
    number,
    name: "Pneu para passeio",
    image: "assets/tire-placeholder.webp",
    offerMeasure: "175/60 R13",
    price: null,
    availability: null,
    message: `Olá! Gostaria de consultar o preço do pneu modelo ${number}, medida 175/60 R13.`,
  };
});

// Three compact finder suggestions, kept separate from the 15-card offers
// carousel. The labels describe merchandising positions, not confirmed prices
// or Franco sales rankings; replace them when the store supplies its catalog.
export const finderTireProducts = [
  {
    id: "finder-economical",
    number: "01",
    name: "Pneu para passeio",
    finderLabel: "Sugestão econômica",
    image: "assets/tire-placeholder.webp",
    price: null,
  },
  {
    id: "finder-balanced",
    number: "02",
    name: "Pneu para passeio",
    finderLabel: "Opção equilibrada",
    image: "assets/tire-placeholder.webp",
    price: null,
  },
  {
    id: "finder-popular",
    number: "03",
    name: "Pneu para passeio",
    finderLabel: "Destaque de vendas sugerido",
    image: "assets/tire-placeholder.webp",
    price: null,
  },
];
