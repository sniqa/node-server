interface SuccessResponseResult<T = any> {
  data: T;
}

interface ErrorResponseResult {
  err_msg?: string;
  err_code?: number;
}

type ResponseResult<T = any> = { success: boolean } & (
  | ErrorResponseResult
  | SuccessResponseResult<T>
);

export const succesResult = <T>(result: T): ResponseResult<T> => ({
  success: true,
  data: result,
});

export const faildResult = (result: ErrorResponseResult): ResponseResult => ({
  success: false,
  ...result,
});

export const faildResult2 = (errMsg: string): ResponseResult => ({
  success: false,
  err_msg: errMsg,
});
