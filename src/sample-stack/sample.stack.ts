import { RemovalPolicy, Stack, type StackProps } from 'aws-cdk-lib';
import { LogGroup, RetentionDays } from 'aws-cdk-lib/aws-logs';
import type { Construct } from 'constructs';

import type { AppInfo } from '@/common/app-info';
import { commonFunctionEnvironment } from '@/common/lambda/common-env';
import { commonFunctionProps } from '@/common/lambda/common-props';

import { SampleFunction } from './sample-function';

interface SampleStackProps extends StackProps, AppInfo {}

export class SampleStack extends Stack {
  constructor(scope: Construct, id: string, props: SampleStackProps) {
    super(scope, id, props);

    const { appName, appEnv } = props;

    const logGroup = new LogGroup(this, 'LogGroup', {
      logGroupName: `/${appName}/${appEnv}/interaction-handler`,
      retention: RetentionDays.ONE_WEEK,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    new SampleFunction(this, 'SampleFunction', {
      ...commonFunctionProps,
      environment: { ...commonFunctionEnvironment(props, 'sample') },
      logGroup,
    });
  }
}
