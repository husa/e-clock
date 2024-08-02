const path = require('path');
const fs = require('fs/promises');
const git = require('simple-git/promise')();
const semver = require('semver');

const manifestPath = path.resolve('./src/manifest.json');

const versionRegEx = /^(\d+\.){2}\d+$/; // only numeric versions
const versionTypes = ['major', 'minor', 'patch'];
const versionArg = process.argv.pop();

const invalidVersionMessage = `
🤦 🤦 🤦
Version parameter is either missing or invalid

Example usage:
  node bin/release.js 1.2.3
  node bin/release.js minor
`;

const unknownErrorMessage = `
😱  SHIT!!! 💩 💩 💩

Something went wrong
`;

const invalidManifestVersionMessage = `

😱 😱 😱 INVALID VERSION IN src/manifest.json

`;

const getManifestJson = async () => {
  const manifest = await fs.readFile(manifestPath);
  return JSON.parse(manifest);
};

const updateManifest = async (version) => {
  const manifest = await getManifestJson();
  manifest.version = version;
  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
};
// const updateManifest = (version) =>
//   new Promise((resolve, reject) => {
//     fs.readFile(manifestPath, 'utf-8', (err, json) => {
//       if (err) return reject(err);
//       const manifest = JSON.parse(json);
//       manifest.version = version;
//       fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2), (err, res) => {
//         if (err) return reject(err);
//         resolve(manifest);
//       });
//     });
//   });

(async () => {
  if (!versionRegEx.test(versionArg) && !versionTypes.includes(versionArg)) {
    console.log(invalidVersionMessage);
    process.exit(1);
  }

  try {
    let version;
    if (versionTypes.includes(versionArg)) {
      const manifestVersion = (await getManifestJson()).version;
      if (!semver.valid(manifestVersion)) {
        console.log(invalidManifestVersionMessage);
      }
      version = semver.inc(manifestVersion, versionArg);
    } else {
      version = versionArg;
    }

    console.log(`Will update to ${version}`);
    // update version in ./src/manifest.json
    await updateManifest(version);
    return;
    // git add ./src/manifest.json
    await git.add(manifestPath);
    // git commit -m "Version v#.#.#"
    await git.commit(`Version v${version}`);
    // git tag -a v#.#.# -m "Version #.#.#"
    await git.tag(['-a', `v${version}`, '-m', `Version v${version}`]);
  } catch (err) {
    console.log(unknownErrorMessage);
    console.log(err);
    process.exit(1);
  }
})();
