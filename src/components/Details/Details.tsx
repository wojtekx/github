import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import IResult from "./Details.d";
import "./Details.scss";

const Details = () => {
  const [results, setResults] = useState({} as IResult);
  const [empty, setEmpty] = useState("");

  const fetchData = useCallback(async () => {
    const name = window.location.pathname;

    setResults({} as IResult);
    setEmpty("ładowanie..");
    try {
      const { data } = await axios.get(`https://api.github.com/repos${name}`);
      setResults(data);

      if (!data.items.length) setEmpty("Nic nie znaleziono");
    } catch (err) {
      setEmpty("wystąpił błąd.. spróbuj jeszcze raz");
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      {results ? (
        <section className="details">
          <div className="owner">
            <img
              className="ownerImg"
              src={results.owner?.avatar_url}
              alt="logo"
            />
            <div className="ownerName">
              <h1>{results.full_name}</h1>
              <p>by {results.owner?.login}</p>
            </div>
          </div>
          <div className="about">
            <h2>About</h2>
            <p>{results.description}</p>
            <a
              className="anchor"
              href={results.homepage}
              target="_blank"
              rel="noreferrer"
            >
              {`${results.homepage && results.homepage.substr(8)}`}
            </a>
            <p>
              <span>{results.license && results.license.name}</span>
            </p>
            <div className="topics">
              {results.topics?.map((topic) => (
                <a
                  className="topic"
                  href={`https://github.com/topics/${topic}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {topic}
                </a>
              ))}
            </div>
          </div>
        </section>
      ) : (
        empty
      )}
      <NavLink className="btn" to="/">
        powrót
      </NavLink>
    </div>
  );
};

export default Details;
