"use strict";
const quizForm = document.querySelector("#quiz-form");
quizForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!quizForm.reportValidity()) return;
  const players = Number(document.querySelector("#players").value);
  const minutes = Number(document.querySelector("#minutes").value);
  const occasion = document.querySelector("#occasion").value;
  // Спочатку обмеження кількості гравців, потім сценарій; пояснення показує обмеження часу.
  const id =
    players > 4 && (players > 5 || occasion !== "gift")
      ? 0
      : occasion === "gift"
        ? 2
        : occasion === "family" || players === 2
          ? 1
          : 0;
  const options = [
    {
      name: "Вечір у компанії",
      anchor: "#game-one",
      duration: "30–45 хвилин",
      min: 30,
      max: 45,
    },
    {
      name: "Час разом",
      anchor: "#game-two",
      duration: "20–40 хвилин",
      min: 20,
      max: 40,
    },
    {
      name: "Вдалий подарунок",
      anchor: "#game-three",
      duration: "30–60 хвилин",
      min: 30,
      max: 60,
    },
  ];
  const selected = options[id];
  document.querySelector("#quiz-result-title").textContent = selected.name;
  document.querySelector("#quiz-reason").textContent =
    `Цей формат підходить для обраної кількості гравців (${players}) та сценарію. Орієнтовна партія: ${selected.duration}. ${minutes < selected.max ? "Важливо: партія може тривати довше обраного часу; перевір тривалість перед вибором." : "Обраного часу достатньо для звичайної партії."} Це демонстраційна рекомендація, а не оцінка реального товару.`;
  const search = document.querySelector("#search");
  search.value = "";
  search.dispatchEvent(new Event("input"));
  document.querySelector("#quiz-link").href = selected.anchor;
  document.querySelector("#quiz-result").hidden = false;
  document.querySelector("#quiz-result-title").focus({ preventScroll: true });
});
