export type ServerActionResponse<T = undefined> = {
  success: boolean;
  message: string;
  content?: T;
};
