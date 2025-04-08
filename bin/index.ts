#!/usr/bin/env node
import { Command } from 'commander';
import { createStack } from '../commands/create';
import { updateAPIKeys } from '../utils/updateAPIKeys';
// import { destroyStack } from '../commands/destroy';

const program = new Command();

program
  .name('ai-gateway')
  .description('CLI for managing AI Gateway')
  .version('0.1.0');

program
  .command('create')
  .description('Deploy the AI Gateway AWS CDK stack')
  .action(createStack);

// program
//   .command('destroy')
//   .description('Destroy the AWS CDK stack')
//   .action(destroyStack);

program
  .command('update-llm-api-keys')
  .description('Update stored API keys for LLM providers')
  .action(updateAPIKeys);

program.parse(process.argv);
