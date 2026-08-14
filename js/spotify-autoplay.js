/* Featured-track autoplay via Spotify's official Embed IFrame API.
   Browsers block audio-with-sound on load, so this starts the track on the
   visitor's FIRST interaction (tap / click / key) — the closest compliant
   thing to "plays on load". A floating control appears once it's actually
   playing so the visitor can pause. Fires once; a manual pause sticks. */
(function () {
  "use strict";

  var el = document.querySelector(".spotify-autoplay");
  if (!el) return;

  var uri = el.getAttribute("data-uri");
  var height = parseInt(el.getAttribute("data-height"), 10) || 152;
  var controller = null;
  var started = false;
  var isPaused = true;
  var everPlayed = false;
  var btn = null;
  var GESTURES = ["pointerdown", "keydown", "touchstart"];

  // Spotify calls this once its IFrame API script has loaded.
  window.onSpotifyIframeApiReady = function (IFrameAPI) {
    IFrameAPI.createController(
      el,
      { uri: uri, width: "100%", height: height },
      function (ctrl) {
        controller = ctrl;
        ctrl.addListener("playback_update", function (e) {
          isPaused = e.data.isPaused;
          if (!isPaused) everPlayed = true;
          if (everPlayed) ensureControl();
          updateControl();
        });
      }
    );
  };

  function tryStart() {
    if (started || !controller) return;
    started = true;
    try { controller.play(); } catch (err) { /* blocked — player still tappable */ }
    GESTURES.forEach(function (t) { document.removeEventListener(t, tryStart, true); });
  }
  GESTURES.forEach(function (t) { document.addEventListener(t, tryStart, true); });

  function ensureControl() {
    if (btn) return;
    btn = document.createElement("button");
    btn.type = "button";
    btn.className = "music-toggle";
    btn.addEventListener("click", function (ev) {
      ev.stopPropagation();
      if (controller) controller.togglePlay();
    });
    document.body.appendChild(btn);
    updateControl();
  }

  function updateControl() {
    if (!btn) return;
    btn.innerHTML = isPaused
      ? '<span class="mt-ico" aria-hidden="true">▶</span> Play'
      : '<span class="mt-ico" aria-hidden="true">❚❚</span> Pause';
    btn.setAttribute("aria-label", isPaused ? "Play All Kind" : "Pause All Kind");
  }
})();
