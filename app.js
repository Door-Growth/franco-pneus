import business, { whatsappLink } from "./config.js?v=20261001-2";
import { vehicleFitments } from "./data/vehicle-fitments.js?v=20261001";
import { finderTireProducts, tireProducts } from "./data/tire-products.js?v=20261001";

const googleReviews = [
  ["Christopher Xavier", "há 7 meses", "Atendimento excelente, tudo muito bem explicado pelos mecânicos e problema 100% resolvido. Profissionalismo impecável, serviço feito com paciência e muito bem feito!", "user-man-03.webp"],
  ["Julio Faustino", "há 7 meses", "Ótimo lugar e um excelente atendimento!", "user-man-04.webp"],
  ["Luciano Da Silva Barros", "há 7 meses", "Boa tarde! Recebi um excelente atendimento por ótimos profissionais, explicando todos os detalhes. Preço justo foi cobrado e meu carro foi suprido todas as necessidades de manutenções.", "user-man-05.webp"],
  ["JP OLIVEIRA", "há 1 ano", "Ótimo lugar para fazer manutenção em seu carro", "user-man-01.webp"],
  ["Henrique Almeida", "há 2 anos", "Local organizado, com profissionais capacitados, levei mais de um veículo até o local e sempre solucionando o problema com as peças corretas a serem trocados, sempre me trataram do mesmo jeito chegando de Montana, de Saveiro, de bmw etc. preço do mercado, justo! Com qualidade e garantia do mesmo.", "user-man-06.webp"],
  ["Thursão", "há 2 anos", "Melhor preço, atendimento muito bom, eles fazem todo tipo de serviço, recomendo muito", "user-man-07.webp"],
  ["Jonas Queiroz", "há 3 anos", "Atendimento e serviço de qualidade. Não gastei muito e alinhei o carro", "user-man-08.webp"],
  ["Raquelly Lopes Silva", "há 3 anos", "É um local bem organizado, com excelente atendimento, fiquei muito satisfeita.", "user-woman-01.webp"],
  ["Meire Alves", "há 3 anos", "Auto Center Top!! Super recomendo. o Atendimento é agil e os profissionais excelentes.", "user-woman-02.webp"],
  ["Elson Gil", "há 3 anos", "Ótimo atendimento, profissionais atenciosos. Só precisa melhorar o atendimento via WhatsApp, pois demora um pouco pra ter resposta.", "10-elson.webp"],
  ["ana paula brandino", "há 4 anos", "Arrumaram meu carro direitinho, era problema na roda .", "user-woman-03.webp"],
  ["Auto escola NSA", "há 4 anos", "Muito bom", "12-auto-escola.svg"],
  ["Manoel Rosa", "há 6 anos", "Boa gostei", "13-manoel.webp"],
  ["Valter Bolin", "há 6 anos", "Trabalham bem, pechinche bastante.....pois os preços tem muita \"gordura\".", "user-man-02.webp"],
  ["Mirian Baldan", "há 6 anos", "Atendimento excelente", "user-woman-04.webp"],
];
const reviewList = document.querySelector("#google-review-list");
if (reviewList) {
  reviewList.innerHTML = googleReviews.map(([name, date, text, photo]) => `
    <article class="testimonial-card testimonial-slot reveal">
      <div class="google-review-meta"><img class="review-author-photo" src="assets/reviews/${photo}?v=20261002-1" alt="${name === "Auto escola NSA" ? "Avatar institucional" : photo.startsWith("user-") ? "Imagem fornecida pelo cliente" : "Foto ilustrativa"}: ${name}" width="40" height="40" loading="lazy" decoding="async"/><div class="google-review-author"><b>${name}</b><small>${date} · ${name === "Auto escola NSA" ? "perfil institucional" : photo.startsWith("user-") ? "imagem fornecida" : "foto ilustrativa"}</small></div><span class="google-review-brand" aria-label="Google">G</span></div>
      <div class="testimonial-rating-placeholder" aria-label="5 de 5 estrelas">★★★★★ <small>5,0</small></div>
      <p>“${text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;") }”</p>
      <div class="review-source">Avaliação pública · Franco Pneus e Motores</div>
    </article>`).join("");
}
const reviewCarousel = document.querySelector("#google-review-list");
const reviewCount = document.querySelector("#review-count");
const reviewProgress = document.querySelector("#review-progress-fill");
function updateReviewCarousel() {
  if (!reviewCarousel) return;
  const card = reviewCarousel.querySelector(".testimonial-card");
  if (!card) return;
  const step = card.getBoundingClientRect().width + parseFloat(getComputedStyle(reviewCarousel).columnGap || getComputedStyle(reviewCarousel).gap || 0);
  const current = Math.min(googleReviews.length, Math.round(reviewCarousel.scrollLeft / step) + 1);
  if (reviewCount) reviewCount.textContent = `${current} de ${googleReviews.length} avaliações`;
  if (reviewProgress) reviewProgress.style.width = `${current / googleReviews.length * 100}%`;
}
document.querySelector("#review-prev")?.addEventListener("click", () => reviewCarousel?.scrollBy({ left: -(reviewCarousel.querySelector(".testimonial-card")?.getBoundingClientRect().width || 300), behavior: "smooth" }));
document.querySelector("#review-next")?.addEventListener("click", () => reviewCarousel?.scrollBy({ left: reviewCarousel.querySelector(".testimonial-card")?.getBoundingClientRect().width || 300, behavior: "smooth" }));
reviewCarousel?.addEventListener("scroll", updateReviewCarousel, { passive: true });
let reviewDragStart = null;
reviewCarousel?.addEventListener("pointerdown", event => {
  if (event.pointerType === "mouse" && event.button !== 0) return;
  reviewDragStart = { x: event.clientX, scroll: reviewCarousel.scrollLeft };
  reviewCarousel.classList.add("is-dragging");
  reviewCarousel.setPointerCapture(event.pointerId);
});
reviewCarousel?.addEventListener("pointermove", event => {
  if (reviewDragStart) reviewCarousel.scrollLeft = reviewDragStart.scroll - (event.clientX - reviewDragStart.x);
});
const finishReviewDrag = () => { reviewDragStart = null; reviewCarousel?.classList.remove("is-dragging"); };
reviewCarousel?.addEventListener("pointerup", finishReviewDrag);
reviewCarousel?.addEventListener("pointercancel", finishReviewDrag);
window.addEventListener("resize", updateReviewCarousel);
requestAnimationFrame(updateReviewCarousel);

const heroSlides = [
  { image: "assets/hero-tire.webp", label: "Detalhe de pneu e roda automotiva" },
  { image: "assets/hero-driver.webp", label: "Motorista ao volante" },
  { image: "assets/hero-mechanic.webp", label: "Mecânico trabalhando em uma oficina" },
];
const heroImage = document.querySelector(".hero-image");
const heroDots = [...document.querySelectorAll("[data-hero-slide]")];
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
let heroIndex = 0;
let heroTimer;
let heroTransitionTimer;
function showHeroSlide(index) {
  heroIndex = (index + heroSlides.length) % heroSlides.length;
  window.clearTimeout(heroTransitionTimer);
  const applySlide = () => {
    const slide = heroSlides[heroIndex];
    heroImage.style.backgroundImage = `url("${slide.image}")`;
    heroImage.setAttribute("aria-label", slide.label);
    heroDots.forEach((dot, dotIndex) => {
      const active = dotIndex === heroIndex;
      dot.classList.toggle("is-active", active);
      if (active) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });
    heroImage.classList.remove("is-changing");
  };
  if (reducedMotionQuery.matches) {
    applySlide();
    return;
  }
  heroImage.classList.add("is-changing");
  heroTransitionTimer = window.setTimeout(applySlide, 220);
}
function stopHeroTimer() { window.clearInterval(heroTimer); }
function startHeroTimer() {
  stopHeroTimer();
  if (!document.hidden) {
    heroTimer = window.setInterval(() => showHeroSlide(heroIndex + 1), 5000);
  }
}
heroImage.style.backgroundImage = `url("${heroSlides[0].image}")`;
heroImage.setAttribute("aria-label", heroSlides[0].label);
window.setTimeout(() => {
  heroSlides.slice(1).forEach(({ image }) => {
    const preload = new Image();
    preload.decoding = "async";
    preload.src = image;
  });
}, 1200);
document.querySelector("[data-hero-prev]").addEventListener("click", () => { showHeroSlide(heroIndex - 1); startHeroTimer(); });
document.querySelector("[data-hero-next]").addEventListener("click", () => { showHeroSlide(heroIndex + 1); startHeroTimer(); });
heroDots.forEach(dot => dot.addEventListener("click", () => { showHeroSlide(Number(dot.dataset.heroSlide)); startHeroTimer(); }));
document.addEventListener("visibilitychange", startHeroTimer);
if (reducedMotionQuery.addEventListener) reducedMotionQuery.addEventListener("change", startHeroTimer);
else reducedMotionQuery.addListener(startHeroTimer);
startHeroTimer();

// Navegação por arraste/toque da hero, mantendo os controles por clique.
const hero = document.querySelector(".hero");
let heroPointerStart = null;
hero.addEventListener("pointerdown", event => {
  if (event.target.closest("a, button")) return;
  heroPointerStart = { x: event.clientX, y: event.clientY, pointerId: event.pointerId };
});
hero.addEventListener("pointerup", event => {
  if (!heroPointerStart || heroPointerStart.pointerId !== event.pointerId) return;
  const deltaX = event.clientX - heroPointerStart.x;
  const deltaY = event.clientY - heroPointerStart.y;
  heroPointerStart = null;
  if (Math.abs(deltaX) < 55 || Math.abs(deltaX) < Math.abs(deltaY) * 1.25) return;
  showHeroSlide(heroIndex + (deltaX < 0 ? 1 : -1));
  startHeroTimer();
});
hero.addEventListener("pointercancel", () => { heroPointerStart = null; });

const products = tireProducts;
const carousel = document.querySelector("#tire-carousel");
carousel.innerHTML = products.map(({ number, message, image, name, offerMeasure, price }) => `<article class="product-card"><div class="product-image"><img src="${image}" alt="${name}" width="640" height="640" loading="lazy" decoding="async"><span>MODELO ${number}</span></div><div class="product-body"><span class="product-measure">${offerMeasure}</span><h3>${name}</h3><p>Consulte compatibilidade e disponibilidade para o seu veículo.</p><div class="product-price"><span>PREÇO</span><b>${price ?? "A confirmar"}</b></div><a class="button product-cta" data-wa="${message}" href="#contato">Consultar no WhatsApp <span>↗</span></a></div></article>`).join("");

const track = document.querySelector("#tire-carousel");
const countLabel = document.querySelector("#carousel-count");
const progressFill = document.querySelector("#carousel-progress-fill");
function updateCarouselProgress() {
  const card = track.querySelector(".product-card");
  const step = card ? card.getBoundingClientRect().width + 14 : 1;
  const first = Math.min(15, Math.floor(track.scrollLeft / step) + 1);
  const visible = Math.max(1, Math.ceil(track.clientWidth / step));
  countLabel.textContent = `Opções ${first}–${Math.min(15, first + visible - 1)} de 15`;
  progressFill.style.width = `${Math.min(100, ((first - 1) / 14) * 100)}%`;
}
document.querySelector("#tire-prev").addEventListener("click", () => {
  const card = track.querySelector(".product-card");
  track.scrollBy({ left: -(card.getBoundingClientRect().width + 14), behavior: "smooth" });
});
document.querySelector("#tire-next").addEventListener("click", () => {
  const card = track.querySelector(".product-card");
  track.scrollBy({ left: card.getBoundingClientRect().width + 14, behavior: "smooth" });
});
track.addEventListener("scroll", updateCarouselProgress, { passive: true });
window.addEventListener("resize", updateCarouselProgress);
updateCarouselProgress();

// Arraste com mouse; em telas touch, o scroll nativo horizontal continua ativo.
let dragStartX = 0;
let dragScrollStart = 0;
let isDragging = false;
let suppressCardClick = false;
track.addEventListener("pointerdown", event => {
  if (event.button !== 0 || event.target.closest("a, button")) return;
  dragStartX = event.clientX;
  dragScrollStart = track.scrollLeft;
  isDragging = true;
  suppressCardClick = false;
  track.classList.add("is-dragging");
  track.setPointerCapture(event.pointerId);
});
track.addEventListener("pointermove", event => {
  if (!isDragging) return;
  const distance = event.clientX - dragStartX;
  if (Math.abs(distance) > 5) {
    suppressCardClick = true;
    event.preventDefault();
  }
  track.scrollLeft = dragScrollStart - distance;
});
function finishTrackDrag() {
  if (!isDragging) return;
  isDragging = false;
  track.classList.remove("is-dragging");
  if (suppressCardClick) window.setTimeout(() => { suppressCardClick = false; }, 0);
}
track.addEventListener("pointerup", finishTrackDrag);
track.addEventListener("pointercancel", finishTrackDrag);
// Fallback de mouse para navegadores que não encaminham o gesto como PointerEvent.
track.addEventListener("mousedown", event => {
  if (event.button !== 0 || event.target.closest("a, button")) return;
  dragStartX = event.clientX;
  dragScrollStart = track.scrollLeft;
  isDragging = true;
  suppressCardClick = false;
  track.classList.add("is-dragging");
});
window.addEventListener("mousemove", event => {
  if (!isDragging) return;
  const distance = event.clientX - dragStartX;
  if (Math.abs(distance) > 5) suppressCardClick = true;
  track.scrollLeft = dragScrollStart - distance;
});
window.addEventListener("mouseup", finishTrackDrag);
track.addEventListener("click", event => {
  if (!suppressCardClick) return;
  event.preventDefault();
  event.stopPropagation();
}, true);

const services = ["Pneus", "Freios", "Transmissão", "Motor", "Arrefecimento", "Diagnóstico", "Alinhamento e balanceamento", "Reforma de rodas"];
const servicePhotos = ["assets/hero-tire.webp", "assets/service-brakes.webp", "assets/service-transmission.webp", "assets/service-engine.webp", "assets/service-cooling.webp", "assets/service-diagnostics.webp", "assets/hero-tire.webp", "assets/hero-tire.webp"];
const list = document.querySelector("#service-list");
list.innerHTML = services.map((title, index) => `<a class="service-tile" href="#contato" data-bg="${servicePhotos[index]}" data-wa="Olá! Gostaria de saber se a Franco oferece ${title.toLowerCase()}."><span>↗</span><div><small>CONSULTE DISPONIBILIDADE</small><h3>${title}</h3></div></a>`).join("");
const serviceImageObserver = "IntersectionObserver" in window
  ? new IntersectionObserver((entries, observer) => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.style.backgroundImage = `url("${entry.target.dataset.bg}")`;
      observer.unobserve(entry.target);
    }), { rootMargin: "240px 0px" })
  : null;
list.querySelectorAll(".service-tile").forEach(tile => {
  if (serviceImageObserver) serviceImageObserver.observe(tile);
  else tile.style.backgroundImage = `url("${tile.dataset.bg}")`;
});

const waPhone = business.whatsapp.replace(/\D/g, "");
const waButtonMarkup = `<span class="wa-icon wa-image-icon" aria-hidden="true"><img src="assets/whatsapp-logo.webp?v=20261002-1" alt="" width="128" height="128" decoding="async"></span><span class="wa-copy"><strong>Orçamento no WhatsApp</strong><small>RESPOSTA RÁPIDA E SEM COMPROMISSO</small></span>`;
function bindWhatsAppLinks(root = document) {
  root.querySelectorAll("[data-wa]").forEach(link => {
    const message = link.dataset.wa;
    link.href = waPhone ? whatsappLink(message) : `https://wa.me/?text=${encodeURIComponent(message)}`;
    link.target = "_blank";
    link.rel = "noopener";
    if (!link.classList.contains("service-tile")) {
      link.classList.add("whatsapp-cta");
      link.innerHTML = waButtonMarkup;
    }
  });
}
bindWhatsAppLinks();

const fitmentForm = document.querySelector("#fitment-form");
const fitmentMake = document.querySelector("#fitment-make");
const fitmentModel = document.querySelector("#fitment-model");
const fitmentYear = document.querySelector("#fitment-year");
const fitmentVersionWrap = document.querySelector("#fitment-version-wrap");
const fitmentVersion = document.querySelector("#fitment-version");
const fitmentResults = document.querySelector("#fitment-results");
const fitmentResultHeading = document.querySelector("#fitment-result-heading");
const fitmentProductList = document.querySelector("#fitment-product-list");
const fitmentStatus = document.querySelector("#fitment-status");
const fitmentFallback = document.querySelector("#fitment-manual-contact");
const fitmentSubmitButton = fitmentForm?.querySelector('button[type="submit"]');

function safeSourceUrl(value) {
  try { const url = new URL(value); return url.protocol === "https:" ? url.href : "#"; } catch { return "#"; }
}
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
}
function fillSelect(select, placeholder, values) {
  select.innerHTML = `<option value="">${placeholder}</option>${values.map(value => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`).join("")}`;
  select.disabled = values.length === 0;
}

const catalogMakes = ["AGRALE","ALFA ROMEO","ASIA","ASTON MARTIN","AUDI","BENTLEY","BMW","BYD","CADILLAC","CAOA CHANGAN","CAOA CHERY","CAOA EXEED","CHERY","CHEVROLET","CHRYSLER","CITROEN","CROSS LANDER","DAEWOO","DAIHATSU","DENZA","DODGE","DONGFENG","DS","FERRARI","FIAT","FORD","GAC","GEELY","GREAT WALL","HONDA","HYUNDAI","IVECO","JAC","JAECOO","JAGUAR","JEEP","JETOUR","KIA","LAMBORGHINI","LAND ROVER","LEAPMOTOR","LEXUS","LIFAN","MAHINDRA","MASERATI","MAZDA","MCLAREN","MERCEDES","MG","MINI","MITSUBISHI","NETA","NISSAN","OMODA","PEUGEOT","PORSCHE","RAM","RENAULT","RIDDARA","ROLLS ROYCE","SEAT","SERES","SSANGYONG","SUBARU","SUZUKI","TAC","TOYOTA","TROLLER","VOLKSWAGEN","VOLVO","ZEEKR"];
let fitmentCatalogIndex = null;
let fitmentCatalogRecords = new Map();
let fitmentRequestId = 0;
let currentFitmentEntries = [];

async function fetchGzipJson(path) {
  const response = await fetch(path, { cache: "force-cache" });
  if (!response.ok) throw new Error("Não foi possível carregar a base de medidas.");
  if (!("DecompressionStream" in window)) throw new Error("Este navegador não suporta a leitura compactada da base.");
  const stream = new Blob([await response.arrayBuffer()]).stream().pipeThrough(new DecompressionStream("gzip"));
  return JSON.parse(await new Response(stream).text());
}
async function loadFitmentCatalogIndex() {
  if (fitmentCatalogIndex) return fitmentCatalogIndex;
  fitmentCatalogIndex = await fetchGzipJson("./data/vehicle-catalog-index.json.gz?v=20261002-1");
  return fitmentCatalogIndex;
}
async function loadFitmentCatalogMake(make) {
  if (fitmentCatalogRecords.has(make)) return fitmentCatalogRecords.get(make);
  const index = await loadFitmentCatalogIndex();
  const brand = index.brands[make];
  if (!brand) return [];
  const rows = await fetchGzipJson(`./data/vehicle-catalog/${brand.file}?v=20261002-1`);
  const entries = rows.map(row => ({
    make,
    model: row.m,
    year: row.y,
    version: row.v,
    size: row.f,
    rearSize: row.r || "",
    fitmentType: row.c ? "original" : "catalog-reference",
    sourceLabel: row.s,
    sourceUrl: row.u,
  }));
  fitmentCatalogRecords.set(make, entries);
  return entries;
}
function selectedFitments() {
  return currentFitmentEntries;
}
function resetFitmentResults() {
  fitmentResults.hidden = true;
  fitmentStatus.textContent = "";
  currentFitmentEntries = [];
  fillSelect(fitmentVersion, "Escolha a versão ou o aro", []);
  fitmentVersionWrap.hidden = true;
  if (fitmentSubmitButton) fitmentSubmitButton.disabled = true;
}
async function refreshFitmentModels() {
  const requestId = ++fitmentRequestId;
  const make = fitmentMake.value;
  resetFitmentResults();
  fillSelect(fitmentModel, "Carregando modelos…", []);
  fillSelect(fitmentYear, "Selecione o ano", []);
  if (!make) {
    fillSelect(fitmentModel, "Selecione o modelo", []);
    return;
  }
  fitmentStatus.textContent = "Carregando modelos…";
  try {
    const index = await loadFitmentCatalogIndex();
    if (requestId !== fitmentRequestId || make !== fitmentMake.value) return;
    const catalogModels = (index.brands[make]?.models || []).map(item => item.name);
    const savedModels = vehicleFitments.filter(item => item.make === make).map(item => item.model);
    const models = [...new Set([...catalogModels, ...savedModels])].sort((a, b) => a.localeCompare(b, "pt-BR"));
    fillSelect(fitmentModel, "Selecione o modelo", models);
    fitmentStatus.textContent = "";
  } catch (error) {
    fillSelect(fitmentModel, "Base temporariamente indisponível", []);
    fitmentStatus.textContent = "Não foi possível carregar os modelos agora. Tente novamente ou fale com a Franco.";
  }
}
function refreshFitmentYears() {
  ++fitmentRequestId;
  const make = fitmentMake.value;
  const model = fitmentModel.value;
  resetFitmentResults();
  if (!make || !model) {
    fillSelect(fitmentYear, "Selecione o ano", []);
    return;
  }
  const indexedModel = fitmentCatalogIndex?.brands[make]?.models.find(item => item.name === model);
  const catalogYears = indexedModel?.years || [];
  const savedYears = vehicleFitments.filter(item => item.make === make && item.model === model).map(item => Number(item.year));
  const years = [...new Set([...catalogYears, ...savedYears])].sort((a, b) => b - a).map(String);
  fillSelect(fitmentYear, "Selecione o ano", years);
}
async function refreshFitmentVersions() {
  const requestId = ++fitmentRequestId;
  const make = fitmentMake.value;
  const model = fitmentModel.value;
  const year = fitmentYear.value;
  resetFitmentResults();
  if (!make || !model || !year) return;
  fitmentStatus.textContent = "Carregando medidas…";
  try {
    const catalogEntries = await loadFitmentCatalogMake(make);
    if (requestId !== fitmentRequestId || make !== fitmentMake.value || model !== fitmentModel.value || year !== fitmentYear.value) return;
    const savedEntries = vehicleFitments.filter(item => item.make === make && item.model === model && String(item.year) === year);
    const selectedEntries = [
      ...savedEntries,
      ...catalogEntries.filter(item => item.model === model && String(item.year) === year),
    ];
    const byConfiguration = new Map();
    for (const entry of selectedEntries) {
      const key = [entry.make, entry.model, entry.year, entry.version, entry.size, entry.rearSize || ""].join("|").toLocaleLowerCase("pt-BR");
      const previous = byConfiguration.get(key);
      if (!previous || (entry.fitmentType === "original" && previous.fitmentType !== "original")) byConfiguration.set(key, entry);
    }
    currentFitmentEntries = [...byConfiguration.values()];
    if (!currentFitmentEntries.length) {
      fitmentStatus.textContent = "Não encontramos essa combinação na base. Fale com a Franco para confirmar a medida.";
      return;
    }
    const distinctOptions = currentFitmentEntries.length > 1;
    fitmentVersionWrap.hidden = !distinctOptions;
    fitmentVersion.required = distinctOptions;
    fitmentVersion.disabled = !distinctOptions;
    fitmentSubmitButton.disabled = false;
    if (distinctOptions) {
      const options = currentFitmentEntries.map((entry, index) => {
        const axes = entry.rearSize ? ` — dianteira ${entry.size}, traseira ${entry.rearSize}` : ` — ${entry.size}`;
        return `<option value="${index}">${escapeHtml(`${entry.version}${axes}`)}</option>`;
      });
      fitmentVersion.innerHTML = `<option value="">Escolha a versão ou o aro</option>${options.join("")}`;
    } else {
      fillSelect(fitmentVersion, "Escolha a versão ou o aro", []);
    }
    fitmentStatus.textContent = "";
  } catch (error) {
    currentFitmentEntries = [];
    fitmentStatus.textContent = "Não foi possível carregar as medidas agora. Tente novamente ou fale com a Franco.";
  }
}

if (fitmentForm && vehicleFitments.length) {
  fillSelect(fitmentMake, "Selecione a montadora", [...new Set([...catalogMakes, ...vehicleFitments.map(item => item.make)])].sort((a, b) => a.localeCompare(b, "pt-BR")));
  fitmentSubmitButton.disabled = true;
  fitmentMake.addEventListener("change", () => { void refreshFitmentModels(); });
  fitmentModel.addEventListener("change", refreshFitmentYears);
  fitmentYear.addEventListener("change", () => { void refreshFitmentVersions(); });
  // Permite arrastar os resultados com mouse ou dedo, mantendo o scroll vertical da página.
  let fitmentDrag = null;
  let suppressFitmentClick = false;
  fitmentProductList.addEventListener("pointerdown", event => {
    if (!event.isPrimary || (event.pointerType === "mouse" && event.button !== 0) || event.target.closest("a, button")) return;
    fitmentDrag = { pointerId: event.pointerId, x: event.clientX, scrollLeft: fitmentProductList.scrollLeft, moved: false };
    suppressFitmentClick = false;
    fitmentProductList.classList.add("is-dragging");
    fitmentProductList.setPointerCapture(event.pointerId);
  });
  fitmentProductList.addEventListener("pointermove", event => {
    if (!fitmentDrag || fitmentDrag.pointerId !== event.pointerId) return;
    const distance = event.clientX - fitmentDrag.x;
    if (Math.abs(distance) > 5) {
      fitmentDrag.moved = true;
      event.preventDefault();
    }
    fitmentProductList.scrollLeft = fitmentDrag.scrollLeft - distance;
  });
  const finishFitmentDrag = event => {
    if (!fitmentDrag || (event?.pointerId != null && fitmentDrag.pointerId !== event.pointerId)) return;
    const moved = fitmentDrag.moved;
    fitmentDrag = null;
    fitmentProductList.classList.remove("is-dragging");
    if (moved) {
      suppressFitmentClick = true;
      window.setTimeout(() => { suppressFitmentClick = false; }, 0);
    }
  };
  fitmentProductList.addEventListener("pointerup", finishFitmentDrag);
  fitmentProductList.addEventListener("pointercancel", finishFitmentDrag);
  fitmentProductList.addEventListener("click", event => {
    if (!suppressFitmentClick) return;
    event.preventDefault();
    event.stopPropagation();
  }, true);

  const scrollFitmentProducts = direction => {
    const card = fitmentProductList.querySelector(".product-card");
    if (card) fitmentProductList.scrollBy({ left: direction * (card.getBoundingClientRect().width + 14), behavior: "smooth" });
  };
  document.querySelector("#fitment-prev")?.addEventListener("click", () => scrollFitmentProducts(-1));
  document.querySelector("#fitment-next")?.addEventListener("click", () => scrollFitmentProducts(1));

  fitmentForm.addEventListener("submit", event => {
    event.preventDefault();
    const entries = selectedFitments();
    if (!entries.length) {
      fitmentStatus.textContent = "Não encontramos essa combinação na base. Fale com a Franco para confirmar a medida.";
      fitmentResults.hidden = true;
      return;
    }
    let selected = entries;
    if (entries.length > 1) {
      const optionIndex = Number(fitmentVersion.value);
      if (!Number.isInteger(optionIndex) || !entries[optionIndex]) {
        fitmentStatus.textContent = "Escolha a versão ou o aro para consultar a medida correta.";
        fitmentVersion.focus();
        return;
      }
      selected = [entries[optionIndex]];
    }
    const fitment = selected[0];
    const vehicleName = `${fitment.make} ${fitment.model} ${fitment.year}`;
    const isVerifiedOriginal = fitment.fitmentType === "original";
    const measureLabel = fitment.fitmentType === "optional-factory" ? "OPÇÃO DE FÁBRICA" : isVerifiedOriginal ? "MEDIDA ORIGINAL DE FÁBRICA" : "MEDIDA DE REFERÊNCIA · CATÁLOGO DE REPOSIÇÃO";
    const measureDetail = fitment.rearSize ? `Dianteira ${fitment.size} · Traseira ${fitment.rearSize}` : "";
    const confidenceNote = isVerifiedOriginal
      ? "Medida indicada em manual do fabricante. Confirme a configuração e a etiqueta do veículo."
      : fitment.fitmentType === "optional-factory"
        ? "Opção listada para esta configuração. Confirme aro e versão no veículo."
        : "Aplicação listada em catálogo de reposição; confirme a medida na etiqueta do veículo ou com a equipe.";
    const axisMessage = fitment.rearSize ? `dianteira ${fitment.size} e traseira ${fitment.rearSize}` : fitment.size;
    fitmentResultHeading.innerHTML = `<div><p class="eyebrow dark"><span></span> MEDIDA ENCONTRADA</p><h3>${escapeHtml(vehicleName)}</h3><p class="fitment-version-label">${escapeHtml(fitment.version)}</p></div><div class="fitment-measure"><span>${measureLabel}</span><strong>${escapeHtml(fitment.size)}</strong>${measureDetail ? `<small class="fitment-measure-axes">${escapeHtml(measureDetail)}</small>` : ""}</div><p class="fitment-result-note">${confidenceNote}</p><a class="fitment-source" href="${escapeHtml(safeSourceUrl(fitment.sourceUrl))}" target="_blank" rel="noopener">Fonte: ${escapeHtml(fitment.sourceLabel || "Base de referência")} ↗</a>`;
    fitmentProductList.innerHTML = finderTireProducts.map(({ number, image, name, finderLabel, price }) => {
      const message = `Olá! Tenho um ${vehicleName}, versão ${fitment.version}. No localizador encontrei a medida ${axisMessage} (${isVerifiedOriginal ? "confirmada em manual" : "referência de catálogo a confirmar"}). Gostaria de consultar a opção ${finderLabel}, modelo ${number}, preço e disponibilidade.`;
      const productMeasure = fitment.rearSize ? `${fitment.size} / ${fitment.rearSize}` : fitment.size;
      return `<article class="product-card"><div class="product-image"><img src="${escapeHtml(image)}" alt="${escapeHtml(name)}" width="640" height="640" loading="lazy" decoding="async"><span>MODELO ${number}</span></div><div class="product-body"><span class="product-measure">${escapeHtml(productMeasure)}</span><small class="finder-product-label">${escapeHtml(finderLabel)}</small><h3>${escapeHtml(name)}</h3><p>Consulte preço, compatibilidade e disponibilidade com a equipe.</p><div class="product-price"><span>PREÇO</span><b>${price ?? "A confirmar"}</b></div><a class="button product-cta" data-wa="${escapeHtml(message)}" href="#contato">Consultar no WhatsApp <span>↗</span></a></div></article>`;
    }).join("");
    bindWhatsAppLinks(fitmentProductList);
    fitmentResults.hidden = false;
    fitmentStatus.textContent = "";
    fitmentResults.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });

  fitmentFallback?.addEventListener("click", event => {
    event.preventDefault();
    const details = [fitmentMake.value, fitmentModel.value, fitmentYear.value].filter(Boolean).join(" ");
    const message = details
      ? `Olá! Não encontrei a versão do meu veículo no localizador. Meu carro é ${details}. Podem me ajudar a confirmar a medida?`
      : "Olá! Não encontrei meu veículo no localizador de pneus. Podem me ajudar a confirmar a medida?";
    window.open(whatsappLink(message), "_blank", "noopener");
  });
}

const floatingWhatsApp = document.querySelector(".whatsapp-float");
if (floatingWhatsApp) {
  floatingWhatsApp.innerHTML = `<span class="wa-icon wa-image-icon" aria-hidden="true"><img src="assets/whatsapp-logo.webp?v=20261001-1" alt="" width="256" height="256" decoding="async"></span>`;
  floatingWhatsApp.setAttribute("aria-label", "Chamar no WhatsApp");
}

document.querySelector("#phone-display").textContent = business.whatsapp ? business.phoneDisplay : "WhatsApp a confirmar";
document.querySelector("#address-display").textContent = business.address || "Confirme com a Franco";
const instagramFooter = document.querySelector("#instagram-footer");
if (instagramFooter) instagramFooter.href = business.instagram;
document.querySelector("#year").textContent = new Date().getFullYear();

const counterObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if (!entry.isIntersecting) return;
  entry.target.querySelectorAll("[data-target]").forEach(counter => {
    const target = Number(counter.dataset.target);
    const suffix = counter.dataset.suffix || "";
    const startTime = performance.now();
    const duration = 5000;
    const numberFormat = new Intl.NumberFormat("pt-BR");
    let lastUpdate = startTime;
    const tick = now => {
      const progress = Math.min(1, (now - startTime) / duration);
      if (now - lastUpdate >= 40 || progress === 1) {
        counter.textContent = `${numberFormat.format(Math.round(target * progress))}${suffix}`;
        lastUpdate = now;
      }
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
  counterObserver.unobserve(entry.target);
}), { threshold: 0.4 });
const statsGrid = document.querySelector(".stats-grid");
if (statsGrid) counterObserver.observe(statsGrid);

const siteHeader = document.querySelector(".site-header");
const updateHeaderState = () => siteHeader.classList.toggle("is-scrolled", window.scrollY > 18);
window.addEventListener("scroll", updateHeaderState, { passive: true });
updateHeaderState();

const menu = document.querySelector(".menu-toggle");
const nav = document.querySelector("#main-nav");
menu.addEventListener("click", () => {
  const open = menu.getAttribute("aria-expanded") === "true";
  menu.setAttribute("aria-expanded", String(!open));
  nav.classList.toggle("is-open", !open);
  document.body.classList.toggle("menu-open", !open);
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  menu.setAttribute("aria-expanded", "false");
  nav.classList.remove("is-open");
  document.body.classList.remove("menu-open");
}));

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) {
    entry.target.classList.add("is-visible");
    observer.unobserve(entry.target);
  }
}), { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

