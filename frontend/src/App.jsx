import "./App.css";
import { useEffect, useMemo, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/navbar";
import useLenis from "./hooks/useLenis";
import PropTypes from "prop-types";
import Home from "./components/Home";
import About from "./components/about";
import Projects from "./components/Projects";
import Achievements from "./components/Achievements";
import Skills from "./components/skill";
import Contact from "./components/Contact";
import OwnerReply from "./components/Owner";

const EASE_OUT_CUBIC = (t) => 1 - Math.pow(1 - t, 3);
const SCROLL_TO_OPTIONS = {
  offset: -12,
  duration: 1.15,
  easing: EASE_OUT_CUBIC,
  lerp: 0.08,
};

function ScrollToHash({ lenisRef, enableSmooth }) {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") return;

    let rafId = 0;
    let attempts = 0;
    const maxAttempts = 120;

    const runScroll = () => {
      if (!location.hash) {
        if (lenisRef?.current) {
          lenisRef.current.scrollTo(0);
        } else {
          window.scrollTo({ top: 0, behavior: enableSmooth ? "smooth" : "auto" });
        }
        return;
      }

      const id = location.hash.replace("#", "");
      const target = document.getElementById(id);

      if (!target && attempts < maxAttempts) {
        attempts += 1;
        rafId = requestAnimationFrame(runScroll);
        return;
      }

      if (target) {
        if (lenisRef?.current) {
          lenisRef.current.scrollTo(target, SCROLL_TO_OPTIONS);
        } else {
          target.scrollIntoView({
            behavior: enableSmooth ? "smooth" : "auto",
            block: "start",
          });
        }
      }
    };

    rafId = requestAnimationFrame(runScroll);
    return () => cancelAnimationFrame(rafId);
  }, [location, lenisRef, enableSmooth]);

  return null;
}

ScrollToHash.propTypes = {
  lenisRef: PropTypes.shape({ current: PropTypes.any }),
  enableSmooth: PropTypes.bool.isRequired,
};

function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("isDark"); // persist
    return saved ? JSON.parse(saved) : true; // default dark
  });
  const [lenisEnabled, setLenisEnabled] = useState(true);
  const [useNativeScroll, setUseNativeScroll] = useState(false);

  const lenisOptions = useMemo(
    () => ({
      duration: 1.15,
      easing: EASE_OUT_CUBIC,
      lerp: 0.11,
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1,
      wheelMultiplier: 1,
      overscroll: false,
      stopInertiaOnNavigate: true,
      prevent: (node) => node.closest?.("[data-native-scroll]"),
    }),
    []
  );
  const lenisConfig = useMemo(
    () => ({ enabled: lenisEnabled && isDark && !useNativeScroll, options: lenisOptions }),
    [isDark, lenisEnabled, useNativeScroll, lenisOptions]
  );
  const lenisRef = useLenis(lenisConfig);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("isDark", JSON.stringify(isDark));
  }, [isDark]);

  useEffect(() => {
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    const memory = navigator.deviceMemory ?? 8;
    const cores = navigator.hardwareConcurrency ?? 8;
    const connection = navigator.connection;
    const saveData = connection?.saveData ?? false;
    const effectiveType = connection?.effectiveType ?? "";
    const slowConnection = typeof effectiveType === "string" && effectiveType.includes("2g");

    const isLowEnd = prefersReduced || saveData || slowConnection || memory <= 4 || cores <= 4;
    document.documentElement.classList.toggle("perf-lite", isLowEnd);
    setLenisEnabled((prev) => (prev === !isLowEnd ? prev : !isLowEnd));
  }, []);

  useEffect(() => {
    const queries = [
      window.matchMedia?.("(max-width: 768px)"),
      window.matchMedia?.("(pointer: coarse)"),
    ].filter(Boolean);

    const updateScrollMode = () => {
      setUseNativeScroll(queries.some((query) => query.matches));
    };

    updateScrollMode();
    queries.forEach((query) => query.addEventListener("change", updateScrollMode));

    return () => {
      queries.forEach((query) => query.removeEventListener("change", updateScrollMode));
    };
  }, []);

  return (
    <Router>
      <div className="app-container">
        <ScrollToHash lenisRef={lenisRef} enableSmooth={lenisEnabled} />
        {/* Background */}
        {isDark ? (
          <div className="dark-bg">
            <div className="dark-bg-grid" />
            <div className="dark-bg-flow" />
            <div className="dark-bg-orbs" />
            <div className="dark-bg-stars" />
            <div className="dark-bg-glow" />
          </div>
        ) : (
          <div className="light-bg">
            <div className="light-bg-flow" />
            <div className="light-bg-balls">
              <span className="light-ball light-ball-1" />
              <span className="light-ball light-ball-2" />
              <span className="light-ball light-ball-3" />
              <span className="light-ball light-ball-4" />
              <span className="light-ball light-ball-5" />
              <span className="light-ball light-ball-6" />
            </div>
            <div className="light-bg-balls-secondary">
              <span className="light-ball light-ball-7" />
              <span className="light-ball light-ball-8" />
              <span className="light-ball light-ball-9" />
            </div>
            <div className="light-bg-orbs" />
            <div className="light-bg-stars" />
            <div className="light-bg-glow" />
          </div>
        )}

        {/* Navbar */}
        <Navbar isDark={isDark} setIsDark={setIsDark} />

        {/* Page Content */}
        <div className="content">
          <Routes>
            <Route path="/" element={<Home isDark={isDark} />} />
            <Route path="/about" element={<About isDark={isDark} />} />
            <Route path="/projects" element={<Projects isDark={isDark} />} />
            <Route path="/contact" element={<Contact isDark={isDark} />} />
            <Route path="/achievements" element={<Achievements isDark={isDark} />} />
            <Route path="/skills" element={<Skills isDark={isDark} />} />
            <Route path="/owner" element={<OwnerReply isDark={isDark} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

