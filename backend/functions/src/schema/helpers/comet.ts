import axios from "axios";

const cometApi = axios.create({
  baseURL: "https://api.withcomet.com/v1",
});

export async function sendCometRequest({
  method,
  path,
  // params,
  formData,
  apiKey,
}: {
  method: "get" | "post" | "put" | "delete" | "patch";
  path: string;
  // params?: any;
  formData?: any;
  apiKey?: string;
}) {
  try {
    const { data } = await cometApi.request({
      method,
      url: path,
      headers: {
        ...formData?.getHeaders(),
        Authorization: apiKey ? `Bearer ${apiKey}` : undefined,
      },
      // params: method === "get" ? params : null,
      data: formData,
    });

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
