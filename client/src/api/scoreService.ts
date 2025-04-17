import axios from 'axios';

const API_URL = "http://localhost:5000/api/scores";

export const getScores = () => axios.get(API_URL);
export const postScore = (data: { username: string; result: string }) =>
  axios.post(API_URL, data);
