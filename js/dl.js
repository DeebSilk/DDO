(function () {
  var repo = 'DeebSilk/DeepDiveOnline';
  var buttons = document.querySelectorAll('.btn-dl-nav');
  if (!buttons.length) return;
  var downloading = false;

  function startDownload(url, name) {
    var a = document.createElement('a');
    a.href = url;
    a.download = name || '';
    a.rel = 'noopener';
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      if (downloading) return;
      downloading = true;
      fetch('https://api.github.com/repos/' + repo + '/releases/latest', {
        headers: { 'Accept': 'application/vnd.github+json' }
      })
        .then(function (r) { if (!r.ok) throw new Error('no-release'); return r.json(); })
        .then(function (rel) {
          var assets = rel.assets || [];
          var a = assets.find(function (x) { return /windows|win64|\.exe|\.zip/i.test(x.name); }) || assets[0];
          if (!a || !a.browser_download_url) throw new Error('no-assets');
          startDownload(a.browser_download_url, a.name);
        })
        .catch(function () {
          window.location.href = 'index.html#download';
        })
        .then(function () { downloading = false; });
    });
  });
})();
