import axios from "./axios.js";

// Get All Links by `QUERY`
export const parseGoogle = async (req, res) => {
  try {
    const { query } = req.body;

    axios
      .post("/api/v1.0/google/get_links", { query: query })
      .then((response) => {
        res.json(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (error) {
    res.json({ message: "Что-то пошло не так." });
  }
};

// Get Data by `habr` link
export const parseHabr = async (req, res) => {
  try {
    const { url } = req.body;

    axios
      .post("/api/v1.0/parsers/habr", { url: url })
      .then((response) => {
        res.json(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (error) {
    res.json({ message: "Что-то пошло не так." });
  }
};

// Get Data by `youtube` link
export const parseYT = async (req, res) => {
  try {
    const { url } = req.body;

    axios
      .post("/api/v1.0/parsers/youtube", { url: url })
      .then((response) => {
        res.json(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (error) {
    res.json({ message: "Что-то пошло не так." });
  }
};

// Get Data by `cyberleninka` link
export const parseCL = async (req, res) => {
  try {
    const { url } = req.body;

    axios
      .post("/api/v1.0/parsers/cyberleninka", { url: url })
      .then((response) => {
        res.json( response.data );
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (error) {
    res.json({ message: "Что-то пошло не так." });
  }
};
