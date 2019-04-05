const {
  Address,
  Account,
  TransferTransaction,
  TimeWindow,
  EmptyMessage,
  TransactionHttp,
  XEM
} = require('nem-library')

const DEFAULT_ORIGIN_PK = process.env.ORIGIN_ADDRESS_PK
const DEFAULT_AMOUNT = +process.env.XEM_AMOUNT

module.exports = {
  transfer: async ({
    originAddressPK = DEFAULT_ORIGIN_PK,
    amount = DEFAULT_AMOUNT,
    address
  }) => {
    const account = Account.createWithPrivateKey(originAddressPK)

    const transferTransaction = TransferTransaction.create(
      TimeWindow.createWithDeadline(),
      new Address(address),
      new XEM(amount),
      EmptyMessage
    )

    const signedTransaction = account.signTransaction(transferTransaction)
    const transactionHttp = new TransactionHttp()
    return transactionHttp.announceTransaction(signedTransaction)
      .first().toPromise()
  }
}
