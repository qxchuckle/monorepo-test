// 将 packages 中的各个包(除了ui文件夹)的 dist 目录下的 style.css 移动并改名到 packages/ui/dist/<对应包名>.css
import { join } from 'node:path';
import { readdir, cp, stat, readFile } from 'node:fs/promises';
import { createWriteStream } from 'node:fs';
import { fromRoot, PKGS_DIR } from './utils';

/** UI 包的目录 */
export const UI_DIST_DIR = join(PKGS_DIR, 'ui', 'dist');

/** 获取所有包的名称 */
const getPackages = async () => {
  const files = await readdir(PKGS_DIR);
  return files.filter((file) => file !== 'ui');
};

/** 检查文件是否存在 */
const fileExists = async (path: string) => {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
};

// 去除 css 文件中的 @charset 声明
const removeCharsetDeclaration = async (cssContent: string) => {
  const charsetPattern = /@charset "[^"]+";\s*/g;
  return cssContent.replace(charsetPattern, '');
};

/** 移动并重命名 style.css 文件、生成 index.css */
const moveAndRenameCss = async () => {
  const packages = await getPackages();
  const writeStream = createWriteStream(
    join(UI_DIST_DIR, 'index.css'),
    'utf-8',
  );
  writeStream.write(`@charset "UTF-8";\n`);

  const promises = packages.map(async (pkg) => {
    const src = join(PKGS_DIR, pkg, 'dist', 'style.css');
    if (!(await fileExists(src))) {
      return;
    }
    const css = await readFile(src, 'utf-8');
    const cssWithoutCharset = await removeCharsetDeclaration(css);
    writeStream.write(cssWithoutCharset);
    const dest = join(UI_DIST_DIR, `${pkg}.css`);
    await cp(src, dest);
    console.log(`[${pkg}.css]: moved successfully!`);
  });
  await Promise.all(promises);
  console.log('[index.css]: created successfully!');
  writeStream.end();
  writeStream.close();
};

moveAndRenameCss().catch(console.error);
