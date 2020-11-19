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
  const randomNumber = Math.floor(Math.random() * 1000000);
  return `${randomNumber}`;
};

export const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET);
