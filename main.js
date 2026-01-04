const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { search: marktSearch } = require('marktguru');

app.use(express.json());

app.post('/offers/:search', async (req, res) => {
    const { limit = "1000", offset = "0", allowedRetailers = [], zipCode = "10115" } = req.body || {};
    const { search: searchParam } = req.params;
    const searchTerm = searchParam;
    const limitInt = parseInt(limit);
    const offsetInt = parseInt(offset);
    // Keep zip code as string to preserve leading zeros
    const zipCodeStr = String(zipCode);

    // Only pass allowedRetailers when provided and non-empty, otherwise leave undefined
    const retailersOption = Array.isArray(allowedRetailers) && allowedRetailers.length > 0 ? allowedRetailers : undefined;

    try {
        const offers = await searchOffers(searchTerm, limitInt, offsetInt, retailersOption, zipCodeStr);
        // if search returned an Error-like value, treat as failure
        if (offers && offers.isAxiosError) {
            return res.status(500).send({ message: "Error retrieving offers", error: offers.toString() });
        }
        return res.send({ message: "Offers retrieved successfully", data: offers });

    } catch (error) {
        return res.status(500).send({ message: "Error retrieving offers", error: error.toString() });
    }
});

async function searchOffers(searchTerm, limit, offset, allowedRetailers, zipCode) {
    try {
        const offers = await marktSearch(searchTerm, { limit: limit, offset: offset, allowedRetailers: allowedRetailers, zipCode: zipCode });
        return offers;
    } catch (error) {
        return error;
    }
}

app.listen(port, () => console.log("server on port " + port)); 