type Props = {
  name: string;
};

export default function Footer({ name }: Props) {
  return (
    <footer>
      <div className="container">
        <span>© {new Date().getFullYear()} {name}</span>
        <span>
          Built with React + TypeScript, on an <a href="#top">ASP.NET Web API</a>
        </span>
      </div>
    </footer>
  );
}
