const { getPlaiceholder } = require("plaiceholder");

const getBlurData = async (imageSrc) => {
  const buffer = await fetch(imageSrc).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
  );

  const data = await getPlaiceholder(buffer);

  return data;
};

export {
    getBlurData
}
