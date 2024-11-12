import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { BaseURL } from "../configs/base-config";
import { Link } from "react-router-dom";

const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const fetchResults = async () => {
    try {
      const { data } = await axios.get(`${BaseURL}kollist/api/listvm`);
      setSearchResults(data.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const term = queryParams.get("search") || "";
    setSearchTerm(term);
    fetchResults();
  }, [location.search]);

  const filteredResults = searchResults.filter(
    (kol) =>
      kol.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kol.number.toString().includes(searchTerm)
  );

  return (
    <div className="search-page bg-[#fff]">
      <div className="header-top-1">
        <button className="back-header" onClick={handleBack}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={6}
            height={14}
            viewBox="0 0 6 14"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.39402 0.523893C5.70766 0.8239 5.75851 1.37111 5.5076 1.74612L1.99229 6.99998L5.5076 12.2538C5.75851 12.6289 5.70766 13.1761 5.39402 13.4761C5.08037 13.7761 4.62271 13.7153 4.37179 13.3403L0.493027 7.54319C0.280537 7.22561 0.280537 6.77435 0.493027 6.45677L4.37179 0.659696C4.62271 0.284687 5.08037 0.223886 5.39402 0.523893Z"
              fill="black"
            />
          </svg>
        </button>
        <div className="w-[80%]">
          <h1 className="text-black text-lg font-bold text-center">
            Danh sách tìm kiếm
          </h1>
        </div>
      </div>
      <div className="p-4 bg-[#fff] min-h-[83.5vh]">
        <h1 className="p-4">Kết quả tìm kiếm :</h1>
        <div className="search-results">
          {filteredResults.length > 0 ? (
            <ul>
              {filteredResults.map((kol, index) => (
                <div
                  className="card-kols w-full rounded-xl flex flex-row"
                  key={index}
                >
                  <div className="max-w-[150px]">
                    <img
                      className="w-full h-full rounded-xl"
                      src={`${BaseURL}${kol.photo}`}
                      alt={kol.name}
                    />
                  </div>
                  <div className="flex flex-col p-2">
                    <h3 className="text-lg font-semibold uppercase w-[172px]">
                      {kol.name}
                    </h3>
                    <div className="flex flex-row items-center justify-between">
                      <p className="text-sm font-normal">SBD: {kol.number}</p>
                      <p className="text-sm font-bold text-[#FF7991]">
                        XH: <span>{index + 1}</span>
                      </p>
                    </div>
                    <p className="text-sm font-normal">
                      Điểm bình chọn:{" "}
                      <span className="text-lg font-semibold uppercase text-[#FF7991]">
                        {kol.totalVotesPerKol}
                      </span>
                    </p>

                    <Link
                      to={`/kols-detail/${kol.id}`}
                      className="button-voted"
                    >
                      Bình chọn
                    </Link>
                  </div>
                </div>
              ))}
            </ul>
          ) : (
            <p>Không tìm thấy kết quả phù hợp.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
