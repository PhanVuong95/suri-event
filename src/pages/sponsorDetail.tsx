import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Page, useNavigate } from "zmp-ui";
import { Images } from "../assets/images";
import { BaseURL } from "../configs/base-config";
const SponsorDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [sponsor, setSponsor] = useState([]);

  useEffect(() => {
    fetchEventData();
  }, []);

  const fetchEventData = async () => {
    const token = localStorage.token;

    try {
      const { data } = await axios.get(
        `https://checking-event.dion.vn/sponsor/api/detail/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSponsor(data.data);
      // console.log(data.data);
    } catch (error) {
      console.error("Error fetching event:", error);
    }
  };
  // console.log(sponsor);

  return (
    <Page className="">
      <div className="container">
        {sponsor?.map((item, i) => {
          // console.log(item.photo)
          // Format the date
          const formattedDate = moment(item.startDate).format(
            "DD/MM/YYYY - HH:mm"
          );
          return (
            <div className="sponsor-container" key={i}>
              <div
                className="sponsor-banner h-[50vh] bg-contain bg-center relative bg-no-repeat"
                style={{ backgroundImage: `url(${BaseURL}${item.photo})` }}
              >
                <div className="flex items-center max-w-[343px] w-[100%] h-10vh rounded-lg bg-white shadow-md absolute -bottom-10 left-5 ">
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
                          <g clip-path="url(#clip0_24_1022)">
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
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
                    <div className=" text-gray-600 font-quicksand text-sm ">
                      {formattedDate}
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-[70px] text-black font-quicksand text-base px-5 text-justify bg-white">
                <div className="font-bold font-quicksand text-center pb-4">
                  Thông tin chi tiết
                </div>
                <p>{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Page>
  );
};

export default SponsorDetail;
