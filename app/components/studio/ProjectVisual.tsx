import {
  ArrowDown,
  Check,
  Code2,
  Database,
  FileText,
  GitBranch,
  Search,
  Sparkles,
} from "lucide-react";
import { SpatialDemo } from "./SpatialDemo";
import type { Project } from "../../lib/studio";

export function ProjectVisual({
  type,
  compact = false,
}: {
  type: Project["visual"];
  compact?: boolean;
}) {
  if (type === "spatial") return <SpatialDemo compact={compact} />;
  if (type === "terminal")
    return (
      <div className="terminal-visual">
        <div className="terminal-top">
          <span className="terminal-dots">
            <i />
            <i />
            <i />
          </span>
          <span>oppy / command reference</span>
          <Code2 size={15} aria-hidden="true" />
        </div>
        <div className="terminal-body">
          <span className="terminal-eyebrow">OPPORTUNITY SCOUT</span>
          <div className="terminal-logo">
            oppy<span>_</span>
          </div>
          <div className="terminal-command">
            <span>~ $</span> npx @dshenoyh/oppy-cli
          </div>
          <div className="terminal-rule" />
          <div className="terminal-command">
            <span>~ $</span> oppy --search &quot;engineer&quot;
          </div>
          <p>Discover → Cache → Export</p>
          <div className="terminal-tags">
            <span>LOCAL SQLITE</span>
            <span>MARKDOWN</span>
            <span>CLI + TUI</span>
          </div>
        </div>
        <div className="terminal-bottom">
          <span>PUBLIC NPM PACKAGE</span>
          <span>DOCUMENTED COMMANDS ↗</span>
        </div>
      </div>
    );
  if (type === "verification")
    return (
      <div className="verification-visual">
        <span className="eyebrow">VERIFICATION / WORKFLOW STUDY</span>
        <GitBranch size={42} strokeWidth={1} aria-hidden="true" />
        <div className="verification-rows">
          {[
            "Define expected behavior",
            "Run automated checks",
            "Inspect regressions",
            "Review before release",
          ].map((item, i) => (
            <div key={item}>
              <span>0{i + 1}</span>
              {item}
              <Check size={16} aria-hidden="true" />
            </div>
          ))}
        </div>
        <span className="visual-note">ILLUSTRATIVE WORKFLOW</span>
      </div>
    );
  if (type === "robotics")
    return (
      <div className="robotics-visual">
        <span className="eyebrow">SUTRA / SIMULATION STUDY</span>
        <svg
          viewBox="0 0 460 270"
          fill="none"
          aria-label="Illustrative robotics control loop"
          role="img"
        >
          <g stroke="#b8442d" opacity="0.2">
            {Array.from({ length: 9 }, (_, i) => (
              <path
                key={i}
                d={`M${50 + i * 45} 40v195M40 ${45 + i * 24}h380`}
              />
            ))}
          </g>
          <circle
            cx="230"
            cy="138"
            r="73"
            stroke="#b8442d"
            strokeDasharray="4 6"
          />
          <path d="M140 140h180M230 50v180" stroke="#b8442d" />
          <rect x="211" y="119" width="38" height="38" rx="8" fill="#b8442d" />
          <path d="m218 138 12-10 12 10-12 10Z" stroke="white" />
          <circle cx="140" cy="140" r="6" fill="#28251f" />
          <circle cx="320" cy="140" r="6" fill="#28251f" />
          <path
            data-draw
            d="M140 140C140 36 320 36 320 140s-180 104-180 0"
            stroke="#b8442d"
            strokeWidth="2"
          />
        </svg>
        <div className="robotics-labels">
          <span>CONTROL</span>
          <span>PHYSICAL TWIN</span>
          <span>FEEDBACK</span>
        </div>
        <span className="visual-note">ILLUSTRATIVE CONTROL LOOP</span>
      </div>
    );
  return (
    <div className="workflow-visual">
      <div className="workflow-top">
        <span className="small-square" /> GUILD / WORKFLOW ARCHITECTURE{" "}
        <Sparkles size={16} aria-hidden="true" />
      </div>
      <div className="workflow-canvas">
        <div className="workflow-source">
          <Search size={15} aria-hidden="true" /> Opportunity sources
        </div>
        <div className="workflow-connector">
          <ArrowDown size={18} aria-hidden="true" />
        </div>
        <div className="workflow-node main-node">
          <span className="node-icon">
            <Sparkles size={21} aria-hidden="true" />
          </span>
          <div>
            <strong>Lead intelligence</strong>
            <span>Identify · structure · prioritize</span>
          </div>
          <span className="node-index">01</span>
        </div>
        <div className="workflow-branch" />
        <div className="workflow-pair">
          <div className="workflow-node">
            <FileText size={20} aria-hidden="true" />
            <strong>Proposal agent</strong>
            <span>Technical responses</span>
          </div>
          <div className="workflow-node">
            <Database size={20} aria-hidden="true" />
            <strong>Resume agent</strong>
            <span>ATS preparation</span>
          </div>
        </div>
        <div className="workflow-output">
          <Check size={14} aria-hidden="true" /> Prepared materials for review
        </div>
      </div>
      <span className="visual-note">
        ILLUSTRATIVE ARCHITECTURE · INTERNAL SHOWCASE
      </span>
    </div>
  );
}
