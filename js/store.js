"use strict";
// Демо-кошик без платежів та передавання даних. Кількості зберігаються лише на цій сторінці.
const products = [
  { name: "Вечір у компанії", price: 890 },
  { name: "Час разом", price: 740 },
  { name: "Вдалий подарунок", price: 1090 },
];
let quantities = products.map(() => 0);
const money = (amount) => `${new Intl.NumberFormat("uk-UA").format(amount)} ₴`;
function renderCart() {
  const count = quantities.reduce((a, b) => a + b, 0);
  document.querySelector("#cart-count").textContent = count;
  document
    .querySelector("#cart-link")
    .setAttribute("aria-label", `Кошик: ${count} товарів`);
  document.querySelector("#clear-cart").disabled = count === 0;
  const list = document.querySelector("#cart-items");
  list.replaceChildren();
  if (!count) {
    const empty = document.createElement("li");
    empty.textContent = "Кошик порожній. Обери гру в каталозі.";
    list.append(empty);
  }
  quantities.forEach((quantity, id) => {
    if (!quantity) return;
    const item = document.createElement("li");
    item.className =
      "flex flex-wrap items-center justify-between gap-3 rounded-control bg-white p-4";
    const label = document.createElement("span");
    label.textContent = `${products[id].name} × ${quantity} — ${money(products[id].price * quantity)}`;
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className =
      "min-h-12 rounded-control border border-line px-4 font-semibold hover:bg-sage";
    remove.textContent = "Забрати одну";
    remove.setAttribute("aria-label", `Забрати одну гру ${products[id].name}`);
    remove.addEventListener("click", () => {
      quantities[id]--;
      renderCart();
      document.querySelector("#cart-status").textContent =
        `Забрано одну гру ${products[id].name}`;
      // Відновити фокус після перебудови списку.
      const target =
        list.querySelector("button") || document.querySelector("#cart-link");
      target.focus({ preventScroll: true });
    });
    item.append(label, remove);
    list.append(item);
  });
  document.querySelector("#cart-total").textContent = money(
    quantities.reduce((total, q, i) => total + q * products[i].price, 0),
  );
}
document.querySelectorAll("[data-add]").forEach((button) => {
  button.addEventListener("click", () => {
    const id = Number(button.dataset.add);
    quantities[id]++;
    renderCart();
    document.querySelector("#cart-status").textContent =
      `Додано ${products[id].name}. У кошику ${quantities.reduce((a, b) => a + b, 0)} товарів.`;
  });
});
document.querySelector("#clear-cart").addEventListener("click", () => {
  quantities = products.map(() => 0);
  renderCart();
  document.querySelector("#cart-link").focus({ preventScroll: true });
  document.querySelector("#cart-status").textContent = "Кошик очищено";
});
function searchProducts() {
  const query = document.querySelector("#search").value.trim().toLocaleLowerCase("uk");
  let count = 0;
  document.querySelectorAll("[data-product]").forEach((card) => {
    const match = card.textContent.toLocaleLowerCase("uk").includes(query);
    card.hidden = !match;
    if (match) count++;
  });
  document.querySelector("#search-status").textContent = count
    ? `Знайдено ігор: ${count}`
    : "Нічого не знайдено. Спробуй іншу назву або формат.";
}
document.querySelector("#search").addEventListener("input", searchProducts);
document.querySelector("#search-form").addEventListener("submit", (event) => {
  event.preventDefault();
  searchProducts();
  document
    .querySelector("#catalog")
    .scrollIntoView({
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
});
const menu = document.querySelector("header details");
menu.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    menu.open = false;
  }),
);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menu.open) {
    menu.open = false;
    menu.querySelector("summary").focus();
  }
});
