import fetch from "isomorphic-fetch";
import queryString from "query-string";

let token;

/**
 * Requests to a given route of the api with given options.
 *
 * @param {string} route Route to request.
 * @param {Object} options Options to include in the request.
 * @returns {Promise} To be resolved with the response.
 */
async function doGet(route, options) {
  let params;

  await start();

  params = queryString.stringify(
    Object.assign({ access_token: token }, options)
  );

  return (await fetch(`${process.env.PICTOGRAPI_URL}/${route}?${params}`, {
    method: "GET"
  })).json();
}

/**
 * Starts the API and stores the token.
 */
async function start() {
  let response;

  if (token) {
    return Promise.resolve();
  }

  response = await fetch(`${process.env.PICTOGRAPI_URL}/Accounts/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: process.env.PICTOGRAPI_EMAIL,
      password: process.env.PICTOGRAPI_PASSWORD
    })
  });

  token = (await response.json()).id;

  return Promise.resolve();
}

/**
 * Obtains pictographs with a given query.
 *
 * @export
 * @param {string} query
 * @param {string} languageId
 * @param {number} offset
 * @param {number} limit
 * @returns {Promise} To be resolved with an Array of pictographs.
 */
export async function getPictographsByQuery(query, languageId, offset, limit) {
  return doGet("Pictographs", {
    filter: JSON.stringify({
      offset: offset || 0,
      limit: limit || 20,
      where: {
        term: {
          regexp: new RegExp(`^${query}$`, "i").toString()
        },
        languageId
      },
      include: {
        relation: "image",
        scope: {
          fields: ["url"]
        }
      }
    })
  });
}

/**
 * Obtains count by a given query.
 *
 * @export
 * @param {string} query Query to filter the count.
 * @returns {Promise} To be resolved with a total count.
 */
export async function getCountByQuery(query) {
  return doGet("Pictographs/count", {
    where: JSON.stringify({
      term: {
        regexp: new RegExp(`^${query}$`, "i").toString()
      },
      languageId: DEFAULT_LANGUAGE_ID
    })
  });
}
