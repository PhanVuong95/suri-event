import React from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";

Modal.setAppElement("#app");

const ModalPage: React.FunctionComponent<{
  modalIsOpen: boolean;
  closeModal: () => void;
}> = ({ modalIsOpen, closeModal }) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-background-modal p-4"
    >
      <div className="w-full bg-white px-4 py-[19px] mx-auto rounded-xl">
        <div className="w-full">
          <div className="mx-auto flex flex-col items-center gap-[32px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="117"
              height="115"
              viewBox="0 0 117 115"
              fill="none"
            >
              <g clip-path="url(#clip0_429_1027)">
                <g>
                  <path
                    d="M60.431 115C89.0324 115 112.218 92.4114 112.218 64.5471C112.218 36.6827 89.0324 14.0942 60.431 14.0942C31.8296 14.0942 8.64355 36.6827 8.64355 64.5471C8.64355 92.4114 31.8296 115 60.431 115Z"
                    fill="#0D9E00"
                  />
                </g>
                <path
                  d="M89.6684 92.6723C109.741 72.9872 110.764 41.4134 91.9543 22.1503C73.1443 2.8872 41.6239 3.22934 21.5514 22.9145C1.47898 42.5996 0.455532 74.1734 19.2655 93.4365C38.0755 112.7 69.5959 112.357 89.6684 92.6723Z"
                  fill="#0FBC00"
                />
                <path
                  d="M83.8686 92.6718C103.941 72.9867 104.964 41.4129 86.1545 22.1498C67.3445 2.88672 35.8241 3.22886 15.7516 22.914C-4.32083 42.5992 -5.34427 74.173 13.4657 93.436C32.2757 112.699 63.7961 112.357 83.8686 92.6718Z"
                  fill="#0D9E00"
                />
                <g>
                  <path
                    d="M39.6175 81.2939L24.7122 66.6976C21.5181 63.5703 21.6228 58.3896 24.9404 55.3949L25.449 54.9354C28.4806 52.1973 33.1136 52.2921 36.0328 55.1507L42.2652 61.2537C44.2228 63.171 47.3301 63.2346 49.3634 61.3976L72.8482 40.1964C75.8797 37.4594 80.5128 37.5531 83.4309 40.4117C86.625 43.539 86.5204 48.7197 83.2016 51.7155L50.1992 81.5103C47.1676 84.2473 42.5345 84.1536 39.6164 81.295L39.6175 81.2939Z"
                    fill="#0D9E00"
                  />
                </g>
                <path
                  d="M35.0209 76.6909L20.1155 62.0946C16.9215 58.9672 17.0261 53.7866 20.3437 50.7919L20.8523 50.3324C23.8839 47.5943 28.517 47.6891 31.4361 50.5477L37.6685 56.6507C39.6261 58.568 42.7334 58.6315 44.7667 56.7946L68.2515 35.5934C71.2831 32.8564 75.9161 32.9501 78.8342 35.8086C82.0283 38.936 81.9237 44.1167 78.6061 47.1125L45.6036 76.9072C42.572 79.6442 37.9389 79.5506 35.0209 76.692V76.6909Z"
                  fill="white"
                />
                <path
                  d="M104.01 15.3991C103.59 15.3902 103.182 15.2195 102.888 14.8916C102.298 14.2347 102.385 13.1919 103.08 12.564L109.615 6.6572C110.311 6.02927 111.351 6.0527 111.94 6.70962C112.53 7.36655 112.443 8.40826 111.747 9.0373L105.212 14.9441C104.865 15.2586 104.431 15.4092 104.009 15.4002L104.01 15.3991Z"
                  fill="#0D9E00"
                />
                <path
                  d="M115.214 24.1871L107.746 24.0209C106.838 24.0008 106.163 23.2468 106.238 22.3378C106.313 21.4289 107.111 20.7084 108.019 20.7284L115.487 20.8946C116.395 20.9147 117.07 21.6675 116.995 22.5776C116.92 23.4866 116.122 24.2071 115.214 24.1871Z"
                  fill="#0D9E00"
                />
                <path
                  d="M95.8624 10.7652C94.9543 10.7451 94.2787 9.99114 94.3533 9.08215L94.9709 1.60836C95.0455 0.699369 95.8435 -0.0211311 96.7516 -0.00105529C97.6598 0.0190206 98.3353 0.771865 98.2596 1.68197L97.642 9.15464C97.5674 10.0636 96.7694 10.7841 95.8613 10.7641L95.8624 10.7652Z"
                  fill="#0D9E00"
                />
              </g>
              <defs>
                <clipPath id="clip0_429_1027">
                  <rect width="117" height="115" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <p className="text-[#000] text-lg font-normal text-center">
              Bình chọn thành công. Cảm ơn bạn đã đồng hành cùng Biệt đội KOLs
              nhí.
            </p>
            <div className="flex flex-col gap-4 w-full">
              <button
                className="p-3 bg-button-gradient text-white w-full font-semibold"
                onClick={closeModal}
              >
                Tiếp tục bình chọn
              </button>
              <Link
                to="/"
                className="p-3 bg-white bg-button border w-full font-semibold text-center"
              >
                Về trang chủ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalPage;
