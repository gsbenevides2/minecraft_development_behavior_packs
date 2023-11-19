import { Api } from "@gsbenevides2/minecraft_http_server_client";
import {
  type Response,
  type Request,
  type RequestMaker,
  Method,
} from "@gsbenevides2/minecraft_http_server_client/dist/core/types";
import { HttpRequest, HttpRequestMethod, http } from "@minecraft/server-net";

const requestMaker: RequestMaker = async (request: Request) => {
  const myMethods = {
    [Method.GET]: HttpRequestMethod.Get,
    [Method.POST]: HttpRequestMethod.Post,
    [Method.PUT]: HttpRequestMethod.Put,
    [Method.DELETE]: HttpRequestMethod.Delete,
  };
  const httpRequest = new HttpRequest(request.requestLine.url.toString());

  httpRequest.setMethod(myMethods[request.requestLine.method]);
  if (request.body != null) httpRequest.setBody(request.body);
  if (request.headers != null) {
    for (const header in request.headers) {
      httpRequest.addHeader(header, request.headers[header]);
    }
  }

  const response = await http.request(httpRequest);
  const headers = {};
  for (let i = 0; i < response.headers.length; i++) {
    const header = response.headers[i];
    headers[header.key] = header.value;
  }

  const res: Response = {
    statusLine: {
      statusCode: response.status,
      statusMessage: "",
    },
    body: response.body,
    headers,
  };

  return res;
};

export class ApiFacade extends Api {
  constructor(phoneNumberOrGametag?: string) {
    super(requestMaker, phoneNumberOrGametag);
  }
}
