import { HttpRequest, HttpRequestMethod, http } from "@minecraft/server-net";
import knex from "knex";

interface Coordinate {
  id: number;
  name: string;
  x: number;
  y: number;
  z: number;
}

interface Response<T> {
  code: number;
  body: T;
}

async function makeQueryRequest<T>(query: string): Promise<Response<T>> {
  const httpRequest = new HttpRequest("http://192.168.18.3:3001/api");
  httpRequest.setMethod(HttpRequestMethod.Post);
  httpRequest.addHeader("Content-Type", "application/json");
  httpRequest.setBody(JSON.stringify({ query }));
  const response = await http.request(httpRequest);
  console.log(response);
  const body = JSON.parse(response.body);

  return {
    code: response.status,
    body,
  };
}

const tablename = "coordinates";

export async function saveCoordinate(
  coordinate: Omit<Coordinate, "id">,
): Promise<void> {
  const kn = knex({
    client: "pg",
  });
  const query = kn(tablename).insert(coordinate).toString();

  const response = await makeQueryRequest<{ saveCoordinate: Coordinate }>(
    query,
  );
  if (response.code !== 200) {
    throw new Error("Error saving coordinate");
  }
}

export async function getCoordinates(): Promise<Coordinate[]> {
  const kn = knex({
    client: "pg",
  });
  console.log("kn");
  const query = kn(tablename).select().toString();
  console.log("query", query);
  const response = await makeQueryRequest<Coordinate[]>(query);
  if (response.code !== 200) {
    throw new Error("Error getting coordinates");
  }
  return response.body;
}

export async function changeCoordinateName(
  id: number,
  newName: string,
): Promise<void> {
  const kn = knex({
    client: "pg",
  });
  const query = kn(tablename)
    .update({ name: newName })
    .where({ id })
    .toString();

  const response = await makeQueryRequest(query);
  if (response.code !== 200) {
    throw new Error("Error updating coordinates");
  }
}
