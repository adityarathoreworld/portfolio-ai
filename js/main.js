(function () {
  var yearEl = document.getElementById("y");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  var EMAIL = "aditya@adityarathoreworld.in";
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ——— Mobile dialog (all menu triggers) ——— */
  var sheet = document.getElementById("mobile-sheet");
  var openBtns = document.querySelectorAll("[data-menu-open]");
  var closeBtns = document.querySelectorAll("[data-menu-close]");

  function openSheet(trigger) {
    if (!sheet) return;
    sheet.showModal();
    openBtns.forEach(function (btn) {
      btn.setAttribute("aria-expanded", "true");
    });
    var firstLink = sheet.querySelector(".sheet__nav a");
    if (firstLink) {
      window.setTimeout(function () {
        firstLink.focus();
      }, 50);
    }
    if (trigger && trigger.classList.contains("mobile-dock__item")) {
      trigger.blur();
    }
  }

  function closeSheet() {
    if (!sheet) return;
    sheet.close();
    openBtns.forEach(function (btn) {
      btn.setAttribute("aria-expanded", "false");
    });
    var headerBtn = document.querySelector(".app-bar__menu");
    if (headerBtn) headerBtn.focus();
  }

  openBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (sheet && sheet.open) {
        closeSheet();
      } else {
        openSheet(btn);
      }
    });
  });

  closeBtns.forEach(function (btn) {
    btn.addEventListener("click", closeSheet);
  });

  if (sheet) {
    sheet.addEventListener("cancel", function (e) {
      e.preventDefault();
      closeSheet();
    });
  }

  /* ——— Copy email ——— */
  var copyBtn = document.querySelector("[data-copy-email]");
  var toast = document.querySelector("[data-toast]");

  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      if (!toast) return;
      copyBtn.setAttribute("aria-busy", "true");
      copyBtn.disabled = true;
      navigator.clipboard.writeText(EMAIL).then(
        function () {
          toast.hidden = false;
          toast.textContent = "Copied " + EMAIL;
          copyBtn.textContent = "Copied";
          window.setTimeout(function () {
            toast.hidden = true;
            copyBtn.textContent = "Copy email";
            copyBtn.disabled = false;
            copyBtn.removeAttribute("aria-busy");
          }, 2200);
        },
        function () {
          toast.hidden = false;
          toast.textContent = "Could not copy — use the mail link.";
          copyBtn.disabled = false;
          copyBtn.removeAttribute("aria-busy");
        }
      );
    });
  }

  /* ——— Scroll reveal ——— */
  var revealEls = document.querySelectorAll(".reveal");
  var heroPanel = document.querySelector(".panel--hero");
  if (heroPanel) heroPanel.classList.add("is-visible");

  if (reducedMotion) {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else if ("IntersectionObserver" in window) {
    var revealObs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.08 }
    );
    revealEls.forEach(function (el) {
      revealObs.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ——— Section nav highlight ——— */
  var sectionLinks = document.querySelectorAll("[data-section-link]");
  var sections = ["overview", "impact", "capabilities", "projects", "timeline", "contact"]
    .map(function (id) {
      return document.getElementById(id);
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sectionLinks.length) {
    var navObs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var id = entry.target.id;
          sectionLinks.forEach(function (link) {
            var href = link.getAttribute("href");
            link.classList.toggle("is-active", href === "#" + id);
          });
        });
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: 0 }
    );
    sections.forEach(function (section) {
      navObs.observe(section);
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      var href = anchor.getAttribute("href");
      if (!href || href.length < 2) return;
      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "start",
      });
      history.replaceState(null, "", href);
    });
  });

  /* ——— Tabs (WAI-ARIA) ——— */
  var tabs = document.querySelectorAll('[role="tab"]');
  var panels = document.querySelectorAll("[data-tab-panel]");

  function activateTab(tab) {
    var name = tab.getAttribute("data-tab");
    tabs.forEach(function (t) {
      var selected = t === tab;
      t.setAttribute("aria-selected", selected ? "true" : "false");
      t.tabIndex = selected ? 0 : -1;
    });
    panels.forEach(function (panel) {
      var match = panel.getAttribute("data-tab-panel") === name;
      panel.hidden = !match;
      if (match) {
        panel.style.animation = "none";
        void panel.offsetWidth;
        panel.style.animation = "";
      }
    });
  }

  tabs.forEach(function (tab, index) {
    tab.addEventListener("click", function () {
      activateTab(tab);
    });
    tab.addEventListener("keydown", function (e) {
      var next = index;
      if (e.key === "ArrowRight") next = (index + 1) % tabs.length;
      if (e.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
      if (next !== index) {
        e.preventDefault();
        activateTab(tabs[next]);
        tabs[next].focus();
      }
    });
  });

  /* ——— Project search ——— */
  var searchInput = document.querySelector("[data-project-search]");
  var table = document.querySelector("[data-project-table]");
  var countEl = document.querySelector("[data-project-count]");
  var emptyEl = document.querySelector("[data-empty-projects]");

  function filterProjects() {
    if (!searchInput || !table) return;
    var q = searchInput.value.trim().toLowerCase();
    var rows = table.querySelectorAll("tbody tr");
    var visible = 0;
    rows.forEach(function (row) {
      var name = (row.getAttribute("data-name") || row.textContent || "").toLowerCase();
      var show = !q || name.indexOf(q) !== -1;
      row.hidden = !show;
      if (!show) row.classList.remove("is-selected");
      if (show) visible += 1;
    });
    if (countEl) countEl.textContent = String(visible);
    if (emptyEl) emptyEl.hidden = visible > 0;
  }

  if (searchInput) {
    searchInput.addEventListener("input", filterProjects);
  }

  /* ——— Project sort ——— */
  var sortBtn = document.querySelector('[data-sort="name"]');
  var sortDir = 1;

  if (sortBtn && table) {
    sortBtn.addEventListener("click", function () {
      var tbody = table.querySelector("tbody");
      if (!tbody) return;
      sortDir = sortDir === 1 ? -1 : 1;
      sortBtn.setAttribute("aria-sort", sortDir === 1 ? "ascending" : "descending");
      var rows = Array.prototype.slice.call(tbody.querySelectorAll("tr:not([hidden])"));
      rows.sort(function (a, b) {
        var an = (a.getAttribute("data-name") || "").toLowerCase();
        var bn = (b.getAttribute("data-name") || "").toLowerCase();
        if (an < bn) return -1 * sortDir;
        if (an > bn) return 1 * sortDir;
        return 0;
      });
      rows.forEach(function (row) {
        tbody.appendChild(row);
      });
    });
  }

  /* ——— Row select (projects) ——— */
  if (table) {
    table.querySelectorAll("tbody tr").forEach(function (row) {
      row.addEventListener("click", function () {
        var selected = row.classList.contains("is-selected");
        table.querySelectorAll("tbody tr").forEach(function (r) {
          r.classList.remove("is-selected");
        });
        if (!selected) row.classList.add("is-selected");
      });
    });
  }

  /* ——— Horizontal scroll hints ——— */
  function updateScrollHints() {
    document.querySelectorAll("[data-scroll-table]").forEach(function (el, i) {
      var scrollable = el.scrollWidth > el.clientWidth + 2;
      el.classList.toggle("is-scrollable", scrollable);
      var hint = el.parentElement.querySelector("[data-scroll-hint]");
      if (hint) hint.hidden = !scrollable;
    });
  }

  updateScrollHints();
  window.addEventListener("resize", updateScrollHints);
  document.querySelectorAll("[data-scroll-table]").forEach(function (el) {
    el.addEventListener("scroll", function () {
      if (el.scrollLeft > 8) {
        el.classList.add("is-scrolled");
      } else {
        el.classList.remove("is-scrolled");
      }
    });
  });
})();
