import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { BaseURL } from "../configs/base-config";

const ListsAccountGiftPage: React.FunctionComponent = (props) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const [accountGift, setAccountGift] = useState([]);

  useEffect(() => {
    fetchEventData();
  }, []);

  const fetchEventData = async () => {
    const token = localStorage.token;

    try {
      const { data } = await axios.get(
        `https://checking-event.dion.vn/AccountGift/api/AccountGift`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAccountGift(data.data);
      // console.log(data);
    } catch (error) {
      console.error("Error fetching event:", error);
    }
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
            Quà của bạn
          </h1>
        </div>
      </div>

      <div className="container-gift p-4">
        {accountGift.length === 0 ? (
          <div className="no-gift-container">
            <img
              src="https://cdn.icon-icons.com/icons2/1237/PNG/512/1492719677-no-gift-96_83654.png"
              alt="No Gifts"
            />
          </div>
        ) : (
          accountGift?.map((item, i) => {
            // Format the date
            const formattedDate = moment(item.startDate).format(
              "DD.MM.YYYY - HH:mm"
            );

            // Format the price
            const formattedPrice = new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(item.price);
            return (
              <div className="card-gift">
                <div className="card-gift-top">
                  <img src={`${BaseURL}${item.eventPhoto}`} />
                  <div className="card-gift-top-title">
                    <h1 className="text-black text-lg font-bold">
                      {item.eventGiftName}
                    </h1>
                    <p className="text-title-top">
                      Trị giá lên đến:{" "}
                      <span className="text-[#FA7A87;] pl-[5px]">
                        {formattedPrice}
                      </span>
                    </p>
                    <p className="text-title-bot">Đã nhận</p>
                  </div>
                </div>
                <div className="card-gift-bot">
                  <img src={`${BaseURL}${item.photo}`} />
                  <div className="card-gift-top-title">
                    <h1 className="text-black text-[14px] font-bold">
                      {item.eventName}
                    </h1>
                    <p className="text-title-top">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={12}
                        height={13}
                        viewBox="0 0 12 13"
                        fill="none"
                        className="pr-[5px]"
                      >
                        <g clipPath="url(#clip0_109_2033)">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.99963 1.03748C3.60433 1.03748 1.65674 2.98507 1.65674 5.38037C1.65674 6.60296 2.30527 7.79686 3.13238 8.9588C3.95948 10.1207 4.97974 11.2577 5.78333 12.3292C5.87344 12.449 6.04362 12.4731 6.16344 12.383C6.18382 12.3676 6.20193 12.3495 6.21725 12.3292C7.02085 11.2577 8.04084 10.1207 8.86794 8.9588C9.69505 7.79686 10.3428 6.60296 10.3428 5.38037C10.3428 2.98507 8.39493 1.03748 5.99963 1.03748ZM6.00016 3.20866C7.19942 3.20866 8.17161 4.18085 8.17161 5.3801C8.17161 6.57936 7.19942 7.55155 6.00016 7.55155C4.8009 7.55155 3.82871 6.57936 3.82871 5.3801C3.82871 4.18085 4.8009 3.20866 6.00016 3.20866Z"
                            fill="black"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_109_2033">
                            <rect
                              width={12}
                              height={12}
                              fill="white"
                              transform="translate(0 0.737427)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                      <p>{item.eventInfo}</p>
                    </p>
                    <p className="text-title-bot">{formattedDate}</p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ListsAccountGiftPage;
