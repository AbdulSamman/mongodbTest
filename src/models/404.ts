export const error404 = (req, res, next) => {
  const error: { message: string; status: number } | any = new Error(
    "Not Found"
  );
  error.status = 404;
  next(error);
};

export const sendErrorTiClient = (error, req, res, next) => {
  const status = error.status || 500;
  res.status(status);
  res.send({
    error: {
      status: status,
      message: error.message,
    },
  });
};
