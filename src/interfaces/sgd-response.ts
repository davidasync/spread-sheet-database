export interface file {
  kind: string;
  id: string;
  name: string;
  mimeType: string;
}

export default interface sgdResponse {
  kind: string;
  incompleteSearch: string;
  refreshToken: string;
  files: [file];
}

