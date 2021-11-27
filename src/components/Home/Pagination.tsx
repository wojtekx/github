import { useMemo, useState } from "react";

const Pagination = ({
  data,
  RenderComponent,
  title,
  pageLimit,
  dataLimit,
}: {
  data: any[];
  RenderComponent: any;
  title: string;
  pageLimit: number;
  dataLimit: number;
}) => {
  const [pages] = useState(Math.round(data.length / dataLimit));
  const [currentPage, setCurrentPage] = useState(1);

  const goToNextPage = () => {
    setCurrentPage((page) => page + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage((page) => page - 1);
  };

  const changePage = (event: any) => {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  };

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return data.slice(startIndex, endIndex);
  };

  const getPaginationGroup = useMemo(() => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill(1).map((_, idx) => start + idx + 1);
  }, [currentPage, pageLimit]);

  return (
    <div>
      <h1>{title}</h1>

      <div className="dataContainer">
        {getPaginatedData().map((data, index) => (
          <RenderComponent key={index} data={data} />
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={goToPreviousPage}
          className={`prev ${currentPage === 1 ? "disabled" : ""}`}
          disabled={currentPage === 1}
        >
          PREV
        </button>

        {getPaginationGroup.map((item, index) => (
          <button
            key={index}
            onClick={changePage}
            className={`paginationItem ${
              currentPage === item ? "active" : null
            }`}
            disabled={currentPage === item}
          >
            <span>{item}</span>
          </button>
        ))}

        <button
          onClick={goToNextPage}
          className={`next ${currentPage === pages ? "disabled" : ""}`}
          disabled={currentPage === pages}
        >
          NEXT
        </button>
      </div>
    </div>
  );
};

export default Pagination;
