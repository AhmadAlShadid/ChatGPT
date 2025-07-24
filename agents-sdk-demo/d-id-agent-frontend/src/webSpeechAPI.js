let recognition;
let recognizing;
let result;

import { speakchat } from './main'; // path depends on your file structure

if (navigator.userAgent.includes("Firefox")) {
  recognition = new SpeechRecognition()
} else {
  recognition = new webkitSpeechRecognition()
}
recognition.lang = langSelect.value
recognition.continuous = true;
reset();
recognition.onend = reset;

recognition.onresult = function (event) {
  console.log(event)
  for (var i = event.resultIndex; i < event.results.length; ++i) {
    if (event.results[i].isFinal) {
      console.log("..")
      // textArea.value += event.results[i][0].transcript;
      result = event.results[i][0].transcript;
      speakchat(result)
    }
  }
}

function reset(id) {
  recognizing = false;
  if(id == "speech")
  {
  speechButton.style.color = ""
  speechButton.innerHTML = `<span class="material-symbols-outlined">mic</span>`;
  }
  else{
  speakButton.style.color = ""
  speakButton.innerHTML = `<span class="material-symbols-outlined">mic</span>`;
  }
  chatButton.removeAttribute("disabled")
  speakButton.removeAttribute("disabled")

}

function toggleStartStop(id) {
  recognition.lang = langSelect.value
  if (recognizing) {
    textArea.focus()
    recognition.stop();
    reset(id);
  } else {
    textArea.value = ""
    recognition.start();
    recognizing = true;
    if(id == "speech")
    {
    speechButton.style.color = "red"
    speechButton.innerHTML = "&#x23F9;"
    }
    else{
    speakButton.style.color = "red"
    speakButton.innerHTML = "&#x23F9;"
    }
    chatButton.setAttribute("disabled", true)
    // speakButton.setAttribute("disabled", true)
  }
}
export { toggleStartStop };
