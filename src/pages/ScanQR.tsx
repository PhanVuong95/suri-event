import React, { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { Page } from "zmp-ui";
import { useNavigate } from "react-router";
import "/src/css/qr.css";
import axios from "axios";
import { toast } from "react-toastify";

const ScanQRPage: React.FunctionComponent = (props) => {
  const navigate = useNavigate();
  const [lastScanTime, setLastScanTime] = useState<number | null>(
    localStorage.getItem("lastScanTime")
      ? parseInt(localStorage.getItem("lastScanTime")!)
      : null
  );

  const handleBack = () => {
    navigate(-1);
  };

  const handleFormSubmit = async (tokenResult: string) => {
    const tokenAc = localStorage.token;

    try {
      await axios.post(
        "https://checking-event.dion.vn/eventAccountCheckin/api/ScanQRCode",
        {
          token: tokenResult,
          Latitude: "",
          Longitude: "",
        },
        {
          headers: {
            Authorization: `Bearer ${tokenAc}`,
            "Content-Type": "application/json",
          },
        }
      );

      const currentTime = new Date().getTime();
      localStorage.setItem("lastScanTime", currentTime.toString());
      setLastScanTime(currentTime);

      if (lastScanTime && currentTime - lastScanTime < 30 * 60 * 1000) {
        // If less than 30 minutes since last scan
        toast.success("Bạn đã quét mã thành công để nhận quà!");
      } else {
        // If more than 30 minutes since last scan
        toast.success("Bạn đã quét mã thành công!");
      }
    } catch (error) {
      console.error("Error submitting registration:", error);
      // Handle error, show a message to the user, etc.
    }
  };

  return (
    <div className="bg-[#fff] h-[79vh]">
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
          <h1 className="text-black text-lg font-bold text-center">Quét QR</h1>
        </div>
      </div>
      <div className="scan-qr-container">
        <Scanner
          onResult={(text, result) => {
            if (result) {
              const tokenResult = result?.text;
              handleFormSubmit(tokenResult);
              navigate("/");
            }
          }}
          onError={(error) => console.log(error?.message)}
        />
      </div>
    </div>
  );
};
export default ScanQRPage;
