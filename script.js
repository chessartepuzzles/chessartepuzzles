/* =========================================================
   0. SUPABASE İSTEMCİSİ BAŞLATMA VE OTURUM YÖNETİMİ
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
    videoPlaceholder1: "Click the button below to watch puzzle 1 solution video.",
    videoPlaceholder2: "Click the button below to watch puzzle 2 solution video.",
    btnPuzzle1: "🎬 Puzzle 1",
    btnPuzzle2: "🎬 Puzzle 2",
    btnShowSolution1: "👁️ Show Solution 1",
    btnShowSolution2: "👁️ Show Solution 2",
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
    msgSolvedDaily: "🎉 Excellent! Daily puzzle solved.",
    btnLogout: "Log Out",
    btnLogin: "Log In",
    guestUser: "Guest",
    statsTitle: "User Statistics",
    statsElo: "Current ELO:",
    statsTotalSolved: "Total Solved Puzzles:",
    statsHistoryTitle: "Solved Puzzles (Correct / Wrong)",
    statsNoHistory: "No puzzle history recorded yet.",
    statusCorrect: "Solved Correctly",
    statusWrong: "Wrong / Tried",
    btnClose: "Close"
  },
  tr: {
    tagline: "Satranç Gelişim Platformu",
    tabSolution: "💡 Çözüm",
    solutionHeader: "💡 Günün Çözümü",
    videoPlaceholder: "Çözüm videosunu izlemek için aşağıdaki butona tıklayın.",
    videoPlaceholder1: "1. bulmaca çözüm videosunu izlemek için aşağıdaki butona tıklayın.",
    videoPlaceholder2: "2. bulmaca çözüm videosunu izlemek için aşağıdaki butona tıklayın.",
    btnPuzzle1: "🎬 Bulmaca 1",
    btnPuzzle2: "🎬 Bulmaca 2",
    btnShowSolution1: "👁️ Çözümü Göster 1",
    btnShowSolution2: "👁️ Çözümü Göster 2",
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
    msgSolvedDaily: "🎉 Mükemmel! Günlük bulmacayı çözdünüz.",
    btnLogout: "Çıkış Yap",
    btnLogin: "Giriş Yap",
    guestUser: "Misafir",
    statsTitle: "Kullanıcı İstatistikleri",
    statsElo: "Mevcut ELO:",
    statsTotalSolved: "Çözülen Toplam Bulmaca:",
    statsHistoryTitle: "Çözülen Bulmacalar (Doğru / Yanlış)",
    statsNoHistory: "Henüz kaydedilmiş bulmaca geçmişi yok.",
    statusCorrect: "Doğru Çözüldü",
    statusWrong: "Yanlış / Denendi",
    btnClose: "Kapat"
  },
  es: {
    tagline: "Plataforma de Desarrollo de Ajedrez",
    tabSolution: "💡 Solución",
    solutionHeader: "💡 Solución de Hoy",
    videoPlaceholder: "Haz clic en el botón de abajo para ver el video de la solución.",
    videoPlaceholder1: "Haz clic en el botón para ver el video del puzle 1.",
    videoPlaceholder2: "Haz clic en el botón para ver el video del puzle 2.",
    btnPuzzle1: "🎬 Puzle 1",
    btnPuzzle2: "🎬 Puzle 2",
    btnShowSolution1: "👁️ Ver Solución 1",
    btnShowSolution2: "👁️ Ver Solución 2",
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
    msgSolvedDaily: "🎉 ¡Excelente! Puzle diario resuelto.",
    btnLogout: "Cerrar sesión",
    btnLogin: "Iniciar sesión",
    guestUser: "Invitado",
    statsTitle: "Estadísticas de usuario",
    statsElo: "ELO actual:",
    statsTotalSolved: "Puzzles resueltos en total:",
    statsHistoryTitle: "Puzzles resueltos (Correcto / Incorrecto)",
    statsNoHistory: "Aún no hay historial de puzzles registrado.",
    statusCorrect: "Resuelto Correctamente",
    statusWrong: "Incorrecto / Intentado",
    btnClose: "Cerrar"
  },
  ru: {
    tagline: "Шахматная платформа",
    tabSolution: "💡 Решение",
    solutionHeader: "💡 Решение дня",
    videoPlaceholder: "Нажмите кнопку ниже, чтобы посмотреть видео с решением.",
    videoPlaceholder1: "Нажмите кнопку, чтобы посмотреть видео первой задачи.",
    videoPlaceholder2: "Нажмите кнопку, чтобы посмотреть видео второй задачи.",
    btnPuzzle1: "🎬 Задача 1",
    btnPuzzle2: "🎬 Задача 2",
    btnShowSolution1: "👁️ Показать решение 1",
    btnShowSolution2: "👁️ Показать решение 2",
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
    msgSolvedDaily: "🎉 Отлично! Ежедневный пазл решен.",
    btnLogout: "Выйти",
    btnLogin: "Войти",
    guestUser: "Гость",
    statsTitle: "Статистика пользователя",
    statsElo: "Текущий ELO:",
    statsTotalSolved: "Всего решено задач:",
    statsHistoryTitle: "Решенные задачи (Верно / Ошибка)",
    statsNoHistory: "История задач пока не записана.",
    statusCorrect: "Решено верно",
    statusWrong: "Неверно / Попытка",
    btnClose: "Закрыть"
  },
  de: {
    tagline: "Schach-Entwicklungsplattform",
    tabSolution: "💡 Lösung",
    solutionHeader: "💡 Heutige Lösung",
    videoPlaceholder: "Klicke auf den Button unten, um das Lösungsvideo anzusehen.",
    videoPlaceholder1: "Klicke auf den Button für das Video zu Rätsel 1.",
    videoPlaceholder2: "Klicke auf den Button für das Video zu Rätsel 2.",
    btnPuzzle1: "🎬 Rätsel 1",
    btnPuzzle2: "🎬 Rätsel 2",
    btnShowSolution1: "👁️ Lösung Zeigen 1",
    btnShowSolution2: "👁️ Lösung Zeigen 2",
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
    msgSolvedDaily: "🎉 Ausgezeichnet! Tägliches Rätsel gelöst.",
    btnLogout: "Abmelden",
    btnLogin: "Anmelden",
    guestUser: "Gast",
    statsTitle: "Benutzerstatistik",
    statsElo: "Aktuelle ELO:",
    statsTotalSolved: "Gelöste Rätsel gesamt:",
    statsHistoryTitle: "Gelöste Rätsel (Richtig / Falsch)",
    statsNoHistory: "Noch kein Rätselverlauf aufgezeichnet.",
    statusCorrect: "Richtig Gelöst",
    statusWrong: "Falsch / Versucht",
    btnClose: "Schließen"
  },
  fr: {
    tagline: "Plateforme de développement d'échecs",
    tabSolution: "💡 Solution",
    solutionHeader: "💡 Solution du jour",
    videoPlaceholder: "Cliquez sur le bouton pour regarder la vidéo de la solution.",
    videoPlaceholder1: "Cliquez sur le bouton pour regarder la vidéo du puzzle 1.",
    videoPlaceholder2: "Cliquez sur le bouton pour regarder la vidéo du puzzle 2.",
    btnPuzzle1: "🎬 Puzzle 1",
    btnPuzzle2: "🎬 Puzzle 2",
    btnShowSolution1: "👁️ Voir la solution 1",
    btnShowSolution2: "👁️ Voir la solution 2",
    tabDaily: "📅 Puzzles & Analyse",
    tabCategories: "📚 Puzzles",
    dailyPuzzleHeader: "🔥 Puzzle du jour",
    searchPlaceholder: "Rechercher des catégories...",
    btnBackCats: "⬅️ Retour aux catégories",
    btnHint: "💡 Indice",
    btnSolution: "👁️ Voir la solution",
    btnNextPuzzle: "🎲 Puzzle suivant",
    turnWhite: "⚪ À vous de jouer (Blancs)",
    turnBlack: "⬛ À vous de jouer (Noirs)",
    puzzleEloLabel: "ELO du puzzle",
    lblYourElo: "ELO:",
    promptEloTitle: "Quel est votre ELO ?",
    promptEloSub: "Veuillez entrer une valeur entre 0 et 3000.",
    btnSaveElo: "Enregistrer & Commencer",
    errEloRange: "Veuillez entrer un ELO valide entre 0 et 3000 !",
    authChoiceSub: "Choisissez une méthode pour continuer :",
    btnLoginChoice: "Se connecter",
    btnRegisterChoice: "S'inscrire",
    btnGuestChoice: "Continuer en tant qu'invité",
    loginSub: "Connectez-vous avec votre e-mail et mot de passe.",
    registerSub: "Définissez un nom d'utilisateur, e-mail, mot de passe et ELO.",
    phUsername: "Nom d'utilisateur",
    phEmail: "Adresse e-mail",
    phPassword: "Mot de passe",
    btnBack: "⬅️ Retour",
    btnRegisterStart: "S'inscrire & Commencer",
    diffEasy: "Facile (-200)",
    diffNormal: "Normal (0)",
    diffHard: "Difficile (+200)",
    errLoginInput: "Veuillez entrer votre e-mail et mot de passe.",
    errRegInput: "Veuillez remplir tous les champs (min. 6 caractères).",
    errRegTaken: "Cet e-mail est déjà utilisé.",
    forgotTitle: "Réinitialiser le mot de passe",
    forgotSub: "Entrez votre adresse e-mail enregistrée.",
    btnSendReset: "Envoyer le lien",
    btnBackLogin: "⬅️ Retour à la connexion",
    forgotPassLink: "Mot de passe oublié ?",
    errForgotEmail: "Veuillez entrer votre adresse e-mail.",
    msgForgotSuccess: "Lien de réinitialisation envoyé par e-mail !",
    msgWrongMove: "❌ Mauvais coup ! Réessayez.",
    msgCorrectMove: "✅ Correct ! Continuez...",
    msgSolved: "🎉 Excellent ! Puzzle résolu.",
    msgSolvedDaily: "🎉 Excellent ! Puzzle du jour résolu.",
    btnLogout: "Déconnexion",
    btnLogin: "Se connecter",
    guestUser: "Invité",
    statsTitle: "Statistiques de l'utilisateur",
    statsElo: "ELO actuel :",
    statsTotalSolved: "Total des puzzles résolus :",
    statsHistoryTitle: "Puzzles résolus (Correct / Erreur)",
    statsNoHistory: "Aucun historique de puzzle enregistré pour l'instant.",
    statusCorrect: "Résolu Correctement",
    statusWrong: "Incorrect / Tenté",
    btnClose: "Fermer"
  },
  'pt-br': {
    tagline: "Plataforma de Desenvolvimento de Xadrez",
    tabSolution: "💡 Solução",
    solutionHeader: "💡 Solução de Hoje",
    videoPlaceholder: "Clique no botão abaixo para assistir ao vídeo.",
    videoPlaceholder1: "Clique no botão para assistir ao vídeo do puzzle 1.",
    videoPlaceholder2: "Clique no botão para assistir ao vídeo do puzzle 2.",
    btnPuzzle1: "🎬 Puzzle 1",
    btnPuzzle2: "🎬 Puzzle 2",
    btnShowSolution1: "👁️ Ver Solução 1",
    btnShowSolution2: "👁️ Ver Solução 2",
    tabDaily: "📅 Puzzles Diários & Análise",
    tabCategories: "📚 Puzzles",
    dailyPuzzleHeader: "🔥 Puzzle Diário",
    searchPlaceholder: "Pesquisar categorias...",
    btnBackCats: "⬅️ Voltar para Categorias",
    btnHint: "💡 Dica",
    btnSolution: "👁️ Ver Solução",
    btnNextPuzzle: "🎲 Próximo Puzzle",
    turnWhite: "⚪ Sua vez (Brancas)",
    turnBlack: "⬛ Sua vez (Pretas)",
    puzzleEloLabel: "ELO do Puzzle",
    lblYourElo: "ELO:",
    promptEloTitle: "Qual é o seu ELO?",
    promptEloSub: "Por favor, insira um valor entre 0 e 3000.",
    btnSaveElo: "Salvar & Começar",
    errEloRange: "Por favor, insira um ELO válido entre 0 e 3000!",
    authChoiceSub: "Escolha um método para continuar:",
    btnLoginChoice: "Entrar",
    btnRegisterChoice: "Cadastrar",
    btnGuestChoice: "Continuar como Convidado",
    loginSub: "Entre com seu e-mail e senha.",
    registerSub: "Defina nome de usuário, e-mail, senha e ELO.",
    phUsername: "Nome de usuário",
    phEmail: "Endereço de e-mail",
    phPassword: "Senha",
    btnBack: "⬅️ Voltar",
    btnRegisterStart: "Cadastrar & Começar",
    diffEasy: "Fácil (-200)",
    diffNormal: "Normal (0)",
    diffHard: "Difícil (+200)",
    errLoginInput: "Por favor, insira seu e-mail e senha.",
    errRegInput: "Preencha todos os campos (mínimo de 6 caracteres).",
    errRegTaken: "Este e-mail já está em uso.",
    forgotTitle: "Redefinir Senha",
    forgotSub: "Insira seu e-mail cadastrado.",
    btnSendReset: "Enviar Link",
    btnBackLogin: "⬅️ Voltar ao Login",
    forgotPassLink: "Esqueceu a senha?",
    errForgotEmail: "Por favor, insira seu endereço de e-mail.",
    msgForgotSuccess: "Link de redefinição enviado para o seu e-mail!",
    msgWrongMove: "❌ Movimento incorreto! Tente novamente.",
    msgCorrectMove: "✅ Correto! Continue...",
    msgSolved: "🎉 Excelente! Puzzle resolvido.",
    msgSolvedDaily: "🎉 Excelente! Puzzle diário resolvido.",
    btnLogout: "Sair",
    btnLogin: "Entrar",
    guestUser: "Convidado",
    statsTitle: "Estatísticas do Usuário",
    statsElo: "ELO Atual:",
    statsTotalSolved: "Total de Puzzles Resolvidos:",
    statsHistoryTitle: "Puzzles Resolvidos (Correto / Errado)",
    statsNoHistory: "Nenhum histórico de puzzles registrado ainda.",
    statusCorrect: "Resolvido Corretamente",
    statusWrong: "Errado / Tentado",
    btnClose: "Fechar"
  },
  zh: {
    tagline: "国际象棋发展平台",
    tabSolution: "💡 题解",
    solutionHeader: "💡 今日题解",
    videoPlaceholder: "点击下方按钮观看题解视频。",
    videoPlaceholder1: "点击按钮观看第1题解答视频。",
    videoPlaceholder2: "点击按钮观看第2题解答视频。",
    btnPuzzle1: "🎬 残局 1",
    btnPuzzle2: "🎬 残局 2",
    btnShowSolution1: "👁️ 查看解答 1",
    btnShowSolution2: "👁️ 查看解答 2",
    tabDaily: "📅 每日残局与分析",
    tabCategories: "📚 题库",
    dailyPuzzleHeader: "🔥 每日残局",
    searchPlaceholder: "搜索分类...",
    btnBackCats: "⬅️ 返回分类",
    btnHint: "💡 提示",
    btnSolution: "👁️ 查看解答",
    btnNextPuzzle: "🎲 下一题",
    turnWhite: "⚪ 轮到你走（白方）",
    turnBlack: "⬛ 轮到你走（黑方）",
    puzzleEloLabel: "残局积分",
    lblYourElo: "积分：",
    promptEloTitle: "你的积分是多少？",
    promptEloSub: "请输入 0 到 3000 之间的数值。",
    btnSaveElo: "保存并开始",
    errEloRange: "请输入 0 到 3000 之间的有效积分！",
    authChoiceSub: "选择继续方式：",
    btnLoginChoice: "登录",
    btnRegisterChoice: "注册",
    btnGuestChoice: "以游客身份继续",
    loginSub: "使用电子邮件和密码登录。",
    registerSub: "设置用户名、邮箱、密码和积分。",
    phUsername: "用户名",
    phEmail: "电子邮件地址",
    phPassword: "密码",
    btnBack: "⬅️ 返回",
    btnRegisterStart: "注册并开始",
    diffEasy: "简单 (-200)",
    diffNormal: "正常 (0)",
    diffHard: "困难 (+200)",
    errLoginInput: "请输入您的邮箱和密码。",
    errRegInput: "请填写所有字段，密码至少 6 位。",
    errRegTaken: "该邮箱已被使用。",
    forgotTitle: "重置密码",
    forgotSub: "输入您注册的电子邮箱地址。",
    btnSendReset: "发送重置链接",
    btnBackLogin: "⬅️ 返回登录",
    forgotPassLink: "忘记密码？",
    errForgotEmail: "请输入您的电子邮箱地址。",
    msgForgotSuccess: "密码重置链接已发送到您的邮箱！",
    msgWrongMove: "❌ 走法错误！请再试一次。",
    msgCorrectMove: "✅ 正确！请继续...",
    msgSolved: "🎉 太棒了！残局已解开。",
    msgSolvedDaily: "🎉 太棒了！今日残局已解开.",
    btnLogout: "登出",
    btnLogin: "登录",
    guestUser: "访客",
    statsTitle: "用户统计",
    statsElo: "当前积分：",
    statsTotalSolved: "总解题数：",
    statsHistoryTitle: "已解残局（正确 / 错误）",
    statsNoHistory: "暂无残局历史记录。",
    statusCorrect: "解答正确",
    statusWrong: "错误 / 尝试",
    btnClose: "关闭"
  },
  ja: {
    tagline: "チェス上達プラットフォーム",
    tabSolution: "💡 模範解答",
    solutionHeader: "💡 本日の解答",
    videoPlaceholder: "下のボタンをクリックして解答動画をご覧ください。",
    videoPlaceholder1: "ボタンをクリックしてパズル1の動画をご覧ください。",
    videoPlaceholder2: "ボタンをクリックしてパズル2の動画をご覧ください。",
    btnPuzzle1: "🎬 パズル 1",
    btnPuzzle2: "🎬 パズル 2",
    btnShowSolution1: "👁️ 解答を表示 1",
    btnShowSolution2: "👁️ 解答を表示 2",
    tabDaily: "📅 デイリーパズル＆分析",
    tabCategories: "📚 パズル",
    dailyPuzzleHeader: "🔥 デイリーパズル",
    searchPlaceholder: "カテゴリを検索...",
    btnBackCats: "⬅️ カテゴリに戻る",
    btnHint: "💡 ヒント",
    btnSolution: "👁️ 解答を表示",
    btnNextPuzzle: "🎲 次のパズル",
    turnWhite: "⚪ あなたの番 (白)",
    turnBlack: "⬛ あなたの番 (黒)",
    puzzleEloLabel: "パズルELO",
    lblYourElo: "ELO:",
    promptEloTitle: "あなたのELOは？",
    promptEloSub: "0 から 3000 の間の数値を入力してください。",
    btnSaveElo: "保存して開始",
    errEloRange: "0から3000の間の有効なELOを入力してください！",
    authChoiceSub: "続行する方法を選択してください:",
    btnLoginChoice: "ログイン",
    btnRegisterChoice: "新規登録",
    btnGuestChoice: "ゲストとして続行",
    loginSub: "メールアドレスとパスワードでログインします。",
    registerSub: "ユーザー名、メール、パスワード、ELOを設定します。",
    phUsername: "ユーザー名",
    phEmail: "メールアドレス",
    phPassword: "パスワード",
    btnBack: "⬅️ 戻る",
    btnRegisterStart: "登録して開始",
    diffEasy: "簡単 (-200)",
    diffNormal: "普通 (0)",
    diffHard: "難しい (+200)",
    errLoginInput: "メールアドレスとパスワードを入力してください。",
    errRegInput: "すべての項目を入力し、パスワードは6文字以上にして下さい。",
    errRegTaken: "このメールアドレスは既に使用されています。",
    forgotTitle: "パスワードリセット",
    forgotSub: "登録したメールアドレスを入力してください。",
    btnSendReset: "リセットリンクを送信",
    btnBackLogin: "⬅️ ログイン画面に戻る",
    forgotPassLink: "パスワードをお忘れですか？",
    errForgotEmail: "メールアドレスを入力してください。",
    msgForgotSuccess: "パスワードリセットリンクを送信しました！",
    msgWrongMove: "❌ 不正解です！もう一度お試しください。",
    msgCorrectMove: "✅ 正解！その調子です...",
    msgSolved: "🎉 素晴らしい！パズルクリアです。",
    msgSolvedDaily: "🎉 素晴らしい！デイリーパズルクリアです。",
    btnLogout: "ログアウト",
    btnLogin: "ログイン",
    guestUser: "ゲスト",
    statsTitle: "ユーザー統計",
    statsElo: "現在のELO：",
    statsTotalSolved: "クリアしたパズル総数：",
    statsHistoryTitle: "クリアしたパズル（正解 / 不正解）",
    statsNoHistory: "パズルの履歴はまだ記録されていません。",
    statusCorrect: "正解",
    statusWrong: "不正解 / 挑戦",
    btnClose: "閉じる"
  },
  hi: {
    tagline: "शतरंज विकास मंच",
    tabSolution: "💡 समाधान",
    solutionHeader: "💡 आज का समाधान",
    videoPlaceholder: "समाधान वीडियो देखने के लिए बटन पर क्लिक करें।",
    videoPlaceholder1: "पहेली 1 समाधान वीडियो देखने के लिए बटन पर क्लिक करें।",
    videoPlaceholder2: "पहेली 2 समाधान वीडियो देखने के लिए बटन पर क्लिक करें।",
    btnPuzzle1: "🎬 पहेली 1",
    btnPuzzle2: "🎬 पहेली 2",
    btnShowSolution1: "👁️ समाधान दिखाएं 1",
    btnShowSolution2: "👁️ समाधान दिखाएं 2",
    tabDaily: "📅 दैनिक पहेली और विश्लेषण",
    tabCategories: "📚 पहेलियाँ",
    dailyPuzzleHeader: "🔥 दैनिक पहेली",
    searchPlaceholder: "श्रेणियाँ खोजें...",
    btnBackCats: "⬅️ श्रेणियों पर वापस",
    btnHint: "💡 संकेत",
    btnSolution: "👁️ समाधान दिखाएं",
    btnNextPuzzle: "🎲 अगली पहेली",
    turnWhite: "⚪ आपकी बारी (सफेद)",
    turnBlack: "⬛ आपकी बारी (काला)",
    puzzleEloLabel: "पहेली ELO",
    lblYourElo: "ELO:",
    promptEloTitle: "आपका ELO क्या है?",
    promptEloSub: "कृपया 0 से 3000 के बीच का मान दर्ज करें।",
    btnSaveElo: "सहेजें और शुरू करें",
    errEloRange: "कृपया 0 से 3000 के बीच वैध ELO दर्ज करें!",
    authChoiceSub: "जारी रखने के लिए एक तरीका चुनें:",
    btnLoginChoice: "लॉग In",
    btnRegisterChoice: "साइन अप",
    btnGuestChoice: "अतिथि के रूप में जारी रखें",
    loginSub: "अपने ईमेल और पासवर्ड से लॉग 인 करें।",
    registerSub: "उपयोगकर्ता नाम, ईमेल, पासवर्ड और ELO सेट करें।",
    phUsername: "उपयोगकर्ता नाम",
    phEmail: "ईमेल पता",
    phPassword: "पासवर्ड",
    btnBack: "⬅️ पीछे",
    btnRegisterStart: "पंजीकरण करें और शुरू करें",
    diffEasy: "आसान (-200)",
    diffNormal: "सामान्य (0)",
    diffHard: "कठिन (+200)",
    errLoginInput: "कृपया अपना ईमेल और पासवर्ड दर्ज करें।",
    errRegInput: "कृपया सभी फ़िल्ड भरें और पासवर्ड कम से कम 6 अक्षर का रखें।",
    errRegTaken: "यह ईमेल पहले से उपयोग में है।",
    forgotTitle: "पासवर्ड रीसेट करें",
    forgotSub: "अपना पंजीकृत ईमेल पता दर्ज करें।",
    btnSendReset: "रीसेट लिंक भेजें",
    btnBackLogin: "⬅️ लॉगिन पर वापस जाएं",
    forgotPassLink: "पासवर्ड भूल गए?",
    errForgotEmail: "कृपया अपना ईमेल पता दर्ज करें।",
    msgForgotSuccess: "पासवर्ड रीसेट लिंक आपके ईमेल पर भेज दिया गया है!",
    msgWrongMove: "❌ गलत चाल! पुनः प्रयास करें।",
    msgCorrectMove: "✅ सही! आगे बढ़ते रहें...",
    msgSolved: "🎉 बहुत बढ़िया! पहेली हल हो गई।",
    msgSolvedDaily: "🎉 बहुत बढ़िया! दैनिक पहेली हल हो गई।",
    btnLogout: "लॉग आउट",
    btnLogin: "लॉग इन",
    guestUser: "अतिथि",
    statsTitle: "उपयोगकर्ता आँकड़े",
    statsElo: "वर्तमान ELO:",
    statsTotalSolved: "कुल हल की गई पहेलियाँ:",
    statsHistoryTitle: "हल की गई पहेलियाँ (सही / गलत)",
    statsNoHistory: "अभी तक कोई पहेली इतिहास दर्ज नहीं किया गया है।",
    statusCorrect: "सही ढंग से हल किया गया",
    statusWrong: "गलत / प्रयास किया गया",
    btnClose: "बंद करें"
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

  updateHeaderUserDisplay();
  updateDynamicBoardTexts();
  renderCategoryCards(LICHESS_44_CATEGORIES);
}

$(document).on('change', '#globalLangSelect', function() {
  const selected = $(this).val();
  changeLanguage(selected);
});

function updateHeaderUserDisplay() {
  const $authBtn = $('#headerAuthBtn');
  if (activeUser.username) {
    $('#headerUsernameBtn').text(activeUser.username);
    $authBtn.text(t('btnLogout')).attr('data-i18n', 'btnLogout');
  } else {
    $('#headerUsernameBtn').text(t('guestUser'));
    $authBtn.text(t('btnLogin')).attr('data-i18n', 'btnLogin');
  }
  $('#headerUserControls').css('display', 'flex');
}

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
      case 'move': playWoodClick(320, 0.06, 0.05); break;
      case 'capture':
        playWoodClick(480, 0.08, 0.07);
        setTimeout(() => playWoodClick(240, 0.05, 0.04), 30);
        break;
      case 'check':
        playWoodClick(600, 0.09, 0.08);
        setTimeout(() => playWoodClick(800, 0.09, 0.08), 50);
        break;
      case 'wrong': playWoodClick(180, 0.15, 0.12); break;
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

  return { init, play, setEnabled: v => { enabled = !!v; } };
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
      if (viaDrag) {
        SoundManager.play('wrong');
        if (containerId === 'catBoard' && currentActiveCatPuzzle) {
          handlePuzzleFailure('cat');
        }
      }
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
let activeUser = { id: null, username: null, elo: 1500 };

function promptEloModal() {
  showAuthForm('choice');
  $('#eloPromptModal').removeClass('hidden');
}

function closeEloModal() {
  $('#eloPromptModal').addClass('hidden');
}

function handleHeaderUsernameClick() {
  if (!activeUser.username) {
    promptEloModal();
  } else {
    openUserStatsModal();
  }
}

function showAuthForm(type) {
  $('#authChoiceView, #authLoginForm, #authRegisterForm, #authGuestForm, #authForgotForm').hide();
  $('#loginErrorMsg, #regErrorMsg, #eloErrorMsg, #forgotMsg').hide();

  if (type === 'login') $('#authLoginForm').show();
  else if (type === 'register') $('#authRegisterForm').show();
  else if (type === 'guest') {
    $('#authGuestForm').show();
    $('#userEloInput').val(activeUser.elo || 1500);
  } else if (type === 'forgot') $('#authForgotForm').show();
  else $('#authChoiceView').show();

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
    const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password: pass });
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
  updateHeaderUserDisplay();
  $('#eloPromptModal').addClass('hidden');
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

  if (supabaseClient) {
    const { data, error } = await supabaseClient.auth.signUp({
      email, password: pass, options: { data: { username: uname, elo: eloVal } }
    });
    if (error) {
      $('#regErrorMsg').text('Registration failed: ' + error.message).show();
      return;
    }
    if (data.user) activeUser.id = data.user.id;
  }

  localStorage.setItem('cap_current_username', uname);
  localStorage.setItem('cap_user_elo', eloVal);
  activeUser.username = uname;
  activeUser.elo = eloVal;
  $('#headerEloValue').text(activeUser.elo);
  updateHeaderUserDisplay();
  $('#eloPromptModal').addClass('hidden');
}

async function submitForgotPassword() {
  let email = $('#forgotEmail').val().trim();
  if (!email) {
    $('#forgotMsg').text(t('errForgotEmail')).css('color', '#e74c3c').show();
    return;
  }
  if (supabaseClient) {
    const { error } = await supabaseClient.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin });
    if (error) {
      $('#forgotMsg').text('Error: ' + error.message).css('color', '#e74c3c').show();
      return;
    }
  }
  $('#forgotMsg').text(t('msgForgotSuccess')).css('color', '#2ecc71').show();
}

function submitUserElo() {
  let val = parseInt($('#userEloInput').val().trim(), 10);
  if (isNaN(val) || val < 0 || val > 3000) {
    $('#eloErrorMsg').text(t('errEloRange')).show();
    return;
  }
  activeUser.username = null;
  activeUser.elo = val;
  localStorage.removeItem('cap_current_username');
  localStorage.setItem('cap_user_elo', val);
  $('#headerEloValue').text(val);
  updateHeaderUserDisplay();
  $('#eloPromptModal').addClass('hidden');
}

function handleHeaderAuthAction() {
  if (activeUser.username) {
    handleLogout();
  } else {
    promptEloModal();
  }
}

async function handleLogout() {
  if (supabaseClient) {
    await supabaseClient.auth.signOut();
  }
  localStorage.removeItem('cap_current_username');
  localStorage.removeItem('cap_user_elo');
  activeUser.id = null;
  activeUser.username = null;
  activeUser.elo = 1500;
  
  updateHeaderUserDisplay();
  switchPage(2);
}

/* =========================================================
   5. ELO HESAPLAMA & SUPABASE
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
    await supabaseClient.auth.updateUser({ data: { elo: newElo } });
  }
  $('#headerEloValue').text(newElo);
  const sign = change > 0 ? `+${change}` : `${change}`;
  return { newElo, changeStr: `(${sign})` };
}

async function recordPuzzleToSupabase(puzzleId, isSolved) {
  console.log("Supabase'e kayıt deneniyor -> User ID:", activeUser.id, "Puzzle ID:", puzzleId, "Durum:", isSolved);
  
  if (!supabaseClient || !activeUser.id) {
    console.warn("Supabase veya activeUser.id boş olduğu için veri yazılmadı. (Misafir kullanıcı veya oturum açılmamış).");
    return;
  }
  try {
    const { data, error } = await supabaseClient
      .from('user_puzzles')
      .upsert(
        [{ user_id: activeUser.id, puzzle_id: puzzleId || "unknown_puzzle", is_solved: isSolved }],
        { onConflict: 'user_id, puzzle_id' }
      );
      
    if (error) {
      console.error("Supabase Veritabanı Kayıt Hatası:", error.message);
    } else {
      console.log("Bulmaca geçmişe başarıyla kaydedildi!", data);
    }
  } catch (e) {
    console.error("Bulmaca kaydedilemedi (Ağ/Bağlantı Hatası):", e);
  }
}

/* =========================================================
   6. ÇÖZÜM VİDEO YÖNETİMİ & SEKMELER
   ========================================================= */
function switchSolutionVideo(videoNum) {
  $('#solutionVideo1').get(0).pause();
  $('#solutionVideo2').get(0).pause();

  if (videoNum === 1) {
    $('#videoContainer1').show();
    $('#videoContainer2').hide();
    $('#playBtn1').show();
    $('#playBtn2').hide();
    $('.solution-tab-btn').removeClass('active');
    $('.solution-tab-btn').eq(0).addClass('active');
  } else {
    $('#videoContainer1').hide();
    $('#videoContainer2').show();
    $('#playBtn1').hide();
    $('#playBtn2').show();
    $('.solution-tab-btn').removeClass('active');
    $('.solution-tab-btn').eq(1).addClass('active');
  }
}

function playSolutionVideo(videoNum) {
  const $video = $(`#solutionVideo${videoNum}`);
  const $placeholder = $(`#videoPlaceholderText${videoNum}`);
  $placeholder.hide();
  $video.show();
  const vidElem = $video.get(0);
  if (vidElem) {
    vidElem.play().catch(err => console.log("Video oynatılamadı:", err));
  }
}

const LICHESS_44_CATEGORIES = [
  { id: 'fork', name: '⚔️ Fork', desc: 'Attacking two or more pieces simultaneously.' },
  { id: 'pin', name: '📌 Pin', desc: 'Restricting a piece movement.' },
  { id: 'skewer', name: '🗡️ Skewer', desc: 'Attacking a valuable piece.' },
  { id: 'discoveredattack', name: '🔍 Discovered Attack', desc: 'An attack revealed when one piece moves.' },
  { id: 'doublecheck', name: '💥 Double Check', desc: 'Delivering check with two pieces.' },
  { id: 'matein1', name: '👑 Mate in 1', desc: 'Deliver checkmate in one move.' },
  { id: 'matein2', name: '👑 Mate in 2', desc: 'Deliver checkmate in two moves.' },
  { id: 'matein3', name: '👑 Mate in 3', desc: 'Deliver checkmate in three moves.' },
  { id: 'matein4', name: '👑 Mate in 4+', desc: 'Deliver checkmate in four or more moves.' },
  { id: 'backrankmate', name: '🏰 Back Rank Mate', desc: 'Checkmate on the back rank.' },
  { id: 'smotheredmate', name: '🐴 Smothered Mate', desc: 'Checkmate with a knight where the king is trapped.' },
  { id: 'sacrifice', name: '🎁 Sacrifice', desc: 'Giving up material for a tactical advantage.' },
  { id: 'deflection', name: '🎯 Deflection', desc: 'Forcing an opponent piece away from a key square.' },
  { id: 'decoy', name: '🪤 Decoy', desc: 'Luring an enemy piece to an unfavorable square.' },
  { id: 'clearance', name: '🧹 Clearance', desc: 'Clearing a square, file, or diagonal for an attack.' },
  { id: 'interference', name: '🚧 Interference', desc: 'Interrupting the line of defense between pieces.' },
  { id: 'zwischenzug', name: '⚡ Zwischenzug', desc: 'Playing an intermediate in-between move.' },
  { id: 'trappedpiece', name: '🪤 Trapped Piece', desc: 'Capturing a piece with no escape square.' },
  { id: 'xrayattack', name: '👁️ X-Ray Attack', desc: 'Attacking through an opposing piece.' },
  { id: 'underpromotion', name: '⭐ Underpromotion', desc: 'Promoting a pawn to a piece other than a queen.' },
  { id: 'zugzwang', name: '⏳ Zugzwang', desc: 'Any move worsens the player\'s position.' },
  { id: 'endgame', name: '♟️ Endgame', desc: 'Puzzles from the endgame phase.' },
  { id: 'middlegame', name: '🛡️ Middlegame', desc: 'Puzzles from the middlegame phase.' },
  { id: 'opening', name: '🚪 Opening', desc: 'Puzzles from the opening phase.' },
  { id: 'advantage', name: '📈 Advantage', desc: 'Converting a winning advantage.' },
  { id: 'crushing', name: '⚡ Crushing', desc: 'Overwhelming tactical advantage.' },
  { id: 'equality', name: '⚖️ Equality', desc: 'Maintaining or fighting for equality.' },
  { id: 'defensivemove', name: '🛡️ Defensive Move', desc: 'Finding the only saving defense.' },
  { id: 'quietmove', name: '🤫 Quiet Move', desc: 'A subtle non-checking/non-capturing move.' },
  { id: 'pawnendgame', name: '♙ Pawn Endgame', desc: 'Endgame focusing on pawn promotion and opposition.' },
  { id: 'rookendgame', name: '♖ Rook Endgame', desc: 'Endgame focusing on rooks and pawns.' },
  { id: 'queenendgame', name: '♕ Queen Endgame', desc: 'Endgame focusing on queens.' },
  { id: 'bishopendgame', name: '♗ Bishop Endgame', desc: 'Endgame focusing on bishops.' },
  { id: 'knightendgame', name: '♘ Knight Endgame', desc: 'Endgame focusing on knights.' },
  { id: 'master', name: '🎓 Master Games', desc: 'Puzzles originating from master games.' },
  { id: 'supergm', name: '🏆 Super GM', desc: 'Puzzles from elite grandmaster games.' },
  { id: 'long', name: '📏 Long Puzzle', desc: 'Multi-move complex tactical puzzles.' },
  { id: 'short', name: '⏱️ Short Puzzle', desc: 'Quick 2-3 move tactics.' },
  { id: 'onemove', name: '1️⃣ One-Move', desc: 'Simple single-move solutions.' },
  { id: 'italian', name: '🇮🇹 Italian Game', desc: 'Puzzles arising from the Italian opening.' },
  { id: 'sicilian', name: '🐉 Sicilian Defense', desc: 'Puzzles arising from the Sicilian Defense.' },
  { id: 'carokann', name: '🛡️ Caro-Kann Defense', desc: 'Puzzles from the Caro-Kann.' },
  { id: 'french', name: '🥖 French Defense', desc: 'Puzzles from the French Defense.' },
  { id: 'kingsindian', name: '🇮🇳 King\'s Indian Defense', desc: 'Puzzles from the King\'s Indian.' }
];

$(document).ready(async function() {
  if (supabaseClient) {
    try {
      const { data: { session } } = await supabaseClient.auth.getSession();
      if (session && session.user) {
        activeUser.id = session.user.id;
        const meta = session.user.user_metadata || {};
        activeUser.username = meta.username || session.user.email.split('@')[0];
        activeUser.elo = meta.elo !== undefined ? parseInt(meta.elo, 10) : 1500;
      }
    } catch (e) {
      console.error("Oturum alınamadı:", e);
    }
  }

  if (!activeUser.username) {
    let savedUname = localStorage.getItem('cap_current_username');
    let savedElo = localStorage.getItem('cap_user_elo');

    if (savedUname) {
      activeUser.username = savedUname;
    }
    if (savedElo) {
      let parsed = parseInt(savedElo, 10);
      if (!isNaN(parsed)) activeUser.elo = parsed;
    }
  }

  $('#headerEloValue').text(activeUser.elo);
  bootApp();
  renderCategoryCards(LICHESS_44_CATEGORIES);

  $('#loginEmail, #loginPassword').on('keypress', function(e) {
    if (e.key === 'Enter') submitLogin();
  });

  $('#regUsername, #regEmail, #regPassword, #regEloInput').on('keypress', function(e) {
    if (e.key === 'Enter') submitRegister();
  });

  $('#forgotEmail').on('keypress', function(e) {
    if (e.key === 'Enter') submitForgotPassword();
  });

  $('#userEloInput').on('keypress', function(e) {
    if (e.key === 'Enter') submitUserElo();
  });

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
      if (!$('#userStatsModal').hasClass('hidden')) {
        closeUserStatsModal();
      }
    }
  });

  $('#eloPromptModal, #userStatsModal').on('click', function(e) {
    if (e.target === this) {
      closeEloModal();
      closeUserStatsModal();
    }
  });
});

function bootApp() {
  $('#mainApp').show();
  changeLanguage('en');
  $('#headerEloBox').hide();
  updateHeaderUserDisplay();
  initDailyPuzzle();
}

/* =========================================================
   7. BULMACA OYNANIŞ MANTIĞI & GEÇMİŞ KAYITLARI
   ========================================================= */
let currentDiffOffset = 0;
let selectedCat = LICHESS_44_CATEGORIES[0];

let catGame = new Chess();
let catCtrl = null;
let catSolution = [];
let catIndex = 0;
let catSolved = false;
let catGen = 0;
let currentActiveCatPuzzle = null;
let isCatPuzzleEvaluated = false;
let isCatPuzzleFailed = false;

let dailyGame = new Chess();
let dailyCtrl = null;
let dailySolution = [];
let dailyIndex = 0;
let dailySolved = false;
let dailyGen = 0;
let currentActiveDailyPuzzle = null;

function puzzleCtx(which) {
  if (which === 'daily') {
    return {
      game: dailyGame, ctrl: dailyCtrl,
      get sol() { return dailySolution; },
      get idx() { return dailyIndex; },
      set idx(v) { dailyIndex = v; },
      get gen() { return dailyGen; },
      puzzle: currentActiveDailyPuzzle, indicator: 'dailyTurn', solvedKey: 'msgSolvedDaily',
      setSolved: v => { dailySolved = v; }
    };
  }
  return {
    game: catGame, ctrl: catCtrl,
    get sol() { return catSolution; },
    get idx() { return catIndex; },
    set idx(v) { catIndex = v; },
    get gen() { return catGen; },
    puzzle: currentActiveCatPuzzle, indicator: 'catTurn', solvedKey: 'msgSolved',
    setSolved: v => { catSolved = v; }
  };
}

async function handlePuzzleFailure(which) {
  if (which !== 'cat' || !currentActiveCatPuzzle) return;
  if (currentActiveCatPuzzle.isFromHistory) return;

  if (!isCatPuzzleFailed) {
    isCatPuzzleFailed = true;
    isCatPuzzleEvaluated = true;

    let pElo = currentActiveCatPuzzle.rating || 1500;
    let change = calculateEloChange(activeUser.elo, pElo, false);
    let res = await applyEloUpdate(change);

    let pId = currentActiveCatPuzzle.id || currentActiveCatPuzzle.fen;
    if (pId) {
      recordPuzzleToSupabase(pId, false);
    }
  }
}

async function finishPuzzle(which, isAutoSolution = false) {
  const c = puzzleCtx(which);
  c.setSolved(true);
  if (c.ctrl) c.ctrl.lock();

  let text = t(c.solvedKey);

  if (which === 'cat' && !isCatPuzzleEvaluated && !isAutoSolution) {
    isCatPuzzleEvaluated = true;

    if (currentActiveCatPuzzle && !currentActiveCatPuzzle.isFromHistory && !isCatPuzzleFailed) {
      let pElo = currentActiveCatPuzzle.rating || 1500;
      let change = calculateEloChange(activeUser.elo, pElo, true);
      let res = await applyEloUpdate(change);
      text += ` ${res.changeStr}`;

      let pId = currentActiveCatPuzzle.id || currentActiveCatPuzzle.fen;
      if (pId) {
        recordPuzzleToSupabase(pId, true);
      }
    }
  }

  showBoardFeedback(c.indicator, text, '#2ecc71', 0);
  setTimeout(() => SoundManager.play('success'), 250);
}

function processPuzzleUserMove(which, src, tgt) {
  const c = puzzleCtx(which);
  if (src === tgt) return 'wrong';
  const expected = c.sol[c.idx];
  const userMove = src + tgt;

  if (!expected || userMove !== expected.substring(0, 4)) {
    showBoardFeedback(c.indicator, t('msgWrongMove'), '#e74c3c', 1500);
    if (which === 'cat') {
      handlePuzzleFailure('cat');
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

function playPuzzleSolution(which) {
  const c = puzzleCtx(which);
  if (!c.ctrl || !c.sol || c.idx >= c.sol.length) return;

  if (which === 'cat') {
    handlePuzzleFailure('cat');
  }

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
    isCatPuzzleFailed = false;
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
  $('.nav-btn').removeClass('active');
  $('.page-view').removeClass('active');

  if (pageNum === 1) {
    $('.nav-btn').eq(0).addClass('active'); $('#page1').addClass('active');
    $('#headerEloBox').hide();
  } else if (pageNum === 2) {
    $('.nav-btn').eq(1).addClass('active'); $('#page2').addClass('active');
    $('#headerEloBox').hide();
    if (dailyCtrl) dailyCtrl.resize();
  } else if (pageNum === 3) {
    $('.nav-btn').eq(2).addClass('active'); $('#page3').addClass('active');
    $('#headerEloBox').css('display', 'flex');
    if (catCtrl) catCtrl.resize();
    $('#categoryBoardSection').hide();
    $('#categoryListSection').show();

    if (!activeUser.username && !localStorage.getItem('cap_user_elo')) {
      promptEloModal();
    }
  }
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
      onUserMove: (src, tgt) => processPuzzleUserMove('daily', src, tgt)
    });
  }
  setupPuzzleOnBoard('daily', currentActiveDailyPuzzle);
}

function showDailySolution() { playPuzzleSolution('daily'); }

function showHint() {
  const c = puzzleCtx('cat');
  if (!c.ctrl || !c.sol || c.idx >= c.sol.length) return;

  handlePuzzleFailure('cat');

  let currentUci = c.sol[c.idx];
  let fromSq = currentUci.substring(0, 2);
  $(`#catBoard .square-${fromSq}`).addClass('selected-square');
  setTimeout(() => $(`#catBoard .square-${fromSq}`).removeClass('selected-square'), 1500);
}

function showSolution() { playPuzzleSolution('cat'); }

function renderCategoryCards(list) {
  let html = '';
  if (!list || list.length === 0) {
    $('#categoryGrid').html('<p style="padding:10px;">No categories found.</p>');
    return;
  }
  list.forEach(c => {
    html += `<div class="cat-card" onclick="selectCategory('${c.id}')"><h3>${c.name}</h3><p>${c.desc}</p></div>`;
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
  $('.diff-btn').removeClass('active');
  $(`#btn-diff-${offset}`).addClass('active');
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
    let allKeys = Object.keys(db);
    if (allKeys.length > 0) {
      catData = db[allKeys[Math.floor(Math.random() * allKeys.length)]];
    }
  }

  if (!catData) {
    alert(`No puzzles found in "${selectedCat.name}" category yet.`);
    return;
  }

  let userElo = (activeUser && activeUser.elo !== undefined) ? activeUser.elo : 1500;
  let targetElo = userElo + currentDiffOffset;

  let allPuzzles = [].concat(catData.easy || [], catData.medium || [], catData.hard || []);
  let pool = allPuzzles.filter(p => p.rating >= (targetElo - 250) && p.rating <= (targetElo + 250));

  if (pool.length === 0) {
    pool = allPuzzles.sort((a, b) => Math.abs(a.rating - targetElo) - Math.abs(b.rating - targetElo)).slice(0, 30);
  }

  if (pool.length === 0) {
    pool = allPuzzles;
  }

  if (pool.length === 0) {
    alert("No puzzles available in this pool.");
    return;
  }

  currentActiveCatPuzzle = pool[Math.floor(Math.random() * pool.length)];
  startCatPuzzle(currentActiveCatPuzzle);
}

function startCatPuzzle(puzzle) {
  if (!catCtrl) {
    catCtrl = createLichessBoard('catBoard', {
      onUserMove: (src, tgt) => processPuzzleUserMove('cat', src, tgt)
    });
  }
  setupPuzzleOnBoard('cat', puzzle);
  catBoard = catCtrl.board;

  setTimeout(() => {
    if (catCtrl) catCtrl.resize();
  }, 50);
}

function backToCategories() {
  $('#categoryBoardSection').hide();
  $('#categoryListSection').show();
  if (catCtrl) catCtrl.resize();
}

/* =========================================================
   8. KULLANICI İSTATİSTİKLERİ VE SUPABASE TABANLI GEÇMİŞ YÖNETİMİ
   ========================================================= */

async function openUserStatsModal() {
  if (!activeUser.username || !activeUser.id) {
    promptEloModal();
    return;
  }

  $('#modalUserElo').text(activeUser.elo);
  $('#statsModalUsername').text(activeUser.username);
  
  let historyHtml = '<p style="color: #aaa; text-align: center; font-size: 0.85rem;">Yükleniyor...</p>';
  $('#solvedPuzzlesListContainer').html(historyHtml);
  $('#userStatsModal').removeClass('hidden');

  let solvedCount = 0;
  let remoteHistory = [];

  if (supabaseClient && activeUser.id) {
    const { data, error } = await supabaseClient
      .from('user_puzzles')
      .select('*')
      .eq('user_id', activeUser.id)
      .order('created_at', { ascending: false });

    if (!error && data) {
      remoteHistory = data;
      solvedCount = data.filter(p => p.is_solved).length;
    } else if (error) {
      console.error("Geçmiş çekilirken hata:", error.message);
    }
  }

  $('#modalSolvedCount').text(solvedCount);

  historyHtml = '';
  if (remoteHistory.length > 0) {
    remoteHistory.forEach(item => {
      let badgeColor = item.is_solved ? '#2ecc71' : '#e74c3c';
      let statusText = item.is_solved ? t('statusCorrect') : t('statusWrong');
      let displayId = item.puzzle_id.length > 12 ? item.puzzle_id.substring(0, 12) + '...' : item.puzzle_id;
      
      historyHtml += `
        <div class="puzzle-history-item" style="display:flex; justify-content:space-between; padding:6px 0; border-bottom:1px solid #222; cursor:pointer;" onclick='loadPuzzleById("${item.puzzle_id}")'>
          <span>Bulmaca: <b>${displayId}</b></span>
          <span style="color: ${badgeColor};">${statusText} ➔</span>
        </div>`;
    });
  }

  if (!historyHtml) {
    historyHtml = `<p style="color: #aaa; text-align: center; font-size: 0.85rem;">${t('statsNoHistory')}</p>`;
  }

  $('#solvedPuzzlesListContainer').html(historyHtml);
  
  $('#statsModalTitle').text(t('statsTitle'));
  $('#labelModalUserElo').html(`<b>${t('statsElo')}</b> <span id="modalUserElo">${activeUser.elo}</span>`);
  $('#labelModalSolvedCount').html(`<b>${t('statsTotalSolved')}</b> <span id="modalSolvedCount">${solvedCount}</span>`);
  $('#statsHistorySectionTitle').text(t('statsHistoryTitle'));
  $('#closeStatsBtn').text(t('btnClose'));
}

function closeUserStatsModal() {
  $('#userStatsModal').addClass('hidden');
}

function loadPuzzleById(puzzleId) {
  closeUserStatsModal();
  let db = window.globalPuzzleDb || {};
  let foundPuzzle = null;

  Object.keys(db).forEach(k => {
    let cat = db[k];
    let allCatPuzzles = [].concat(cat.easy || [], cat.medium || [], cat.hard || []);
    let match = allCatPuzzles.find(p => p.id === puzzleId || p.fen === puzzleId);
    if (match) foundPuzzle = match;
  });

  if (foundPuzzle) {
    foundPuzzle.isFromHistory = true;
    switchPage(3);
    $('#categoryListSection').hide();
    $('#categoryBoardSection').css('display', 'flex');
    $('#selectedCatTitle').text("Geçmiş Bulmaca");
    startCatPuzzle(foundPuzzle);
  } else {
    alert("Bulmaca detayları yerel veritabanında bulunamadı.");
  }
}