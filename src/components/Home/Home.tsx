import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { nFormatter, parseTime } from "../../helpers/common";
import Star from "./Star";
import "./Home.scss";
import Pagination from "./Pagination";

const Home = (): JSX.Element => {
  const [results, setResults] = useState([]);
  const [empty, setEmpty] = useState("");
  const [name, setName] = useState("");
  const per_page = 25;

  const fetchData = useCallback(
    async (e) => {
      e.preventDefault();

      if (name.length) {
        setResults([]);
        setEmpty("ładowanie..");
        try {
          const { data } = await axios.get(
            `https://api.github.com/search/repositories?q=${name}&page=1&per_page=${per_page}`
          );
          setResults(data.items);

          if (!data.items.length) setEmpty("Nic nie znaleziono");
        } catch (err) {
          setEmpty("wystąpił błąd.. spróbuj jeszcze raz");
        }
      } else {
        return;
      }
    },
    [name]
  );

  const Project = ({ data }: any, key: number) => {
    const {
      full_name,
      stargazers_count,
      language,
      license,
      pushed_at,
      owner,
      name,
    } = data;

    return (
      <div className="project" key={key}>
        <Link className="link" to={`${owner.login}/${name}`}>
          {full_name}
        </Link>
        <div className="projectContent">
          <span>
            <Star />
            {nFormatter(stargazers_count, 0)}
          </span>
          <span>{language}</span>
          <span>{license && license["name"]}</span>
          <span>{parseTime(pushed_at)}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <form className="form" onSubmit={fetchData}>
        <input
          type="text"
          onChange={(e) => setName(e.target.value.trim())}
          placeholder={"search github"}
        />
        <button>Szukaj</button>
      </form>

      {results.length > 0 ? (
        <Pagination
          data={results}
          RenderComponent={Project}
          title="Github repos"
          pageLimit={5}
          dataLimit={5}
        />
      ) : (
        <h1>{empty}</h1>
      )}
    </div>
  );
};

export default Home;
