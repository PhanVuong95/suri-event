import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { BaseURL } from "../configs/base-config";

// Interface for Kol
interface Kol {
  id: number;
  name: string;
  totalVotesPerKol: number;
  number: number;
  photo: string;
  catagoryId: number; // Ensure this matches the API response
}

const defaultImageURL =
  "https://dion.vn/wp-content/uploads/2024/08/defaultImage-1.png";

// Interface for Sponsor
interface Sponsor {
  _id: string;
  name: string;
  photo: string;
}

const ListKolsPage: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const [openTab, setOpenTab] = useState<number>(3); // Default to Cục bông
  const [sponsor, setSponsor] = useState<Sponsor[]>([]);
  const [kols, setKols] = useState<Kol[]>([]);
  const [allKols, setAllKols] = useState<{ [key: number]: Kol[] }>({}); // Store KOLs by category

  const handleBack = () => {
    navigate(-1);
  };

  const fetchKols = async () => {
    try {
      const response = await fetch(
        "https://checking-event.dion.vn/kolList/api/GetTop3Kols"
      );
      const data = await response.json();
      if (data.status === "200" && data.data) {
        const groupedKols: { [key: number]: Kol[] } = {};

        data.data.forEach((group: { key: number; value: Kol[] }) => {
          groupedKols[group.key] = group.value;
        });

        setAllKols(groupedKols);
        setKols(groupedKols[1002] || []); // Initialize with "Cục bông" (key: 1001)
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchKols();
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `https://checking-event.dion.vn/sponsor/api/listPaging?pageIndex=1&pageSize=36`
      );

      setSponsor(data.data);
    } catch (error) {
      console.error("Error fetching sponsors:", error);
    }
  };

  const filterKols = (tabId: number) => {
    setKols(allKols[tabId === 3 ? 1002 : 1001] || []);
  };

  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = () => {
    navigate(`/search?search=${encodeURIComponent(searchTerm)}`);
  };

  // console.log(allKols);

  return (
    <div className="bg-white">
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
            Biệt đội KOLs nhí
          </h1>
        </div>
      </div>

      <div>
        <img
          src="https://dion.vn/wp-content/uploads/2024/09/banner.jpg"
          className="w-full"
        />
      </div>
      <div className="px-4 py-[10px] flex flex-col gap-4">
        <div className="flex flex-row items-center">
          <img src="https://dion.vn/wp-content/uploads/2024/07/01.png" />
          <img
            className="h-5"
            src="https://dion.vn/wp-content/uploads/2024/08/Gioi-thieu-ve-Biet-doi-KOLs-nhi.png"
          />
        </div>

        <div className="connet flex flex-col gap-4">
          <p className="font-normal text-base text-[#000] text-justify">
            Biệt Đội KOLs Nhí là cuộc thi do Suri Store tổ chức với mong muốn
            tìm kiếm những tài năng nhí và phát huy năng khiếu, sở trường của
            các bé giúp các em nhỏ có cơ hội trải nghiệm công việc của một KOLs
            thực thụ. Sau thành công của 3 mùa tổ chức, cuộc thi đã nhận được sự
            ủng hộ đông đảo trong cộng đồng mẹ&bé cũng như trở thành một sân
            chơi uy tín, chuyên nghiệp và hấp dẫn nhất dành cho các em bé có độ
            tuổi từ 6 tháng - 5 tuổi ở phạm vi toàn quốc.
            <br />
            <br />
            Biệt Đội KOLs Nhí 2024 trở lại với chủ đề “Born Happy Fighters” -
            Sinh ra để trở thành những chiến binh hạnh phúc. Mang thông điệp vô
            cùng ý nghĩa, cuộc thi năm nay sẽ tìm ra những “chiến binh hạnh
            phúc” có năng lực lan toả niềm vui, năng lượng tích cực đến với
            những người xung quanh và trở thành biểu tượng của sự hạnh phúc
            trong gia đình!
            <br />
            <br />
            Với những quyền lợi đặc biệt, các thí sinh Biệt Đội KOLs Nhí 2024 sẽ
            có cơ hội nhận được nhiều giải thưởng lớn và trở thành Đại sứ thương
            hiệu của các nhãn hàng quốc tế. Quý vị hãy bình chọn cho thí sinh
            mình yêu thích nhé!
          </p>

          <h3 className="font-bold text-base text-[#000]">
            Thông tin chi tiết, vui lòng liên hệ: <br />
            <span className="text-[#FF7991]">Ms. VÕ TRẦN QUỲNH TRANG </span>
            <br />
            Trưởng ban tổ chức
          </h3>

          <ul className="list-disc pl-4">
            <li>
              <p className="font-normal text-base text-[#000] text-justify">
                Gmail: quynhtrangmedia@gmail.com
              </p>
            </li>
            <li>
              <p className="font-normal text-base text-[#000] text-justify">
                Zalo: 0986120954
              </p>
              <li>
                <p className="font-normal text-base text-[#000] text-justify">
                  Fanpage: https://www.facebook.com/suristore83vtp
                </p>
              </li>
              <li>
                <p className="font-normal text-base text-[#000] text-justify">
                  Website: https://suristore.vn/
                </p>
              </li>
              <li>
                <p className="font-normal text-base text-[#000] text-justify">
                  Hotline: 0866.212.855
                </p>
              </li>
              <li>
                <p className="font-normal text-base text-[#000] text-justify">
                  Địa chỉ: Suri Center 18 Vũ Trọng Phụng, Thanh Xuân, Hà Nội
                </p>
              </li>
            </li>
          </ul>
        </div>
      </div>
      <div className="kols-partner px-4">
        <div className="slider-kols w-full flex flex-col p-4">
          <div className="flex flex-row items-center">
            <img src="https://dion.vn/wp-content/uploads/2024/07/02.png" />
            <img
              className="h-5"
              src="https://dion.vn/wp-content/uploads/2024/07/Bang-xep-hang-binh-chon.png"
            />
          </div>
        </div>

        <div className="kols-top flex flex-row items-center gap-[10px]">
          <div className="w-full mx-auto">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <input
                type="search"
                id="default-search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-xl bg-gray-50 placeholder:text-[#000] focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Tìm kiếm"
                required
              />
              <button onClick={handleSearch}>
                <div className="text-white absolute end-1.5 bottom-[28px] bg-[#FF7991]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm p-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M17.0413 16.4521L13.786 13.1968C14.7852 12.0575 15.3364 10.6159 15.3364 9.08643C15.3364 7.41691 14.6862 5.84749 13.5058 4.66707C12.3254 3.48665 10.7559 2.83643 9.08643 2.83643C7.41691 2.83643 5.84749 3.48665 4.66707 4.66707C3.48665 5.84749 2.83643 7.41691 2.83643 9.08643C2.83643 10.7559 3.48665 12.3254 4.66707 13.5058C5.84749 14.6862 7.41691 15.3364 9.08643 15.3364C10.6159 15.3364 12.0575 14.7852 13.1968 13.786L16.4521 17.0413C16.5335 17.1227 16.6401 17.1634 16.7467 17.1634C16.8534 17.1634 16.96 17.1227 17.0413 17.0413C17.2041 16.8786 17.2041 16.6149 17.0413 16.4521ZM5.25627 12.9166C4.23332 11.8934 3.66976 10.5332 3.66976 9.08643C3.66976 7.63969 4.23332 6.27942 5.25627 5.25627C6.27942 4.23332 7.63969 3.66976 9.08643 3.66976C10.5332 3.66976 11.8934 4.23332 12.9166 5.25627C13.9395 6.27942 14.5031 7.63969 14.5031 9.08643C14.5031 10.5332 13.9395 11.8934 12.9166 12.9166C11.8934 13.9395 10.5332 14.5031 9.08643 14.5031C7.63969 14.5031 6.27942 13.9395 5.25627 12.9166Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="list-kols">
          <div className="page-1">
            <div className="max-w-md mx-auto">
              <div className="mb-4 flex space-x-4 ">
                <button
                  onClick={() => {
                    setOpenTab(2);
                    filterKols(2);
                  }}
                  className={`flex-1 py-2 px-[24px] font-semibold rounded-md text-base focus:outline-none focus:shadow-outline-blue transition-all duration-300 ${
                    openTab === 2
                      ? "bg-[#FF7991] text-white font-semibold"
                      : "bg-[#fff]"
                  }`}
                >
                  KOLs Nhí
                </button>

                <button
                  onClick={() => {
                    setOpenTab(3);
                    filterKols(3);
                  }}
                  className={`flex-1 py-2 px-[24px] font-semibold rounded-md text-base focus:outline-none focus:shadow-outline-blue transition-all duration-300 ${
                    openTab === 3
                      ? "bg-[#FF7991] text-white font-semibold"
                      : "bg-[#fff]"
                  }`}
                >
                  Biệt Đội
                </button>
              </div>

              {openTab === 2 && kols.length > 0 ? (
                <div>
                  <div className="kols-top flex flex-row items-center gap-[10px] py-[20px]">
                    {/* KOL Top 2 */}
                    {kols[1] && (
                      <Link to={`/kols-detail/${kols[1].id}`}>
                        <div className="kols-top-2 w-full">
                          <div className="img-kols-top max-h-[110.468px] w-full aspect-square">
                            <img
                              src={`https://checking-event.dion.vn${kols[1].photo}`}
                              alt={kols[1].name}
                              className="h-full w-full rounded-md"
                            />
                          </div>
                          <div className="connet-kols-top">
                            <p className="text-[10px] text-[#000] font-normal text-center">
                              Điểm bình chọn
                            </p>
                            <samp className="text-[12.756px] text-[#FF7991] font-bold text-center">
                              {kols[1]?.totalVotesPerKol || "N/A"}
                            </samp>
                            <h4 className="text-[10.934px] text-[#000] overflow-hidden h-[33px] font-normal text-center uppercase">
                              {kols[1]?.name || "Không có dữ liệu"}
                            </h4>
                            <p className="text-[10.934px] text-[#000] font-medium text-center uppercase">
                              SBD: {kols[1]?.number || "N/A"}
                            </p>
                          </div>
                          <div className="icon-category">
                            <div className="icon-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                viewBox="0 0 30 30"
                                fill="none"
                              >
                                <ellipse
                                  cx="14.9059"
                                  cy="15"
                                  rx="14.4791"
                                  ry="15"
                                  fill="#FFDA4B"
                                />
                              </svg>
                            </div>
                            <div className="icon-2 text-stroke-custom">2</div>
                          </div>
                        </div>
                      </Link>
                    )}

                    {/* KOL Top 1 */}
                    {kols[0] && (
                      <Link to={`/kols-detail/${kols[0].id}`}>
                        <div className="kols-top-1 w-full">
                          <div className="img-kols-top max-h-[140.314px] min-w-[120px] w-full aspect-square">
                            <img
                              src={`https://checking-event.dion.vn${kols[0].photo}`}
                              alt={kols[0].name}
                              className="w-full h-full rounded-md"
                            />
                          </div>
                          <div className="connet-kols-top">
                            <p className="text-[10px] text-[#000] font-normal text-center">
                              Điểm bình chọn
                            </p>
                            <samp className="text-[16px] text-[#FF7991] font-bold text-center">
                              {kols[0]?.totalVotesPerKol || "N/A"}
                            </samp>
                            <h4 className="text-[14px] text-[#000] font-normal overflow-hidden max-h-[33px] text-center uppercase">
                              {kols[0]?.name || "Không có dữ liệu"}
                            </h4>
                            <p className="text-[14px] text-[#000] font-medium text-center uppercase">
                              SBD: {kols[0]?.number || "N/A"}
                            </p>
                          </div>
                          <div className="icon-category">
                            <div className="icon-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                viewBox="0 0 30 30"
                                fill="none"
                              >
                                <ellipse
                                  cx="14.5641"
                                  cy="15"
                                  rx="14.4791"
                                  ry="15"
                                  fill="#FF7991"
                                />
                              </svg>
                            </div>
                            <div className="icon-2 text-stroke-custom">1</div>
                          </div>
                        </div>
                      </Link>
                    )}

                    {/* KOL Top 3 */}
                    {kols[2] && (
                      <Link to={`/kols-detail/${kols[2].id}`}>
                        <div className="kols-top-3 w-full">
                          <div className="img-kols-top max-h-[110.468px] w-full aspect-square">
                            <img
                              src={`https://checking-event.dion.vn${kols[2].photo}`}
                              alt={kols[2].name}
                              className="h-full w-full rounded-md"
                            />
                          </div>
                          <div className="connet-kols-top">
                            <p className="text-[10px] text-[#000] font-normal text-center">
                              Điểm bình chọn
                            </p>
                            <samp className="text-[12.756px] text-[#FF7991] font-bold text-center">
                              {kols[2]?.totalVotesPerKol || "N/A"}
                            </samp>
                            <h4 className="text-[10.934px] text-[#000] font-normal text-center uppercase">
                              {kols[2]?.name || "Không có dữ liệu"}
                            </h4>
                            <p className="text-[10.934px] text-[#000] font-medium text-center uppercase">
                              SBD: {kols[2]?.number || "N/A"}
                            </p>
                          </div>
                          <div className="icon-category">
                            <div className="icon-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                viewBox="0 0 30 30"
                                fill="none"
                              >
                                <ellipse
                                  cx="14.9059"
                                  cy="15"
                                  rx="14.4791"
                                  ry="15"
                                  fill="#1FBDC6"
                                />
                              </svg>
                            </div>
                            <div className="icon-2 text-stroke-custom">3</div>
                          </div>
                        </div>
                      </Link>
                    )}
                  </div>

                  <div className="flex flex-col gap-4 items-center pt-[20px]">
                    {/* Top 4 đến Top 10 */}
                    {kols.slice(3, 10).map((kol, index) => (
                      <div
                        className="card-kols w-full rounded-xl flex flex-row"
                        key={kol.id}
                      >
                        <div className="max-w-[150px] w-full aspect-square">
                          <img
                            className="w-full h-full rounded-xl"
                            src={`https://checking-event.dion.vn${kol.photo}`}
                            alt={kol.name}
                          />
                        </div>
                        <div className="flex flex-col p-2">
                          <h3 className="text-lg font-semibold uppercase w-[172px]">
                            {kol.name}
                          </h3>
                          <div className="flex flex-row items-center justify-between">
                            <p className="text-sm font-normal">
                              SBD: {kol.number}
                            </p>
                            <p className="text-sm font-bold text-[#FF7991]">
                              XH: <span>{index + 4}</span>
                            </p>
                          </div>
                          <p className="text-sm font-normal">
                            Điểm bình chọn:{" "}
                            <span className="text-lg font-semibold uppercase text-[#FF7991]">
                              {kol.totalVotesPerKol}
                            </span>
                          </p>
                          <Link
                            to={`/kols-detail/${kol.id}`}
                            className="button-voted"
                          >
                            Bình chọn
                          </Link>
                        </div>
                      </div>
                    ))}
                    <Link to="/list-kols-page" className="button-voted-1">
                      Xem thêm
                    </Link>
                  </div>
                </div>
              ) : (
                <p></p> // Debug message
              )}

              {openTab === 3 && kols.length > 0 ? (
                <div>
                  <div className="kols-top flex flex-row items-center gap-[10px] py-[20px]">
                    {/* KOL Top 2 */}
                    {kols[1] && (
                      <Link to={`/kols-detail/${kols[1].id}`}>
                        <div className="kols-top-2 w-full">
                          <div className="img-kols-top max-h-[110.468px] w-full aspect-square">
                            <img
                              src={`https://checking-event.dion.vn${kols[1].photo}`}
                              alt={kols[1].name}
                              className="h-full w-full rounded-md"
                            />
                          </div>
                          <div className="connet-kols-top">
                            <p className="text-[10px] text-[#000] font-normal text-center">
                              Điểm bình chọn
                            </p>
                            <samp className="text-[12.756px] text-[#FF7991] font-bold text-center">
                              {kols[1]?.totalVotesPerKol || "N/A"}
                            </samp>
                            <h4 className="text-[10.934px] text-[#000] overflow-hidden h-[33px] font-normal text-center uppercase">
                              {kols[1]?.name || "Không có dữ liệu"}
                            </h4>
                            <p className="text-[10.934px] text-[#000] font-medium text-center uppercase">
                              SBD: {kols[1]?.number || "N/A"}
                            </p>
                          </div>
                          <div className="icon-category">
                            <div className="icon-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                viewBox="0 0 30 30"
                                fill="none"
                              >
                                <ellipse
                                  cx="14.9059"
                                  cy="15"
                                  rx="14.4791"
                                  ry="15"
                                  fill="#FFDA4B"
                                />
                              </svg>
                            </div>
                            <div className="icon-2 text-stroke-custom">2</div>
                          </div>
                        </div>
                      </Link>
                    )}

                    {/* KOL Top 1 */}
                    {kols[0] && (
                      <Link to={`/kols-detail/${kols[0].id}`}>
                        <div className="kols-top-1 w-full">
                          <div className="img-kols-top max-h-[140.314px] min-w-[120px] w-full aspect-square">
                            <img
                              src={`https://checking-event.dion.vn${kols[0].photo}`}
                              alt={kols[0].name}
                              className="w-full h-full rounded-md"
                            />
                          </div>
                          <div className="connet-kols-top">
                            <p className="text-[10px] text-[#000] font-normal text-center">
                              Điểm bình chọn
                            </p>
                            <samp className="text-[16px] text-[#FF7991] font-bold text-center">
                              {kols[0]?.totalVotesPerKol || "N/A"}
                            </samp>
                            <h4 className="text-[14px] text-[#000] font-normal overflow-hidden max-h-[33px] text-center uppercase">
                              {kols[0]?.name || "Không có dữ liệu"}
                            </h4>
                            <p className="text-[14px] text-[#000] font-medium text-center uppercase">
                              SBD: {kols[0]?.number || "N/A"}
                            </p>
                          </div>
                          <div className="icon-category">
                            <div className="icon-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                viewBox="0 0 30 30"
                                fill="none"
                              >
                                <ellipse
                                  cx="14.5641"
                                  cy="15"
                                  rx="14.4791"
                                  ry="15"
                                  fill="#FF7991"
                                />
                              </svg>
                            </div>
                            <div className="icon-2 text-stroke-custom">1</div>
                          </div>
                        </div>
                      </Link>
                    )}

                    {/* KOL Top 3 */}
                    {kols[2] && (
                      <Link to={`/kols-detail/${kols[2].id}`}>
                        <div className="kols-top-3 w-full">
                          <div className="img-kols-top max-h-[110.468px] w-full aspect-square">
                            <img
                              src={`https://checking-event.dion.vn${kols[2].photo}`}
                              alt={kols[2].name}
                              className="h-full w-full rounded-md"
                            />
                          </div>
                          <div className="connet-kols-top">
                            <p className="text-[10px] text-[#000] font-normal text-center">
                              Điểm bình chọn
                            </p>
                            <samp className="text-[12.756px] text-[#FF7991] font-bold text-center">
                              {kols[2]?.totalVotesPerKol || "N/A"}
                            </samp>
                            <h4 className="text-[10.934px] text-[#000] font-normal text-center uppercase">
                              {kols[2]?.name || "Không có dữ liệu"}
                            </h4>
                            <p className="text-[10.934px] text-[#000] font-medium text-center uppercase">
                              SBD: {kols[2]?.number || "N/A"}
                            </p>
                          </div>
                          <div className="icon-category">
                            <div className="icon-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                viewBox="0 0 30 30"
                                fill="none"
                              >
                                <ellipse
                                  cx="14.9059"
                                  cy="15"
                                  rx="14.4791"
                                  ry="15"
                                  fill="#1FBDC6"
                                />
                              </svg>
                            </div>
                            <div className="icon-2 text-stroke-custom">3</div>
                          </div>
                        </div>
                      </Link>
                    )}
                  </div>

                  <div className="flex flex-col gap-4 items-center pt-[20px]">
                    {/* Top 4 đến Top 10 */}
                    {kols.slice(3, 10).map((kol, index) => (
                      <div
                        className="card-kols w-full rounded-xl flex flex-row"
                        key={kol.id}
                      >
                        <div className="max-w-[150px] w-full aspect-square">
                          <img
                            className="w-full h-full rounded-xl"
                            src={`https://checking-event.dion.vn${kol.photo}`}
                            alt={kol.name}
                          />
                        </div>
                        <div className="flex flex-col p-2">
                          <h3 className="text-lg font-semibold uppercase w-[172px]">
                            {kol.name}
                          </h3>
                          <div className="flex flex-row items-center justify-between">
                            <p className="text-sm font-normal">
                              SBD: {kol.number}
                            </p>
                            <p className="text-sm font-bold text-[#FF7991]">
                              XH: <span>{index + 4}</span>
                            </p>
                          </div>
                          <p className="text-sm font-normal">
                            Điểm bình chọn:{" "}
                            <span className="text-lg font-semibold uppercase text-[#FF7991]">
                              {kol.totalVotesPerKol}
                            </span>
                          </p>
                          <Link
                            to={`/kols-detail/${kol.id}`}
                            className="button-voted"
                          >
                            Bình chọn
                          </Link>
                        </div>
                      </div>
                    ))}
                    <Link to="/list-kols-page" className="button-voted-1">
                      Xem thêm
                    </Link>
                  </div>
                </div>
              ) : (
                <p></p> // Debug message
              )}
            </div>
          </div>
        </div>

        <div className="slider-partner">
          <div className="flex flex-row items-center">
            <img src="https://dion.vn/wp-content/uploads/2024/07/03.png" />
            <img
              className="h-5"
              src="https://dion.vn/wp-content/uploads/2024/09/vinh.png"
            />
          </div>
          <h3 className="text-[#FF7991] text-lg text-base font-bold text-center">
            Đơn vị đồng tổ chức
          </h3>

          <img
            src="https://dion.vn/wp-content/uploads/2024/09/bioamicus2.png"
            className="w-full h-full rounded-xl border border-[#0000003b]"
          />

          <h3 className="text-[#FF7991] text-lg text-base font-bold text-center">
            Đơn vị đồng hành
          </h3>

          <Swiper
            modules={[Navigation, Pagination]}
            // centeredSlides={true}
            spaceBetween={20}
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
          >
            <SwiperSlide>
              <div className="flex flex-col gap-2">
                <img
                  src="https://dion.vn/wp-content/uploads/2024/09/natureisway.png"
                  className="w-full h-full rounded-xl border border-[#0000003b]"
                />
                <img
                  src="https://dion.vn/wp-content/uploads/2024/09/motaro.png"
                  className="w-full h-full rounded-xl border border-[#0000003b]"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex flex-col gap-2">
                <img
                  src="https://dion.vn/wp-content/uploads/2024/09/midkid.png"
                  className="w-full h-full rounded-xl border border-[#0000003b]"
                />
                <img
                  src="https://dion.vn/wp-content/uploads/2024/09/jonzac-2.png"
                  className="w-full h-full rounded-xl border border-[#0000003b]"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex flex-col gap-2">
                <img
                  src="https://dion.vn/wp-content/uploads/2024/09/atono.png"
                  className="w-full h-full rounded-xl border border-[#0000003b]"
                />
                <img
                  src="https://dion.vn/wp-content/uploads/2024/09/bioamicus.png"
                  className="w-full h-full rounded-xl border border-[#0000003b]"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex flex-col gap-2">
                <img
                  src="https://dion.vn/wp-content/uploads/2024/09/photo_2024-09-09_09-50-05.jpg"
                  className="w-full h-full rounded-xl border border-[#0000003b]"
                />
                <img
                  src="https://dion.vn/wp-content/uploads/2024/09/photo_2024-09-09_09-50-13.jpg"
                  className="w-full h-full rounded-xl border border-[#0000003b]"
                />
              </div>
            </SwiperSlide>
          </Swiper>
          {/*           
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
          >
            {sponsor
              .reduce((acc: JSX.Element[][], item: Sponsor, index: number) => {
                // Check if we need to start a new slide
                if (index % 2 === 0) {
                  acc.push([]); // Start a new slide
                }
                // Add image to the current slide
                acc[acc.length - 1].push(
                  <img
                    key={item._id}
                    src={
                      item.photo ? `${BaseURL}${item.photo}` : defaultImageURL
                    }
                    alt={`Image for ${item.name}`}
                    className="w-full h-full rounded-xl"
                  />
                );
                return acc;
              }, [])
              .map((slideImages: JSX.Element[], slideIndex: number) => {
                // Ensure each slide has exactly two images
                if (slideImages.length < 2) {
                  slideImages.push(
                    <img
                      key={`default-${slideIndex}`}
                      src={defaultImageURL}
                      alt="Default Image"
                      className="w-full h-full rounded-xl"
                    />
                  );
                }

                return (
                  <SwiperSlide key={slideIndex}>
                    <div className="flex flex-col gap-4 slide-2-img">
                      {slideImages}
                    </div>
                  </SwiperSlide>
                );
              })}
          </Swiper> */}
        </div>

        <div className="slider-partner">
          <div className="flex flex-row items-center">
            <img src="https://dion.vn/wp-content/uploads/2024/08/04.png" />
            <img
              className="h-5 w-[76%] h-[70%]"
              src="https://dion.vn/wp-content/uploads/2024/08/Tong-gia-tri-giai-thuong-va-chi-tiet-the-le-vong-thi.png"
            />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[#000] text-base font-bold text-center">
              Tổng giá giá trị giải thưởng lên đến:
              <br />
              <span className="text-[#FF7991] text-lg">200.000.000 VND</span>
            </h3>

            <h3 className="text-[#FF7991] text-base font-bold">Thể lệ:</h3>
            <h3 className="text-[#000] text-base font-medium">
              * Chia bảng thí sinh:
            </h3>
            <ul className="list-disc pl-4">
              <li>
                <p className="font-normal text-base text-[#000] text-justify">
                  Bảng KOLs: tất cả thí sinh từ 6M - 5 tuổi
                </p>
              </li>
              <li>
                <p className="font-normal text-base text-[#000] text-justify">
                  Bảng Biệt đội: Mỗi một nhóm tối thiểu 5 thành viên - tối đa 15
                  thành viên
                </p>
              </li>
            </ul>

            <h3 className="text-[#FF7991] text-base font-bold">Vòng thi:</h3>
            <h3 className="text-[#000] text-base font-medium">* Bảng KOLs</h3>
            <ul className="list-disc pl-4">
              <li>
                <p className="font-normal text-base text-[#000] text-justify">
                  Vòng 1 (5/9 - 15/10): Casting Photo (Tìm ra Top 100)
                </p>
              </li>
              <li>
                <p className="font-normal text-base text-[#000] text-justify">
                  Vòng 2 (từ 15/10 - 12/11): Training short video (Tìm ra Top
                  30)
                </p>
              </li>
              <li>
                <p className="font-normal text-base text-[#000] text-justify">
                  Vòng 3 (23/11): Tập làm Đại sứ thương hiệu
                </p>
              </li>
              <li>
                <p className="font-normal text-base text-[#000] text-justify">
                  Vòng Chung kết diễn ra tại The Queen's Day (15/12)
                </p>
              </li>
            </ul>

            <h3 className="text-[#000] text-base font-medium">
              * Bảng Biệt đội
            </h3>
            <ul className="list-disc pl-4">
              <li>
                <p className="font-normal text-base text-[#000] text-justify">
                  Vòng 1 (5/9 - 30/11): Casting Photo (Chọn ra Top 10)
                </p>
              </li>
              <li>
                <p className="font-normal text-base text-[#000] text-justify">
                  Vòng Chung kết diễn ra tại The Queen's Day (15/12)
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListKolsPage;
