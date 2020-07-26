export default ({ store, redirect }) => {
  const paymentState = store.state.payment.process.state

  if (process.server && paymentState !== 'initiated') {
    redirect('/notfound')
  }
}
