const timeout = async (ms) => {
  let resolve = await new Promise((resolve) => setTimeout(resolve, ms));
  return resolve;
};

export default timeout;
