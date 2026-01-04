const { search } = require('marktguru');

(async () => {
  const queries = [
    {q: 'dazs', zip: '08428'},
    {q: 'dazs', zip: 8428},
    {q: 'dazs', zip: 10115},
    {q: 'dazs', zip: 60487},
    {q: 'haagen-dazs', zip: 10115},
    {q: 'haagen dazs', zip: 10115}
  ];

  for (const {q, zip} of queries) {
    try {
      console.log(`\nSearching for "${q}" with zip ${zip}...`);
      const offers = await search(q, { limit: 50, zipCode: zip });
      console.log(' ->', offers.length, 'offers');
      if (offers.length > 0) console.log('  sample brand.uniqueName:', offers[0].brand && offers[0].brand.uniqueName);
    } catch (err) {
      console.error('Error for', q, err && err.toString ? err.toString() : err);
    }
  }
})();