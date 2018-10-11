const leftPad = number => `0${number}`.substr(-2);

export const formatTime = secs => `${leftPad(~~(secs/60))}:${leftPad(~~(secs%60))}` ;


