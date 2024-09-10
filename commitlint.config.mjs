// @ts-check
import { defineConfig } from '@archoleat/commitlint-define-config';

export default defineConfig({
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
        '🧪 test', // 允许带有 Emoji 的类型
        // 你可以在这里添加更多带有 Emoji 的类型
      ],
    ],
  },
});
