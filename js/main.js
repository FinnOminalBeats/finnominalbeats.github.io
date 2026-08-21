/* FINN OMINAL — site behavior (dependency-free) */
(function () {
  "use strict";

  /* ----- sticky nav state ----- */
  var nav = document.querySelector(".nav");
  var onScroll = function () {
    nav.classList.toggle("scrolled", window.scrollY > 40);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ----- mobile menu ----- */
  var burger = document.querySelector(".nav-burger");
  var menu = document.getElementById("mobile-menu");
  var setMenu = function (open) {
    burger.setAttribute("aria-expanded", String(open));
    menu.hidden = !open;
    document.body.style.overflow = open ? "hidden" : "";
  };
  burger.addEventListener("click", function () {
    setMenu(burger.getAttribute("aria-expanded") !== "true");
  });
  menu.addEventListener("click", function (e) {
    if (e.target.tagName === "A") setMenu(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !menu.hidden) setMenu(false);
  });

  /* ----- reveal on scroll ----- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var ro = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            ro.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    reveals.forEach(function (el) { ro.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ----- active nav link ----- */
  var sections = document.querySelectorAll("main section[id]");
  var links = document.querySelectorAll(".nav-links a");
  if ("IntersectionObserver" in window && sections.length) {
    var so = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          links.forEach(function (a) {
            a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id);
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach(function (s) { so.observe(s); });
  }

  /* ----- maxres thumbnail fallback (YouTube returns a 120px grey stub when absent) ----- */
  document.querySelectorAll('.yt-lite[data-res="maxres"] img').forEach(function (img) {
    var check = function () {
      if (img.naturalWidth > 0 && img.naturalWidth < 200) {
        img.src = "https://i.ytimg.com/vi/" + img.closest(".yt-lite").dataset.id + "/hqdefault.jpg";
      }
    };
    if (img.complete) check();
    else img.addEventListener("load", check);
  });

  /* ----- lite YouTube embeds (click to load) ----- */
  document.querySelectorAll(".yt-lite").forEach(function (box) {
    var activate = function () {
      if (box.querySelector("iframe")) return;
      var id = box.dataset.id;
      var iframe = document.createElement("iframe");
      iframe.src =
        "https://www.youtube-nocookie.com/embed/" + id +
        "?autoplay=1&rel=0&modestbranding=1";
      iframe.title = box.dataset.title || "YouTube video";
      iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;
      box.appendChild(iframe);
      box.classList.add("playing");
    };
    box.addEventListener("click", activate);
    box.querySelector(".yt-play").addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); activate(); }
    });
  });

  /* ----- lazy-load Spotify embed when near viewport ----- */
  var lazyFrames = document.querySelectorAll("iframe[data-src]");
  var loadFrame = function (f) {
    if (!f.src) f.src = f.dataset.src;
  };
  if ("IntersectionObserver" in window) {
    var fo = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            loadFrame(entry.target);
            fo.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "400px 0px" }
    );
    lazyFrames.forEach(function (f) { fo.observe(f); });
  } else {
    lazyFrames.forEach(loadFrame);
  }

  /* ----- release countdown ----- */
  document.querySelectorAll(".countdown[data-drop]").forEach(function (cd) {
    var target = new Date(cd.getAttribute("data-drop")).getTime();
    if (isNaN(target)) return;
    var cells = {
      days: cd.querySelector('[data-cd="days"]'),
      hours: cd.querySelector('[data-cd="hours"]'),
      mins: cd.querySelector('[data-cd="mins"]'),
      secs: cd.querySelector('[data-cd="secs"]')
    };
    var pad = function (n) { return (n < 10 ? "0" : "") + n; };
    var timer;
    var tick = function () {
      var diff = target - Date.now();
      if (diff <= 0) {
        cd.classList.add("dropped");
        cd.innerHTML = '<span class="cd-out">Out Now</span>';
        if (timer) clearInterval(timer);
        return;
      }
      var s = Math.floor(diff / 1000);
      if (cells.days) cells.days.textContent = Math.floor(s / 86400);
      if (cells.hours) cells.hours.textContent = pad(Math.floor((s % 86400) / 3600));
      if (cells.mins) cells.mins.textContent = pad(Math.floor((s % 3600) / 60));
      if (cells.secs) cells.secs.textContent = pad(s % 60);
    };
    tick();
    timer = setInterval(tick, 1000);
  });

  /* ----- singles-strip status auto-flip (pre-save -> out now on release day) ----- */
  document.querySelectorAll(".sc-status[data-live-date]").forEach(function (el) {
    var when = new Date(el.getAttribute("data-live-date")).getTime();
    if (isNaN(when)) return;
    var live = Date.now() >= when;
    var soon = el.getAttribute("data-soon-label") || el.textContent;
    el.textContent = live ? "Out Now" : soon;
    el.classList.toggle("is-live", live);
    el.classList.toggle("is-soon", !live);
  });
})();
