const CONFIG = {
  recipient: 'Baby',
  recipientTop: 'MY FAVORITE PERSON',
  sender: 'Your Wife',
  intro: "I made this little corner of the internet because some feelings deserve more than a chat bubble, I love you. Happy 11th Months of Love.",
  letter: [
    'Thank you for making ordinary days feel like they have a little more light in them.',
    'I know there have been times when I haven\'t communicated the way I should have. I\'m sorry for the moments when I became quiet, distant, or failed to explain what I was feeling. Sometimes I don\'t know how to put everything into words, and I know that may have made you feel like I wasn\'t trying or that I didn\'t care. But please know that was never because you mattered any less to me.',
    'I\'m sorry for the times I could have listened better, opened up more, or simply made a little more effort to let you know what was going on in my heart. I know communication is important, and I\'m still learning how to express myself better—not just for myself, but for us.', 
    'I love the way we can laugh at nothing, talk for hours, or sit quietly and still feel completely understood.',
    'Whatever comes next, I hope we keep choosing the small moments — the ones that turn into the memories we never want to forget.',
    'I may not always get everything right, and I know I still have things to work on, but I want you to know that I care about us deeply. I\'m sorry for the things I\'ve fallen short on, and I\'m grateful that you\'re still here beside me.',
    'More than anything, I hope I can show you not just tell you how much you mean to me. I love you, and I always will.'
  ]
};

const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

function applyConfig(){
  $('#recipientName').textContent = CONFIG.recipient;
  $('#recipientPaper').textContent = CONFIG.recipient;
  $('#recipientTop').textContent = CONFIG.recipientTop;
  $('#senderName').textContent = CONFIG.sender;
  $('#introText').textContent = CONFIG.intro;
  $('#letterOne').textContent = CONFIG.letter[0];
  $('#letterTwo').textContent = CONFIG.letter[1];
  $('#letterThree').textContent = CONFIG.letter[2];
  $('#letterFour').textContent = CONFIG.letter[3];
  $('#letterFive').textContent = CONFIG.letter[4];
  $('#letterSix').textContent = CONFIG.letter[5];
  $('#letterSeven').textContent = CONFIG.letter[6];
}

applyConfig();

const gate = $('#gate');
const gift = $('#gift');
const envelope = $('#envelope');
const openBtn = $('#openBtn');
const bgMusic = document.getElementById('bgMusic');

function openGift(){
  if(gate.classList.contains('opening')) return;
  gate.classList.add('opening');
  setTimeout(() => {
    gift.classList.add('is-live');
    gift.setAttribute('aria-hidden','false');
    window.scrollTo({top:0, behavior:'instant'});
  }, 560);
  setTimeout(() => gate.classList.add('opened'), 800);
}

envelope.addEventListener('click', openGift);
envelope.addEventListener('keydown', (e) => { if(e.key === 'Enter' || e.key === ' ') openGift(); });
openBtn.addEventListener('click', openGift);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if(entry.isIntersecting){
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, {threshold:.14});
$$('.reveal').forEach(el => observer.observe(el));

function burstHearts(count=18){
  const layer = $('#hearts');
  for(let i=0;i<count;i++){
    const h = document.createElement('span');
    h.className='heart-particle';
    h.textContent = ['♥','♡','✦'][Math.floor(Math.random()*3)];
    h.style.left = `${15 + Math.random()*70}%`;
    h.style.bottom = `${10 + Math.random()*15}%`;
    h.style.setProperty('--x', `${(Math.random()-.5)*150}px`);
    h.style.animationDelay = `${Math.random()*.3}s`;
    layer.appendChild(h);
    setTimeout(()=>h.remove(),2200);
  }
}
$('#sprinkleBtn').addEventListener('click', () => burstHearts(28));

const modal = $('#modal');
const modalText = $('#modalText');
function showModal(text){
  modalText.textContent = text;
  modal.classList.add('show');
  modal.setAttribute('aria-hidden','false');
}
function closeModal(){
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden','true');
}
$$('.memory-card').forEach(card => card.addEventListener('click', () => showModal(card.dataset.message)));
$$('.surprise-btn').forEach(btn => btn.addEventListener('click', () => { showModal(btn.dataset.surprise); burstHearts(12); }));
$('#modalClose').addEventListener('click', closeModal);
modal.addEventListener('click', (e)=>{ if(e.target.dataset.close === 'true') closeModal(); });
document.addEventListener('keydown',(e)=>{ if(e.key === 'Escape') closeModal(); });

const musicToggle = document.getElementById('musicToggle');
const musicText = $('#musicText');
let audioCtx = null;
let playing = false;

function startTinyAmbient(){
  audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.frequency.value = 261.63;
  gain.gain.value = 0.0001;
  osc.connect(gain).connect(audioCtx.destination);
  const now = audioCtx.currentTime;
  gain.gain.exponentialRampToValueAtTime(0.028, now + .25);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);
  osc.start(now);
  osc.stop(now + 1.9);
}

function startMusic() {
  if (!bgMusic) return;

  bgMusic.loop = true;
  bgMusic.volume = 0.35;
  bgMusic.play().then(() => {
    playing = true;
    musicToggle.setAttribute('aria-pressed', String(playing));
    musicText.textContent = 'Now Scroll Down to Read the Letter';
  }).catch(() => {
    playing = false;
    musicToggle.setAttribute('aria-pressed', 'false');
    musicText.textContent = 'Play the song';
  });
}

function stopMusic() {
  if (!bgMusic) return;

  bgMusic.pause();
  bgMusic.currentTime = 0;
  playing = false;
  musicToggle.setAttribute('aria-pressed', 'false');
  musicText.textContent = 'Play our song';
}

musicToggle.addEventListener('click', () => {
  if (playing) {
    stopMusic();
    return;
  }

  startMusic();
});

$('#againBtn').addEventListener('click', ()=>{
  gate.classList.remove('opening','opened');
  gift.classList.remove('is-live');
  gift.setAttribute('aria-hidden','true');
  window.scrollTo({top:0, behavior:'smooth'});
  setTimeout(()=>document.body.scrollIntoView({behavior:'smooth',block:'start'}),50);
});
