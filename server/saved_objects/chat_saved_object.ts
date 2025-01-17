/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { SavedObjectsType } from '../../../../src/core/server';
import { CHAT_SAVED_OBJECT } from '../../common/types/chat_saved_object_attributes';

export const chatSavedObject: SavedObjectsType = {
  name: CHAT_SAVED_OBJECT,
  hidden: false,
  namespaceType: 'single',
  management: {
    defaultSearchField: 'title',
    importableAndExportable: true,
    icon: 'chatLeft',
    getTitle(obj) {
      return obj.attributes.title;
    },
  },
  mappings: {
    dynamic: false,
    properties: {
      title: {
        type: 'text',
      },
      version: { type: 'integer' },
    },
  },
  migrations: {},
};
