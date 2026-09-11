import { Project } from "../types";
import Reveal from "./Reveal";

type Props = {
  projects: Project[];
};

export default function Projects({ projects }: Props) {
  return (
    <section id="projects">
      <div className="container">
        <div className="section-head">
          <span className="section-index">03</span>
          <h2>Things I've shipped</h2>
          <p>Coursework projects, each one built as a real working app rather than a toy example.</p>
        </div>

        <div className="case-list">
          {projects.map((project, i) => (
            <Reveal key={project.name} as="article" className="case-row" delay={Math.min(i * 60, 240)}>
              <span className="case-index">{String(i + 1).padStart(2, "0")}</span>
              <div className="case-body">
                <h3>{project.name}</h3>
                <ul>
                  {project.description.map((point, j) => (
                    <li key={j}>{point}</li>
                  ))}
                </ul>
                <div className="case-footer">
                  <span className="case-tech">{project.tech}</span>
                  <a className="case-link" href={project.gitHub} target="_blank" rel="noreferrer">
                    View on GitHub
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
