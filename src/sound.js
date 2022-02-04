const bgSound = new Audio('/sound/bg.mp3');
const winSound = new Audio('/sound/game_win.mp3');
const alertSound = new Audio('/sound/alert.wav');
const targetSound = new Audio('/sound/target_click.mp3');
const nonTargetSound = new Audio('/sound/non_target_click.mp3');

export function playBgSound() {
  playSound(bgSound);
}
export function playWinSound() {
  playSound(winSound);
}
export function playAlertSound() {
  playSound(alertSound);
}
export function playTargetSound() {
  playSound(targetSound);
}
export function playNonTargetSound() {
  playSound(nonTargetSound);
}
export function stopBgSound() {
  stopSound(bgSound);
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}
function stopSound(sound) {
  sound.pause();
}
