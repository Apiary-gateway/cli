#!/usr/bin/env node
import { Command } from 'commander';
import { createStack } from '../commands/create';
import { destroyStack } from '../commands/destroy';
import { updateAPIKeys } from '../utils/updateAPIKeys';
import { createUsagePlanWithKey } from '../commands/createUsagePlanWithKey';

const program = new Command();

program
  .name('ai-gateway')
  .description('CLI for managing AI Gateway')
  .version('0.1.0');

program
  .command('create')
  .description('Deploy the AI Gateway AWS CDK stack')
  .action(createStack);

program
  .command('destroy')
  .description('Destroy the AI Gateway AWS CDK stack')
  .action(destroyStack);

program
  .command('update-llm-api-keys')
  .description('Update stored API keys for LLM providers')
  .action(updateAPIKeys);

  program
  .command('create-usage-plan-with-key')
  .description('Create a new usage plan with an associated API key')
  .action(createUsagePlanWithKey);

program.parse(process.argv);
