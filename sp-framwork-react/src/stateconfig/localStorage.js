import store from 'store'
export const loadState = () => {
  const serializedStete = store.get('state')
  if (serializedStete === null) {
    return undefined
  }
  return serializedStete
}

export const saveState = (state) => {
  const serializedStete = state
  store.set('state', serializedStete)
}
