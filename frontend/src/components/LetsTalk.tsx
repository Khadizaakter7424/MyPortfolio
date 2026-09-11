import { FormEvent, useState } from "react";
import { Profile } from "../types";
import { sendContactMessage } from "../api/contact";
import { API_BASE_URL } from "../api/config";
import Reveal from "./Reveal";

type Props = {
  profile: Profile;
};

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "success" }
  | { state: "error"; errors: string[] };

export default function LetsTalk({ profile }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus({ state: "sending" });

    const result = await sendContactMessage({ name, email, subject, message });

    if (result.ok) {
      setStatus({ state: "success" });
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } else {
      setStatus({ state: "error", errors: result.errors });
    }
  }

  return (
    <section id="lets-talk">
      <div className="container">
        <div className="section-head">
          <span className="section-index">06</span>
          <h2>Have a role, a project, or a question?</h2>
          <p>Send a message below — it comes straight to me — or reach out directly.</p>
        </div>

        <div className="talk-grid">
          <Reveal className="talk-card">
            <div className="talk-card-photo">
              <img src={`${API_BASE_URL}${profile.photoUrl}`} alt={profile.name} />
            </div>
            <div>
              <p className="timeline-title" style={{ color: "var(--bg)" }}>{profile.name}</p>
              <p className="timeline-place" style={{ color: "rgba(250,250,248,0.6)" }}>{profile.role}</p>
            </div>

            <div className="talk-info-item">
              <span className="talk-info-label">Email</span>
              <span className="talk-info-value">{profile.email}</span>
            </div>
            <div className="talk-info-item">
              <span className="talk-info-label">Phone</span>
              <span className="talk-info-value">{profile.phone}</span>
            </div>
            <div className="talk-info-item">
              <span className="talk-info-label">Based in</span>
              <span className="talk-info-value">{profile.location}</span>
            </div>
            <div className="talk-info-item">
              <span className="talk-info-label">LinkedIn</span>
              <a className="talk-info-value" href={profile.linkedIn} target="_blank" rel="noreferrer">
                {profile.linkedIn.replace("https://linkedin.com/in/", "")}
              </a>
            </div>
          </Reveal>

          <Reveal className="talk-form" as="article" delay={120}>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="name">Your name</label>
                  <input
                    id="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                  />
                  <span className="field-underline" />
                </div>
                <div className="form-field">
                  <label htmlFor="email">Your email</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@company.com"
                  />
                  <span className="field-underline" />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="subject">Subject (optional)</label>
                <input
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Junior .NET developer role"
                />
                <span className="field-underline" />
              </div>

              <div className="form-field">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me a bit about the opportunity or question..."
                />
                <span className="field-underline" />
              </div>

              {status.state === "success" && (
                <div className="form-status success">
                  Thanks — your message is on its way. I'll get back to you soon.
                </div>
              )}
              {status.state === "error" && (
                <div className="form-status error">{status.errors.join(" ")}</div>
              )}

              <button type="submit" className="btn btn-primary" disabled={status.state === "sending"}>
                {status.state === "sending" ? "Sending…" : "Send message"}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
