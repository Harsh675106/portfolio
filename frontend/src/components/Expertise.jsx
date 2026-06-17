import PropTypes from "prop-types";
import { memo } from "react";
import { FaJava } from "react-icons/fa";
import "../App.css";
import Reveal from "./Reveal";

const capabilityGroups = [
  {
    title: "Full-Stack",
    points: ["React.js", "Next.js", "Node", "MongoDB", "PostgreSQL", "AI/ML"],
  },
  {
    title: "Product",
    points: ["Performance", "Clean architecture", "Testing mindset"],
  },
];

const signalCards = [
  { label: "Core Stack", value: "MERN", sub: "React / Node / MongoDB" },
  { label: "Focus", value: "AI / ML", sub: "Machine Learning & Artificial Intelligence" },
  { label: "App Dev", value: "Flutter", sub: "Basic Dart & Firebase" },
];

const Expertise = memo(function Expertise({ isDark }) {
  const cardTone = isDark
    ? "bg-white/5 border-white/10"
    : "bg-white border-black/10";

  return (
    <Reveal
      as="section"
      className="fx-panel w-full p-6 sm:p-8"
      duration={0.9}
    >
      <div className="fx-ring" />

      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="pl-2 sm:pl-3 lg:pl-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="fx-subtitle">Professional Snapshot</p>
              <h3 className="mt-2 text-2xl sm:text-3xl font-bold">
                Capability Overview
              </h3>
            </div>
            <span className="fx-chip">Open to Roles</span>
          </div>

          <p className={`mt-4 text-sm sm:text-base ${isDark ? "text-slate-300" : "text-slate-600"}`}>
            A concise view of what I build and how I work - tuned for modern product teams.
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {capabilityGroups.map((group) => (
              <div
                key={group.title}
                className={`rounded-2xl border p-4 ${cardTone}`}
              >
                <h4 className="text-sm font-semibold tracking-[0.2em] uppercase">
                  {group.title}
                </h4>
                <div className={`mt-3 text-sm leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                  {group.points.map((point) => (
                    <div key={point} className="flex items-center gap-2">
                      <span className="inline-flex h-2 w-2 rounded-full bg-sky-400" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className={`language-spotlight mt-5 rounded-3xl border p-5 ${cardTone}`}>
            <div className="language-spotlight-glow" />
            <div className="relative z-10 mx-auto flex max-w-xl flex-col items-center text-center">
              <div className="language-orbit" aria-hidden="true">
                <span className="language-orbit-dot language-orbit-dot-a" />
                <span className="language-orbit-dot language-orbit-dot-b" />
                <span className="language-icon">
                  <FaJava />
                </span>
              </div>
              <p className="fx-subtitle mt-4">Programming Language</p>
              <h4 className="mt-2 text-2xl font-bold">Java</h4>
              <p className={`mt-2 text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                The language I am most familiar with and enjoy using for strong logic, OOP, and backend thinking.
              </p>
            </div>
          </div>
        </div>

        <div className={`rounded-3xl border p-5 ${cardTone}`}>
          <p className="fx-subtitle">Signal Panel</p>
          <div className="mt-4 grid gap-3">
            {signalCards.map((card) => (
              <div key={card.label} className="fx-panel p-4">
                <div className="fx-ring" />
                <p className="text-xs tracking-[0.3em] uppercase">
                  {card.label}
                </p>
                <h4 className="mt-2 text-xl font-bold">{card.value}</h4>
                <p className={`text-xs mt-1 ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                  {card.sub}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <span className="fx-badge">Frontend</span>
            <span className="fx-badge">Backend</span>
            <span className="fx-badge">AI / ML</span>
            <span className="fx-badge">Mobile</span>
          </div>
        </div>
      </div>
    </Reveal>
  );
});

Expertise.propTypes = {
  isDark: PropTypes.bool.isRequired,
};

Expertise.displayName = "Expertise";

export default Expertise;
