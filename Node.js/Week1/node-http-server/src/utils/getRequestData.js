/**
 * This function get the body data from a HTTP request
 *
 * @param {Request} request
 * @returns {Promise<Object.<string, any>>}
 */
export const getRequestData = (request) => {
  return new Promise((success, reject) => {
    const body = [];

    request
      .on('error', (err) => {
        reject(err);
      })
      .on('data', (chunk) => {
        body.push(chunk);
      })
      .on('end', () => {
        success(Buffer.concat(body).toString());
      });
  });
};
