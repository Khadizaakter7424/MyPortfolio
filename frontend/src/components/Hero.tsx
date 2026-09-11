import { Profile } from "../types";
import AnimatedNumber from "./AnimatedNumber";
import RoleTypewriter from "./RoleTypewriter";

type Stats = {
  projects: number;
  technologies: number;
  languages: number;
};

type Props = {
  profile: Profile;
  stats: Stats;
  techList: string[];
};

export default function Hero({ profile, stats, techList }: Props) {
  const firstName = profile.name.split(" ")[0];
  const tickerItems = [...techList, ...techList]; // duplicated for a seamless loop

  return (
    <section className="hero" id="top">
      <div className="container">
        <div className="hero-inner">
          <div>
            <div className="hero-kicker">Based in {profile.location}</div>
            <h1>
              <span className="line"><span className="line-inner">{firstName} builds on</span></span>
              <span className="line"><span className="line-inner">.NET, end to end.</span></span>
            </h1>
            <p className="hero-role"><RoleTypewriter text={profile.role} /></p>
            <p className="hero-objective">{profile.objective}</p>
            <div className="hero-actions">
              <a href="#lets-talk" className="btn btn-primary">Let's talk</a>
              <a href="#projects" className="btn btn-secondary">See projects</a>
              <a href={profile.gitHub} target="_blank" rel="noreferrer" className="btn btn-secondary">GitHub</a>
            </div>
          </div>

          <div className="hero-photo-wrap">
            <div className="hero-photo">
              <div className="hero-photo-img">
                <img src={profile.photoUrl} alt={`Portrait of ${profile.name}`} />
              </div>
            </div>
            {profile.statusMessage && (
              <div className="status-chip">
                <span className="status-dot" />
                {profile.statusMessage}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="ticker-strip">
        <div className="ticker-track">
          {tickerItems.map((item, i) => (
            <span key={`${item}-${i}`}>{item}</span>
          ))}
        </div>
      </div>

      <div className="stats-bar">
        <div className="stat">
          <div className="stat-value"><AnimatedNumber value={stats.projects} suffix="+" /></div>
          <div className="stat-label">Projects shipped</div>
        </div>
        <div className="stat">
          <div className="stat-value"><AnimatedNumber value={stats.technologies} suffix="+" /></div>
          <div className="stat-label">Technologies used</div>
        </div>
        <div className="stat">
          <div className="stat-value"><AnimatedNumber value={stats.languages} /></div>
          <div className="stat-label">Languages spoken</div>
        </div>
      </div>
    </section>
  );
}