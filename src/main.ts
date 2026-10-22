#!/usr/bin/env node
import { env } from 'node:process';

import { App } from 'aws-cdk-lib';

import { AppStage } from './app.stage';

const appName = 'TODO'; // TODO: replace with your project name
const appEnv = env.APP_ENV || 'dev';
const app = new App();

// TODO: add sample stack to the stage

new AppStage(app, appEnv, { appName, appEnv });

app.synth();
