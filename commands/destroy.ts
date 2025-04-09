import { execSync } from 'child_process';
import inquirer from 'inquirer';
import fs from 'fs';
import os from 'os';
import path from 'path';

// TODO: change this path? align w/ create, at any rate
const stackPath = path.join(os.homedir(), 'aiGatewayStack', 'cdk-stack');

export async function destroyStack() {
  const { confirmDestroy } = await inquirer.prompt([
    {
      type: "list",
      name: "confirmDestroy",
      message: "Are you sure you want to destroy your stack? This action is " +
      "permanent and cannot be undone!",
      choices: ["Yes", "No"],
    },
  ]);

  if (confirmDestroy === "No") {
    console.log('✖️ Destroy stack operation cancelled.');
    return;
  }
  
  try {
    console.log('🧨 Destroying CDK stack...');
    execSync('npx cdk destroy', { cwd: stackPath, stdio: 'inherit' });
  } catch (err) {
    console.error('❌ Failed to destroy stack: ', err);
    process.exit(1);
  }
}