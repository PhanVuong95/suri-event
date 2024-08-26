import { getRequest } from "../../../services/api-request";

const Uri = {
  zaloInfo: "https://graph.zalo.me/v2.0/me/info",
};

export function getPhoneNumberApi(params: {}, header) {
  return getRequest(
    `${Uri.zaloInfo}`,
    {},
    {
      access_token: header?.access_token,
      code: header?.code,
      secret_key: header?.secret_key,
    }
  );
}
export function getLocationApi(params: {}, header) {
  return getRequest(
    `${Uri.zaloInfo}`,
    {},
    {
      access_token: header?.access_token,
      code: header?.code,
      secret_key: header?.secret_key,
    }
  );
}
