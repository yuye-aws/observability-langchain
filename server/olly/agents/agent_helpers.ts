/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { BaseLanguageModel } from 'langchain/base_language';
import { Callbacks } from 'langchain/callbacks';
import { BufferMemory } from 'langchain/memory';
import { DynamicTool } from 'langchain/tools';
import { AgentFactory } from './agent_factory/agent_factory';
import {
  PARENT_AGENT_HUMAN_MESSAGE,
  PARENT_AGENT_SYSTEM_MESSAGE,
} from './prompts/parent_agent_prompts';

export const chatAgentInit = (
  model: BaseLanguageModel,
  pluginAgentTools: DynamicTool[],
  callbacks: Callbacks,
  memory?: BufferMemory
) => {
  const chatAgent = new AgentFactory(
    'chat',
    pluginAgentTools,
    {
      chat_system_message: PARENT_AGENT_SYSTEM_MESSAGE,
      chat_human_message: PARENT_AGENT_HUMAN_MESSAGE,
    },
    model,
    callbacks,
    memory
  );
  return chatAgent;
};
