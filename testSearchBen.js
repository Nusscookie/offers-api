const { search } = require('marktguru');

(async () => {
  const queries = [
    {q: 'ben', zip: '08428'},
    {q: 'ben', zip: 8428},
    {q: 'ben', zip: 10115},
    {q: 'ben', zip: 60487},
    {q: 'benjamin', zip: 10115},
    {q: 'ben & jerry', zip: 10115}
  ];

  for (const {q, zip} of queries) {
    try {
      console.log(`\nSearching for "${q}" with zip ${zip}...`);
      const offers = await search(q, { limit: 10, zipCode: zip });
      console.log(' ->', offers.length, 'offers');
    } catch (err) {
      console.error('Error for', q, err && err.toString ? err.toString() : err);
    }
  }
})();