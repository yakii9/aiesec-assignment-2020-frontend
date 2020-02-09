const accessToken =
  "dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c";
const baseUrl = "https://api-staging.aiesec.org";

const generateUrls = (baseUrl, pathesByAbbreviation) => {
  const urlsByAbbreviation = {};

  for (const abbreviation in pathesByAbbreviation) {
    urlsByAbbreviation[abbreviation] =
      baseUrl + pathesByAbbreviation[abbreviation];
  }

  return urlsByAbbreviation;
};

const pathesByAbbreviation = {
  opportunities: "/v2/applications"
};

export const urls = generateUrls(baseUrl, pathesByAbbreviation);
export const token = accessToken;
