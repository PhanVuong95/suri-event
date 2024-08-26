export async function getRequest(
  url,
  params = {},
  header: { access_token: ""; code: ""; secret_key: "" }
) {
  const headerOption = {
    access_token: header.access_token,
    code: header.code,
    secret_key: header.secret_key,
  };
  const response = await fetch(`${url}`, {
    method: "GET",
    headers: {
      ...headerOption,
    },
  });
  const phoneNumber = await response.json();
  return phoneNumber;
}
