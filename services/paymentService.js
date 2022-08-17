const db = require("../config/database");

/**
 * Get Payments
 * @param {Object} paymentData
 * @returns {Promise<payments>}
 */

const getPayments = async (paymentData) => {
  const payments = await db("payments")
    .where("sender_id", paymentData.user_id)
    .paginate({
      currentPage: paymentData.page,
      perPage: paymentData.limit,
      isLengthAware: true,
    });
  return payments;
};

module.exports = {
  getPayments,
};
