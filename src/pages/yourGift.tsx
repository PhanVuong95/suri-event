import React from "react";
import { Page, useNavigate } from "zmp-ui";
import { Images } from "../assets/images";
const YourGift = () => {
  const navigate = useNavigate();
  const imageUrl = Images.event;
  const gift = Images.gift;
  return (
    <Page className="">
      <div className="gift_container">
        <div className="container">
          <div className="grid grid-rows-2  items-center w-[90vw] h-10vh rounded-lg bg-white m-4 justify-center">
            <div className="grid grid-cols-3 flex-grow gap-2">
              <div
                className="rounded-lg bg-cover"
                style={{ backgroundImage: `url(${gift})` }}
              ></div>
              <div className="col-span-2">
                <div className="flex-grow">
                  <div className="title text-black font-quicksand font-semibold text-lg ">
                    Quà tặng khi check in
                  </div>
                  <div className="flex items-center text-black font-quicksand text-sm">
                    <span>Trị giá lên đến:</span>
                    <div className="font-bold mx-1 font-quicksand text-pink-400">
                      {" "}
                      10.000.000 đ
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-sm font-quicksand text-teal-600">
                      Đã nhận
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[85vw] h-10vh bg-pink-100 mlr-2 mb-2 rounded-lg">
              <div className="grid grid-cols-4 flex-grow mx-2 gap-2 my-2">
                <div
                  className="rounded-lg bg-cover"
                  style={{ backgroundImage: `url(${imageUrl})` }}
                ></div>
                <div className="col-span-3">
                  <div className="flex-grow">
                    <div className="title text-black font-quicksand font-semibold text-sm ">
                      Sự kiện cộng đồng 18.03
                    </div>
                    <div className="flex items-center text-black font-quicksand text-sm">
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
                      <span>Thanh xuân, Hà Nội</span>
                    </div>
                    <div className="flex justify-between">
                      <div className="font-bold font-quicksand text-pink-400">
                        18.03.2024 - 21:00
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="grid grid-rows-2  items-center w-[90vw] h-10vh rounded-lg bg-white m-4 justify-center">
            <div className="grid grid-cols-3 flex-grow gap-2">
              <div
                className="rounded-lg bg-cover"
                style={{ backgroundImage: `url(${gift})` }}
              ></div>
              <div className="col-span-2">
                <div className="flex-grow">
                  <div className="title text-black font-quicksand font-semibold text-lg ">
                    Quà tặng khi check in
                  </div>
                  <div className="flex items-center text-black font-quicksand text-sm">
                    <span>Trị giá lên đến:</span>
                    <div className="font-bold mx-1 font-quicksand text-pink-400">
                      {" "}
                      10.000.000 đ
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-sm font-quicksand text-teal-600">
                      Đã nhận
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[85vw] h-10vh bg-pink-100 mlr-2 mb-2 rounded-lg">
              <div className="grid grid-cols-4 flex-grow mx-2 gap-2 my-2">
                <div
                  className="rounded-lg bg-cover"
                  style={{ backgroundImage: `url(${imageUrl})` }}
                ></div>
                <div className="col-span-3">
                  <div className="flex-grow">
                    <div className="title text-black font-quicksand font-semibold text-sm ">
                      Sự kiện cộng đồng 18.03
                    </div>
                    <div className="flex items-center text-black font-quicksand text-sm">
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
                      <span>Thanh xuân, Hà Nội</span>
                    </div>
                    <div className="flex justify-between">
                      <div className="font-bold font-quicksand text-pink-400">
                        18.03.2024 - 21:00
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="grid grid-rows-2  items-center w-[90vw] h-10vh rounded-lg bg-white m-4 justify-center">
            <div className="grid grid-cols-3 flex-grow gap-2">
              <div
                className="rounded-lg bg-cover"
                style={{ backgroundImage: `url(${gift})` }}
              ></div>
              <div className="col-span-2">
                <div className="flex-grow">
                  <div className="title text-black font-quicksand font-semibold text-lg ">
                    Quà tặng khi check in
                  </div>
                  <div className="flex items-center text-black font-quicksand text-sm">
                    <span>Trị giá lên đến:</span>
                    <div className="font-bold mx-1 font-quicksand text-pink-400">
                      {" "}
                      10.000.000 đ
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-sm font-quicksand text-teal-600">
                      Đã nhận
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[85vw] h-10vh bg-pink-100 mlr-2 mb-2 rounded-lg">
              <div className="grid grid-cols-4 flex-grow mx-2 gap-2 my-2">
                <div
                  className="rounded-lg bg-cover"
                  style={{ backgroundImage: `url(${imageUrl})` }}
                ></div>
                <div className="col-span-3">
                  <div className="flex-grow">
                    <div className="title text-black font-quicksand font-semibold text-sm ">
                      Sự kiện cộng đồng 18.03
                    </div>
                    <div className="flex items-center text-black font-quicksand text-sm">
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
                      <span>Thanh xuân, Hà Nội</span>
                    </div>
                    <div className="flex justify-between">
                      <div className="font-bold font-quicksand text-pink-400">
                        18.03.2024 - 21:00
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default YourGift;
