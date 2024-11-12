import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { BaseURL } from "../configs/base-config";
import moment from "moment";
import ModalPage from "../components/modal";
import { Link } from "react-router-dom";
import ModalFalsePage from "../components/modalFalse";

// Define interfaces for data types
interface KolsDetail {
  id: number;
  name: string;
  dob: string;
  address: string;
  number: string;
  totalVotesPerKol: number;
  photo: string;
}

interface HistoryKolsDetail {
  accountName: string;
  accountVotingId: string;
  voteDate: string;
}

const KolsDetailPage: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [kolsDetail, setKolsDetail] = useState<KolsDetail[]>([]);
  const [remainingVotes, setRemainingVotes] = useState<number>(0);
  const [historyKolsDetail, setHistoryKolsDetail] = useState<
    HistoryKolsDetail[]
  >([]);
  const [totalHistoryCount, setTotalHistoryCount] = useState<number>(0); // New state for total count
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [modalIFalsesOpen, setModalIsFalsesOpen] = useState<boolean>(false);

  const handleBack = () => {
    navigate(-1);
  };

  const fetchKolsDetail = async () => {
    const token = localStorage.token;

    try {
      const { data } = await axios.get(
        `https://checking-event.dion.vn/kolList/api/detail/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setKolsDetail(data.data);
    } catch (error) {
      console.error("Error fetching event:", error);
    }
  };

  console.log(kolsDetail[0]?.catagoryName);

  useEffect(() => {
    fetchKolsDetail();
  }, []);

  useEffect(() => {
    const fetchRemainingVotes = async () => {
      const token = localStorage.token;

      try {
        const { data } = await axios.get(
          `https://checking-event.dion.vn/kolVote/api/remaining-votes`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRemainingVotes(data.remainingVotes || 0);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    fetchRemainingVotes();
  }, []);

  const [pageIndex, setPageIndex] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const fetchHistoryKolsDetail = async () => {
    const token = localStorage.token;

    try {
      const { data } = await axios.get(
        `https://checking-event.dion.vn/votingHistory/api/listPaging-history-vote-by-id/${id}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setHistoryKolsDetail(data.data[0] || []);
      setTotalHistoryCount(data.totalCount || 0); // Set total count from response
    } catch (error) {
      console.error("Error fetching event:", error);
    }
  };

  useEffect(() => {
    fetchHistoryKolsDetail();
  }, [id, pageIndex, pageSize]);

  const handleVote = async () => {
    const token = localStorage.token;

    try {
      const response = await fetch(
        "https://checking-event.dion.vn/kolVote/api/vote-kol",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ AccountKolId: id }),
        }
      );

      if (response.ok) {
        setModalIsOpen(true);
      } else {
        console.error("Error voting: không thành công");
        setModalIsFalsesOpen(true);
      }
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalIsFalsesOpen(false);
    window.location.reload();
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    try {
      return moment(dateString).format("HH:mm - DD/MM/YYYY");
    } catch (error) {
      console.error("Invalid date format:", dateString);
      return "Invalid date";
    }
  };

  const handleNextPage = () => {
    setPageIndex((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    setPageIndex((prev) => (prev > 1 ? prev - 1 : 1));
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
            Thông tin KOLs nhí
          </h1>
        </div>
      </div>

      <div className="kols-detail">
        <div className="kols-detail-top">
          {kolsDetail.map((items) => {
            const formattedDate = moment(items.dob).format("YYYY");

            return (
              <div className="kols-detail-top-conten" key={items.id}>
                <img
                  src={`${BaseURL}${items.photo}`}
                  className="kols-detail-img"
                />
                <div className="kols-detail-top-conten-1 px-[20px]">
                  <div className="kols-detail-top-conten-title flex flex-col gap-4">
                    <h3 className="text-2xl font-medium uppercase">
                      {items.name}
                    </h3>
                    <div className="kols-detail-top-conten-2">
                      <div className="kols-detail-top-conten-left">
                        <p className="text-sm font-normal text-[#000]">
                          Số báo danh:{" "}
                          <span className="text-lg font-bold text-[#000]">
                            {items.number}
                          </span>
                        </p>

                        <p className="text-sm font-normal text-[#000]">
                          Năm sinh:{" "}
                          <span className="text-lg font-bold text-[#000]">
                            {formattedDate}
                          </span>
                        </p>

                        <p className="text-sm font-normal text-[#000] max-w-[175px]">
                          Quê quán:{" "}
                          <span className="text-lg font-bold text-[#000]">
                            {items.address}
                          </span>
                        </p>
                      </div>
                      <div className="kols-detail-top-conten-right">
                        <div className="kols-detail-top-conten-right-1">
                          <p className="text-sm font-normal text-[#000]">
                            Điểm bình chọn:
                          </p>
                          <span className="text-[24px] font-bold text-[#FF7991]">
                            {items.totalVotesPerKol}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="kols-detail-bop-conten">
                  <Link to="/procedure" className="kols-detail-bop-button-1">
                    Xem quy trình bình chọn
                  </Link>
                  {kolsDetail[0]?.catagoryName !== "KOLs Nhí" && (
                    <button
                      className="kols-detail-bop-button-2"
                      onClick={handleVote}
                    >
                      Bình chọn ngay (Còn lại: {remainingVotes}/3)
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="kols-detail-bop">
          <img src="https://dion.vn/wp-content/uploads/2024/07/Lich-su-binh-chon.png" />

          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr>
                  <th scope="col" className="px-2 py-3">
                    STT
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Tên tài khoản
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Thời gian bình chọn
                  </th>
                </tr>
              </thead>
              <tbody>
                {historyKolsDetail.map((item, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-custom-gradient"
                    } border-b`}
                  >
                    <th
                      scope="row"
                      className="p-[10px] font-normal text-sm text-[#000] whitespace-nowrap"
                    >
                      {index + 1}
                    </th>
                    <td className="p-[10px] font-normal text-sm text-[#000] overflow-hidden text-ellipsis whitespace-nowrap max-w-[160px] min-w-[138px]">
                      {item.accountName}
                    </td>
                    <td className="p-[10px] font-normal text-sm text-[#000]">
                      {formatDate(item.voteDate)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pagination">
            {/* Display total count */}
            <button
              className="previous"
              onClick={handlePreviousPage}
              disabled={pageIndex === 1}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
              >
                <path
                  d="M9.99999 12.3228L9.99999 4.87611C10.0008 4.74369 9.96208 4.61405 9.88888 4.5037C9.81568 4.39335 9.71127 4.30731 9.58898 4.25653C9.46668 4.20575 9.33203 4.19254 9.2022 4.21859C9.07237 4.24464 8.95324 4.30876 8.85999 4.40278L5.13999 8.12944C5.01582 8.25435 4.94613 8.42332 4.94613 8.59944C4.94613 8.77557 5.01582 8.94454 5.13999 9.06944L8.85999 12.7961C8.95324 12.8901 9.07237 12.9543 9.2022 12.9803C9.33203 13.0063 9.46668 12.9931 9.58898 12.9424C9.71127 12.8916 9.81568 12.8055 9.88888 12.6952C9.96208 12.5848 10.0008 12.4552 9.99999 12.3228Z"
                  fill="#FF7991"
                />
              </svg>
            </button>
            <div className="page-index">
              <p>Page: </p>
              <p className="page-index-p">{pageIndex}</p>
            </div>
            <button className="next" onClick={handleNextPage}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
              >
                <path
                  d="M6.00001 4.48289V11.9296C5.99924 12.062 6.03792 12.1916 6.11112 12.302C6.18432 12.4123 6.28873 12.4984 6.41102 12.5491C6.53332 12.5999 6.66797 12.6131 6.7978 12.5871C6.92763 12.561 7.04676 12.4969 7.14001 12.4029L10.86 8.67622C10.9842 8.55131 11.0539 8.38234 11.0539 8.20622C11.0539 8.0301 10.9842 7.86113 10.86 7.73622L7.14001 4.00955C7.04676 3.91553 6.92763 3.85141 6.7978 3.82537C6.66797 3.79932 6.53332 3.81253 6.41102 3.86331C6.28873 3.91408 6.18432 4.00013 6.11112 4.11048C6.03792 4.22082 5.99924 4.35047 6.00001 4.48289Z"
                  fill="#FF7991"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <ModalPage modalIsOpen={modalIsOpen} closeModal={closeModal} />
      <ModalFalsePage
        modalIFalsesOpen={modalIFalsesOpen}
        closeModal={closeModal}
      />
    </div>
  );
};

export default KolsDetailPage;
