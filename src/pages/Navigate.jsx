import { Link } from "react-router-dom";
const Navigate = () => {
  return (
    <nav className="bg-black h-screen w-screen flex items-center justify-center flex-col">
      <Link to="/4.A">
        <button className="glow-on-hover" type="button">
          4 A
        </button>
      </Link>
      <Link to="/4.B">
        <button className="glow-on-hover" type="button">
          4 B
        </button>
      </Link>
      <Link to="/5.A">
        <button className="glow-on-hover" type="button">
          5 A
        </button>
      </Link>
      <Link to="/5.B">
        <button className="glow-on-hover" type="button">
          5 B
        </button>
      </Link>
      <Link to="/6.A">
        <button className="glow-on-hover" type="button">
          6 A
        </button>
      </Link>
    </nav>
  );
};
export default Navigate;
