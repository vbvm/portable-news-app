// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { AggregatedNewsSearchResults } from '../../search/common/AggregatedNewsSearchResults';
import { NewsSearchResultSet } from '../../search/common/NewsSearchResultSet';
import { SearchRequest } from '../../search/common/SearchRequest';
import NewsSearchResultModel, { NewsSearchResultModelData } from '../../search/models/NewsSearchResultModel';
import SearchManager from '../../search/SearchManager';
import { GuardianNewsSource } from '../../search/sources/GuardianNewsSource';

type Data = {
  searchResults: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { query } = req.query as { query: string };
  var searchRequest = new SearchRequest({
    term: query
  });

  var searchManager :SearchManager = new SearchManager();
  var guardianSource: GuardianNewsSource = new GuardianNewsSource();

  searchManager.addSource('guardian', guardianSource);

  var results: AggregatedNewsSearchResults = await searchManager.getSearchResults(searchRequest);

  res.status(200).json({ searchResults: results.toString() })
}