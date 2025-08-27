let audioContext = new AudioContext();
let vocalBuffer, beatBuffer;

async function loadAudio(file) {
  const arrayBuffer = await file.arrayBuffer();
  return await audioContext.decodeAudioData(arrayBuffer);
}

async function removeVocal() {
  const file = document.getElementById('fileInput').files[0];
  if (!file) return alert('Najpierw wybierz plik!');

  document.getElementById('status').innerText = 'Przetwarzanie: usuwanie wokalu...';

  // W tej wersji demo — symulacja efektu
  setTimeout(() => {
    document.getElementById('status').innerText = '✅ Wokal usunięty (symulacja)';
    document.getElementById('player').innerHTML = '<audio controls src="demo-instrumental.mp3"></audio>';
  }, 3000);
}

async function removeBeat() {
  const file = document.getElementById('fileInput').files[0];
  if (!file) return alert('Najpierw wybierz plik!');

  document.getElementById('status').innerText = 'Przetwarzanie: usuwanie beatu...';

  setTimeout(() => {
    document.getElementById('status').innerText = '✅ Beat usunięty (symulacja)';
    document.getElementById('player').innerHTML = '<audio controls src="demo-vocal.mp3"></audio>';
  }, 3000);
}

async function mixTracks() {
  if (!vocalBuffer || !beatBuffer) {
    document.getElementById('status').innerText = 'Najpierw usuń wokal i beat!';
    return;
  }

  const vocalSource = audioContext.createBufferSource();
  const beatSource = audioContext.createBufferSource();

  vocalSource.buffer = vocalBuffer;
  beatSource.buffer = beatBuffer;

  vocalSource.connect(audioContext.destination);
  beatSource.connect(audioContext.destination);

  vocalSource.start();
  beatSource.start();

  document.getElementById('status').innerText = '🎧 Miksowanie...';
}
