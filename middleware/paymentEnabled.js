export default ({ store, redirect }) => {
  const paymentHash = store.state.payment.process.hash
  const paymentState = store.state.payment.process.state

  if (!paymentHash && paymentState !== 'enabled') {
    redirect('/notfound')
  }
}
