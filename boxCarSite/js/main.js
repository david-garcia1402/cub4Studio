(function () {
  var header = document.querySelector("[data-header]");
  var toggle = document.querySelector("[data-nav-toggle]");
  var nav = document.querySelector("[data-nav]");
  var form = document.querySelector("[data-form]");
  var status = document.querySelector("[data-form-status]");
  var year = document.querySelector("[data-year]");
  var WHATSAPP = "5547996007788";

  if (year) year.textContent = String(new Date().getFullYear());

  function setMenu(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.querySelector(".sr-only").textContent = open ? "Fechar menu" : "Abrir menu";
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("nav-open", open);
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setMenu(false);
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") setMenu(false);
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 760) setMenu(false);
    });
  }

  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  function hoursState(date) {
    var parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Sao_Paulo",
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23"
    }).formatToParts(date);
    var bag = {};
    parts.forEach(function (part) {
      bag[part.type] = part.value;
    });
    var day = bag.weekday;
    var minutes = Number(bag.hour) * 60 + Number(bag.minute);
    var weekend = day === "Sat" || day === "Sun";
    if (weekend) {
      return { open: false, label: "Fechado agora · abre segunda às 7h30" };
    }
    var morning = minutes >= 7 * 60 + 30 && minutes < 12 * 60;
    var afternoon = minutes >= 13 * 60 + 30 && minutes < 18 * 60;
    if (morning || afternoon) {
      return { open: true, label: "Aberto agora · até " + (morning ? "12h" : "18h") };
    }
    if (minutes >= 12 * 60 && minutes < 13 * 60 + 30) {
      return { open: false, label: "Intervalo de almoço · volta às 13h30" };
    }
    if (minutes < 7 * 60 + 30) {
      return { open: false, label: "Fechado agora · abre hoje às 7h30" };
    }
    if (day === "Fri") {
      return { open: false, label: "Fechado agora · abre segunda às 7h30" };
    }
    return { open: false, label: "Fechado agora · abre amanhã às 7h30" };
  }

  var state = hoursState(new Date());
  document.querySelectorAll("[data-hours-label]").forEach(function (node) {
    node.textContent = state.label;
  });
  document.querySelectorAll("[data-hours-dot]").forEach(function (node) {
    node.classList.toggle("is-open", state.open);
    node.classList.toggle("is-closed", !state.open);
  });

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var nome = form.nome.value.trim();
      var veiculo = form.veiculo.value.trim();
      var servico = form.servico.value.trim();
      var mensagem = form.mensagem.value.trim();

      if (!nome) {
        status.textContent = "Informe seu nome para a oficina saber com quem falar.";
        status.classList.add("is-error");
        form.nome.focus();
        return;
      }

      var lines = [
        "Olá! Vim pelo site da Box Car Service.",
        "Nome: " + nome,
        "Serviço: " + servico
      ];
      if (veiculo) lines.push("Veículo: " + veiculo);
      if (mensagem) lines.push("Mensagem: " + mensagem);

      status.classList.remove("is-error");
      status.textContent = "Abrindo o WhatsApp com a sua mensagem…";
      window.location.href = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(lines.join("\n"));
    });
  }
})();
