// Ctrl + K should focus the search bar
document.onkeydown = function (e) {
  if (e.ctrlKey && e.key === 'k') {
    const search = document.getElementsByClassName('navbar__search-input')[0]
    if (search) {
      search.focus()
    }
    // By default, using Ctrl + K in Chrome will open the location bar, so disable this
    e.preventDefault()
  }
}
