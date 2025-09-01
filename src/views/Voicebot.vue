<template>
  <v-app class="bg-navy">
    <v-container
      class="d-flex flex-column align-center justify-center fill-height text-center"
    >
      <h2 class="text-h4 font-weight-bold text-white mb-6">
        {{ $t("title") }}
      </h2>

      <div class="bot-circle">
      </div>

      <div class="user-wave-container">
        <div class="wave-bar" v-for="n in 5" :key="n"></div>
      </div>

      <v-btn
        class="my-4"
        color="yellow darken-2"
        size="large"
        rounded="xl"
        elevation="4"
        @click="toggleRecording"
      >
        {{ isRecording ? "Detener" : "Hablar" }}
      </v-btn>

      <p class="text-caption mt-4 text-grey-lighten-1">
        {{ $t("description") }}
        <strong>{{ $t("author") }}</strong>.
      </p>
    </v-container>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isRecording = ref(false);
const audioUrl = ref<string>("");
let mediaRecorder: MediaRecorder | null = null;
let audioChunks: Blob[] = [];

let audioContext: AudioContext | null = null;
let analyser: AnalyserNode | null = null;
let source: MediaStreamAudioSourceNode | null = null;
let dataArray: Uint8Array;

const sessionId = Math.floor(Math.random() * 1000000);

async function startRecording(): Promise<void> {
  try {
    const stream: MediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });

    mediaRecorder = new MediaRecorder(stream);
    audioChunks = [];
    mediaRecorder.ondataavailable = (event: BlobEvent) => audioChunks.push(event.data);
    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
      audioUrl.value = URL.createObjectURL(audioBlob);

      const formData = new FormData();
      formData.append("audio", audioBlob, "recording.wav");
      formData.append("sessionId", sessionId.toString());

      try {
        const res = await fetch("http://143.110.134.135:3005/api/voice/process", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        console.log("Respuesta del backend:", data);

        speakText(data.replyText);
      } catch (err) {
        console.error("Error al enviar el audio", err);
      }
    };
    mediaRecorder.start();

    audioContext = new AudioContext();
    source = audioContext.createMediaStreamSource(stream);
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 64;
    const bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);
    source.connect(analyser);

    isRecording.value = true;
    animateWaves();
  } catch (err) {
    console.error("Error al acceder al micrófono ", err);
  }
}

function speakText(text: string) {
  if (!("speechSynthesis" in window)) {
    console.warn("Este navegador no soporta SpeechSynthesis");
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "es-MX";
  utterance.rate = 1;
  utterance.pitch = 1;

  window.speechSynthesis.speak(utterance);
}

function stopRecording(): void {
  if (mediaRecorder && isRecording.value) {
    mediaRecorder.stop();
    isRecording.value = false;
  }
  if (audioContext) {
    audioContext.close();
    audioContext = null;
  }
}

function toggleRecording(): void {
  if (isRecording.value) {
    stopRecording();
  } else {
    startRecording();
  }
}

function animateWaves(): void {
  if (!isRecording.value || !analyser) return;
  requestAnimationFrame(animateWaves);

  analyser.getByteFrequencyData(dataArray);

  const bars = document.querySelectorAll<HTMLElement>(".wave-bar");
  bars.forEach((bar, i) => {
    const value = dataArray[i] || 0;
    bar.style.height = `${Math.max(value / 5, 5)}px`;
  });
}
</script>

<style scoped>
.bg-navy { background-color: #001f3f; }
.text-white { color: #ffffff !important; }

.bot-circle {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  margin: 2rem auto;
  transition: transform 0.3s ease;
}

.bot-circle.playing {
  transform: scale(1.1);
  box-shadow: 0 0 20px #ffffff;
}

.user-wave-container {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin: 1rem 0;
  height: 50px;
}

.wave-bar {
  width: 6px;
  margin: 0 4px;
  background: #ffeb3a;
  height: 5px;
  transition: height 0.05s ease;
}
</style>