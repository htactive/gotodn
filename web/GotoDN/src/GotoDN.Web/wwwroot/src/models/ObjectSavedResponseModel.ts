export interface ObjectSavedResponseModel<TModel> {
  IsSuccess: boolean,
  Model: TModel,
  ErrorCode?: string,
  ErrorMessage?: string
}