import { TimelineEntry } from "../types";
import Reveal from "./Reveal";

type Props = {
  education: TimelineEntry[];
  training: TimelineEntry[];
};

function Track({ entries }: { entries: TimelineEntry[] }) {
  return (
    <div className="timeline">
      {entries.map((entry, i) => (
        <Reveal
          key={entry.title}
          className={`timeline-row ${i % 2 === 0 ? "left" : "right"}`}
          delay={i * 90}
        >
          <div className="timeline-card">
            <span className="timeline-period">{entry.period}</span>
            <p className="timeline-title">{entry.title}</p>
            <p className="timeline-place">{entry.place}</p>
          </div>
          <div className="timeline-dot-col">
            <span className="timeline-dot" />
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export default function Education({ education, training }: Props) {
  return (
    <section id="education">
      <div className="container">
        <div className="section-head">
          <span className="section-index">04</span>
          <h2>Where I've studied and trained</h2>
        </div>

        <div className="timeline-track-label">Academic background</div>
        <Track entries={education} />

        <div className="timeline-track-label" style={{ marginTop: 56 }}>Training &amp; internship</div>
        <Track entries={training} />
      </div>
    </section>
  );
}
