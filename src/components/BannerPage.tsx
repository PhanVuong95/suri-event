import React from "react";
import { Link } from "react-router-dom";

const BannerPage: React.FunctionComponent = (props) => {
  return (
    <div>
      {/* <div className="px-4">
        <img src="https://dion.vn/wp-content/uploads/2024/03/banner-1.png" />
      </div> */}
      <div className="py-4">
        <Link to="kols-page">
          <img src="https://dion.vn/wp-content/uploads/2024/09/banner.jpg" />
        </Link>
      </div>
    </div>
  );
};

export default BannerPage;
