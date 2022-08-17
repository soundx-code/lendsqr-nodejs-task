const db = require("../config/database");

/**
 * Get Transactions
 * @param {Object} transactionData
 * @returns {Promise<transactions>}
 */

const getTransactions = async (transactionData) => {
  const transactions = await db("transactions")
    .where("user_id", transactionData.user_id)
    .paginate({
      currentPage: transactionData.page,
      perPage: transactionData.limit,
      isLengthAware: true,
    });
  return transactions;
};

module.exports = {
  getTransactions,
};
