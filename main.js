(() => {
  // ---------- Получение переменных пользователя ----------
  // let availableSpins = +availableSpinsElem.textContent || 0;
  // let dealSpins = +dealSpinsElem.textContent || 0;
  const urlParams = new URLSearchParams(window.location.search);
  let availableSpins = +urlParams.get("a") || 0;
  let dealSpins = +urlParams.get("d") || 0;
  const clientId = +urlParams.get("c") || 0;
  const a1 = +urlParams.get("a1") || 10;
  const a2 = +urlParams.get("a2") || 8;
  const a3 = +urlParams.get("a3") || 5;
  const a4 = +urlParams.get("a4") || 1;
  const a5 = +urlParams.get("a5") || 15;
  const a6 = +urlParams.get("a6") || 3;
  const a7 = +urlParams.get("a7") || 10000000000;
  const a8 = +urlParams.get("a8") || 1;

  // список призов
  const prizes = [
    {
      text: "Напечатанный Ежедневник",
      dropChance: a1 > 0 ? 5 : 0,
    },
    {
      text: "Карты для пар",
      dropChance: a2 > 0 ? 8 : 0,
    },
    {
      text: "Скидка 50% на курс «Говорим откровенно»",
      dropChance: a3 > 0 ? 3 : 0,
    },
    {
      text: "Консультация с Джемой",
      dropChance: a4 > 0 ? 1 : 0,
    },
    {
      text: "Доступ в Семью на месяц для вас или вашего друга",
      dropChance: a5 > 0 ? 5 : 0,
    },
    {
      text: "Сертификат в SPA",
      dropChance: a6 > 0 ? 5 : 0,
    },
    {
      text: "Видео про коммуникацию (безлимит)",
      dropChance: 74,
    },
    {
      text: "Офлайн встреча в Москве с Джемой",
      dropChance: a8 > 0 ? 2 : 0,
    },
  ];

  // ---------- DOM элементы ----------
  const phoneElems = document.querySelectorAll(".phone");
  const popupElem = document.querySelector(".popup");
  const popupTextElem = document.querySelector(".popup__text");

  // ---------- Шанс дропа ----------
  function lerp(min, max, value) {
    return (1 - value) * min + value * max;
  }

  function dropPrize(items) {
    const total = items.reduce(
      (accumulator, item) => accumulator + item.dropChance,
      0
    );
    const chance = lerp(0, total, Math.random());

    let current = 0;
    for (let i = 0; i < items.length; i++) {
      item = items[i];

      if (current <= chance && chance < current + item.dropChance) {
        return i;
      }

      current += item.dropChance;
    }

    return current;
  }

  // ---------- Попап----------
  function showPrizePopup(index) {
    popupElem.classList.remove("hide");
    popupTextElem.textContent = prizes[index].text;
  }

  // ---------- Функции обработчиков событий ----------
  let getPrize = false;

  function onPhoneClick(e) {
    if (getPrize) {
      return;
    }
    getPrize = true;

    e.target.classList.add("active");

    const prizeId = dropPrize(prizes);

    setTimeout(() => {
      showPrizePopup(prizeId);

      // отправляем подарок в бота
      fetch(
        "https://chatter.salebot.pro/api/<key>/callback",
        {
          method: "POST",
          body: JSON.stringify({
            message: `${prizeIndex}`,
            client_id: clientId,
          }),
        }
      );
    }, 800);
  }

  // ---------- Обработчики событий ----------
  phoneElems.forEach((el) => {
    el.addEventListener("click", onPhoneClick);
  });
})();
