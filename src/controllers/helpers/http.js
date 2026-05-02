export const sucess = (body) => {
  return {
    statusCode: 200,
    body,
  };
};
export const created = () => {
  return {
    statusCode: 201,
    body: {
      sucessMessage: `Operation Sucess!`,
    },
  };
};
export const badRequest = (body) => {
  return {
    statusCode: 400,
    body,
  };
};
export const notFound = (body) => {
  return {
    statusCode: 404,
    body,
  };
};
export const serverError = () => {
  return {
    statusCode: 500,
    body: {
      errorMessage: `Internal Error Server`,
    },
  };
};
