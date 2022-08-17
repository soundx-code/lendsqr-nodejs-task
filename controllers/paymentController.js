const { paymentService } = require("../services");

const getPayments = async (req, res) => {
  try {
    const { limit, page } = req.query;

    const transactionData = {
      user_id: req.user.id,
      limit,
      page,
    };

    const payments = await paymentService.getPayments(transactionData);

    return res.status(200).send({
      success: true,
      message: "Payments gotten successfully",
      result: payments,
    });
  } catch (error) {
    console.error("Get Payments Error ->>", error);
    return res.status(500).send(error);
  }
};

module.exports = {
  getPayments,
};
