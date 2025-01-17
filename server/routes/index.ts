/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { IRouter } from '../../../../src/core/server';
import { registerChatRoutes } from './chat_routes';
import { registerLangchainRoutes } from './langchain_routes';

export function setupRoutes(router: IRouter) {
  registerChatRoutes(router);
  registerLangchainRoutes(router);
}
