export default (value, ack) => {
  replicant = nodecg.Replicant("loadedData")
  try {
    if (value?.maplist) {
      replicant.value.maplist = value.maplist
    }
    if (value?.teamlist) {
      replicant.value.teamlist = value.teamlist
    }
    if (ack && !ack.handled) {
      ack(null, value)
    }
  } catch (e) {
    ack(e)
  }
}
