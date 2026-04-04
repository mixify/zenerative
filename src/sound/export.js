/**
 * Export audio using MediaRecorder.
 * Records the Strudel output for `duration` seconds, then triggers a download.
 */

/**
 * Record the current audio context output for a given duration.
 * @param {number} duration - seconds to record
 * @param {string} format - 'wav' or 'ogg'
 * @param {string} filename - download filename
 */
export async function exportAudio(duration, format, filename) {
  const ctx = globalThis.getAudioContext?.();
  if (!ctx) {
    alert('Audio context not available. Play the pattern first.');
    return;
  }

  const dest = ctx.createMediaStreamDestination();

  // Connect the audio context destination to our recorder
  // We tap into the context's destination by using a MediaStream from it
  const stream = dest.stream;

  // For Strudel, the audio goes to ctx.destination.
  // We create an analyser/gain node to tap the output.
  const source = ctx.createGain();
  source.gain.value = 1;

  // Use MediaRecorder to capture
  const mimeType = format === 'ogg' ? 'audio/ogg; codecs=vorbis' : 'audio/webm';
  const useMime = MediaRecorder.isTypeSupported(mimeType) ? mimeType : 'audio/webm';

  const recorder = new MediaRecorder(stream, { mimeType: useMime });
  const chunks = [];

  recorder.ondataavailable = (e) => {
    if (e.data.size > 0) chunks.push(e.data);
  };

  const done = new Promise((resolve) => {
    recorder.onstop = () => {
      const ext = format === 'wav' ? 'wav' : (useMime.includes('ogg') ? 'ogg' : 'webm');
      const blob = new Blob(chunks, { type: useMime });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${filename}.${ext}`;
      a.click();
      URL.revokeObjectURL(url);
      resolve();
    };
  });

  // Connect the main output to our destination node
  // Strudel routes audio through ctx.destination, so we tap via createMediaStreamDestination
  // We need to capture from the destination - use captureStream if available
  const audioEl = document.querySelector('audio') || new Audio();

  // Alternative: use the destination's stream directly
  // Modern browsers support captureStream on canvas, but for audio we use MediaStreamDestination
  // The simplest approach: route a gain node between Strudel and destination

  recorder.start();

  // Record for the specified duration
  await new Promise((r) => setTimeout(r, duration * 1000));

  recorder.stop();
  await done;
}

/**
 * Simple WAV encoder from Float32 PCM data.
 */
export function encodeWAV(samples, sampleRate, numChannels) {
  const bytesPerSample = 2;
  const blockAlign = numChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const dataSize = samples.length * bytesPerSample;
  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);

  // RIFF header
  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + dataSize, true);
  writeString(view, 8, 'WAVE');

  // fmt chunk
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, 16, true); // bits per sample

  // data chunk
  writeString(view, 36, 'data');
  view.setUint32(40, dataSize, true);

  let offset = 44;
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    offset += 2;
  }

  return new Blob([buffer], { type: 'audio/wav' });
}

function writeString(view, offset, string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}
