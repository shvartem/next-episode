import {execFileSync} from 'node:child_process';
import path from 'node:path';

let input = '';
for await (const chunk of process.stdin) {
    input += chunk;
}

const projectDir = process.env.CLAUDE_PROJECT_DIR ?? process.cwd();
const filePath = JSON.parse(input).tool_input?.file_path;

const isLintable = typeof filePath === 'string' && /\.(ts|tsx)$/.test(filePath);
const isInProject = isLintable && !path.relative(projectDir, filePath).startsWith('..');

if (!isLintable || !isInProject) {
    process.exit(0);
}

try {
    execFileSync(path.join(projectDir, 'node_modules/.bin/eslint'), [filePath], {
        cwd: projectDir,
        stdio: ['ignore', 'pipe', 'pipe'],
    });
} catch (error) {
    process.stderr.write(`ESLint нашёл ошибки в ${filePath}:\n${error.stdout ?? ''}${error.stderr ?? ''}`);
    process.exit(2);
}
