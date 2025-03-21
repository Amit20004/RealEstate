const { exec } = require("child_process");

exports.getPrediction = (req, res) => {
    const { price, location, bedrooms, bathrooms } = req.body;
    const command = `python backend/ml/scripts/predict.py ${price} "${location}" ${bedrooms} ${bathrooms}`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).json({ error: error.message });
        }
        res.json({ prediction: stdout });
    });
};
