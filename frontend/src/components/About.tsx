import { Profile, LanguageSkill } from "../types";
import Reveal from "./Reveal";

type Props = {
  profile: Profile;
  languages: LanguageSkill[];
  hobbies: string[];
};

export default function About({ profile, languages, hobbies }: Props) {
  return (
    <section id="about">
      <div className="container">
        <div className="section-head">
          <span className="section-index">01</span>
          <h2>A bit about how I work</h2>
          <p>
            I learn by building — most of what's below started as a coursework brief and turned into
            a full project once I got curious about doing it properly.
          </p>
        </div>

        <div className="about-grid">
          <Reveal className="panel">
            <h3>Contact</h3>
            <div className="spec-row"><span>Email</span><span>{profile.email}</span></div>
            <div className="spec-row"><span>Phone</span><span>{profile.phone}</span></div>
            <div className="spec-row"><span>Location</span><span>{profile.location}</span></div>
            <div className="spec-row">
              <span>GitHub</span>
              <a href={profile.gitHub} target="_blank" rel="noreferrer">
                {profile.gitHub.replace("https://github.com/", "")}
              </a>
            </div>
            <div className="spec-row">
              <span>LinkedIn</span>
              <a href={profile.linkedIn} target="_blank" rel="noreferrer">
                {profile.linkedIn.replace("https://linkedin.com/in/", "")}
              </a>
            </div>
          </Reveal>

          <Reveal className="panel" delay={100}>
            <h3>Languages</h3>
            {languages.map((lang) => (
              <div className="lang-row" key={lang.name}>
                <span className="lang-name">{lang.name}</span>
                <div className="lang-bar-track">
                  <div className="lang-bar-fill" style={{ width: `${(lang.level / 5) * 100}%` }} />
                </div>
              </div>
            ))}

            <h3 style={{ marginTop: 22 }}>Outside of code</h3>
            <div className="hobby-tags">
              {hobbies.map((hobby) => (
                <span className="tag" key={hobby}>{hobby}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
