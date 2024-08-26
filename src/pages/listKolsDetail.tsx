import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { BaseURL } from "../configs/base-config";

// Define the type for Kol
interface Kol {
  id: number;
  name: string;
  totalVotesPerKol: number;
  number: number;
  photo: string;
  catagoryId: number;
}

const ListKolsDetailPage: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const [openTab, setOpenTab] = useState<number>(2); // Default tab is Cục bông
  const [searchTerm, setSearchTerm] = useState<string>("");
  // Define state with types
  const [kols, setKols] = useState<Kol[]>([]);
  const [allKols, setAllKols] = useState<Kol[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(6);
  const [searchTimeout, setSearchTimeout] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);

  const handleBack = () => {
    navigate(-1);
  };

  const fetchDataKols = async () => {
    try {
      const { data } = await axios.get(`${BaseURL}kollist/api/listvm/`);
      setAllKols(data.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // console.log(allKols);

  const filterKols = (tabId: number) => {
    if (tabId === 2) {
      setKols(
        allKols
          .filter((kol) => kol.catagoryId === 1001)
          .sort((a, b) => b.totalVotesPerKol - a.totalVotesPerKol)
      );
    } else if (tabId === 3) {
      setKols(
        allKols
          .filter((kol) => kol.catagoryId === 1002)
          .sort((a, b) => b.totalVotesPerKol - a.totalVotesPerKol)
      );
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    fetchDataKols();
  }, []);

  useEffect(() => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    setSearchTimeout(
      setTimeout(() => {
        const filteredKols = allKols.filter((kol) =>
          kol.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setKols(filteredKols);
        filterKols(2);
      }, 1000)
    );

    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchTerm, allKols]);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  return (
    <div>
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
            Danh sách biệt đội KOLs nhí
          </h1>
        </div>
      </div>

      <div className="p-4">
        <form className="max-w-md mx-auto pb-[20px]">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <input
              type="search"
              id="default-search"
              value={searchTerm}
              onChange={handleSearch}
              className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-xl bg-gray-50 placeholder:text-[#000] focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Tìm kiếm"
              required
            />
            <div className="text-white absolute end-1.5 bottom-[5px] bg-[#FF7991]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm p-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M17.0413 16.4521L13.786 13.1968C14.7852 12.0575 15.3364 10.6159 15.3364 9.08643C15.3364 7.41691 14.6862 5.84749 13.5058 4.66707C12.3254 3.48665 10.7559 2.83643 9.08643 2.83643C7.41691 2.83643 5.84749 3.48665 4.66707 4.66707C3.48665 5.84749 2.83643 7.41691 2.83643 9.08643C2.83643 10.7559 3.48665 12.3254 4.66707 13.5058C5.84749 14.6862 7.41691 15.3364 9.08643 15.3364C10.6159 15.3364 12.0575 14.7852 13.1968 13.786L16.4521 17.0413C16.5335 17.1227 16.6401 17.1634 16.7467 17.1634C16.8534 17.1634 16.96 17.1227 17.0413 17.0413C17.2041 16.8786 17.2041 16.6149 17.0413 16.4521ZM5.25627 12.9166C4.23332 11.8934 3.66976 10.5332 3.66976 9.08643C3.66976 7.63969 4.23332 6.27942 5.25627 5.25627C6.27942 4.23332 7.63969 3.66976 9.08643 3.66976C10.5332 3.66976 11.8934 4.23332 12.9166 5.25627C13.9395 6.27942 14.5031 7.63969 14.5031 9.08643C14.5031 10.5332 13.9395 11.8934 12.9166 12.9166C11.8934 13.9395 10.5332 14.5031 9.08643 14.5031C7.63969 14.5031 6.27942 13.9395 5.25627 12.9166Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
        </form>

        <div className="list-kols">
          <div className="page-1">
            <div className="max-w-md mx-auto">
              <div className="mb-4 flex space-x-4 ">
                <button
                  onClick={() => {
                    setOpenTab(2);
                    filterKols(2);
                  }}
                  className={`flex-1 py-2 px-[24px] font-semibold rounded-md text-base focus:outline-none focus:shadow-outline-blue transition-all duration-300 ${
                    openTab === 2
                      ? "bg-[#FF7991] text-white font-semibold"
                      : "bg-[#E9E9E9]"
                  }`}
                >
                  KOLs Nhí
                </button>

                <button
                  onClick={() => {
                    setOpenTab(3);
                    filterKols(3);
                  }}
                  className={`flex-1 py-2 px-[24px] font-semibold rounded-md text-base focus:outline-none focus:shadow-outline-blue transition-all duration-300 ${
                    openTab === 3
                      ? "bg-[#FF7991] text-white font-semibold"
                      : "bg-[#E9E9E9]"
                  }`}
                >
                  Biệt Đội
                </button>
              </div>

              <div className="flex flex-col gap-4 items-center">
                {kols.slice(0, visibleCount).map((kol, index) => (
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
                {visibleCount < kols.length && (
                  <button onClick={handleLoadMore} className="button-voted-1">
                    Xem thêm
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListKolsDetailPage;
