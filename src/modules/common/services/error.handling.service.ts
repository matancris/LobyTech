export interface Error {
  type: string;
  message: string;
  statusCode?: number;
}

export const ERROR_TYPES = {
  NETWORK: 'NETWORK',
  VALIDATION: 'VALIDATION',
  CONFLICT: 'CONFLICT',
  AUTH: 'AUTH',
  NOT_FOUND: 'NOT_FOUND',  
};

function errorHandler(err: any) {
  let errorType = ERROR_TYPES.NETWORK;
  const statusCode = err.response?.status;
  const message = err.response?.data?.errors?.message || err.response?.data?.error || err.message;
  const code = err.response?.data?.code;

  if (statusCode === 409) {
    errorType = ERROR_TYPES.CONFLICT;
  } else if (statusCode === 400) {
    errorType = ERROR_TYPES.VALIDATION;
  } else if (statusCode === 401) {
    errorType = ERROR_TYPES.AUTH;

    // setting auth failure in store to send user to login page
    import('../../../store/useStore').then(({ store }: any) => store.dispatch({ type: 'auth/authFailure' }));
  } else if (statusCode === 403) {
    errorType = ERROR_TYPES.AUTH;
  } else if (statusCode === 404) {
    errorType = ERROR_TYPES.NOT_FOUND;
  } else if (statusCode === 500) {
    errorType = ERROR_TYPES.NETWORK;
  }

  // TODO - send error to sentry or backend

  return Promise.reject({
    type: errorType,
    message,
    code,
    statusCode,
  });
}

export const errorService = {
  errorHandler,
};
