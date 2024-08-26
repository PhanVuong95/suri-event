import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { BaseURL } from "../configs/base-config";
import moment from "moment";
import ModalPage from "../components/modal";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import ModalFalsePage from "../components/modalFalse";

// Định nghĩa interface cho các kiểu dữ liệu
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
  const [voteCount, setVoteCount] = useState<number>(0);
  const [kolsDetail, setKolsDetail] = useState<KolsDetail[]>([]);
  const [remainingVotes, setRemainingVotes] = useState<number>(0);
  const [historyKolsDetail, setHistoryKolsDetail] = useState<
    HistoryKolsDetail[]
  >([]);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [modalIFalsesOpen, setModalIsFalsesOpen] = useState<boolean>(false);

  // State for pagination
  const [currentPage, setCurrentPage] = useState<number>(0);
  const itemsPerPage = 10; // Number of items per page

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

  useEffect(() => {
    fetchKolsDetail();
  }, []);

  // console.log(historyKolsDetail);

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

  useEffect(() => {
    const fetchHistoryKolsDetail = async () => {
      const token = localStorage.token;

      try {
        const { data } = await axios.get(
          `https://checking-event.dion.vn/votingHistory/api/get-history-vote-by-id/${id}?page=${
            currentPage + 1
          }&limit=${itemsPerPage}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Lấy dữ liệu từ data.data[0] vì nó là mảng chứa mảng
        setHistoryKolsDetail(data.data[0] || []);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    fetchHistoryKolsDetail();
  }, [id, currentPage]);

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
        // setRemainingVotes((prev) => prev - 1);
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

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
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

  const pageCount = Math.ceil(historyKolsDetail.length / itemsPerPage);

  // console.log(kolsDetail);

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
                  <button
                    className="kols-detail-bop-button-2"
                    onClick={handleVote}
                  >
                    Bình chọn ngay (Còn lại: {remainingVotes}/3)
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="kols-detail-bop">
          <img src="https://dion.vn/wp-content/uploads/2024/07/Lich-su-binh-chon.png" />

          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
              <thead className="text-base bg-[#FF7991] font-normal text-white">
                <tr>
                  <th scope="col" className="p-1.5">
                    STT
                  </th>
                  <th scope="col" className="p-1.5">
                    Người bình chọn
                  </th>
                  <th scope="col" className="p-1.5">
                    Thời gian
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
                      {index + 1 + currentPage * itemsPerPage}
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

          <div className="list-data-1 flex justify-center mt-4">
            <ReactPaginate
              breakLabel={"..."}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              activeClassName={"active"}
              pageClassName={"page"}
              previousLabel={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                >
                  <path
                    d="M9.99999 4.42673L9.99999 11.8734C10.0008 12.0058 9.96208 12.1355 9.88888 12.2458C9.81568 12.3562 9.71127 12.4422 9.58898 12.493C9.46668 12.5438 9.33203 12.557 9.2022 12.5309C9.07237 12.5049 8.95324 12.4408 8.85999 12.3467L5.13999 8.62007C5.01582 8.49516 4.94613 8.32619 4.94613 8.15007C4.94613 7.97394 5.01582 7.80498 5.13999 7.68007L8.85999 3.9534C8.95324 3.85938 9.07237 3.79526 9.2022 3.76921C9.33203 3.74317 9.46668 3.75638 9.58898 3.80715C9.71127 3.85793 9.81568 3.94398 9.88888 4.05433C9.96208 4.16467 10.0008 4.29432 9.99999 4.42673Z"
                    fill="#FF7991"
                  />
                </svg>
              }
              nextLabel={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                >
                  <path
                    d="M6.00001 12.2666V4.81996C5.99924 4.68754 6.03792 4.5579 6.11112 4.44755C6.18432 4.3372 6.28873 4.25116 6.41102 4.20038C6.53332 4.1496 6.66797 4.13639 6.7978 4.16244C6.92763 4.18848 7.04676 4.25261 7.14001 4.34662L10.86 8.07329C10.9842 8.1982 11.0539 8.36717 11.0539 8.54329C11.0539 8.71942 10.9842 8.88838 10.86 9.01329L7.14001 12.74C7.04676 12.834 6.92763 12.8981 6.7978 12.9241C6.66797 12.9502 6.53332 12.937 6.41102 12.8862C6.28873 12.8354 6.18432 12.7494 6.11112 12.639C6.03792 12.5287 5.99924 12.399 6.00001 12.2666Z"
                    fill="#FF7991"
                  />
                </svg>
              }
            />
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
