document.addEventListener("DOMContentLoaded", () => {
  // 1. Hero Slideshow (runs only on index.html)
  const slides = document.querySelectorAll(".slide");
  const dotsBox = document.getElementById("dots");
  if (slides.length && dotsBox) {
    let idx = 0;
    slides.forEach((_, i) => {
      const b = document.createElement("button");
      b.setAttribute("aria-label", "Slide " + (i + 1));
      if (i === 0) b.classList.add("on");
      b.addEventListener("click", () => showSlide(i));
      dotsBox.appendChild(b);
    });

    function showSlide(n) {
      slides[idx].classList.remove("on");
      dotsBox.children[idx].classList.remove("on");
      idx = (n + slides.length) % slides.length;
      slides[idx].classList.add("on");
      dotsBox.children[idx].classList.add("on");
    }

    setInterval(() => showSlide(idx + 1), 5000);
  }

  // 2. Who's Who Carousel Buttons (runs only on index.html)
  const strip = document.getElementById("strip");
  const prevBtn = document.querySelector(".arr.l");
  const nextBtn = document.querySelector(".arr.r");
  if (strip && prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => strip.scrollBy({ left: -240, behavior: "smooth" }));
    nextBtn.addEventListener("click", () => strip.scrollBy({ left: 240, behavior: "smooth" }));
  }

  // 3. Bourdieu Four Forms of Capital Tabs (runs only on bourdieu.html)
  const tabWrap = document.getElementById("tabs");
  if (tabWrap) {
    const buttons = tabWrap.querySelectorAll("button");
    const panes = document.querySelectorAll(".pane");
    buttons.forEach((btn, i) => {
      btn.addEventListener("click", () => {
        buttons.forEach(b => b.classList.remove("on"));
        panes.forEach(p => p.classList.remove("on"));
        btn.classList.add("on");
        if (panes[i]) panes[i].classList.add("on");
      });
    });
  }

  // 4. Quiz Logic (runs only on quiz.html)
  const qEl = document.getElementById("q");
  if (qEl) {
    const questions = [
      {
        q: "Which level of sociology studies large-scale phenomena or entire civilizations?",
        opts: ["Microsociology", "Macrosociology", "Dramaturgy", "Labeling theory"],
        ans: 1,
        why: "Macrosociology (Marx, Durkheim, Weber) concentrates on large-scale structures and entire civilizations."
      },
      {
        q: "Who coined the term 'symbolic interactionism' and outlined its three premises?",
        opts: ["Pierre Bourdieu", "Erving Goffman", "Herbert Blumer", "Emile Durkheim"],
        ans: 2,
        why: "Herbert Blumer coined symbolic interactionism and wrote a book outlining its three core premises."
      },
      {
        q: "In Goffman's dramaturgical approach, what is 'impression management'?",
        opts: [
          "How we act when nobody is around",
          "Altering our behavior on the front stage to promote an idealized version of ourselves",
          "Inheriting economic wealth from family",
          "Labeling a group as deviant"
        ],
        ans: 1,
        why: "Impression management happens on the front stage when we adjust behavior to uphold an idealized public image."
      },
      {
        q: "Which concept refers to imagining how others perceive us to form our self-concept?",
        opts: ["Habitus", "Social field", "Looking-glass self", "Back stage"],
        ans: 2,
        why: "Cooley's looking-glass self describes how our self-concept is shaped by gauging how others perceive us."
      },
      {
        q: "According to Bourdieu, how does 'habitus' bridge macro and micro sociology?",
        opts: [
          "By measuring suicide rates across countries",
          "Social structures shape our ingrained dispositions, and our everyday practices reproduce or change structures",
          "By eliminating all social classes",
          "By keeping front stage and back stage separate"
        ],
        ans: 1,
        why: "Habitus connects macro social structures to micro everyday practices—and our actions can reproduce or transform structures."
      },
      {
        q: "Accents, posture, tastes, and skills that become a permanent part of your mind and body are which state of cultural capital?",
        opts: ["Objectified state", "Institutionalized state", "Embodied state", "Economic state"],
        ans: 2,
        why: "The embodied state consists of long-lasting dispositions of mind and body acquired through personal time and effort."
      },
      {
        q: "If someone earns a degree abroad that is not recognized by employers in a new country, which capital is missing?",
        opts: ["Symbolic capital", "Objectified capital", "Economic capital", "Back stage capital"],
        ans: 0,
        why: "Symbolic capital is the recognition and legitimacy given to other forms of capital."
      },
      {
        q: "Max Weber argued that social stratification occurs across the '3 Ps'. What are they?",
        opts: [
          "People, Places, Politics",
          "Property (class), Prestige (status), Power (party)",
          "Production, Profit, Proletariat",
          "Practice, Performance, Perception"
        ],
        ans: 1,
        why: "Weber's three dimensions of stratification are Property (class), Prestige (status), and Power (party)."
      }
    ];

    let cur = 0;
    let score = 0;
    const aEl = document.getElementById("a");
    const fbEl = document.getElementById("fb");
    const nxBtn = document.getElementById("nx");
    const barEl = document.getElementById("bar");
    const qaBox = document.getElementById("qa");
    const resBox = document.getElementById("res");
    const rtEl = document.getElementById("rt");
    const againBtn = document.getElementById("again");

    function renderQ() {
      const item = questions[cur];
      barEl.style.width = ((cur / questions.length) * 100) + "%";
      qEl.textContent = (cur + 1) + ". " + item.q;
      aEl.innerHTML = "";
      fbEl.textContent = "";
      nxBtn.classList.add("d-none");

      item.opts.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.className = "opt";
        btn.textContent = opt;
        btn.addEventListener("click", () => pick(i, btn));
        aEl.appendChild(btn);
      });
    }

    function pick(i, btn) {
      const item = questions[cur];
      const all = aEl.querySelectorAll("button");
      all.forEach(b => (b.disabled = true));

      if (i === item.ans) {
        score++;
        btn.classList.add("ok");
        fbEl.textContent = "Correct! " + item.why;
      } else {
        btn.classList.add("no");
        all[item.ans].classList.add("ok");
        fbEl.textContent = "Not quite. " + item.why;
      }
      nxBtn.classList.remove("d-none");
    }

    nxBtn.addEventListener("click", () => {
      cur++;
      if (cur < questions.length) {
        renderQ();
      } else {
        barEl.style.width = "100%";
        qaBox.classList.add("d-none");
        resBox.classList.remove("d-none");
        rtEl.textContent = "You scored " + score + " out of " + questions.length + "!";
      }
    });

    againBtn.addEventListener("click", () => {
      cur = 0;
      score = 0;
      resBox.classList.add("d-none");
      qaBox.classList.remove("d-none");
      renderQ();
    });

    renderQ();
  }
});