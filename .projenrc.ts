import { awscdk } from 'projen';
import { TypeScriptModuleResolution } from 'projen/lib/javascript';
import { NodePackageManager } from 'projen/lib/javascript/node-package';
import { ReleaseTrigger } from 'projen/lib/release';
import { biomeOptions } from './.projenrc.biome';

const cdkVersion = '2.274.0';
const powertoolsVersion = 'v2.36.0';
const awsSdkVersion = '3.1155.0';
const middyVersion = '7.9.2';

const project = new awscdk.AwsCdkTypeScriptApp({
  name: 'TODO', // TODO: replace with your project name
  authorName: 'TODO', // TODO: replace with your name
  authorEmail: 'TODO', // TODO: replace with your email

  cdkVersion,
  cdkVersionPinning: true,

  release: false,
  releaseTrigger: ReleaseTrigger.manual(),
  defaultReleaseBranch: 'main',
  github: false,

  packageManager: NodePackageManager.BUN,

  // scripts: {
  //   prepare: 'npx lefthook install',
  //   check: 'npx @biomejs/biome check --write',
  //   'check:staged': 'npx @biomejs/biome check --write --staged',
  // },

  projenrcTs: true,
  tsconfig: {
    compilerOptions: {
      target: 'esnext',
      module: 'esnext',
      moduleResolution: TypeScriptModuleResolution.BUNDLER,
      lib: ['esnext'],
      types: ['aws-lambda', 'bun-types', 'node'],
      emitDecoratorMetadata: true,
      forceConsistentCasingInFileNames: true,
      skipLibCheck: true,
      paths: {
        '@/*': ['./src/*'],
      },
    },
  },

  // No need for jest with Bun
  jest: false,

  biome: true,
  biomeOptions,

  lambdaOptions: {
    runtime: awscdk.LambdaRuntime.NODEJS_22_X,
    awsSdkConnectionReuse: true,
    bundlingOptions: {
      externals: [],
      sourcemap: true,
    },
  },

  deps: [
    `@aws-lambda-powertools/batch@${powertoolsVersion}`,
    `@aws-lambda-powertools/logger@${powertoolsVersion}`,
    `@aws-lambda-powertools/parameters@${powertoolsVersion}`,
    `@aws-lambda-powertools/parser@${powertoolsVersion}`,
    `@aws-lambda-powertools/tracer@${powertoolsVersion}`,
    `@aws-lambda-powertools/validation@${powertoolsVersion}`,
    // TODO: add any other dependencies your project requires
    `@aws-sdk/client-secrets-manager@${awsSdkVersion}`,
    `@middy/core@${middyVersion}`,
    'zod@~4',
  ],
  devDeps: [
    'bun-types',
    '@commitlint/config-conventional',
    '@types/aws-lambda',
    'commitlint',
    'cz-conventional-changelog',
    'lefthook',
    'ts-node',
    'tsconfig-paths',
  ],
});

project.defaultTask?.reset('bun .projenrc.ts');
project.compileTask.exec('bun run tsc --project tsconfig.json --noEmit');

project.synth();
