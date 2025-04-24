
# Apiary CLI

## Introduction

Apiary is a large language model (LLM) gateway for handling requests to multiple
LLM providers with a unified API. It provides built-in observability, cost tracking, 
fallbacks, request routing, simple and semantic caching, and output guardrails.

* [`Getting Started`](#getting-started)
* [`Commands`](#commands)

## Getting Started

### Prerequisites

To get started with Apiary, ensure that you have the following set up:
* An active [AWS account](https://aws.amazon.com/account/)
* AWS CLI is [installed](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) and configured
* AWS CDK is [installed](https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html)
* AWS Bedrock is configured in your account to allow access to the **Titan Text Embeddings V2 model**
  * Bedrock access must be configured through the [Bedrock console](https://console.aws.amazon.com/bedrock/). Follow [these steps](https://docs.aws.amazon.com/bedrock/latest/userguide/model-access-modify.html) to grant access to the Titan Text Embeddings V2 model.
* `npm` is [installed](https://docs.npmjs.com/cli/v10/commands/npm-install)

### Installation

Run `npm install -g @apiary-gateway/cli`

### First Time Usage

Running `apiary create` will clone the Apiary CDK infrastructure into a new `apiary` folder inside your current working directory. Make sure you're in the directory where you want the `apiary` folder to be created before running the command.

Upon running `apiary create`, you'll be prompted to provide your LLM provider API
keys as part of the deployment process.

## Commands

- [`apiary create`](#apiary-create)
- [`apiary destroy`](#apiary-destroy)
- [`apiary update-llm-api-keys`](#apiary-update-llm-api-keys)
- [`apiary delete-llm-api-keys`](#apiary-delete-llm-api-keys)
- [`apiary create-usage-plan-with-key`](#apiary-create-usage-plan-with-key)
- [`apiary get-usage-plans`](#apiary-get-usage-plans)
- [`apiary delete-usage-plan`](#apiary-delete-usage-plan)
- [`apiary edit-usage-plan`](#apiary-edit-usage-plan)

### `apiary create`

Clone or update the CDK stack and deploy Apiary infrastructure to AWS

Usage: `apiary create`

### `apiary destroy`

Delete all Apiary resources in your AWS account. This action is irreversible.

Usage: `apiary destroy`

### `apiary update-llm-api-keys`

Update your stored API keys for LLM providers.

Usage: `apiary update-llm-api-keys`

### `apiary delete-llm-api-keys`

Delete all of your stored API keys for LLM providers. This action is irreversible.

Usage: `apiary delete-llm-api-keys`

### `apiary create-usage-plan-with-key`

Create a new usage plan with an associated API key.

Usage: `apiary create-usage-plan-with-key`

### `apiary get-usage-plans`

View all usage plans associated with the Apiary LLM Gateway.

Usage: `apiary get-usage-plans`

### `apiary delete-usage-plan`

Delete a specific usage plan associated with the Apiary LLM Gateway. You'll be 
prompted to provide the usage plan ID.

Usage: `apiary delete-usage-plan`

### `apiary edit-usage-plan`

Edit a specific usage plan associated with the Apiary LLM Gateway. You'll be 
prompted to provide the usage plan ID.

Usage: `apiary edit-usage-plan`
