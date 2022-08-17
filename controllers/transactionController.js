const { transactionService } = require("../services");

const getTransactions = async (req, res) => {
  try {

    const { limit, page } = req.query;
    
    const transactionData = {
        user_id: req.user.id,
        limit,
        page
    }

    const transactions = await transactionService.getTransactions(transactionData);

    return res.status(200).send({
      success: true,
      message: "Transactions gotten successfully",
      result: transactions,
    });
  } catch (error) {
    console.error("Get Transactions Error ->>", error);
    return res.status(500).send(error);
  }
};

module.exports = {
  getTransactions,
};
