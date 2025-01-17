/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { MAX_OUTPUT_CHAR } from '../constants';
import { flatten, jsonToCsv, protectCall } from '../utils';

describe('protect calls', () => {
  it('should swallow errors for sync functions', async () => {
    const tool = jest.fn().mockImplementation(() => {
      throw new Error('failed to run in test');
    });
    const toolNoThrow = protectCall(tool);
    const res = await toolNoThrow('input');
    expect(res).toEqual('Error when running tool: Error: failed to run in test');
    expect(toolNoThrow('input')).resolves.not.toThrowError();
  });

  it('should swallow errors for async functions', async () => {
    const tool = jest.fn().mockRejectedValue(new Error('failed to run in test'));
    const toolNoThrow = protectCall(tool);
    const res = await toolNoThrow('input');
    expect(res).toEqual('Error when running tool: Error: failed to run in test');
    expect(toolNoThrow('input')).resolves.not.toThrowError();
  });

  it('should truncate text if output is too long', async () => {
    const tool = jest.fn().mockResolvedValue('failed to run in test'.repeat(1000) + 'end message');
    const truncated = protectCall(tool);
    const res = await truncated('input');
    expect(res).toContain('Output is too long, truncated');
    expect(res).toContain('end message');
    expect(res.length).toEqual(MAX_OUTPUT_CHAR);
  });
});

describe('utils', () => {
  it('converts json to csv', () => {
    const csv = jsonToCsv([
      { key1: 'value1', key2: 'value2', key3: 'value3' },
      { key4: 'value4', key5: 'value5', key6: 'value6' },
      { key7: 'value7', key8: 'value8', key9: 'value9' },
    ]);
    expect(csv).toEqual(
      'row_number,key1,key2,key3\n1,value1,value2,value3\n2,value4,value5,value6\n3,value7,value8,value9'
    );
  });

  it('handles empty json', () => {
    const csv = jsonToCsv([]);
    expect(csv).toEqual('row_number\n');
  });

  it('flattens nested objects', () => {
    const flattened = flatten([
      {
        key1: { key2: 'value1' },
        key3: {
          key4: 'value2',
          key5: { key6: 'value3', key7: [{ key8: 'value4' }, { key9: 'value5' }] },
        },
      },
      { key10: { key11: 'value6' } },
    ]);
    expect(flattened).toEqual([
      {
        'key1.key2': 'value1',
        'key3.key4': 'value2',
        'key3.key5.key6': 'value3',
        'key3.key5.key7.0.key8': 'value4',
        'key3.key5.key7.1.key9': 'value5',
      },
      {
        'key10.key11': 'value6',
      },
    ]);
  });
});
