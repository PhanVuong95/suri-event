import React, { useState } from "react";
import { Link } from "react-router-dom";
import qrCode from "./qrscan";
import { Scanner } from "@yudiel/react-qr-scanner";

const FooterPage: React.FunctionComponent = (props) => {
  return (
    <div className="w-full md:w-auto ">
      <ul className="flex items-center justify-around pb-2 px-2">
        <li className="card-footer">
          <Link
            to="/"
            className="flex flex-col justify-between items-center gap-2 text-footer"
            aria-current="page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
            >
              <g clipPath="url(#clip0_24_18)">
                <path
                  d="M12.8333 9.16664H9.16667C8.15558 9.16664 7.33333 9.98889 7.33333 11V14.6666C7.33333 15.6777 8.15558 16.5 9.16667 16.5H12.8333C13.8444 16.5 14.6667 15.6777 14.6667 14.6666V11C14.6667 9.98889 13.8444 9.16664 12.8333 9.16664ZM9.16667 14.6666V11H12.8333V14.6666H9.16667ZM20.1667 5.24697V1.83331C20.1667 1.32639 19.756 0.916641 19.25 0.916641C18.744 0.916641 18.3333 1.32639 18.3333 1.83331V4.00306L13.5639 0.783725C12.0065 -0.266775 9.9935 -0.266775 8.43608 0.783725L2.02033 5.11406C0.755333 5.96747 0 7.38648 0 8.91364V17.4166C0 19.9439 2.05608 22 4.58333 22H17.4167C19.9439 22 22 19.9439 22 17.4166V8.91364C22 7.46439 21.318 6.10956 20.1667 5.24697ZM20.1667 17.4166C20.1667 18.9328 18.9328 20.1666 17.4167 20.1666H4.58333C3.06717 20.1666 1.83333 18.9328 1.83333 17.4166V8.91364C1.83333 7.99789 2.28617 7.14631 3.04517 6.63481L9.46183 2.30447C9.92933 1.98822 10.4647 1.83056 11 1.83056C11.5353 1.83056 12.0707 1.98822 12.5382 2.30447L18.9548 6.63481C19.7138 7.14722 20.1667 7.99789 20.1667 8.91364V17.4166Z"
                  fill="#404040"
                />
              </g>
              <defs>
                <clipPath id="clip0_24_18">
                  <rect width="22" height="22" fill="white" />
                </clipPath>
              </defs>
            </svg>
            Trang chủ
          </Link>
        </li>
        <li className="card-footer">
          <Link
            to="event"
            className="flex flex-col justify-between items-center gap-2 text-footer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
            >
              <g clipPath="url(#clip0_24_22)">
                <path
                  d="M17.4167 1.83333H16.5V0.916667C16.5 0.410667 16.0893 0 15.5833 0C15.0773 0 14.6667 0.410667 14.6667 0.916667V1.83333H7.33333V0.916667C7.33333 0.410667 6.92267 0 6.41667 0C5.91067 0 5.5 0.410667 5.5 0.916667V1.83333H4.58333C2.05608 1.83333 0 3.88942 0 6.41667V17.4167C0 19.9439 2.05608 22 4.58333 22H17.4167C19.9439 22 22 19.9439 22 17.4167V6.41667C22 3.88942 19.9439 1.83333 17.4167 1.83333ZM4.58333 3.66667H17.4167C18.9328 3.66667 20.1667 4.9005 20.1667 6.41667V7.33333H1.83333V6.41667C1.83333 4.9005 3.06717 3.66667 4.58333 3.66667ZM17.4167 20.1667H4.58333C3.06717 20.1667 1.83333 18.9328 1.83333 17.4167V9.16667H20.1667V17.4167C20.1667 18.9328 18.9328 20.1667 17.4167 20.1667ZM15.0306 14.0727C15.0306 14.4201 14.7886 14.7125 14.5118 14.8665L13.0781 15.664L13.7143 17.3993C13.8371 17.7357 13.7262 18.1124 13.4402 18.3278C13.1477 18.5478 12.7444 18.5451 12.4548 18.3214L11.0284 17.2187L9.60208 18.3214C9.31242 18.5451 8.90908 18.5478 8.61667 18.3278C8.33067 18.1124 8.21975 17.7357 8.34258 17.3993L8.97875 15.664L7.54508 14.8665C7.26825 14.7125 7.02625 14.4201 7.02625 14.0727C7.02625 13.7784 7.282 13.453 7.69633 13.453H9.75608L10.3024 11.3602C10.3886 11.0284 10.6865 10.7974 11.0284 10.791C11.3703 10.7974 11.6683 11.0284 11.7544 11.3602L12.3007 13.453H14.3605C14.7748 13.453 15.0306 13.7775 15.0306 14.0727Z"
                  fill="#404040"
                />
              </g>
              <defs>
                <clipPath id="clip0_24_22">
                  <rect width="22" height="22" fill="white" />
                </clipPath>
              </defs>
            </svg>
            Sự kiện
          </Link>
        </li>
        <li className="card-footer">
          <Link
            to="/scanQr"
            className="flex flex-col justify-between items-center gap-0.5"
          >
            <div className="bg-[#FA7A87] scan-link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.1538 19.4571C18.8619 19.4571 19.4359 18.8815 19.4359 18.1714V16.1143C19.4359 15.6882 19.7803 15.3429 20.2051 15.3429C20.63 15.3429 20.9744 15.6882 20.9744 16.1143V18.1714C20.9744 19.7336 19.7116 21 18.1538 21H16.1026C15.6777 21 15.3333 20.6546 15.3333 20.2286C15.3333 19.8025 15.6777 19.4571 16.1026 19.4571H18.1538Z"
                  fill="white"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.1538 4.54286C18.8619 4.54286 19.4359 5.11849 19.4359 5.82857V7.88571C19.4359 8.31176 19.7803 8.65714 20.2051 8.65714C20.63 8.65714 20.9744 8.31176 20.9744 7.88571V5.82857C20.9744 4.26639 19.7116 3 18.1538 3H16.1026C15.6777 3 15.3333 3.34538 15.3333 3.77143C15.3333 4.19748 15.6777 4.54286 16.1026 4.54286H18.1538Z"
                  fill="white"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.84614 19.4571C5.13809 19.4571 4.56409 18.8815 4.56409 18.1714V16.1143C4.56409 15.6882 4.2197 15.3429 3.79486 15.3429C3.37003 15.3429 3.02563 15.6882 3.02563 16.1143V18.1714C3.02563 19.7336 4.28842 21 5.84614 21H7.89743C8.32226 21 8.66666 20.6546 8.66666 20.2286C8.66666 19.8025 8.32226 19.4571 7.89743 19.4571H5.84614Z"
                  fill="white"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.84614 4.54286C5.13809 4.54286 4.56409 5.11849 4.56409 5.82857V7.88572C4.56409 8.31176 4.2197 8.65714 3.79486 8.65714C3.37003 8.65714 3.02563 8.31176 3.02563 7.88572V5.82857C3.02563 4.2664 4.28842 3 5.84614 3H7.89743C8.32226 3 8.66666 3.34538 8.66666 3.77143C8.66666 4.19748 8.32226 4.54286 7.89743 4.54286H5.84614Z"
                  fill="white"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M22 12C22 12.426 21.6556 12.7714 21.2308 12.7714H2.76923C2.3444 12.7714 2 12.426 2 12C2 11.574 2.3444 11.2286 2.76923 11.2286H21.2308C21.6556 11.2286 22 11.574 22 12Z"
                  fill="white"
                />
              </svg>
            </div>
            <p className="scan-link-text">Scan</p>
          </Link>
        </li>
        <li className="card-footer">
          <Link
            to="gift-account"
            className="flex flex-col justify-between items-center gap-2 text-footer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
            >
              <g clipPath="url(#clip0_109_1531)">
                <path
                  d="M17.4167 5.50002H16.2928C17.5881 4.23502 17.7861 2.57127 16.7924 1.24669C16.2928 0.579356 15.5641 0.148523 14.74 0.0311894C13.9132 -0.0888939 13.0946 0.124689 12.4291 0.623356C11.8076 1.08902 11.3492 1.68211 11.011 2.28527C10.6728 1.68119 10.2144 1.08902 9.59292 0.623356C8.92742 0.123773 8.107 -0.0888939 7.28292 0.0311894C6.45883 0.148523 5.73008 0.580273 5.2305 1.24669C4.24233 2.56394 4.433 4.21669 5.73192 5.50002H4.58333C2.05608 5.50002 0 7.55611 0 10.0834V17.4167C0 19.9439 2.05608 22 4.58333 22H17.4167C19.9439 22 22 19.9439 22 17.4167V10.0834C22 7.55611 19.9439 5.50002 17.4167 5.50002ZM13.53 2.09002C13.7546 1.92136 14.0223 1.83336 14.2973 1.83336C14.6667 1.83336 15.1204 2.07261 15.3267 2.34669C15.9142 3.12952 15.3661 3.85369 15.0123 4.19194C13.5813 5.46152 12.0633 5.50002 11.9341 5.50094H11.9222C11.9396 5.41752 11.9451 5.33044 11.9377 5.24152L11.9359 5.22227C12.0175 4.67411 12.3585 2.96819 13.53 2.09002ZM7.03633 4.21302C6.65683 3.85094 6.10958 3.12952 6.69717 2.34577C6.90342 2.07169 7.20317 1.89386 7.54233 1.84527C7.88425 1.80127 8.21975 1.88469 8.49383 2.09002C9.66625 2.96911 10.0072 4.67686 10.0888 5.22136L10.087 5.24061C10.0797 5.32952 10.0852 5.41661 10.1026 5.50002H10.0907C9.96142 5.50002 8.44342 5.46061 7.03633 4.21302ZM4.58333 7.33244H9.922C9.23358 9.12086 6.5615 9.16486 6.41483 9.16577C5.90883 9.16577 5.49908 9.57644 5.49908 10.0824C5.49908 10.5884 5.90975 10.9991 6.41575 10.9991C7.71467 10.9991 9.80467 10.5518 10.9991 9.11444C12.1935 10.5527 14.2835 10.9991 15.5824 10.9991C16.0884 10.9991 16.4991 10.5894 16.4991 10.0824C16.4991 9.57552 16.0884 9.16577 15.5824 9.16577C15.4523 9.16577 12.7609 9.14194 12.0743 7.33244H17.4158C18.9319 7.33244 20.1658 8.56627 20.1658 10.0824V15.5824H1.83333V10.0824C1.83333 8.56627 3.06717 7.33244 4.58333 7.33244ZM17.4167 20.1658H4.58333C3.06717 20.1658 1.83333 18.9319 1.83333 17.4158H20.1667C20.1667 18.9319 18.9328 20.1658 17.4167 20.1658Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_109_1531">
                  <rect width="22" height="22" fill="white" />
                </clipPath>
              </defs>
            </svg>
            Quà tặng
          </Link>
        </li>
        <li className="card-footer">
          <Link
            to="timekeeping"
            className="flex flex-col justify-between items-center gap-2  text-footer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
            >
              <g clipPath="url(#clip0_18_831)">
                <path
                  d="M11 0C4.93442 0 0 4.93442 0 11C0 17.0656 4.93442 22 11 22C17.0656 22 22 17.0656 22 11C22 4.93442 17.0656 0 11 0ZM7.33333 19.4003V19.25C7.33333 17.2278 8.97783 15.5833 11 15.5833C13.0222 15.5833 14.6667 17.2278 14.6667 19.25V19.4003C13.5428 19.8926 12.3035 20.1667 11 20.1667C9.6965 20.1667 8.45717 19.8926 7.33333 19.4003ZM16.4312 18.3801C16.0133 15.7593 13.7372 13.75 11 13.75C8.26283 13.75 5.98767 15.7593 5.56875 18.3801C3.30458 16.709 1.83333 14.0232 1.83333 11C1.83333 5.9455 5.9455 1.83333 11 1.83333C16.0545 1.83333 20.1667 5.9455 20.1667 11C20.1667 14.0232 18.6954 16.709 16.4312 18.3801ZM11 4.58333C8.97783 4.58333 7.33333 6.22783 7.33333 8.25C7.33333 10.2722 8.97783 11.9167 11 11.9167C13.0222 11.9167 14.6667 10.2722 14.6667 8.25C14.6667 6.22783 13.0222 4.58333 11 4.58333ZM11 10.0833C9.98892 10.0833 9.16667 9.26108 9.16667 8.25C9.16667 7.23892 9.98892 6.41667 11 6.41667C12.0111 6.41667 12.8333 7.23892 12.8333 8.25C12.8333 9.26108 12.0111 10.0833 11 10.0833Z"
                  fill="#404040"
                />
              </g>
              <defs>
                <clipPath id="clip0_18_831">
                  <rect width="22" height="22" fill="white" />
                </clipPath>
              </defs>
            </svg>
            Tài khoản
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default FooterPage;
