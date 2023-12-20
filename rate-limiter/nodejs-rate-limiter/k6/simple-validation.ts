import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 10000,
  duration: "20s",
};

// The function that defines VU logic.
//
// See https://grafana.com/docs/k6/latest/examples/get-started-with-k6/ to learn more
// about authoring k6 scripts.
//
export default function () {
  const response = http.get("http://localhost:9999/simple-valitation", options);
  check(response, {
    "status is 200": (response) => response.status === 200,
    "status is 429": (response) => response.status === 429,
  });

  console.info(`Response status: ${response.status}`);
  sleep(1);
}
