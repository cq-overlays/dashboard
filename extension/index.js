module.exports = nodecg => {
  nodecg.listenFor("uploadData", (value, ack) => {
    replicant = nodecg.Replicant("loadedData")
    try {
      if (value?.maplist) {
        replicant.value.maplist = value.maplist
      }
      if (value?.teamlist) {
        replicant.value.teamlist = value.teamlist
      }
      if (value?.colorlist) {
        replicant.value.colorlist = value.colorlist
      }
      if (ack && !ack.handled) {
        ack(null, value)
      }
    } catch (e) {
      ack(e)
    }
  })
}
