/* =========================================================
   0. SUPABASE İSTEMCİSİ BAŞLATMA
   ========================================================= */
const SUPABASE_URL = 'https://aqvtympzzjnqdyofbvlx.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_hhkarS-UnZgynhzJUCh0Qw_iCyiIUqv';

let supabaseClient = null;
try {
  if (window.supabase && typeof window.supabase.createClient === 'function') {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
} catch (e) {
  console.error("Supabase initialization failed:", e);
}

/* =========================================================
   1. KÜRESEL DİL SÖZLÜĞÜ VE İ18N MOTORU
   ========================================================= */

const i18nDict = {
  en: {
    tagline: "Chess Development Platform",
    tabSolution: "💡 Solution",
    solutionHeader: "💡 Today's Solution",
    videoPlaceholder: "Click the button below to watch the solution video.",
    tabDaily: "📅 Daily Puzzle & Analysis",
    tabCategories: "📚 Puzzles",
    dailyPuzzleHeader: "🔥 Daily Puzzle",
    searchPlaceholder: "Search categories...",
    btnBackCats: "⬅️ Back to Categories",
    btnHint: "💡 Hint",
    btnSolution: "👁️ Show Solution",
    btnNextPuzzle: "🎲 Next Puzzle",
    turnWhite: "⚪ Your Turn (White)",
    turnBlack: "⬛ Your Turn (Black)",
    puzzleEloLabel: "Puzzle ELO",
    lblYourElo: "ELO:",
    promptEloTitle: "What is your ELO?",
    promptEloSub: "Please enter a value between 0 and 3000.",
    btnSaveElo: "Save & Start",
    errEloRange: "Please enter a valid ELO between 0 and 3000!",
    authChoiceSub: "Choose a method to continue:",
    btnLoginChoice: "Log In",
    btnRegisterChoice: "Sign Up",
    btnGuestChoice: "Continue as Guest",
    loginSub: "Log in with your email and password.",
    registerSub: "Set username, email, password, and ELO.",
    phUsername: "Username",
    phEmail: "Email Address",
    phPassword: "Password",
    btnBack: "⬅️ Back",
    btnRegisterStart: "Register & Start",
    diffEasy: "Easy (-200)",
    diffNormal: "Normal (0)",
    diffHard: "Hard (+200)",
    errLoginInput: "Please enter your email and password.",
    errRegInput: "Please fill all fields and make password at least 6 chars.",
    errRegTaken: "This email is already in use.",
    forgotTitle: "Reset Password",
    forgotSub: "Enter your registered email address.",
    btnSendReset: "Send Reset Link",
    btnBackLogin: "⬅️ Back to Log In",
    forgotPassLink: "Forgot Password?",
    errForgotEmail: "Please enter your email address.",
    msgForgotSuccess: "Password reset link has been sent to your email!",
    msgWrongMove: "❌ Wrong move! Try again.",
    msgCorrectMove: "✅ Correct! Keep going...",
    msgSolved: "🎉 Excellent! Puzzle solved.",
    msgSolvedDaily: "🎉 Excellent! Daily puzzle solved."
  },
  tr: {
    tagline: "Satranç Gelişim Platformu",
    tabSolution: "💡 Çözüm",
    solutionHeader: "💡 Günün Çözümü",
    videoPlaceholder: "Çözüm videosunu izlemek için aşağıdaki butona tıklayın.",
    tabDaily: "📅 Günlük Bulmaca & Analiz",
    tabCategories: "📚 Bulmacalar",
    dailyPuzzleHeader: "🔥 Günlük Bulmaca",
    searchPlaceholder: "Kategori ara...",
    btnBackCats: "⬅️ Kategorilere Dön",
    btnHint: "💡 İpucu",
    btnSolution: "👁️ Çözümü Göster",
    btnNextPuzzle: "🎲 Sonraki Bulmaca",
    turnWhite: "⚪ Sıra Sende (Beyaz)",
    turnBlack: "⬛ Sıra Sende (Siyah)",
    puzzleEloLabel: "Bulmaca ELO",
    lblYourElo: "ELO:",
    promptEloTitle: "Elonuz kaç?",
    promptEloSub: "Lütfen 0 ile 3000 arasında bir değer girin.",
    btnSaveElo: "Kaydet ve Başla",
    errEloRange: "Lütfen 0 ile 3000 arasında geçerli bir ELO giriniz!",
    authChoiceSub: "Devam etmek için bir yöntem seçin:",
    btnLoginChoice: "Giriş Yap",
    btnRegisterChoice: "Üye Ol",
    btnGuestChoice: "Üye Olmadan Devam Et",
    loginSub: "E-posta adresiniz ve şifrenizle giriş yapın.",
    registerSub: "Kullanıcı adı, e-posta, şifre ve ELO belirleyin.",
    phUsername: "Kullanıcı Adı",
    phEmail: "E-posta Adresi",
    phPassword: "Şifre",
    btnBack: "⬅️ Geri",
    btnRegisterStart: "Kayıt Ol & Başla",
    diffEasy: "Kolay (-200)",
    diffNormal: "Normal (0)",
    diffHard: "Zor (+200)",
    errLoginInput: "Lütfen e-posta ve şifrenizi girin.",
    errRegInput: "Lütfen tüm alanları doldurun ve şifrenizi en az 6 karakter yapın.",
    errRegTaken: "Bu e-posta adresi zaten kullanımda.",
    forgotTitle: "Şifremi Sıfırla",
    forgotSub: "Kayıt olduğunuz e-posta adresini girin.",
    btnSendReset: "Sıfırlama Bağlantısı Gönder",
    btnBackLogin: "⬅️ Giriş Ekranına Dön",
    forgotPassLink: "Şifremi Unuttum?",
    errForgotEmail: "Lütfen e-posta adresinizi girin.",
    msgForgotSuccess: "Şifre sıfırlama bağlantısı e-posta adresinize gönderildi!",
    msgWrongMove: "❌ Yanlış hamle! Tekrar dene.",
    msgCorrectMove: "✅ Doğru! Devam et...",
    msgSolved: "🎉 Mükemmel! Bulmacayı çözdünüz.",
    msgSolvedDaily: "🎉 Mükemmel! Günlük bulmacayı çözdünüz."
  },
  es: {
    tagline: "Plataforma de Desarrollo de Ajedrez",
    tabSolution: "💡 Solución",
    solutionHeader: "💡 Solución de Hoy",
    videoPlaceholder: "Haz clic en el botón de abajo para ver el video de la solución.",
    tabDaily: "📅 Puzle Diario y Análisis",
    tabCategories: "📚 Puzles",
    dailyPuzzleHeader: "🔥 Puzle Diario",
    searchPlaceholder: "Buscar categorías...",
    btnBackCats: "⬅️ Volver a Categorías",
    btnHint: "💡 Pista",
    btnSolution: "👁️ Ver Solución",
    btnNextPuzzle: "🎲 Siguiente Puzle",
    turnWhite: "⚪ Tu turno (Blancas)",
    turnBlack: "⬛ Tu turno (Negras)",
    puzzleEloLabel: "ELO de Puzle",
    lblYourElo: "ELO:",
    promptEloTitle: "¿Cuál es tu ELO?",
    promptEloSub: "Ingresa un valor entre 0 y 3000.",
    btnSaveElo: "Guardar y empezar",
    errEloRange: "¡Ingresa un ELO válido entre 0 y 3000!",
    authChoiceSub: "Elige un método para continuar:",
    btnLoginChoice: "Iniciar sesión",
    btnRegisterChoice: "Registrarse",
    btnGuestChoice: "Continuar como invitado",
    loginSub: "Inicia sesión con correo y contraseña.",
    registerSub: "Establece usuario, correo, contraseña y ELO.",
    phUsername: "Nombre de usuario",
    phEmail: "Correo electrónico",
    phPassword: "Contraseña",
    btnBack: "⬅️ Volver",
    btnRegisterStart: "Registrarse y empezar",
    diffEasy: "Fácil (-200)",
    diffNormal: "Normal (0)",
    diffHard: "Difícil (+200)",
    errLoginInput: "Ingresa correo y contraseña.",
    errRegInput: "Completa todos los campos (mínimo 6 caracteres).",
    errRegTaken: "Este correo ya está en uso.",
    forgotTitle: "Restablecer contraseña",
    forgotSub: "Ingresa tu correo registrado.",
    btnSendReset: "Enviar enlace",
    btnBackLogin: "⬅️ Volver al login",
    forgotPassLink: "¿Olvidaste tu contraseña?",
    errForgotEmail: "Ingresa tu correo electrónico.",
    msgForgotSuccess: "¡Enlace de restablecimiento enviado!",
    msgWrongMove: "❌ ¡Movimiento incorrecto! Inténtalo de nuevo.",
    msgCorrectMove: "✅ ¡Correcto! Sigue así...",
    msgSolved: "🎉 ¡Excelente! Puzle resuelto.",
    msgSolvedDaily: "🎉 ¡Excelente! Puzle diario resuelto."
  },
  ru: {
    tagline: "Шахматная платформа",
    tabSolution: "💡 Решение",
    solutionHeader: "💡 Решение дня",
    videoPlaceholder: "Нажмите кнопку ниже, чтобы посмотреть видео с решением.",
    tabDaily: "📅 Ежедневный пазл и анализ",
    tabCategories: "📚 Пазлы",
    dailyPuzzleHeader: "🔥 Ежедневная Задача",
    searchPlaceholder: "Поиск категорий...",
    btnBackCats: "⬅️ Назад к категориям",
    btnHint: "💡 Подсказка",
    btnSolution: "👁️ Показать решение",
    btnNextPuzzle: "🎲 Следующая задача",
    turnWhite: "⚪ Ваш ход (Белые)",
    turnBlack: "⬛ Ваш ход (Черные)",
    puzzleEloLabel: "ELO Задачи",
    lblYourElo: "ELO:",
    promptEloTitle: "Какой у вас ELO?",
    promptEloSub: "Пожалуйста, введите значение от 0 до 3000.",
    btnSaveElo: "Сохранить и начать",
    errEloRange: "Пожалуйста, введите корректный ELO от 0 до 3000!",
    authChoiceSub: "Выберите способ продолжения:",
    btnLoginChoice: "Войти",
    btnRegisterChoice: "Регистрация",
    btnGuestChoice: "Продолжить гостем",
    loginSub: "Войдите по email и паролю.",
    registerSub: "Укажите имя, email, пароль и ELO.",
    phUsername: "Имя пользователя",
    phEmail: "Электронная почта",
    phPassword: "Пароль",
    btnBack: "⬅️ Назад",
    btnRegisterStart: "Регистрация и старт",
    diffEasy: "Легкий (-200)",
    diffNormal: "Нормальный (0)",
    diffHard: "Сложный (+200)",
    errLoginInput: "Введите email и пароль.",
    errRegInput: "Заполните все поля (пароль от 6 символов).",
    errRegTaken: "Этот email уже используется.",
    forgotTitle: "Сброс пароля",
    forgotSub: "Введите ваш зарегистрированный email.",
    btnSendReset: "Отправить ссылку",
    btnBackLogin: "⬅️ Назад ко входу",
    forgotPassLink: "Забыли пароль?",
    errForgotEmail: "Пожалуйста, введите ваш email.",
    msgForgotSuccess: "Ссылка для сброса пароля отправлена!",
    msgWrongMove: "❌ Неправильный ход! Попробуйте снова.",
    msgCorrectMove: "✅ Верно! Продолжайте...",
    msgSolved: "🎉 Отлично! Задача решена.",
    msgSolvedDaily: "🎉 Отлично! Ежедневный пазл решен."
  },
  de: {
    tagline: "Schach-Entwicklungsplattform",
    tabSolution: "💡 Lösung",
    solutionHeader: "💡 Heutige Lösung",
    videoPlaceholder: "Klicke auf den Button unten, um das Lösungsvideo anzusehen.",
    tabDaily: "📅 Tägliches Rätsel & Analyse",
    tabCategories: "📚 Rätsel",
    dailyPuzzleHeader: "🔥 Tägliches Rätsel",
    searchPlaceholder: "Kategorien durchsuchen...",
    btnBackCats: "⬅️ Zurück zu Kategorien",
    btnHint: "Hinweis",
    btnSolution: "👁️ Lösung Zeigen",
    btnNextPuzzle: "🎲 Nächstes Rätsel",
    turnWhite: "⚪ Du bist dran (Weiß)",
    turnBlack: "⬛ Du bist dran (Schwarz)",
    puzzleEloLabel: "Rätsel ELO",
    lblYourElo: "ELO:",
    promptEloTitle: "Was ist dein ELO?",
    promptEloSub: "Bitte gib einen Wert zwischen 0 und 3000 ein.",
    btnSaveElo: "Speichern & Starten",
    errEloRange: "Bitte gib eine gültige ELO zwischen 0 und 3000 ein!",
    authChoiceSub: "Wähle eine Methode zum Fortfahren:",
    btnLoginChoice: "Anmelden",
    btnRegisterChoice: "Registrieren",
    btnGuestChoice: "Als Gast fortfahren",
    loginSub: "Mit E-Mail und Passwort anmelden.",
    registerSub: "Benutzername, E-Mail, Passwort und ELO festlegen.",
    phUsername: "Benutzername",
    phEmail: "E-Mail-Adresse",
    phPassword: "Passwort",
    btnBack: "⬅️ Zurück",
    btnRegisterStart: "Registrieren & Starten",
    diffEasy: "Einfach (-200)",
    diffNormal: "Normal (0)",
    diffHard: "Schwer (+200)",
    errLoginInput: "Bitte E-Mail und Passwort eingeben.",
    errRegInput: "Bitte alle Felder ausfüllen (min. 6 Zeichen).",
    errRegTaken: "Diese E-Mail wird bereits verwendet.",
    forgotTitle: "Passwort zurücksetzen",
    forgotSub: "Registrierte E-Mail-Adresse eingeben.",
    btnSendReset: "Link senden",
    btnBackLogin: "⬅️ Zurück zur Anmeldung",
    forgotPassLink: "Passwort vergessen?",
    errForgotEmail: "Bitte E-Mail-Adresse eingeben.",
    msgForgotSuccess: "Passwort-Zurücksetzen-Link gesendet!",
    msgWrongMove: "❌ Falscher Zug! Noch einmal versuchen.",
    msgCorrectMove: "✅ Richtig! Weiter so...",
    msgSolved: "🎉 Ausgezeichnet! Rätsel gelöst.",
    msgSolvedDaily: "🎉 Ausgezeichnet! Tägliches Rätsel gelöst."
  }
};

let currentLang = 'en';

function t(key) {
  const dict = i18nDict[currentLang] || i18nDict['en'];
  return dict[key] || i18nDict['en'][key] || key;
}

function changeLanguage(langCode) {
  currentLang = i18nDict[langCode] ? langCode : 'en';
  const dict = i18nDict[currentLang] || i18nDict['en'];

  $('#globalLangSelect').val(currentLang);

  $('[data-i18n]').each(function() {
    const key = $(this).attr('data-i18n');
    if (dict[key]) {
      $(this).html(dict[key]);
    } else if (i18nDict['en'][key]) {
      $(this).html(i18nDict['en'][key]);
    }
  });

  $('[data-i18n-placeholder]').each(function() {
    const key = $(this).attr('data-i18n-placeholder');
    if (dict[key]) {
      $(this).attr('placeholder', dict[key]);
    } else if (i18nDict['en'][key]) {
      $(this).attr('placeholder', i18nDict['en'][key]);
    }
  });

  updateDynamicBoardTexts();
  renderCategoryCards(LICHESS_44_CATEGORIES);
}

$(document).on('change', '#globalLangSelect', function() {
  const selected = $(this).val();
  changeLanguage(selected);
});

function updateDynamicBoardTexts() {
  if (currentActiveDailyPuzzle) {
    let playerColor = dailyGame.turn() === 'w' ? 'white' : 'black';
    let turnText = playerColor === 'white' ? t('turnWhite') : t('turnBlack');

    if (dailySolved) {
      $('#dailyTurn').text(t('msgSolvedDaily')).css('color', '#2ecc71');
    } else {
      $('#dailyTurn').text(turnText).css('color', '');
    }
  }

  if (currentActiveCatPuzzle) {
    let playerColor = catGame.turn() === 'w' ? 'white' : 'black';
    let userElo = activeUser ? activeUser.elo : 1500;
    let turnText = playerColor === 'white' ? t('turnWhite') : t('turnBlack');

    if (catSolved) {
      $('#catTurn').text(t('msgSolved')).css('color', '#2ecc71');
    } else {
      $('#catTurn').text(turnText).css('color', '');
    }
    $('#catSubText').text(`ELO: ${userElo} | ${t('puzzleEloLabel')}: ${currentActiveCatPuzzle.rating}`);
  }
}

let feedbackTimers = {};
function showBoardFeedback(indicatorId, text, color, duration) {
  const $el = $('#' + indicatorId);
  $el.text(text).css('color', color);
  clearTimeout(feedbackTimers[indicatorId]);
  if (duration > 0) {
    feedbackTimers[indicatorId] = setTimeout(() => {
      $el.css('color', '');
      updateDynamicBoardTexts();
    }, duration);
  }
}

/* =========================================================
   2. TİCARİ KULLANIMA UYGUN WEB AUDIO SES EFEKTLERİ
   ========================================================= */

const SoundManager = (() => {
  let audioCtx = null;
  let enabled = true;

  function getCtx() {
    if (!audioCtx) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return null;
      audioCtx = new Ctx();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }
    return audioCtx;
  }

  function playWoodClick(freq, duration, decay) {
    const ctx = getCtx();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + duration);

    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + decay);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  }

  function play(name) {
    if (!enabled) return;
    const ctx = getCtx();
    if (!ctx) return;

    switch (name) {
      case 'move':
        playWoodClick(320, 0.06, 0.05);
        break;
      case 'capture':
        playWoodClick(480, 0.08, 0.07);
        setTimeout(() => playWoodClick(240, 0.05, 0.04), 30);
        break;
      case 'check':
        playWoodClick(600, 0.09, 0.08);
        setTimeout(() => playWoodClick(800, 0.09, 0.08), 50);
        break;
      case 'wrong':
        playWoodClick(180, 0.15, 0.12);
        break;
      case 'success':
        [440, 554.37, 659.25, 880].forEach((freq, idx) => {
          setTimeout(() => playWoodClick(freq, 0.12, 0.1), idx * 80);
        });
        break;
    }
  }

  function init() {
    $(document).one('pointerdown keydown touchstart', () => { getCtx(); });
  }

  return {
    init,
    play,
    setEnabled: v => { enabled = !!v; }
  };
})();

SoundManager.init();

/* =========================================================
   3. TAHTA VE TAŞ TEMASI
   ========================================================= */

const WRONG_FLASH_MS = 650;

function getCburnettPieceUrl(piece) {
  const pieceMap = {
    'wP': 'wP', 'wR': 'wR', 'wN': 'wN', 'wB': 'wB', 'wQ': 'wQ', 'wK': 'wK',
    'bP': 'bP', 'bR': 'bR', 'bN': 'bN', 'bB': 'bB', 'bQ': 'bQ', 'bK': 'bK'
  };
  const pieceCode = pieceMap[piece] || piece;
  return `https://raw.githubusercontent.com/lichess-org/lila/master/public/piece/cburnett/${pieceCode}.svg`;
}

function createLichessBoard(containerId, handlers) {
  const $container = $('#' + containerId);

  const state = {
    board: null,
    game: null,
    playerColor: 'w',
    selected: null,
    freshSelect: false,
    freshTimer: null,
    legalTargets: [],
    lastMove: null,
    locked: false,
    busy: false,
    pendingWrong: false
  };

  const sq = square => $container.find('.square-' + square);

  function refreshHighlights() {
    $container.find('.square-55d63').removeClass('last-move selected-square legal-move legal-move-capture');
    if (state.lastMove) {
      sq(state.lastMove[0]).addClass('last-move');
      sq(state.lastMove[1]).addClass('last-move');
    }
    if (state.selected) {
      sq(state.selected).addClass('selected-square');
      state.legalTargets.forEach(m => sq(m.to).addClass(m.capture ? 'legal-move-capture' : 'legal-move'));
    }
  }

  if (window.MutationObserver) {
    let raf = null;
    const observer = new MutationObserver(() => {
      if (raf) return;
      raf = requestAnimationFrame(() => { raf = null; refreshHighlights(); });
    });
    observer.observe($container[0], { childList: true, subtree: true });
  }

  function flash(square, cls, ms) {
    const $s = sq(square); $s.addClass(cls);
    setTimeout(() => $s.removeClass(cls), ms);
  }

  function canPick(square) {
    if (!state.game || state.locked || state.busy) return false;
    if (state.game.turn() !== state.playerColor) return false;
    const piece = state.game.get(square);
    return !!piece && piece.color === state.playerColor;
  }

  function select(square) {
    const moves = state.game.moves({ square: square, verbose: true });
    state.selected = square;
    state.legalTargets = moves.map(m => ({ to: m.to, capture: /[ce]/.test(m.flags) }));
    refreshHighlights();
  }

  function deselect() {
    state.selected = null;
    state.legalTargets = [];
    state.freshSelect = false;
    refreshHighlights();
  }

  function markFreshSelect() {
    state.freshSelect = true;
    clearTimeout(state.freshTimer);
    state.freshTimer = setTimeout(() => { state.freshSelect = false; }, 500);
  }

  function playMoveSound(move) {
    const isCapture = move && /[ce]/.test(move.flags);
    SoundManager.play(isCapture ? 'capture' : 'move');
    if (state.game.in_check()) setTimeout(() => SoundManager.play('check'), 40);
  }

  function attemptMove(from, to, viaDrag) {
    const game = state.game;
    const legal = game.moves({ square: from, verbose: true }).find(m => m.to === to);

    if (!legal) {
      if (viaDrag) SoundManager.play('wrong');
      deselect();
      return 'snapback';
    }

    const verdict = handlers.onUserMove(from, to, legal);

    if (verdict === 'ok') {
      state.selected = null;
      state.legalTargets = [];
      state.freshSelect = false;
      state.lastMove = [from, to];
      refreshHighlights();
      playMoveSound(legal);
      flash(to, 'right-move', 700);
      if (!viaDrag) state.board.position(game.fen(), true);
      return 'drop';
    }

    state.selected = null;
    state.legalTargets = [];
    state.freshSelect = false;
    state.busy = true;
    state.pendingWrong = true;
    refreshHighlights();
    SoundManager.play('wrong');
    if (!viaDrag) state.board.move(from + '-' + to);
    sq(to).addClass('wrong-move');

    setTimeout(() => {
      sq(to).removeClass('wrong-move');
      state.pendingWrong = false;
      state.busy = false;
      if (state.board) state.board.position(game.fen(), true);
      refreshHighlights();
      if (handlers.onWrongReverted) handlers.onWrongReverted();
    }, WRONG_FLASH_MS);

    return 'drop';
  }

  function onDragStart(source) {
    if (!canPick(source)) return false;
    if (state.selected !== source) {
      select(source);
      markFreshSelect();
    }
    return true;
  }

  function onDrop(source, target) {
    if (target === 'offboard') { deselect(); return 'snapback'; }
    if (source === target) return 'snapback';
    const r = attemptMove(source, target, true);
    return r === 'snapback' ? 'snapback' : undefined;
  }

  function onSnapEnd() {
    if (state.pendingWrong || !state.board || !state.game) return;
    state.board.position(state.game.fen(), false);
  }

  function onSquareClick(square) {
    const game = state.game;
    if (!game || state.locked || state.busy) return;

    const piece = game.get(square);
    const own = piece && piece.color === state.playerColor && game.turn() === state.playerColor;

    if (own) {
      if (state.selected === square) {
        if (state.freshSelect) { state.freshSelect = false; return; }
        deselect();
        return;
      }
      select(square);
      return;
    }

    if (!state.selected) return;
    attemptMove(state.selected, square, false);
  }

  $container.off('click.lichess').on('click.lichess', '.square-55d63', function() {
    const square = $(this).attr('data-square');
    if (square) onSquareClick(square);
  });

  function ensureBoard() {
    if (state.board) return state.board;
    
    state.board = Chessboard(containerId, {
      draggable: true,
      dropOffBoard: 'snapback',
      pieceTheme: getCburnettPieceUrl,
      moveSpeed: 200,
      snapbackSpeed: 120,
      snapSpeed: 40,
      appearSpeed: 150,
      trashSpeed: 100,
      onDragStart: onDragStart,
      onDrop: onDrop,
      onSnapEnd: onSnapEnd
    });
    return state.board;
  }

  const api = {
    get board() { return state.board; },

    load(game, playerColor, lastMove, displayFen) {
      state.game = game;
      state.playerColor = playerColor;
      state.selected = null;
      state.legalTargets = [];
      state.freshSelect = false;
      state.locked = false;
      state.busy = false;
      state.pendingWrong = false;
      state.lastMove = lastMove || null;

      const board = ensureBoard();
      board.orientation(playerColor === 'w' ? 'white' : 'black');
      board.position(displayFen || game.fen(), false);
      refreshHighlights();
      api.resize();
    },

    reveal(move) {
      if (!state.board || !state.game) return;
      if (move) state.lastMove = [move.from, move.to];
      state.board.position(state.game.fen(), true);
      refreshHighlights();
      if (move) playMoveSound(move);
    },

    playMove(uci, opts) {
      opts = opts || {};
      const mv = state.game.move({ from: uci.substring(0, 2), to: uci.substring(2, 4), promotion: uci[4] || 'q' });
      if (!mv) return null;
      state.selected = null;
      state.legalTargets = [];
      state.lastMove = [mv.from, mv.to];
      if (state.board) state.board.position(state.game.fen(), opts.animate !== false);
      refreshHighlights();
      if (opts.sound !== false) playMoveSound(mv);
      return mv;
    },

    setLastMove(from, to) { state.lastMove = [from, to]; refreshHighlights(); },
    clearSelection() { deselect(); },
    sync(animate) { if (state.board && state.game) state.board.position(state.game.fen(), !!animate); },
    setBusy(v) { state.busy = !!v; if (v) deselect(); },
    lock() { state.locked = true; deselect(); },
    unlock() { state.locked = false; },
    isLocked() { return state.locked; },

    resize() {
      setTimeout(() => {
        if (state.board && $container.is(':visible')) {
          state.board.resize();
          refreshHighlights();
        }
      }, 120);
    }
  };

  return api;
}

/* =========================================================
   4. KULLANICI ELO VE ÜYELİK YÖNETİMİ
   ========================================================= */

let activeUser = {
  id: null,
  username: null,
  elo: 1500
};

function promptEloModal() {
  showAuthForm('choice');
  $('#eloPromptModal').removeClass('hidden');
}

function closeEloModal() {
  $('#eloPromptModal').addClass('hidden');
  switchPage(2);
}

function showAuthForm(type) {
  $('#authChoiceView, #authLoginForm, #authRegisterForm, #authGuestForm, #authForgotForm').hide();
  $('#loginErrorMsg, #regErrorMsg, #eloErrorMsg, #forgotMsg').hide();

  if (type === 'login') {
    $('#authLoginForm').show();
  } else if (type === 'register') {
    $('#authRegisterForm').show();
  } else if (type === 'guest') {
    $('#authGuestForm').show();
    $('#userEloInput').val(activeUser.elo || 1500);
  } else if (type === 'forgot') {
    $('#authForgotForm').show();
  } else {
    $('#authChoiceView').show();
  }

  changeLanguage(currentLang);
}

async function submitLogin() {
  let email = $('#loginEmail').val().trim();
  let pass = $('#loginPassword').val().trim();

  if (!email || !pass) {
    $('#loginErrorMsg').text(t('errLoginInput')).show();
    return;
  }

  if (supabaseClient) {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email: email,
      password: pass
    });

    if (error) {
      $('#loginErrorMsg').text('Login failed: ' + error.message).show();
      return;
    }

    if (data.user) {
      activeUser.id = data.user.id;
      const meta = data.user.user_metadata || {};
      activeUser.username = meta.username || email.split('@')[0];
      activeUser.elo = meta.elo !== undefined ? parseInt(meta.elo, 10) : 1500;
    }
  }

  localStorage.setItem('cap_current_username', activeUser.username);
  localStorage.setItem('cap_user_elo', activeUser.elo);

  $('#headerEloValue').text(activeUser.elo);
  $('#eloPromptModal').addClass('hidden');

  if ($('#categoryBoardSection').is(':visible')) {
    loadCategoryPuzzle();
  }
}

async function submitRegister() {
  let uname = $('#regUsername').val().trim();
  let email = $('#regEmail').val().trim();
  let pass = $('#regPassword').val().trim();
  let eloVal = parseInt($('#regEloInput').val().trim(), 10);

  if (!uname || !email || pass.length < 6) {
    $('#regErrorMsg').text(t('errRegInput')).show();
    return;
  }
  if (isNaN(eloVal) || eloVal < 0 || eloVal > 3000) {
    $('#regErrorMsg').text(t('errEloRange')).show();
    return;
  }

  if (supabaseClient) {
    const { data, error } = await supabaseClient.auth.signUp({
      email: email,
      password: pass,
      options: {
        data: {
          username: uname,
          elo: eloVal
        }
      }
    });

    if (error) {
      $('#regErrorMsg').text('Registration failed: ' + error.message).show();
      return;
    }

    if (data.user) {
      activeUser.id = data.user.id;
    }
  }

  localStorage.setItem('cap_current_username', uname);
  localStorage.setItem('cap_user_elo', eloVal);

  activeUser.username = uname;
  activeUser.elo = eloVal;

  $('#headerEloValue').text(activeUser.elo);
  $('#eloPromptModal').addClass('hidden');

  if ($('#categoryBoardSection').is(':visible')) {
    loadCategoryPuzzle();
  }
}

async function submitForgotPassword() {
  let email = $('#forgotEmail').val().trim();
  if (!email) {
    $('#forgotMsg').text(t('errForgotEmail')).css('color', '#e74c3c').show();
    return;
  }

  if (supabaseClient) {
    const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin,
    });

    if (error) {
      $('#forgotMsg').text('Error: ' + error.message).css('color', '#e74c3c').show();
      return;
    }
  }

  $('#forgotMsg').text(t('msgForgotSuccess')).css('color', '#2ecc71').show();
}

function submitUserElo() {
  let inputVal = $('#userEloInput').val().trim();
  let val = parseInt(inputVal, 10);

  if (isNaN(val) || val < 0 || val > 3000) {
    $('#eloErrorMsg').text(t('errEloRange')).show();
    return;
  }

  activeUser.username = null;
  activeUser.elo = val;
  localStorage.removeItem('cap_current_username');
  localStorage.setItem('cap_user_elo', val);

  $('#headerEloValue').text(val);
  $('#eloErrorMsg').hide();
  $('#eloPromptModal').addClass('hidden');

  if ($('#categoryBoardSection').is(':visible')) {
    loadCategoryPuzzle();
  }
}

/* =========================================================
   5. LICHESS ELO HESAPLAMA MOTORU & SUPABASE VERİ KAYDI
   ========================================================= */

function calculateEloChange(userElo, puzzleElo, isSuccess) {
  const K = 32;
  const expectedScore = 1 / (1 + Math.pow(10, (puzzleElo - userElo) / 400));
  const actualScore = isSuccess ? 1 : 0;
  let change = Math.round(K * (actualScore - expectedScore));
  
  if (isSuccess && change < 5) change = 5;
  if (!isSuccess && change > -5) change = -5;

  return change;
}

async function applyEloUpdate(change) {
  let oldElo = activeUser.elo;
  let newElo = Math.max(0, Math.min(3000, oldElo + change));
  
  activeUser.elo = newElo;
  localStorage.setItem('cap_user_elo', newElo);

  if (supabaseClient && activeUser.id) {
    await supabaseClient.auth.updateUser({
      data: { elo: newElo }
    });
  }

  if (activeUser.username) {
    let savedData = localStorage.getItem('cap_user_' + activeUser.username);
    if (savedData) {
      let userObj = JSON.parse(savedData);
      userObj.elo = newElo;
      localStorage.setItem('cap_user_' + activeUser.username, JSON.stringify(userObj));
    }
  }

  $('#headerEloValue').text(newElo);

  const sign = change > 0 ? `+${change}` : `${change}`;

  return { newElo, changeStr: `(${sign})` };
}

async function recordPuzzleToSupabase(puzzleId, isSolved) {
  if (!supabaseClient || !activeUser.id) return;
  try {
    await supabaseClient
      .from('user_puzzles')
      .insert([{ user_id: activeUser.id, puzzle_id: puzzleId, is_solved: isSolved }]);
  } catch (e) {
    console.error('Puzzle history could not be saved:', e);
  }
}

/* =========================================================
   6. ÇÖZÜM VİDEO YÖNETİMİ & KATEGORİLER
   ========================================================= */

function playMainSolutionVideo() {
  const $video =$('#mainSolutionVideo');
  const $placeholder =$('#videoPlaceholderText');

  $placeholder.hide();$video.show();
  
  const vidElem = $video.get(0);
  if (vidElem) {
    vidElem.play().catch(err => {
      console.log("Video otomatik oynatılamadı, kullanıcı etkileşimi gerekebilir:", err);
    });
  }
}

const LICHESS_44_CATEGORIES = [
  { id: 'fork', name: '⚔️ Fork', desc: 'Attacking two or more pieces simultaneously.' },
  { id: 'pin', name: '📌 Pin', desc: 'Restricting a piece because moving it exposes a more valuable one.' },
  { id: 'skewer', name: '🗡️ Skewer', desc: 'Attacking a valuable piece, forcing it to move and exposing another.' },
  { id: 'discoveredattack', name: '🔍 Discovered Attack', desc: 'An attack revealed when one piece moves out of the way.' },
  { id: 'doublecheck', name: '💥 Double Check', desc: 'Delivering check with two pieces simultaneously.' },
  { id: 'deflection', name: '🝝 Deflection', desc: 'Forcing a defending piece to leave its crucial position.' },
  { id: 'interference', name: '🚧 Interference', desc: 'Interrupting the line of communication between opponent pieces.' },
  { id: 'xrayattack', name: '📻 X-Ray Attack', desc: 'Indirect pressure through an opponent piece onto a square or piece.' },
  { id: 'zugzwang', name: '⏳ Zugzwang', desc: 'Forcing the opponent to make a disadvantageous move.' },
  { id: 'overloading', name: '⚖️ Overloading', desc: 'Attacking a piece that is overburdened with defensive duties.' },
  { id: 'trappedpiece', name: '🕸️ Trapped Piece', desc: 'Trapping a piece that has no safe escape squares.' },
  { id: 'attraction', name: '🧲 Attraction', desc: 'Luring an opponent piece or king to an unfavorable square.' },
  { id: 'clearance', name: '🧹 Clearance', desc: 'Clearing a square or file for another piece.' },
  { id: 'quietmove', name: '🤫 Quiet Move', desc: 'A subtle move that does not make a check or capture but prepares a fatal threat.' },
  { id: 'queensacrifice', name: '👑 Queen Sacrifice', desc: 'Sacrificing the queen for a winning tactic or mate.' },
  { id: 'rooksacrifice', name: '♜ Rook Sacrifice', desc: 'Sacrificing a rook to destroy enemy defense.' },
  { id: 'bishopsacrifice', name: '♝ Bishop Sacrifice', desc: 'Sacrificing a bishop to open up the king position.' },
  { id: 'knightsacrifice', name: '♞ Knight Sacrifice', desc: 'Sacrificing a knight for a fork or mate.' },
  { id: 'pawnsacrifice', name: '♟️ Pawn Sacrifice', desc: 'Sacrificing a pawn to gain initiative or open lines.' },
  { id: 'exchangesacrifice', name: '🔄 Exchange Sacrifice', desc: 'Trading a rook for a minor piece for strategic advantage.' },
  { id: 'matein1', name: '🎯 Mate in 1', desc: 'Checkmate in a single move.' },
  { id: 'matein2', name: '🎯 Mate in 2', desc: 'A direct 2-move checkmate combination.' },
  { id: 'matein3', name: '🎯 Mate in 3', desc: 'Deep calculation 3-move checkmate.' },
  { id: 'backrankmate', name: '🏰 Back Rank Mate', desc: 'Mate delivered on the back rank behind pawns.' },
  { id: 'smotheredmate', name: '🐴 Smothered Mate', desc: 'A knight checkmate against a trapped king.' },
  { id: 'arabianmate', name: '🇦🇪 Arabian Mate', desc: 'Rook and knight coordination mate in the corner.' },
  { id: 'hookmate', name: '🪝 Hook Mate', desc: 'Mate involving a rook, knight, and pawn.' },
  { id: 'bishopsmate', name: '📐 Double Bishop Mate', desc: 'Mate delivered by two bishops on diagonals.' },
  { id: 'anastasiamate', name: '🏛️ Anastasia Mate', desc: 'Knight and rook trap mate on the edge.' },
  { id: 'bodenmate', name: '⚔️ Boden Mate', desc: 'Criscrossing bishop diagonal checkmate.' },
  { id: 'dovetailmate', name: '🕊️ Dovetail Mate', desc: 'Close-up queen checkmate pattern.' },
  { id: 'pawnendgame', name: '♟️ Pawn Endgame', desc: 'Pawn promotion and key square endgames.' },
  { id: 'rookendgame', name: '♜ Rook Endgame', desc: 'Lucena and Philidor endgame positions.' },
  { id: 'knightendgame', name: '♞ Knight Endgame', desc: 'Knight endgame pawn races.' },
  { id: 'bishopendgame', name: '♝ Bishop Endgame', desc: 'Opposite/same-colored bishop endgames.' },
  { id: 'queenendgame', name: '♛ Queen Endgame', desc: 'Perpetual check and promotion defense.' },
  { id: 'advancedpawn', name: '⏩ Advanced Pawn', desc: 'Tactics involving advanced passed pawns.' },
  { id: 'promotion', name: '👑 Pawn Promotion', desc: 'Promoting a pawn on the final rank.' }
];

$(document).ready(async function() {
  const hash = window.location.hash;
  if (hash && hash.includes('type=recovery')) {
    setTimeout(async () => {
      const newPassword = prompt("Lütfen yeni şifrenizi girin (en az 6 karakter):");
      if (newPassword && newPassword.length >= 6) {
        if (supabaseClient) {
          const { data, error } = await supabaseClient.auth.updateUser({
            password: newPassword
          });
          if (error) {
            alert("Şifre güncellenemedi: " + error.message);
          } else {
            alert("Şifreniz başarıyla güncellendi! Yeni şifrenizle giriş yapabilirsiniz.");
            window.location.href = window.location.origin;
          }
        }
      } else if (newPassword) {
        alert("Şifreniz en az 6 karakter olmalıdır!");
      }
    }, 500);
  }

  let savedUname = localStorage.getItem('cap_current_username');
  let savedElo = localStorage.getItem('cap_user_elo');

  if (savedUname) {
    let savedData = localStorage.getItem('cap_user_' + savedUname);
    if (savedData) {
      let userObj = JSON.parse(savedData);
      activeUser.username = userObj.username;
      activeUser.elo = userObj.elo;
    }
  } else if (savedElo) {
    let parsed = parseInt(savedElo, 10);
    if (!isNaN(parsed) && parsed >= 0 && parsed <= 3000) {
      activeUser.elo = parsed;
    }
  }

  if (supabaseClient) {
    const { data } = await supabaseClient.auth.getUser();
    if (data && data.user) {
      activeUser.id = data.user.id;
      const meta = data.user.user_metadata || {};
      if (meta.username) activeUser.username = meta.username;
      if (meta.elo) activeUser.elo = parseInt(meta.elo, 10);
    }
  }

  $('#headerEloValue').text(activeUser.elo);

  bootApp();
  renderCategoryCards(LICHESS_44_CATEGORIES);

  $('#searchInput').on('keyup input', function() {
    let q = $(this).val().toLowerCase();
    let filtered = LICHESS_44_CATEGORIES.filter(c => c.name.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q));
    renderCategoryCards(filtered);
  });

  $(document).on('keydown', function(e) {
    if (e.key === 'Escape') {
      if (!$('#eloPromptModal').hasClass('hidden')) {
        closeEloModal();
      }
    }
  });

  $('#eloPromptModal').on('click', function(e) {
    if (e.target === this) {
      closeEloModal();
    }
  });
});

function bootApp() {
  $('#mainApp').show();
  changeLanguage('en');
  $('#headerEloBox').hide();
  initDailyPuzzle();
}

/* =========================================================
   7. BULMACA SİSTEMİ & OYNANIŞ MANTIĞI
   ========================================================= */

let currentDiffOffset = 0;
let selectedCat = LICHESS_44_CATEGORIES[0];

let catGame = new Chess();
let catBoard = null;
let catCtrl = null;
let catSolution = [];
let catIndex = 0;
let catSolved = false;
let catGen = 0;
let currentActiveCatPuzzle = null;
let isCatPuzzleEvaluated = false;

let dailyGame = new Chess();
let dailyBoard = null;
let dailyCtrl = null;
let dailySolution = [];
let dailyIndex = 0;
let dailySolved = false;
let dailyGen = 0;
let currentActiveDailyPuzzle = null;

function puzzleCtx(which) {
  if (which === 'daily') {
    return {
      which: 'daily',
      game: dailyGame,
      ctrl: dailyCtrl,
      get sol() { return dailySolution; },
      get idx() { return dailyIndex; },
      set idx(v) { dailyIndex = v; },
      get gen() { return dailyGen; },
      puzzle: currentActiveDailyPuzzle,
      indicator: 'dailyTurn',
      solvedKey: 'msgSolvedDaily',
      setSolved: v => { dailySolved = v; }
    };
  }
  return {
    which: 'cat',
    game: catGame,
    ctrl: catCtrl,
    get sol() { return catSolution; },
    get idx() { return catIndex; },
    set idx(v) { catIndex = v; },
    get gen() { return catGen; },
    puzzle: currentActiveCatPuzzle,
    indicator: 'catTurn',
    solvedKey: 'msgSolved',
    setSolved: v => { catSolved = v; }
  };
}

async function finishPuzzle(which, isAutoSolution = false) {
  const c = puzzleCtx(which);
  c.setSolved(true);
  if (c.ctrl) c.ctrl.lock();

  let text = t(c.solvedKey);
  
  if (which === 'cat' && !isCatPuzzleEvaluated && !isAutoSolution) {
    isCatPuzzleEvaluated = true;
    let pElo = currentActiveCatPuzzle ? currentActiveCatPuzzle.rating : 1500;
    let change = calculateEloChange(activeUser.elo, pElo, true);
    let res = await applyEloUpdate(change);
    text += ` ${res.changeStr}`;

    if (currentActiveCatPuzzle && currentActiveCatPuzzle.id) {
      recordPuzzleToSupabase(currentActiveCatPuzzle.id, true);
    }
  }

  showBoardFeedback(c.indicator, text, '#2ecc71', 0);
  setTimeout(() => SoundManager.play('success'), 250);
}

async function handleFailedCatPuzzle() {
  if (isCatPuzzleEvaluated || !currentActiveCatPuzzle) return;
  isCatPuzzleEvaluated = true;
  let pElo = currentActiveCatPuzzle.rating;
  let change = calculateEloChange(activeUser.elo, pElo, false);
  let res = await applyEloUpdate(change);
  
  if (currentActiveCatPuzzle && currentActiveCatPuzzle.id) {
    recordPuzzleToSupabase(currentActiveCatPuzzle.id, false);
  }

  showBoardFeedback('catTurn', `${t('msgWrongMove')} ${res.changeStr}`, '#e74c3c', 1800);
}

function processPuzzleUserMove(which, src, tgt) {
  const c = puzzleCtx(which);
  if (src === tgt) return 'wrong';

  const expected = c.sol[c.idx];
  const userMove = src + tgt;

  if (!expected || userMove !== expected.substring(0, 4)) {
    if (which === 'cat') {
      handleFailedCatPuzzle();
    } else {
      showBoardFeedback(c.indicator, t('msgWrongMove'), '#e74c3c', 1500);
    }
    return 'wrong';
  }

  const mv = c.game.move({ from: src, to: tgt, promotion: expected[4] || 'q' });
  if (!mv) return 'wrong';
  c.idx = c.idx + 1;

  if (c.idx >= c.sol.length) {
    finishPuzzle(which, false);
    return 'ok';
  }

  showBoardFeedback(c.indicator, t('msgCorrectMove'), '#2ecc71', 900);

  const gen = c.gen;
  c.ctrl.setBusy(true);
  setTimeout(() => {
    const cc = puzzleCtx(which);
    if (cc.gen !== gen) return;
    const oppMove = cc.sol[cc.idx];
    if (oppMove) {
      cc.ctrl.playMove(oppMove);
      cc.idx = cc.idx + 1;
    }
    cc.ctrl.setBusy(false);
    updateDynamicBoardTexts();
  }, 350);

  return 'ok';
}

function playPuzzleHint(which) {
  const c = puzzleCtx(which);
  if (!c.ctrl || !c.sol || c.idx >= c.sol.length) return;

  isCatPuzzleEvaluated = true;

  c.ctrl.playMove(c.sol[c.idx]);
  c.idx = c.idx + 1;

  if (c.idx >= c.sol.length) {
    finishPuzzle(which, true);
    return;
  }

  const gen = c.gen;
  c.ctrl.setBusy(true);
  setTimeout(() => {
    const cc = puzzleCtx(which);
    if (cc.gen !== gen) return;
    const oppMove = cc.sol[cc.idx];
    if (oppMove) {
      cc.ctrl.playMove(oppMove);
      cc.idx = cc.idx + 1;
    }
    cc.ctrl.setBusy(false);
    updateDynamicBoardTexts();
  }, 500);
}

function playPuzzleSolution(which) {
  const c = puzzleCtx(which);
  if (!c.ctrl || !c.sol || c.idx >= c.sol.length) return;

  isCatPuzzleEvaluated = true;

  const gen = c.gen;
  c.ctrl.setBusy(true);

  const interval = setInterval(() => {
    const cc = puzzleCtx(which);
    if (cc.gen !== gen) { clearInterval(interval); return; }

    if (cc.idx < cc.sol.length) {
      cc.ctrl.playMove(cc.sol[cc.idx]);
      cc.idx = cc.idx + 1;
    }

    if (cc.idx >= cc.sol.length) {
      clearInterval(interval);
      cc.ctrl.setBusy(false);
      finishPuzzle(which, true);
    }
  }, 700);
}

function setupPuzzleOnBoard(which, puzzle) {
  const c = puzzleCtx(which);
  c.game.load(puzzle.fen);
  const preFen = c.game.fen();

  const setup = puzzle.solution[0];
  const setupMv = c.game.move({ from: setup.substring(0, 2), to: setup.substring(2, 4), promotion: setup[4] || 'q' });

  if (which === 'daily') {
    dailySolution = puzzle.solution.slice(1); dailyIndex = 0; dailySolved = false; dailyGen++;
  } else {
    catSolution = puzzle.solution.slice(1); catIndex = 0; catSolved = false; catGen++;
    isCatPuzzleEvaluated = false;
  }

  const ctrl = puzzleCtx(which).ctrl;
  ctrl.load(c.game, c.game.turn(), null, preFen);

  const gen = puzzleCtx(which).gen;
  ctrl.setBusy(true);
  setTimeout(() => {
    if (puzzleCtx(which).gen !== gen) return;
    ctrl.reveal(setupMv);
    ctrl.setBusy(false);
  }, 300);

  updateDynamicBoardTexts();
}

function switchPage(pageNum) {
  $('.nav-btn').removeClass('active');$('.page-view').removeClass('active');

  if (pageNum === 1) {
    $('.nav-btn').eq(0).addClass('active');$('#page1').addClass('active');
    $('#headerEloBox').hide();
  } else if (pageNum === 2) {
    $('.nav-btn').eq(1).addClass('active');$('#page2').addClass('active');
    $('#headerEloBox').hide();
    if (dailyCtrl) dailyCtrl.resize();
  } else if (pageNum === 3) {
    $('.nav-btn').eq(2).addClass('active');$('#page3').addClass('active');
    $('#headerEloBox').css('display', 'flex');
    if (catCtrl) catCtrl.resize();
    promptEloModal();
  }
}

function processDailyMove(src, tgt) {
  return processPuzzleUserMove('daily', src, tgt);
}

function initDailyPuzzle() {
  let db = window.globalPuzzleDb || {};
  let allPuzzles = [];

  Object.keys(db).forEach(k => {
    let cat = db[k];
    allPuzzles = allPuzzles.concat(cat.easy || [], cat.medium || [], cat.hard || []);
  });

  if (allPuzzles.length === 0) return;

  let today = new Date().toISOString().slice(0, 10);
  let hash = 0;
  for (let i = 0; i < today.length; i++) hash += today.charCodeAt(i);
  currentActiveDailyPuzzle = allPuzzles[hash % allPuzzles.length];

  if (!dailyCtrl) {
    dailyCtrl = createLichessBoard('dailyBoard', {
      onUserMove: (src, tgt) => processDailyMove(src, tgt)
    });
  }

  setupPuzzleOnBoard('daily', currentActiveDailyPuzzle);
  dailyBoard = dailyCtrl.board;
}

function showDailySolution() {
  playPuzzleSolution('daily');
}

function showHint() {
  playPuzzleHint('cat');
}

function showSolution() {
  playPuzzleSolution('cat');
}

function renderCategoryCards(list) {
  let html = '';
  if (!list || list.length === 0) {
    $('#categoryGrid').html('<p style="padding:10px;">No categories found.</p>');
    return;
  }
  list.forEach(c => {
    html += `
      <div class="cat-card" onclick="selectCategory('${c.id}')">
        <h3>${c.name}</h3>
        <p>${c.desc}</p>
      </div>
    `;
  });
  $('#categoryGrid').html(html);
}

function selectCategory(catId) {
  selectedCat = LICHESS_44_CATEGORIES.find(c => c.id === catId) || LICHESS_44_CATEGORIES[0];
  $('#categoryListSection').hide();
  $('#categoryBoardSection').css('display', 'flex');
  $('#selectedCatTitle').text(selectedCat.name);
  setDifficultyOffset(0);
}

function setDifficultyOffset(offset) {
  currentDiffOffset = offset;
  $('.diff-btn').removeClass('active');$(`#btn-diff-${offset}`).addClass('active');
  loadCategoryPuzzle();
}

function loadCategoryPuzzle() {
  let db = window.globalPuzzleDb || {};
  let targetId = selectedCat.id.toLowerCase().replace(/[^a-z0-9]/g, '');

  let catData = db[targetId];
  if (!catData) {
    let matchedKey = Object.keys(db).find(k => k === targetId || k.includes(targetId) || targetId.includes(k));
    if (matchedKey) catData = db[matchedKey];
  }

  if (!catData) {
    alert(`No puzzles found in "${selectedCat.name}" category yet.`);
    return;
  }

  let userElo = (activeUser && activeUser.elo !== undefined) ? activeUser.elo : 1500;
  let targetElo = userElo + currentDiffOffset;

  let allPuzzles = [].concat(catData.easy || [], catData.medium || [], catData.hard || []);
  let pool = allPuzzles.filter(p => p.rating >= (targetElo - 150) && p.rating <= (targetElo + 150));

  if (pool.length === 0) {
    pool = allPuzzles.sort((a, b) => Math.abs(a.rating - targetElo) - Math.abs(b.rating - targetElo)).slice(0, 30);
  }

  currentActiveCatPuzzle = pool[Math.floor(Math.random() * pool.length)];
  startCatPuzzle(currentActiveCatPuzzle);
}

function startCatPuzzle(puzzle) {
  if (!catCtrl) {
    catCtrl = createLichessBoard('catBoard', {
      onUserMove: (src, tgt) => handleCatMove(src, tgt)
    });
  }
  setupPuzzleOnBoard('cat', puzzle);
  catBoard = catCtrl.board;

  setTimeout(() => {
    if (catCtrl) catCtrl.resize();
  }, 50);
}

function handleCatMove(src, tgt) {
  return processPuzzleUserMove('cat', src, tgt);
}

function backToCategories() {
  $('#categoryBoardSection').hide();
  $('#categoryListSection').show();
}

/* =========================================================
   8. GENEL TAHTA DAVRANIŞLARI
   ========================================================= */

let resizeTimer = null;
$(window).on('resize', function() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (dailyCtrl) dailyCtrl.resize();
    if (catCtrl) catCtrl.resize();
  }, 150);
});

$(document).on('mousedown touchstart', function(e) {
  if ($(e.target).closest('.chess-board').length) return;
  if (dailyCtrl) dailyCtrl.clearSelection();
  if (catCtrl) catCtrl.clearSelection();
});

$(document).on('dragstart', '.piece-417db, .chess-board img', function(e) {
  e.preventDefault();
});