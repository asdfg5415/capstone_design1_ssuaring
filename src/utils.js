import axios from 'axios';
import jwt from 'jsonwebtoken';
import { NCPClient } from 'node-sens';

export const sendSecretSMS = async (phoneNumber, loginSecret) => {
  const ncp = new NCPClient({
    accessKey: process.env.NCP_KEY,
    secretKey: process.env.NCP_SECRET,
    serviceId: process.env.SENS_SERVICEID,
    phoneNumber: process.env.SENS_FROM,
  });

  const content = `[SSUARING] 인증번호 [${loginSecret}]를 입력해주세요.`;
  const { success, msg, status } = await ncp.sendSMS({
    to: phoneNumber,
    content,
  });

  console.log(`[SENS] ${status} : ${msg}`);
  return success;
};

export const generateSecret = () => {
  let randomNumber = Math.floor(Math.random() * 1000000) + 100000;
  if (randomNumber > 1000000) {
    randomNumber -= 100000;
  }
  return `${randomNumber}`;
};

export const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET);

export const address2Coords = async area => {
  try {
    const url = 'https://dapi.kakao.com/v2/local/search/address.json';
    const {
      data: { documents },
    } = await axios.get(url, {
      headers: { Authorization: `KakaoAK ${process.env.KAKAO_KEY}` },
      params: { query: area },
    });
    return documents[0];
  } catch (e) {
    console.log(e);
  }
};

export const coords2Address = async (lat, lng) => {
  try {
    const url = 'https://dapi.kakao.com/v2/local/geo/coord2address.json';
    const {
      data: { documents },
    } = await axios.get(url, {
      headers: { Authorization: `KakaoAK ${process.env.KAKAO_KEY}` },
      params: { x: lng, y: lat },
    });
    console.log(documents);
    return documents;
  } catch (e) {
    console.log(e);
  }
};

export const getDistanceFromCoords = (lat1, lng1, lat2, lng2) => {
  const deg2rad = deg => {
    return deg * (Math.PI / 180);
  };

  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km return d;

  return d; // Kilometer
};
