/* Flow Forge — landscaping template behaviour.
   Three pieces: the annotation layer on the hero drawing, the month strip
   (which opens on whatever month it actually is), and the estimator, which
   reads the same rate figures as the price table so the two can never
   disagree after the client edits one of them in /admin. */

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* -------------------------------------------------- hero drawing sheet --- */

const annotations = document.querySelectorAll(".ann");

function showAnnotations() {
  annotations.forEach((note) => note.classList.add("is-in"));
}

if (annotations.length) {
  if (reduceMotion || !("IntersectionObserver" in window)) {
    showAnnotations();
  } else {
    const sheetWatch = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          showAnnotations();
          observer.disconnect();
        });
      },
      { threshold: 0.25 }
    );

    sheetWatch.observe(document.getElementById("sheet"));
  }
}

/* ------------------------------------------------------- the year strip --- */

const months = Array.from(document.querySelectorAll(".month"));
const yearStrip = document.querySelector(".year__strip");
const yearMonth = document.getElementById("yearMonth");
const yearNote = document.getElementById("yearNote");
const yearDiary = document.getElementById("yearDiary");

function openMonth(button) {
  months.forEach((month) => month.setAttribute("aria-selected", String(month === button)));
  yearMonth.textContent = button.dataset.name;
  yearNote.textContent = button.dataset.note;
  yearDiary.textContent = button.dataset.diary;
}

if (months.length) {
  const thisMonth = new Date().getMonth();
  const current = months[thisMonth] || months[0];
  current.classList.add("is-now");
  openMonth(current);

  /* On a phone the strip is wider than the screen, so bring the current month
     into view without dragging the whole page along with it. */
  if (yearStrip) {
    yearStrip.scrollLeft = current.offsetLeft - (yearStrip.clientWidth - current.clientWidth) / 2;
  }

  months.forEach((button, index) => {
    button.addEventListener("click", () => openMonth(button));

    button.addEventListener("keydown", (event) => {
      const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
      if (!step) return;
      event.preventDefault();
      const next = months[(index + step + months.length) % months.length];
      next.focus();
      openMonth(next);
    });
  });
}

/* --------------------------------------------------------- the estimator --- */

const jobSelect = document.getElementById("eJob");
const qtyInput = document.getElementById("eQty");
const qtyLabel = document.getElementById("eQtyLabel");
const figure = document.getElementById("eFigure");
const basis = document.getElementById("eBasis");
const sendEstimate = document.getElementById("eSend");

const carried = document.getElementById("carried");
const carriedText = document.getElementById("carriedText");
const carriedValue = document.getElementById("carriedValue");
const carriedClear = document.getElementById("carriedClear");

const money = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

/* Quoting to the nearest pound would imply a precision we haven't got. */
function roundSensibly(value) {
  const grain = value >= 2000 ? 100 : value >= 500 ? 50 : 10;
  return Math.round(value / grain) * grain;
}

function unitPhrase(unit, quantity) {
  const countable = ["metre", "visit", "garden"].includes(unit);
  return `${quantity} ${unit}${countable && quantity !== 1 ? "s" : ""}`;
}

function currentEstimate() {
  const option = jobSelect.options[jobSelect.selectedIndex];
  const quantity = Math.max(1, Number(qtyInput.value) || 1);
  const unit = option.dataset.unit;
  const low = roundSensibly(Number(option.dataset.low) * quantity);
  const high = roundSensibly(Number(option.dataset.high) * quantity);

  return {
    job: option.textContent.trim(),
    quantity,
    unit,
    low,
    high,
    range: `${money.format(low)} – ${money.format(high)}`,
    basis: `${unitPhrase(unit, quantity)} at ${money.format(option.dataset.low)}–${money.format(
      option.dataset.high
    )} per ${unit}`,
  };
}

function refreshEstimate() {
  const estimate = currentEstimate();
  figure.textContent = estimate.range;
  basis.textContent = estimate.basis;
}

if (jobSelect && qtyInput) {
  jobSelect.addEventListener("change", () => {
    const option = jobSelect.options[jobSelect.selectedIndex];
    qtyLabel.textContent = option.dataset.qtylabel;
    qtyInput.step = option.dataset.step;
    qtyInput.value = option.dataset.qty;
    refreshEstimate();
  });

  qtyInput.addEventListener("input", refreshEstimate);
  refreshEstimate();
}

if (sendEstimate) {
  sendEstimate.addEventListener("click", () => {
    const estimate = currentEstimate();
    const summary = `${estimate.job}, ${unitPhrase(estimate.unit, estimate.quantity)} — ${estimate.range}`;

    carriedValue.value = summary;
    carriedText.textContent = summary;
    carried.hidden = false;

    const message = document.querySelector('#enquiry textarea[name="message"]');
    if (message && !message.value) {
      message.value = `Looking at ${estimate.job.toLowerCase()}, roughly ${unitPhrase(
        estimate.unit,
        estimate.quantity
      )}.`;
    }

    document.getElementById("enquiry").scrollIntoView({ block: "start" });
    document.querySelector('#enquiry input[name="name"]').focus({ preventScroll: true });
  });
}

if (carriedClear) {
  carriedClear.addEventListener("click", () => {
    carried.hidden = true;
    carriedValue.value = "";
    document.getElementById("costs").scrollIntoView({ block: "start" });
  });
}

/* ------------------------------------------------------------- reveals --- */

const reveals = document.querySelectorAll(".reveal");

if (!reduceMotion && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (!entry.isIntersecting) return;
        setTimeout(() => entry.target.classList.add("in"), index * 80);
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8% 0px" }
  );

  reveals.forEach((element) => observer.observe(element));
} else {
  reveals.forEach((element) => element.classList.add("in"));
}
