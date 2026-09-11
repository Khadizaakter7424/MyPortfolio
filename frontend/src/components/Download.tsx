import { API_BASE_URL } from "../api/config";
import Reveal from "./Reveal";

const RESUME_URL = `${API_BASE_URL}/media/Khadiza_Akter_Resume.pdf`;
const RESUME_FILENAME = "Khadiza_Akter_Resume.pdf";

export default function Download() {
  return (
    <section id="download">
      <div className="container">
        <div className="section-head">
          <span className="section-index">06</span>
          <h2>Want the full picture on paper?</h2>
          <p>Grab a copy of my resume — everything above, plus education and references, in one PDF.</p>
        </div>

        <Reveal className="panel">
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
            <div>
              <h3 style={{ marginBottom: 6 }}>Khadiza Akter — Resume</h3>
              <p className="timeline-place" style={{ margin: 0 }}>PDF · updated 2026</p>
            </div>
            <a href={RESUME_URL} download={RESUME_FILENAME} className="btn btn-primary">
              Download CV
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
