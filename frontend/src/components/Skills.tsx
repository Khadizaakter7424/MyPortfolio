import { SkillGroup } from "../types";
import Reveal from "./Reveal";

type Props = {
  groups: SkillGroup[];
};

export default function Skills({ groups }: Props) {
  return (
    <section id="skills">
      <div className="container">
        <div className="section-head">
          <span className="section-index">02</span>
          <h2>What I build with</h2>
          <p>Layered the way I'd reach for them on a real project — backend first, then everything around it.</p>
        </div>

        <div className="stack">
          {groups.map((group, i) => (
            <Reveal key={group.category} className="stack-layer" delay={i * 70}>
              <h3>{group.category}</h3>
              <div className="skill-tags">
                {group.items.map((item) => (
                  <span className="skill-tag" key={item}>{item}</span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
