import React from "react";
import { useNavigate } from "react-router";

const ProcedurePage: React.FunctionComponent = (props) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
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
            Quy trình bình chọn
          </h1>
        </div>
      </div>
      <div className="page flex flex-col gap-4">
        <h3 className="text-[#FF7991] text-base font-bold">Bước 1:</h3>
        <p className="text-[#000] text-base font-normal">
          Truy cập vào cổng bình chọn Biệt Đội KOLs Nhí 2024 qua mã QR code hoặc
          qua đường link:{" "}
          <a
            className="font-semibold text-[#FF7991]"
            href="https://zalo.me/s/3969538154593994371/"
          >
            Suristore Events
          </a>
        </p>
        <img
          src="https://dion.vn/wp-content/uploads/2024/09/qr-suri.png"
          className="w-fwll aspect-square"
        />

        <h3 className="text-[#FF7991] text-base font-bold">Bước 2:</h3>
        <p className="text-[#000] text-base font-normal">
          Tại danh sách bình chọn, tìm kiếm thí sinh yêu thích, nhấn nút "Bình
          chọn" để truy cập vào trang bình chọn của thí sinh.
        </p>

        <h3 className="text-[#FF7991] text-base font-bold">Bước 3:</h3>
        <p className="text-[#000] text-base font-normal">
          Nhấn vào "Bình chọn ngay" để bình chọn cho thí sinh mình yêu thích
        </p>

        <h3 className="text-[#000] text-base font-bold">Lưu ý:</h3>

        <ul className="list-disc pl-4">
          <li>
            <p className="font-normal text-base text-[#000] text-justify">
              Mỗi lượt bình chọn tương ứng với 1 điểm
            </p>
          </li>
          <li>
            <p className="font-normal text-base text-[#000] text-justify">
              Mỗi tài khoản được bình chọn 3 lượt/ngày
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProcedurePage;
