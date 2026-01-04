const { search } = require('marktguru');

(async () => {
  try {
    console.log('Starting search for "Cola"...');
    const offers = await search('Cola', { limit: 10, zipCode: 10115 });
    console.log('Got', offers.length, 'offers');
    if (offers.length > 0) console.log(offers[0]);
  } catch (err) {
    console.error('Error:', err && err.toString ? err.toString() : err);
  }
})();