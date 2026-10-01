const business = {
  name: "Franco Pneus e Motores",
  whatsapp: "5511940691579",
  phoneDisplay: "+55 (11) 94069-1579",
  address: "Av. Ten. Marques, 8000 — Chácara do Solar II (Fazendinha), Santana de Parnaíba — SP, 06530-001",
  hours: "", // PENDENTE
  instagram: "https://www.instagram.com/francocarservice/",
  services: ["Pneus", "Freios", "Transmissão", "Arrefecimento", "Diagnóstico", "Alinhamento e balanceamento", "Reforma de rodas"], // PENDENTE: validar lista antes da publicação.
  tireBrands: [], // PENDENTE: adicionar apenas marcas confirmadas.
  paymentOffer: "", // PENDENTE: preencher somente após confirmação; vazio exibe chamada neutra.
};

export function whatsappLink(message) {
  const number = business.whatsapp.replace(/\D/g, "");
  return number ? `https://wa.me/${number}?text=${encodeURIComponent(message)}` : `https://wa.me/?text=${encodeURIComponent(message)}`;
}

export default business;
