import { execSync } from 'child_process';
import inquirer from 'inquirer';
import fs from 'fs';
import os from 'os';
import path from 'path';

const repoName = 'gateway';
const targetDir = path.join(process.cwd(), repoName);

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
    if (!fs.existsSync(targetDir)) {
      throw new Error(`Could not find target directory ${targetDir}. Please ensure target directory with cloned Apiary stack exists.`)
    }

    console.log('🧨 Destroying Apiary CDK stack...');
    execSync('npx cdk destroy', { cwd: targetDir, stdio: 'inherit' });
  } catch (err) {
    console.error('❌ Failed to destroy stack: ', err);
    process.exit(1);
  }
}