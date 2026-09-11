import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Download from "./components/Download";
import LetsTalk from "./components/LetsTalk";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import BackToTop from "./components/BackToTop";
import CustomCursor from "./components/CustomCursor";
import { fetchPortfolioData } from "./api/portfolio";
import { PortfolioData } from "./types";

type LoadState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; data: PortfolioData };

export default function App() {
  const [state, setState] = useState<LoadState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;

    fetchPortfolioData()
      .then((data) => {
        if (!cancelled) setState({ status: "ready", data });
      })
      .catch(() => {
        if (!cancelled) {
          setState({
            status: "error",
            message: "Couldn't load portfolio content. Make sure the backend API is running."
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (state.status === "loading") {
    return (
      <div className="page-status">
        <CustomCursor />
        <p>Loading…</p>
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="page-status">
        <CustomCursor />
        <p>{state.message}</p>
      </div>
    );
  }

  const { data } = state;

  const techList = Array.from(new Set(data.skills.flatMap((g) => g.items)));
  const stats = {
    projects: data.projects.length,
    technologies: techList.length,
    languages: data.languages.length
  };

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <Navbar name={data.profile.name} />
      <Hero profile={data.profile} stats={stats} techList={techList} />
      <About profile={data.profile} languages={data.languages} hobbies={data.hobbies} />
      <Skills groups={data.skills} />
      <Projects projects={data.projects} />
      <Education education={data.education} training={data.training} />
      <Download />
      <LetsTalk profile={data.profile} />
      <Footer name={data.profile.name} />
      <BackToTop />
    </>
  );
}