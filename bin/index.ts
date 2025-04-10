#!/usr/bin/env node
import { Command } from 'commander';
import { createStack } from '../commands/create';
import { destroyStack } from '../commands/destroy';
import { updateAPIKeys } from '../commands/updateAPIKeys';
import { createUsagePlanWithKey } from '../commands/createUsagePlanWithKey';
import { getUsagePlans } from '../commands/getUsagePlans';
import { deleteUsagePlan } from '../commands/deleteUsagePlan';
import { deleteAPIKeys } from '../commands/deleteAPIKeys';
import { getInitialGatewayKey } from '../utils/getInitialGatewayKey';
import { editUsagePlan } from '../commands/editUsagePlan';

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
  .command('delete-llm-api-keys')
  .description('Delete all stored API keys for LLM providers')
  .action(deleteAPIKeys);

program
  .command('create-usage-plan-with-key')
  .description('Create a new usage plan with an associated API key')
  .action(createUsagePlanWithKey);

program
  .command('get-usage-plans')
  .description('View all usage plans associated with the AI Gateway')
  .action(getUsagePlans);

program
  .command('delete-usage-plan')
  .description('Delete a specific usage plan associated with the AI Gateway')
  .action(deleteUsagePlan);

program
  .command('edit-usage-plan')
  .description('Edit a specific usage plan associated with the AI Gateway')
  .action(editUsagePlan);

program.parse(process.argv);
