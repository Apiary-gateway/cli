#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const create_1 = require("../commands/create");
const destroy_1 = require("../commands/destroy");
const updateAPIKeys_1 = require("../commands/updateAPIKeys");
const createUsagePlanWithKey_1 = require("../commands/createUsagePlanWithKey");
const getUsagePlans_1 = require("../commands/getUsagePlans");
const deleteUsagePlan_1 = require("../commands/deleteUsagePlan");
const deleteAPIKeys_1 = require("../commands/deleteAPIKeys");
const editUsagePlan_1 = require("../commands/editUsagePlan");
const program = new commander_1.Command();
program
    .name('apiary-cli')
    .description('CLI for managing Apiary LLM Gateway')
    .version('1.0.0');
program
    .command('create')
    .description('Deploy the Apiary LLM Gateway AWS CDK stack')
    .action(create_1.createStack);
program
    .command('destroy')
    .description('Destroy the AI Gateway AWS CDK stack')
    .action(destroy_1.destroyStack);
program
    .command('update-llm-api-keys')
    .description('Update stored API keys for LLM providers')
    .action(updateAPIKeys_1.updateAPIKeys);
program
    .command('delete-llm-api-keys')
    .description('Delete all stored API keys for LLM providers')
    .action(deleteAPIKeys_1.deleteAPIKeys);
program
    .command('create-usage-plan-with-key')
    .description('Create a new usage plan with an associated API key')
    .action(createUsagePlanWithKey_1.createUsagePlanWithKey);
program
    .command('get-usage-plans')
    .description('View all usage plans associated with the AI Gateway')
    .action(getUsagePlans_1.getUsagePlans);
program
    .command('delete-usage-plan')
    .description('Delete a specific usage plan associated with the AI Gateway')
    .action(deleteUsagePlan_1.deleteUsagePlan);
program
    .command('edit-usage-plan')
    .description('Edit a specific usage plan associated with the AI Gateway')
    .action(editUsagePlan_1.editUsagePlan);
program.parse(process.argv);
