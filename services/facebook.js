const parseSignedRequest = (signedRequest) => {
  const [encodedSig, payload] = signedRequest.split(".");
  const secret = "SECRET";
  const sig = decode(encodedSig);
  const data = JSON.parse(decode(payload));
  return data;
};

const decode = (str) => {
  console.log(str);
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  return Buffer.from(str, "base64").toString();
};

export const init = (request) => {
  return parseSignedRequest(request);
};
