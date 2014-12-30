var H5P = H5P || {};

H5P.SoundEffects = (function ($) {
  SoundEffects = {
    types: [
      'positive-short',
      'negative-short'
    ],
    sounds: [],
    libraryPath: undefined,
    muted: false
  };

  /**
   * Setup defined sounds
   *
   * @return {boolean} True if setup was successfull, otherwise false
   */
  SoundEffects.setup = function () {
    if (!H5P.createjs.Sound.initializeDefaultPlugins()) {
      return false;
    }

    SoundEffects.libraryPath = H5PIntegration.getLibraryPath('H5P.SingleChoiceSet-1.0');
    H5P.createjs.Sound.alternateExtensions = ['mp3'];
    for (var i = 0; i < SoundEffects.types.length; i++) {
      var type = SoundEffects.types[i];
      H5P.createjs.Sound.registerSound(SoundEffects.libraryPath + '/sounds/' + type + '.ogg', type);
    }

    return true;
  };

  /**
   * Play a sound
   *
   * @param  {string} type  Name of the sound as defined in [SoundEffects.types]{@link H5P.SoundEffects.SoundEffects#types}
   * @param  {number} delay Delay in milliseconds
   */
  SoundEffects.play = function (type, delay) {
    if (SoundEffects.muted === false) {
      delay = delay || 0;
      var player = H5P.createjs.Sound.play(type, H5P.createjs.Sound.INTERRUPT_NONE, delay, 0, false, 1);
    }
  };

  /**
   * Mute. Subsequent invocations of SoundEffects.play() will not make any sounds beeing played.
   */
  SoundEffects.mute = function () {
    SoundEffects.muted = true;
  };

  /**
   * Unmute
   */
  SoundEffects.unmute = function () {
    SoundEffects.muted = false;
  };

  return SoundEffects;
})(H5P.jQuery);
