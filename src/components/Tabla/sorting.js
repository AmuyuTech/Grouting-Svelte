import 'firebase'
export function sortString(rows, dir, key) {
  return rows.sort((a, b) =>
    dir === "asc"
      ? ("" + a[key]).localeCompare(b[key])
      : ("" + b[key]).localeCompare(a[key])
  );
}

export function sortNumber(rows, dir, key) {
  return rows.sort((a, b) =>
    dir === "asc" ? a[key] - b[key] : b[key] - a[key]
  );
}
export function sortDate(rows, dir, key) {
  return rows.sort((a, b) =>
    dir === "asc" ? toDate(a[key]) - toDate(b[key]) : toDate(b[key]) - toDate(a[key])
  );
}
function toDate(timestamp$) {
  return timestamp$.toMillis()
  //! referencia a Timestamp => firebase.default.firestore.Timestamp.now().toMillis
}