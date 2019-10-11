const fs = require('fs');
const p = require('path');
const rl = require('readline-sync');
const { execSync } = require('child_process');

const traverseDir = (path) => {
  fs.readdirSync(path).forEach((dir) => {
    const currentItem = p.join(path, dir);

    if (isFolder(currentItem)) {
      if (currentItem.includes('node_modules')) {
        const absolutePath = p.resolve(currentItem);
        const answer = rl.question(`\n${absolutePath} remove it?\n`);

        if (answer.includes('y')) {
          console.log('Removing...');
          execSync(`rm -rf ${absolutePath}`);
        } else {
          console.log('Omitting.');
        }
        return;
      }
      traverseDir(currentItem);
    }
  });
};

const isFolder = (path) => {
  const stat = fs.lstatSync(path);
  return !!stat.isDirectory();
};

if (!process.argv[2]) {
  throw new Error('Provide folder path.');
}

traverseDir(process.argv[2]);
