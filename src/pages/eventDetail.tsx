import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Page } from "zmp-ui";
import LoginModal from "../components/LoginModal";
import { BaseURL } from "../configs/base-config";

interface Event {
  startDate: string;
  photo: string;
  name: string;
  info: string;
  eventStatusName: string;
  id: string;
  isSender: boolean;
  images: string;
  description: string;
}

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event[]>([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  useEffect(() => {
    fetchEventData();
  }, []);

  const fetchEventData = async () => {
    const token = localStorage.token;

    try {
      const { data } = await axios.get(
        `https://checking-event.dion.vn/event/api/detail-event/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEvent(data.data);
    } catch (error) {
      console.error("Error fetching event:", error);
    }
  };

  return (
    <Page className="">
      <div className="header-top-1">
        <div className="w-[100%]">
          <h1 className="text-black text-lg font-bold text-center">
            Chi tiết sự kiện
          </h1>
        </div>
      </div>

      <div className="container">
        {event?.map((item, i) => {
          // Format the date
          const formattedDate = moment(item.startDate).format(
            "DD.MM.YYYY - HH:mm"
          );
          const imageURL = `${BaseURL}${item.photo}`;
          return (
            <div className="sponsor-container" key={i}>
              <div
                className={`sponsor-banner h-[50vh] bg-cover bg-center relative bg-[url(${BaseURL}${item.photo})]`}
                style={{
                  backgroundImage: `url(${BaseURL}${item.photo})`,
                }}
              >
                <div className="flex items-center w-[90vw] h-10vh rounded-lg bg-white shadow-md absolute -bottom-20 left-5">
                  <div className="info flex-grow mx-4 my-2">
                    <div className="title text-black font-quicksand font-semibold text-lg ">
                      {item.name}
                    </div>
                    <div className="flex items-center text-black font-quicksand text-base">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="15"
                          viewBox="0 0 14 15"
                          fill="none"
                        >
                          <g clipPath="url(#clip0_24_1022)">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M6.99981 1.09729C4.2053 1.09729 1.93311 3.36948 1.93311 6.164C1.93311 7.59036 2.68973 8.98324 3.65468 10.3388C4.61964 11.6944 5.80994 13.0209 6.74747 14.2709C6.85259 14.4107 7.05113 14.4388 7.19093 14.3337C7.2147 14.3158 7.23583 14.2947 7.2537 14.2709C8.19123 13.0209 9.38122 11.6944 10.3462 10.3388C11.3111 8.98324 12.0668 7.59036 12.0668 6.164C12.0668 3.36948 9.79433 1.09729 6.99981 1.09729ZM7.00043 3.63033C8.39956 3.63033 9.53378 4.76455 9.53378 6.16369C9.53378 7.56282 8.39956 8.69704 7.00043 8.69704C5.6013 8.69704 4.46708 7.56282 4.46708 6.16369C4.46708 4.76455 5.6013 3.63033 7.00043 3.63033Z"
                              fill="black"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_24_1022">
                              <rect
                                width="14"
                                height="14"
                                fill="white"
                                transform="translate(0 0.747314)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </span>
                      <span>{item.info}</span>
                    </div>
                    <div className="flex justify-between">
                      <div className="font-bold font-quicksand text-pink-400">
                        {formattedDate}
                      </div>
                      <div className="font-semibold font-quicksand text-teal-600">
                        {item.eventStatusName}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 justify-between h-[4.5vh] mt-2">
                      <div className="rounded-lg border font-normal border-gray-200 shadow-md flex items-center justify-center">
                        <Link
                          to={`/invitation-ticket/${item.id}`}
                          style={{
                            pointerEvents: item.isSender ? "auto" : "none",
                          }}
                        >
                          <span className="text-xs flex justify-between items-center ">
                            <div className="mr-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="17"
                                viewBox="0 0 16 17"
                                fill="none"
                              >
                                <g clipPath="url(#clip0_24_1811)">
                                  <path
                                    d="M1.04774 7.36486L1.04775 7.36484L1.04549 7.36427C0.777449 7.29756 0.539158 7.14371 0.368028 6.9269C0.196994 6.7102 0.102725 6.44287 0.0999996 6.16683L0.0999996 6.08071C0.101043 5.22348 0.442037 4.40166 1.04819 3.7955C1.65436 3.18934 2.4762 2.84834 3.33345 2.84731L14 2.84731C14.5039 2.84731 14.9872 3.04749 15.3435 3.40381C15.6998 3.76013 15.9 4.2434 15.9 4.74731L15.9 6.16686C15.8973 6.44288 15.803 6.71021 15.632 6.9269C15.4608 7.14371 15.2226 7.29756 14.9545 7.36427L14.9545 7.36425L14.9523 7.36486C14.6492 7.44784 14.3818 7.62808 14.1913 7.87786C14.0007 8.12764 13.8974 8.43313 13.8974 8.74731C13.8974 9.0615 14.0007 9.36699 14.1913 9.61677C14.3818 9.86655 14.6492 10.0468 14.9523 10.1298L14.9523 10.1298L14.9545 10.1304C15.2226 10.1971 15.4608 10.3509 15.632 10.5677C15.803 10.7844 15.8973 11.0517 15.9 11.3278L15.9 12.7473C15.9 13.2512 15.6998 13.7345 15.3435 14.0908C14.9872 14.4471 14.5039 14.6473 14 14.6473L3.33339 14.6473C2.47616 14.6463 1.65434 14.3053 1.04819 13.6991C0.442023 13.093 0.101027 12.2711 0.0999998 11.4139L0.0999999 11.3278C0.102725 11.0518 0.196994 10.7844 0.368028 10.5677C0.539159 10.3509 0.777449 10.1971 1.04549 10.1304L1.04549 10.1304L1.04774 10.1298C1.35078 10.0468 1.61815 9.86655 1.80874 9.61677C1.99932 9.36699 2.10256 9.0615 2.10256 8.74731C2.10256 8.43313 1.99932 8.12764 1.80874 7.87786C1.61815 7.62808 1.35078 7.44784 1.04774 7.36486ZM14.7666 4.75025L14.7667 4.75025L14.7667 4.74731C14.7667 4.54398 14.6859 4.34898 14.5421 4.2052C14.3983 4.06142 14.2033 3.98065 14 3.98065L11.3333 3.98065L11.2333 3.98065L11.2333 4.08065L11.2333 5.41398C11.2333 5.56427 11.1736 5.7084 11.0674 5.81467C10.9611 5.92095 10.817 5.98065 10.6667 5.98065C10.5164 5.98065 10.3722 5.92095 10.266 5.81467C10.1597 5.7084 10.1 5.56427 10.1 5.41398L10.1 4.08065L10.1 3.98065L10 3.98065L3.33333 3.98065C2.77638 3.98065 2.24224 4.2019 1.84841 4.59572C1.45458 4.98955 1.23333 5.52369 1.23333 6.08065L1.23333 6.15198L1.23333 6.22837L1.30703 6.24846C1.85663 6.39831 2.34224 6.72359 2.68997 7.17482C3.03758 7.62591 3.22837 8.17818 3.23333 8.74765C3.23227 9.3092 3.04755 9.85501 2.70734 10.3018C2.36703 10.7487 1.88983 11.072 1.34858 11.2223L1.30292 11.235L1.28382 11.2783L1.24182 11.3737L1.23333 11.3929L1.23333 11.414C1.23333 11.9709 1.45458 12.5051 1.84841 12.8989C2.24224 13.2927 2.77638 13.514 3.33333 13.514L10 13.514L10.1 13.514L10.1 13.414L10.1 12.0806C10.1 11.9304 10.1597 11.7862 10.266 11.68C10.3722 11.5737 10.5164 11.514 10.6667 11.514C10.817 11.514 10.9611 11.5737 11.0674 11.68C11.1736 11.7862 11.2333 11.9304 11.2333 12.0806L11.2333 13.414L11.2333 13.514L11.3333 13.514L14 13.514C14.2033 13.514 14.3983 13.4332 14.5421 13.2894C14.6859 13.1457 14.7667 12.9506 14.7667 12.7473L14.7667 11.3273L14.7667 11.2499L14.6918 11.2305C14.1449 11.0887 13.6601 10.7704 13.3125 10.325C12.9649 9.87956 12.774 9.33191 12.7694 8.76694C12.7648 8.20198 12.9468 7.65129 13.287 7.20026C13.6273 6.74923 14.1068 6.42307 14.6513 6.27236L14.7225 6.25267L14.7246 6.17892L14.7666 4.75025Z"
                                    fill="black"
                                    stroke="white"
                                    strokeWidth="0.2"
                                  />
                                  <path
                                    d="M10 8.08065V9.41398C10 9.59079 10.0702 9.76036 10.1953 9.88539C10.3203 10.0104 10.4899 10.0807 10.6667 10.0807C10.8435 10.0807 11.013 10.0104 11.1381 9.88539C11.2631 9.76036 11.3333 9.59079 11.3333 9.41398V8.08065C11.3333 7.90384 11.2631 7.73427 11.1381 7.60925C11.013 7.48422 10.8435 7.41398 10.6667 7.41398C10.4899 7.41398 10.3203 7.48422 10.1953 7.60925C10.0702 7.73427 10 7.90384 10 8.08065Z"
                                    fill="black"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_24_1811">
                                    <rect
                                      width="16"
                                      height="16"
                                      fill="white"
                                      transform="translate(0 16.7473) rotate(-90)"
                                    />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                            Vé mời
                          </span>
                        </Link>
                      </div>

                      <Link
                        style={{
                          pointerEvents: item.isSender ? "auto" : "none",
                        }}
                        to={`/gift-event/${item.id}`}
                      >
                        <div className="rounded-lg border text-white h-[100%] font-semibold bg-pink-400 border-gray-200 shadow-md flex items-center justify-center">
                          <span className="text-xs">Xem quà</span>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-[15vh] text-black font-quicksand text-base px-5 text-justify bg-white">
                <div className="font-bold font-quicksand text-center pb-4">
                  Thông tin sự kiện
                </div>
                {item.images &&
                  JSON.parse(item.images).map((image, index) => (
                    <img
                      className="py-1"
                      key={index}
                      src={`${BaseURL}${image.image}`}
                      alt={`Image ${index}`}
                    />
                  ))}
                <p>{item.description}</p>
              </div>
              {item.eventStatusName !== "Đã diễn ra" &&
                item.eventStatusName !== "Đang diễn ra" && (
                  <div style={{ display: item.isSender ? "none" : "block" }}>
                    <Link to={`/dk/${item.id}`} className="button-event-detail">
                      Đăng ký tham gia
                    </Link>
                  </div>
                )}
            </div>
          );
        })}
      </div>
      {isLoginModalOpen && <LoginModal onClose={closeLoginModal} />}
    </Page>
  );
};

export default EventDetail;
