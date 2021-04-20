import uploadData from "./uploadData"

module.exports = nodecg => {
  nodecg.listenFor("uploadData", uploadData)
}
