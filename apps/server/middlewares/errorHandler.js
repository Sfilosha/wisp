import Logger from "../../../helpers/Logger.js";

const errorHandler = (err, req, res, next) => {
  Logger.error(`Помилка: ${err.message}`);
  res.status(err.status || 500).json({
    message: err.message || 'Сталася внутрішня помилка сервера',
  });
};

export default errorHandler;
