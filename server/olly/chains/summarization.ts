/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { BaseLanguageModel } from 'langchain/base_language';
import { Callbacks } from 'langchain/callbacks';
import { loadQAStuffChain } from 'langchain/chains';
import { Document } from 'langchain/document';

export const requestSummarizationChain = async (
  model: BaseLanguageModel,
  question: string,
  text: string,
  callbacks?: Callbacks
) => {
  const chainA = loadQAStuffChain(model);
  // TODO use vector search on splitted documents and loadQAMapReduceChain if text is long
  // without vector search it takes too long for map reduce calls
  const docs = [new Document({ pageContent: text })];
  const output = await chainA.call(
    {
      input_documents: docs,
      question: `Summarize the below API response given question: ${question}.

Give documents to support your point.

Skip the preamble; go straight into the summarization`,
    },
    { callbacks }
  );
  return output.text;
};
