export interface BaseResponse<T> {
  message: string
  messageType: string,
  results: Array<T>
}
