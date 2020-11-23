// http://ec2-18-217-226-209.us-east-2.compute.amazonaws.com:5000/recommender/텐트빌려드립니다
import axios from 'axios';

export const recommender = (req, res) => {
  const {
    query: { title },
  } = req;
  const arg = encodeURIComponent(title.replace(/ /g, '_'));

  axios
    .get(
      `http://ec2-18-217-226-209.us-east-2.compute.amazonaws.com:5000/recommender/${arg}`
    )
    .then(({ data }) => {
      console.log(data);
      if (data.first.accuracy > data.second.accuracy) {
        res.json(data.first);
      } else {
        res.json(data.second);
      }
    })
    .catch(e => {
      console.log(e);
      res.status(419);
    });
};
