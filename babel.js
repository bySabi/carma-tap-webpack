const fs = require('fs');
const path = require('path');
const JSON5 = require('json5');

function getProjectBabelConfig(basePath) {
  let json;
  try {
    const jsonFile = fs.readFileSync(path.resolve(basePath, '.babelrc'), 'utf8');
    json = JSON5.parse(jsonFile);
  } catch(e) {
    if (e.code === 'ENOENT') {
      console.log("file not found: " + e.path);
      try {
        const jsonFile = fs.readFileSync(path.resolve(basePath, 'package.json'), 'utf8');
        json = JSON5.parse(jsonFile)['babel'];
      } catch(e) {
        console.error('Error parsing file: ', e.message);
        throw e;
      }
    } else {
      console.error('Error parsing file: ', e.message);
      throw e;
    }
  }
  return json;
}

function getCarmaBabelConfig(basePath) {
  let json;
  try {
    const jsonFile = fs.readFileSync(path.resolve(basePath, 'query.json'), 'utf8');
    json = JSON5.parse(jsonFile);
  } catch(e) {
    console.error('Error parsing file: ', e.message);
    throw e;
  }
  return json;
}

function babelLoaderQuery(config) {
  const basePath = config.basePath;
  return updateOptions(
    getProjectBabelConfig(basePath),
    getCarmaBabelConfig(__dirname)
  );
}

/*
function updateOptions(babelConfig, babelExtend) {
  if (babelConfig && babelExtend) {
    const env = createEnvOptions()
}
*/

function updateOptions(babelConfig, babelExtend) {
  const obj = Object.assign({}, babelConfig, babelExtend);
  console.log(obj);
  return Object.assign({}, babelConfig, babelExtend);
}

//  let config = objectAssign({}, babelConfig); // clone Babel settings
//  delete config['env']; // remove 'env' property

module.exports = babelLoaderQuery;
