/* =========================================================
   0. SUPABASE İSTEMCİSİ BAŞLATMA & SESSİON YÖNETİMİ
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
    tabProfile: "👤 Profile",
    dailyPuzzleHeader: "🔥 Daily Puzzle",
    searchPlaceholder: "Search categories...",
    btnBackCats: "⬅️ Back to Categories",
    btnHint: "💡 Hint",
    btnSolution: "👁️ Show Solution",
    btnNextPuzzle: "🎲 Next Puzzle",
    btnExit: "Exit",
    profileHeader: "👤 User Profile & Statistics",
    statTotal: "Total Solved",
    statCorrect: "Correct",
    statWrong: "Wrong",
    statRatio: "Win Rate",
    puzzleHistoryHeader: "📜 Puzzle History",
    noHistoryYet: "No puzzle attempts recorded yet.",
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
    updatePassTitle: "Set New Password",
    updatePassSub: "Please enter your new password below.",
    btnUpdatePass: "Update Password",
    msgUpdatePassSuccess: "Your password has been successfully updated! You can log in.",
    errUpdatePass: "Please enter a valid password (min 6 chars).",
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
    tabProfile: "👤 Profil",
    dailyPuzzleHeader: "🔥 Günlük Bulmaca",
    searchPlaceholder: "Kategori ara...",
    btnBackCats: "⬅️ Kategorilere Dön",
    btnHint: "💡 İpucu",
    btnSolution: "👁️ Çözümü Göster",
    btnNextPuzzle: "🎲 Sonraki Bulmaca",
    btnExit: "Çıkış",
    profileHeader: "👤 Kullanıcı Profili ve İstatistikler",
    statTotal: "Toplam Çözülen",
    statCorrect: "Doğru",
    statWrong: "Yanlış",
    statRatio: "Başarı Oranı",
    puzzleHistoryHeader: "📜 Çözülen Bulmaca Geçmişi",
    noHistoryYet: "Henüz kaydedilmiş bulmaca geçmişi yok.",
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
    updatePassTitle: "Yeni Şifre Belirle",
    updatePassSub: "Lütfen yeni şifrenizi aşağıya girin.",
    btnUpdatePass: "Şifreyi Güncelle",
    msgUpdatePassSuccess: "Şifreniz başarıyla güncellendi! Giriş yapabilirsiniz.",
    errUpdatePass: "Lütfen en az 6 karakterlik geçerli bir şifre girin.",
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
    tabProfile: "👤 Perfil",
    dailyPuzzleHeader: "🔥 Puzle Diario",
    searchPlaceholder: "Buscar categorías...",
    btnBackCats: "⬅️ Volver a Categorías",
    btnHint: "💡 Pista",
    btnSolution: "👁️ Ver Solución",
    btnNextPuzzle: "🎲 Siguiente Puzle",
    btnExit: "Salir",
    profileHeader: "👤 Perfil de Usuario y Estadísticas",
    statTotal: "Total Resueltos",
    statCorrect: "Correctos",
    statWrong: "Incorrectos",
    statRatio: "Tasa de Éxito",
    puzzleHistoryHeader: "📜 Historial de Puzles",
    noHistoryYet: "Aún no hay historial registrado.",
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
    updatePassTitle: "Nueva contraseña",
    updatePassSub: "Ingresa tu nueva contraseña.",
    btnUpdatePass: "Actualizar contraseña",
    msgUpdatePassSuccess: "¡Contraseña actualizada con éxito!",
    errUpdatePass: "Ingresa una contraseña válida (mín. 6 caracteres).",
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
    tabProfile: "👤 Профиль",
    dailyPuzzleHeader: "🔥 Ежедневная Задача",
    searchPlaceholder: "Поиск категорий...",
    btnBackCats: "⬅️ Назад к категориям",
    btnHint: "💡 Подсказка",
    btnSolution: "👁️ Показать решение",
    btnNextPuzzle: "🎲 Следующая задача",
    btnExit: "Выход",
    profileHeader: "👤 Профиль и Статистика",
    statTotal: "Всего Решено",
    statCorrect: "Правильно",
    statWrong: "Ошибки",
    statRatio: "Процент Побед",
    puzzleHistoryHeader: "📜 История Задач",
    noHistoryYet: "Записи пока отсутствуют.",
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
    updatePassTitle: "Новый пароль",
    updatePassSub: "Введите новый пароль.",
    btnUpdatePass: "Обновить пароль",
    msgUpdatePassSuccess: "Пароль успешно обновлен!",
    errUpdatePass: "Введите корректный пароль (мин. 6 символов).",
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
    tabProfile: "👤 Profil",
    dailyPuzzleHeader: "🔥 Tägliches Rätsel",
    searchPlaceholder: "Kategorien durchsuchen...",
    btnBackCats: "⬅️ Zurück zu Kategorien",
    btnHint: "Hinweis",
    btnSolution: "👁️ Lösung Zeigen",
    btnNextPuzzle: "🎲 Nächstes Rätsel",
    btnExit: "Beenden",
    profileHeader: "👤 Profil & Statistiken",
    statTotal: "Gesamt Gelöst",
    statCorrect: "Richtig",
    statWrong: "Falsch",
    statRatio: "Erfolgsquote",
    puzzleHistoryHeader: "📜 Rätsel-Historie",
    noHistoryYet: "Noch keine Verläufe vorhanden.",
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
    updatePassTitle: "Neues Passwort",
    updatePassSub: "Gib dein neues Passwort ein.",
    btnUpdatePass: "Passwort aktualisieren",
    msgUpdatePassSuccess: "Passwort erfolgreich aktualisiert!",
    errUpdatePass: "Bitte gültiges Passwort eingeben (min. 6 Zeichen).",
    msgWrongMove: "❌ Falscher Zug! Noch einmal versuchen.",
    msgCorrectMove: "✅ Richtig! Weiter so...",
    msgSolved: "🎉 Ausgezeichnet! Rätsel gelöst.",
    msgSolvedDaily: "🎉 Ausgezeichnet! Tägliches Rätsel gelöst."
  },
  fr: {
    tagline: "Plateforme de développement d'échecs",
    tabSolution: "💡 Solution",
    solutionHeader: "💡 Solution du jour",
    videoPlaceholder: "Cliquez sur le bouton ci-dessous pour regarder la vidéo de la solution.",
    tabDaily: "📅 Puzzles & Analyse",
    tabCategories: "📚 Puzzles",
    tabProfile: "👤 Profil",
    dailyPuzzleHeader: "🔥 Puzzle du jour",
    searchPlaceholder: "Rechercher des catégories...",
    btnBackCats: "⬅️ Retour aux catégories",
    btnHint: "💡 Indice",
    btnSolution: "👁️ Voir la solution",
    btnNextPuzzle: "🎲 Puzzle suivant",
    btnExit: "Quitter",
    profileHeader: "👤 Profil utilisateur & Statistiques",
    statTotal: "Total résolus",
    statCorrect: "Corrects",
    statWrong: "Erreurs",
    statRatio: "Taux de réussite",
    puzzleHistoryHeader: "📜 Historique des puzzles",
    noHistoryYet: "Aucune tentative enregistrée pour le moment.",
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
    updatePassTitle: "Nouveau mot de passe",
    updatePassSub: "Entrez votre nouveau mot de passe.",
    btnUpdatePass: "Mettre à jour",
    msgUpdatePassSuccess: "Mot de passe mis à jour avec succès !",
    errUpdatePass: "Entrez un mot de passe valide (min. 6 car.).",
    msgWrongMove: "❌ Mauvais coup ! Réessayez.",
    msgCorrectMove: "✅ Correct ! Continuez...",
    msgSolved: "🎉 Excellent ! Puzzle résolu.",
    msgSolvedDaily: "🎉 Excellent ! Puzzle du jour résolu."
  },
  'pt-br': {
    tagline: "Plataforma de Desenvolvimento de Xadrez",
    tabSolution: "💡 Solução",
    solutionHeader: "💡 Solução de Hoje",
    videoPlaceholder: "Clique no botão abaixo para assistir ao vídeo da solução.",
    tabDaily: "📅 Puzzles Diários & Análise",
    tabCategories: "📚 Puzzles",
    tabProfile: "👤 Perfil",
    dailyPuzzleHeader: "🔥 Puzzle Diário",
    searchPlaceholder: "Pesquisar categorias...",
    btnBackCats: "⬅️ Voltar para Categorias",
    btnHint: "💡 Dica",
    btnSolution: "👁️ Ver Solução",
    btnNextPuzzle: "🎲 Próximo Puzzle",
    btnExit: "Sair",
    profileHeader: "👤 Perfil do Usuário & Estatísticas",
    statTotal: "Total Resolvidos",
    statCorrect: "Corretos",
    statWrong: "Incorretos",
    statRatio: "Taxa de Acerto",
    puzzleHistoryHeader: "📜 Histórico de Puzzles",
    noHistoryYet: "Nenhuma tentativa registrada ainda.",
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
    updatePassTitle: "Nova Senha",
    updatePassSub: "Insira sua nova senha.",
    btnUpdatePass: "Atualizar Senha",
    msgUpdatePassSuccess: "Senha atualizada com sucesso!",
    errUpdatePass: "Insira uma senha válida (mín. 6 caracteres).",
    msgWrongMove: "❌ Movimento incorreto! Tente novamente.",
    msgCorrectMove: "✅ Correto! Continue...",
    msgSolved: "🎉 Excelente! Puzzle resolvido.",
    msgSolvedDaily: "🎉 Excelente! Puzzle diário resolvido."
  },
  zh: {
    tagline: "国际象棋发展平台",
    tabSolution: "💡 题解",
    solutionHeader: "💡 今日题解",
    videoPlaceholder: "点击下方按钮观看题解视频。",
    tabDaily: "📅 每日残局与分析",
    tabCategories: "📚 题库",
    tabProfile: "👤 个人资料",
    dailyPuzzleHeader: "🔥 每日残局",
    searchPlaceholder: "搜索分类...",
    btnBackCats: "⬅️ 返回分类",
    btnHint: "💡 提示",
    btnSolution: "👁️ 查看解答",
    btnNextPuzzle: "🎲 下一题",
    btnExit: "退出",
    profileHeader: "👤 用户资料与统计数据",
    statTotal: "总解题数",
    statCorrect: "正确",
    statWrong: "错误",
    statRatio: "胜率",
    puzzleHistoryHeader: "📜 做题历史",
    noHistoryYet: "暂无做题记录。",
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
    updatePassTitle: "设置新密码",
    updatePassSub: "请输入您的新密码。",
    btnUpdatePass: "更新密码",
    msgUpdatePassSuccess: "密码已成功更新！",
    errUpdatePass: "请输入有效的密码（至少 6 位）。",
    msgWrongMove: "❌ 走法错误！请再试一次。",
    msgCorrectMove: "✅ 正确！请继续...",
    msgSolved: "🎉 太棒了！残局已解开。",
    msgSolvedDaily: "🎉 太棒了！今日残局已解开。"
  },
  ja: {
    tagline: "チェス上達プラットフォーム",
    tabSolution: "💡 模範解答",
    solutionHeader: "💡 本日の解答",
    videoPlaceholder: "下のボタンをクリックして解答動画をご覧ください。",
    tabDaily: "📅 デイリーパズル＆分析",
    tabCategories: "📚 パズル",
    tabProfile: "👤 プロフィール",
    dailyPuzzleHeader: "🔥 デイリーパズル",
    searchPlaceholder: "カテゴリを検索...",
    btnBackCats: "⬅️ カテゴリに戻る",
    btnHint: "💡 ヒント",
    btnSolution: "👁️ 解答を表示",
    btnNextPuzzle: "🎲 次のパズル",
    btnExit: "終了",
    profileHeader: "👤 ユーザープロフィール＆統計",
    statTotal: "総挑戦数",
    statCorrect: "正解",
    statWrong: "不正解",
    statRatio: "正解率",
    puzzleHistoryHeader: "📜 パズル履歴",
    noHistoryYet: "パズルの履歴はまだありません。",
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
    updatePassTitle: "新しいパスワード",
    updatePassSub: "新しいパスワードを入力してください。",
    btnUpdatePass: "パスワードを更新",
    msgUpdatePassSuccess: "パスワードが正常に更新されました！",
    errUpdatePass: "有効なパスワードを入力してください（6文字以上）。",
    msgWrongMove: "❌ 不正解です！もう一度お試しください。",
    msgCorrectMove: "✅ 正解！その調子です...",
    msgSolved: "🎉 素晴らしい！パズルクリアです。",
    msgSolvedDaily: "🎉 素晴らしい！デイリーパズルクリアです。"
  },
  hi: {
    tagline: "शतरंज विकास मंच",
    tabSolution: "💡 समाधान",
    solutionHeader: "💡 आज का समाधान",
    videoPlaceholder: "समाधान वीडियो देखने के लिए नीचे दिए गए बटन पर क्लिक करें।",
    tabDaily: "📅 दैनिक पहेली और विश्लेषण",
    tabCategories: "📚 पहेलियाँ",
    tabProfile: "👤 प्रोफ़ाइल",
    dailyPuzzleHeader: "🔥 दैनिक पहेली",
    searchPlaceholder: "श्रेणियाँ खोजें...",
    btnBackCats: "⬅️ श्रेणियों पर वापस",
    btnHint: "💡 संकेत",
    btnSolution: "👁️ समाधान दिखाएं",
    btnNextPuzzle: "🎲 अगली पहेली",
    btnExit: "बाहर निकलें",
    profileHeader: "👤 उपयोगकर्ता प्रोफ़ाइल और आंकड़े",
    statTotal: "कुल हल की गईं",
    statCorrect: "सही",
    statWrong: "गलत",
    statRatio: "जीत का प्रतिशत",
    puzzleHistoryHeader: "📜 पहेली इतिहास",
    noHistoryYet: "अभी तक कोई पहेली प्रयास दर्ज नहीं किया गया है।",
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
    loginSub: "अपने ईमेल और पासवर्ड से लॉग इन करें।",
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
    updatePassTitle: "नया पासवर्ड सेट करें",
    updatePassSub: "कृपया नीचे अपना नया पासवर्ड दर्ज करें।",
    btnUpdatePass: "पासवर्ड अपडेट करें",
    msgUpdatePassSuccess: "आपका पासवर्ड successfully अपडेट हो गया है!",
    errUpdatePass: "कृपया मान्य पासवर्ड दर्ज करें (न्यूनतम 6 अक्षर)।",
    msgWrongMove: "❌ गलत चाल! पुनः प्रयास करें।",
    msgCorrectMove: "✅ सही! आगे बढ़ते रहें...",
    msgSolved: "🎉 बहुत बढ़िया! पहेली हल हो गई।",
    msgSolvedDaily: "🎉 बहुत बढ़िया! दैनिक पहेली हल हो गई।"
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
  renderUserProfileStats();
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
    $('#catSubText').text(`${t('lblYourElo')} ${userElo} | ${t('puzzleEloLabel')}: ${currentActiveCatPuzzle.rating}`);
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
   4. KULLANICI ELO VE ÜYELİK YÖNETİMİ (GÜNCELLENMİŞ)
   ========================================================= */

let activeUser = {
  id: null,
  username: null,
  elo: 1500,
  history: []
};

function updateHeaderUI() {
  if (activeUser.username || activeUser.id || localStorage.getItem('cap_active_session')) {
    $('#headerEloBox').css('display', 'flex');
    $('#headerEloValue').text(activeUser.elo);
  } else {
    $('#headerEloBox').hide();
  }

  if (activeUser.username) {
    $('#headerUsername').text(`👤 ${activeUser.username}`);
    $('#btnHeaderExit').show();
  } else {
    $('#headerUsername').text('');
    $('#btnHeaderExit').hide();
  }
}

function promptEloModal() {
  showAuthForm('choice');
  $('#eloPromptModal').removeClass('hidden');
}

function closeEloModal() {
  $('#eloPromptModal').addClass('hidden');
  switchPage(2);
}

function showAuthForm(type) {
  $('#authChoiceView, #authLoginForm, #authRegisterForm, #authGuestForm, #authForgotForm, #authUpdatePassForm').hide();
  $('#loginErrorMsg, #regErrorMsg, #eloErrorMsg, #forgotMsg, #updatePassMsg').hide();

  if (type === 'login') {
    $('#authLoginForm').show();
  } else if (type === 'register') {
    $('#authRegisterForm').show();
  } else if (type === 'guest') {
    $('#authGuestForm').show();
    $('#userEloInput').val(activeUser.elo || 1500);
  } else if (type === 'forgot') {
    $('#authForgotForm').show();
  } else if (type === 'updatePassword') {
    $('#authUpdatePassForm').show();
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
      
      const { data: profileData } = await supabaseClient
        .from('profiles')
        .select('rating, username')
        .eq('id', data.user.id)
        .single();

      if (profileData) {
        activeUser.elo = profileData.rating !== undefined ? profileData.rating : 1500;
        activeUser.username = profileData.username || email.split('@')[0];
      } else {
        const meta = data.user.user_metadata || {};
        activeUser.username = meta.username || email.split('@')[0];
        activeUser.elo = meta.elo !== undefined ? parseInt(meta.elo, 10) : 1500;
      }
    }
  } else {
    activeUser.username = email.split('@')[0];
  }

  await loadUserHistoryFromSupabase();

  saveActiveUserData();
  updateHeaderUI();
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

  activeUser.username = uname;
  activeUser.elo = eloVal;

  saveActiveUserData();
  updateHeaderUI();
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

async function submitUpdatePassword() {
  let newPass = $('#newPassword').val().trim();
  if (!newPass || newPass.length < 6) {
    $('#updatePassMsg').text(t('errUpdatePass')).css('color', '#e74c3c').show();
    return;
  }

  if (supabaseClient) {
    const { error } = await supabaseClient.auth.updateUser({
      password: newPass
    });

    if (error) {
      $('#updatePassMsg').text('Error: ' + error.message).css('color', '#e74c3c').show();
      return;
    }
  }

  $('#updatePassMsg').text(t('msgUpdatePassSuccess')).css('color', '#2ecc71').show();
  setTimeout(() => {
    showAuthForm('login');
  }, 2000);
}

function submitUserElo() {
  let inputVal = $('#userEloInput').val().trim();
  let val = parseInt(inputVal, 10);

  if (isNaN(val) || val < 0 || val > 3000) {
    $('#eloErrorMsg').text(t('errEloRange')).show();
    return;
  }

  activeUser.username = "Guest";
  activeUser.elo = val;
  saveActiveUserData();

  updateHeaderUI();
  $('#eloErrorMsg').hide();
  $('#eloPromptModal').addClass('hidden');

  if ($('#categoryBoardSection').is(':visible')) {
    loadCategoryPuzzle();
  }
}

async function logoutUser() {
  if (supabaseClient) {
    await supabaseClient.auth.signOut();
  }
  activeUser = { id: null, username: null, elo: 1500, history: [] };
  localStorage.removeItem('cap_active_session');
  updateHeaderUI();
  renderUserProfileStats();
  switchPage(1);
}

function saveActiveUserData() {
  localStorage.setItem('cap_active_session', JSON.stringify({
    id: activeUser.id,
    username: activeUser.username,
    elo: activeUser.elo,
    history: activeUser.history || []
  }));
}

async function loadSavedSession() {
  const localData = localStorage.getItem('cap_active_session');
  if (localData) {
    try {
      const parsed = JSON.parse(localData);
      if (parsed) {
        activeUser.id = parsed.id || null;
        activeUser.username = parsed.username || null;
        activeUser.elo = parsed.elo || 1500;
        activeUser.history = parsed.history || [];
      }
    } catch(e) { console.error("Session restored error:", e); }
  }
  
  updateHeaderUI();

  if (supabaseClient && activeUser.id) {
    const { data: profileData } = await supabaseClient
      .from('profiles')
      .select('rating, username')
      .eq('id', activeUser.id)
      .single();

    if (profileData) {
      activeUser.elo = profileData.rating !== undefined ? profileData.rating : activeUser.elo;
      if (profileData.username) activeUser.username = profileData.username;
    }
    
    await loadUserHistoryFromSupabase();
  }
}

/* =========================================================
   5. LICHESS ELO HESAPLAMA MOTORU & İSTATİSTİK KAYDI
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
  saveActiveUserData();

  if (supabaseClient && activeUser.id) {
    await supabaseClient
      .from('profiles')
      .update({ rating: newElo })
      .eq('id', activeUser.id);
  }

  updateHeaderUI();
  const sign = change > 0 ? `+${change}` : `${change}`;
  return { newElo, changeStr: `(${sign})` };
}

async function recordPuzzleToHistory(puzzle, isSolved) {
  if (!puzzle) return;

  const puzzleIdStr = String(puzzle.id || 'P_' + Date.now());
  const alreadySolved = (activeUser.history || []).some(h => String(h.puzzleId) === puzzleIdStr && h.isSolved);

  const record = {
    puzzleId: puzzleIdStr,
    isSolved: isSolved,
    rating: puzzle.rating || 1500,
    fen: puzzle.fen,
    solution: puzzle.solution,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  if (alreadySolved && isSolved) {
    return;
  }

  if (!activeUser.history) activeUser.history = [];
  activeUser.history.unshift(record);
  saveActiveUserData();

  if (supabaseClient && activeUser.id) {
    try {
      const { data: existing } = await supabaseClient
        .from('user_puzzles')
        .select('id')
        .eq('user_id', activeUser.id)
        .eq('puzzle_id', puzzleIdStr)
        .maybeSingle();

      if (!existing) {
        await supabaseClient
          .from('user_puzzles')
          .insert([{ user_id: activeUser.id, puzzle_id: puzzleIdStr, is_solved: isSolved }]);
      }
    } catch (e) {
      console.error('Puzzle history could not be saved to Supabase:', e);
    }
  }
  renderUserProfileStats();
}

async function loadUserHistoryFromSupabase() {
  if (!supabaseClient || !activeUser.id) return;
  try {
    const { data, error } = await supabaseClient
      .from('user_puzzles')
      .select('*')
      .eq('user_id', activeUser.id)
      .order('created_at', { ascending: false });

    if (!error && data) {
      activeUser.history = data.map(d => ({
        puzzleId: d.puzzle_id,
        isSolved: d.is_solved,
        rating: 1500,
        timestamp: new Date(d.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }));
      saveActiveUserData();
      renderUserProfileStats();
    }
  } catch(e) { console.error("Error loading user history:", e); }
}

function renderUserProfileStats() {
  const history = activeUser.history || [];
  const total = history.length;
  const correct = history.filter(h => h.isSolved).length;
  const wrong = total - correct;
  const ratio = total > 0 ? Math.round((correct / total) * 100) : 0;

  $('#statTotal').text(total);
  $('#statCorrect').text(correct);
  $('#statWrong').text(wrong);
  $('#statRatio').text(`${ratio}%`);

  let html = '';
  if (history.length === 0) {
    html = `<p style="color:#aaa; font-size:0.9rem; padding:10px;" data-i18n="noHistoryYet">${t('noHistoryYet')}</p>`;
  } else {
    history.forEach((h, idx) => {
      const statusClass = h.isSolved ? 'status-solved' : 'status-failed';
      const statusText = h.isSolved ? '✓ Correct' : '✗ Wrong';
      html += `
        <div class="history-item" onclick="reviewHistoryPuzzle(${idx})">
          <div class="history-info">
            <span class="history-title">Puzzle ${h.puzzleId} (ELO: ${h.rating})</span>
            <span class="history-sub">${h.timestamp || ''}</span>
          </div>
          <span class="history-status ${statusClass}">${statusText}</span>
        </div>
      `;
    });
  }
  $('#puzzleHistoryList').html(html);
}

function reviewHistoryPuzzle(index) {
  const item = activeUser.history[index];
  if (!item || !item.fen || !item.solution) {
    alert("This puzzle's detailed board state is not available for review.");
    return;
  }

  switchPage(3);
  $('#categoryListSection').hide();
  $('#categoryBoardSection').css('display', 'flex');
  $('#selectedCatTitle').text(`Review: ${item.puzzleId}`);

  currentActiveCatPuzzle = {
    id: item.puzzleId,
    fen: item.fen,
    solution: item.solution,
    rating: item.rating
  };

  startCatPuzzle(currentActiveCatPuzzle);
}

/* =========================================================
   6. ÇÖZÜM VİDEO YÖNETİMİ & KATEGORİLER (ÇOK DİLLİ)
   ========================================================= */

function playMainSolutionVideo() {
  const $video = $('#mainSolutionVideo');
  const $placeholder = $('#videoPlaceholderText');

  $placeholder.hide(); $video.show();
  
  const vidElem = $video.get(0);
  if (vidElem) {
    vidElem.play().catch(err => {
      console.log("Video otomatik oynatılamadı:", err);
    });
  }
}

const LICHESS_44_CATEGORIES = [
  { 
    id: 'fork', 
    name: { en: '⚔️ Fork', tr: '⚔️ Çatal (Fork)', es: '⚔️ Doble ataque (Fork)', de: '⚔️ Gabel (Fork)', ru: '⚔️ Вилка (Fork)', fr: '⚔️ Fourchette (Fork)', 'pt-br': '⚔️ Garfo (Fork)', zh: '⚔️ 叉烧 (Fork)', ja: '⚔️ フォーク (Fork)', hi: '⚔️ कांटा (Fork)' }, 
    desc: { en: 'Attacking two or more pieces simultaneously.', tr: 'İki veya daha fazla taşı aynı anda tehdit etme.', es: 'Atacar dos o más piezas simultáneamente.', de: 'Zwei oder mehr Figuren gleichzeitig angreifen.', ru: 'Атака двух или более фигур одновременно.', fr: 'Attaquer deux pièces ou plus simultanément.', 'pt-br': 'Atacar duas ou mais peças simultaneamente.', zh: '同时攻击两个或更多棋子。', ja: '2つ以上の駒を同時に攻撃します。', hi: 'एक साथ दो या दो से अधिक मोहरों पर हमला करना।' } 
  },
  { 
    id: 'pin', 
    name: { en: '📌 Pin', tr: '📌 Açmaza Alma (Pin)', es: '📌 Clavada (Pin)', de: '📌 Fesselung (Pin)', ru: '📌 Связка (Pin)', fr: '📌 Clouage (Pin)', 'pt-br': '📌 Cravação (Pin)', zh: '📌 牵制 (Pin)', ja: '📌 ピン (Pin)', hi: '📌 पिन (Pin)' }, 
    desc: { en: 'Restricting a piece because moving it exposes a more valuable one.', tr: 'Değerli bir taşı korumak için rakip taşı hareket edemez duruma getirme.', es: 'Restringir una pieza porque moverse expone una más valiosa.', de: 'Einschränkung einer Figur, da das Wegziehen eine wertvollere freigeben würde.', ru: 'Ограничение движения фигуры, так как ее уход открывает более ценную.', fr: 'Restreindre une pièce car son déplacement en expose une plus précieuse.', 'pt-br': 'Restringir uma peça porque movê-la expõe uma mais valiosa.', zh: '限制棋子移动，因为移动它会暴露更珍贵的棋子。', ja: '動かすとより価値の高い駒がさらされるため、駒の動きを制限します。', hi: 'किसी मोहरे को प्रतिबंधित करना क्योंकि इसे स्थानांतरित करने से अधिक मूल्यवान मोहरा सामने आ जाता है।' } 
  },
  { 
    id: 'skewer', 
    name: { en: '🗡️ Skewer', tr: '🗡️ Şişleme (Skewer)', es: '🗡️ Rayos X / Skewer', de: '🗡️ Spieß (Skewer)', ru: '🗡️ Сквозной удар (Skewer)', fr: '🗡️ Enfilade (Skewer)', 'pt-br': '🗡️ Espetada (Skewer)', zh: '🗡️ 穿心 (Skewer)', ja: '🗡️ スキュア (Skewer)', hi: '🗡️ स्कewer (Skewer)' }, 
    desc: { en: 'Attacking a valuable piece, forcing it to move and exposing another.', tr: 'Değerli bir taşa saldırıp kaçmaya zorlayarak arkasındaki taşı avlama.', es: 'Atacar una pieza valiosa obligándola a moverse y exponer otra.', de: 'Angriff auf eine wertvolle Figur, wodurch eine dahinterliegende bedroht wird.', ru: 'Атака ценной фигуры, заставляющая ее уйти и подставить другую.', fr: 'Attaquer une pièce de valeur, la forçant à bouger et en exposant une autre.', 'pt-br': 'Atacar uma peça valiosa, forçando-a a se mover e expondo outra.', zh: '攻击有价值的棋子，迫使其移动并暴露出另一个棋子。', ja: '価値の高い駒を攻撃して移動を強要し、別の駒を露出させます。', hi: 'एक मूल्यवान मोहरे पर हमला करना, उसे स्थानांतरित करने के लिए मजबूर करना और दूसरे को उजागर करना।' } 
  },
  { 
    id: 'discoveredattack', 
    name: { en: '🔍 Discovered Attack', tr: '🔍 Açmazdan Saldırı (Discovered Attack)', es: '🔍 Ataque a la descubierta', de: '🔍 Abzugsangriff', ru: '🔍 Скрытый удар', fr: '🔍 Attaque à la découverte', 'pt-br': '🔍 Ataque Descoberto', zh: '🔍 发现进攻', ja: '🔍 ディスカバードアタック', hi: '🔍 डिस्कवर्ड अटैक' }, 
    desc: { en: 'An attack revealed when one piece moves out of the way.', tr: 'Bir taşın yol üzerinden çekilmesiyle gizli hattın açılması ve saldırı yapılması.', es: 'Un ataque revelado cuando una pieza se quita del camino.', de: 'Ein Angriff, der freigesetzt wird, wenn eine Figur den Weg freigibt.', ru: 'Атака, возникающая при уходе фигуры с линии.', fr: 'Une attaque révélée lorsqu’une pièce s’écarte du chemin.', 'pt-br': 'Um ataque revelado quando uma peça sai do caminho.', zh: '当一个棋子移开时显露出的攻击。', ja: '駒が道を空けたときに現れる攻撃。', hi: 'एक हमला जो तब प्रकट होता है जब एक मोहरा रास्ते से हट जाता है।' } 
  },
  { 
    id: 'doublecheck', 
    name: { en: '💥 Double Check', tr: '💥 Çifte Şah (Double Check)', es: '💥 Doble jaque', de: '💥 Doppelschach', ru: '💥 Двойной шах', fr: '💥 Échec double', 'pt-br': '💥 Xeque Duplo', zh: '💥 双将', ja: '💥 ダブルチェック', hi: '💥 डबल चेक' }, 
    desc: { en: 'Delivering check with two pieces simultaneously.', tr: 'İki taşla birden aynı anda şah çekme.', es: 'Dar jaque con dos piezas simultáneamente.', de: 'Schachgebot mit zwei Figuren gleichzeitig.', ru: 'Объявление шаха двумя фигурами одновременно.', fr: 'Donner échec avec deux pièces simultanément.', 'pt-br': 'Dar xeque com duas peças simultaneamente.', zh: '同时用两个棋子将军。', ja: '2つの駒で同時に王手をかけます。', hi: 'एक साथ दो मोहरों से चेक देना।' } 
  },
  { 
    id: 'deflection', 
    name: { en: '🝝 Deflection', tr: '🝝 Saptırma (Deflection)', es: '🝝 Desviación', de: '🝝 Ablenkung', ru: '🝝 Отвлечение', fr: '🝝 Déviation', 'pt-br': '🝝 Desvio', zh: '🝝 吸引/声东击西', ja: '🝝 ディフレクション', hi: '🝝 विक्षेपण' }, 
    desc: { en: 'Forcing a defending piece to leave its crucial position.', tr: 'Savunma yapan bir taşı kritik görevli karesinden uzaklaştırma.', es: 'Obligar a una pieza defensora a abandonar su posición crucial.', de: 'Eine verteidigende Figur zwingen, ihre wichtige Position zu verlassen.', ru: 'Принуждение защищающейся фигуры покинуть ключевой пункт.', fr: 'Forcer une pièce en défense à quitter sa position cruciale.', 'pt-br': 'Forçar uma peça defensora a deixar sua posição crucial.', zh: '迫使防守棋子离开其关键位置。', ja: '守備駒に重要な位置を離れるよう強要します。', hi: 'बचाव करने वाले मोहरे को उसकी महत्वपूर्ण स्थिति छोड़ने के लिए मजबूर करना।' } 
  },
  { 
    id: 'interference', 
    name: { en: '🚧 Interference', tr: '🚧 Engelleme (Interference)', es: '🚧 Interferencia', de: '🚧 Unterbrechung', ru: '🚧 Перекрытие', fr: '🚧 Interférence', 'pt-br': '🚧 Interferência', zh: '🚧 干扰', ja: '🚧 インターフェレンス', hi: '🚧 हस्तक्षेप' }, 
    desc: { en: 'Interrupting the line of communication between opponent pieces.', tr: 'Rakip taşlar arasındaki savunma veya kontrol hattını araya taş sokarak kesme.', es: 'Interrumpir la línea de comunicación entre piezas oponentes.', de: 'Unterbrechung der Verbindungslinie gegnerischer Figuren.', ru: 'Прерывание линии связи между фигурами соперника.', fr: 'Interrompre la ligne de communication entre les pièces adverses.', 'pt-br': 'Interromper a linha de comunicação entre peças oponentes.', zh: '切断对手棋子之间的联系线。', ja: '対戦相手の駒間の通信線を遮断します。', hi: 'विरोधी मोहरों के बीच संचार की रेखा को बाधित करना।' } 
  },
  { 
    id: 'xrayattack', 
    name: { en: '📻 X-Ray Attack', tr: '📻 Röntgen Saldırısı (X-Ray)', es: '📻 Ataque de rayos X', de: '📻 Röntgenangriff', ru: '📻 Рентгеновская атака', fr: '📻 Attaque aux rayons X', 'pt-br': '📻 Ataque de Raio-X', zh: '📻 X射线攻击', ja: '📻 X線攻撃', hi: '📻 एक्स-रे अटैक' }, 
    desc: { en: 'Indirect pressure through an opponent piece onto a square or piece.', tr: 'Rakip taşın arkasındaki bir kareye veya taşa dolaylı yoldan baskı uygulama.', es: 'Presión indirecta a través de una pieza oponente.', de: 'Indirekter Druck durch eine gegnerische Figur hindurch.', ru: 'Косвенное давление через фигуру противника.', fr: 'Pression indirecte à travers une pièce ennemie sur une case ou une pièce.', 'pt-br': 'Pressão indireta através de uma peça oponente sobre uma casa ou peça.', zh: '通过对手棋子对某个格子或棋子进行间接施压。', ja: '相手の駒を介してマスや駒に間接的な压力をかけます。', hi: 'विरोधी मोहरे के माध्यम से किसी वर्ग या मोहरे पर अप्रत्यक्ष दबाव।' } 
  },
  { 
    id: 'zugzwang', 
    name: { en: '⏳ Zugzwang', tr: '⏳ Zugzwang (Hamle Zorunluluğu)', es: '⏳ Zugzwang', de: '⏳ Zugzwang', ru: '⏳ Цугцванг', fr: '⏳ Zwang (Zugzwang)', 'pt-br': '⏳ Zugzwang', zh: '⏳ 困境/ zugzwang', ja: '⏳ ツークツヴァング', hi: '⏳ जुगज़वांग' }, 
    desc: { en: 'Forcing the opponent to make a disadvantageous move.', tr: 'Rakibi konumunu kötüleştirecek zorunlu hamleler yapmaya mahkum etme.', es: 'Obligar al oponente a hacer un movimiento desventajoso.', de: 'Den Gegner zwingen, einen nachteiligen Zug zu machen.', ru: 'Принуждение противника сделать ухудшающий позицию ход.', fr: 'Forcer l’adversaire à faire un mouvement désavantageux.', 'pt-br': 'Forçar o oponente a fazer um movimento desvantajoso.', zh: '迫使对手做出不利的走法。', ja: '相手に不利な手を強制します。', hi: 'प्रतिद्वंद्वी को प्रतिकूल चाल चलने के लिए मजबूर करना।' } 
  },
  { 
    id: 'overloading', 
    name: { en: '⚖️ Overloading', tr: '⚖️ Aşırı Yüklenme (Overloading)', es: '⚖️ Sobrecarga', de: '⚖️ Überlastung', ru: '⚖️ Перегрузка', fr: '⚖️ Surcharge', 'pt-br': '⚖️ Sobrecarga', zh: '⚖️ 过载', ja: '⚖️ オーバーロード', hi: '⚖️ ओवरलोडिंग' }, 
    desc: { en: 'Attacking a piece that is overburdened with defensive duties.', tr: 'Birden fazla taşı savunmak zorunda kalan bir taşa aşırı görev yükleyip hata yaptırma.', es: 'Atacar una pieza con demasiadas tareas defensivas.', de: 'Angriff auf eine Figur, die mit Verteidigungsaufgaben überlastet ist.', ru: 'Атака фигуры, перегруженной защитными функциями.', fr: 'Attaquer une pièce surchargée de tâches défensives.', 'pt-br': 'Atacar uma peça sobrecarregada com tarefas defensivas.', zh: '攻击一个承担过多防守任务的棋子。', ja: '守備の負担が大きすぎる駒を攻撃します。', hi: 'उस मोहरे पर हमला करना जो रक्षात्मक कार्यों से अत्यधिक बोझिल है।' } 
  },
  { 
    id: 'trappedpiece', 
    name: { en: '🕸️ Trapped Piece', tr: '🕸️ Kapana Kısılan Taş (Trapped Piece)', es: '🕸️ Pieza atrapada', de: '🕸️ Eingesperrte Figur', ru: '🕸️ Пойманная фигура', fr: '🕸️ Pièce piégée', 'pt-br': '🕸️ Peça Presa', zh: '🕸️ 被困棋子', ja: '⁠🕸️ 閉じ込められた駒', hi: '🕸️ फंसा हुआ मोहरा' }, 
    desc: { en: 'Trapping a piece that has no safe escape squares.', tr: 'Güvenli kaçış karesi kalmayan bir rakip taşı sıkıştırıp düşürme.', es: 'Atrapar una pieza que no tiene casillas de escape seguras.', de: 'Eine Figur fangen, die keine sicheren Fluchtfelder hat.', ru: 'Ловля фигуры, не имеющей безопасных полей для отхода.', fr: 'Piéger une pièce qui n’a pas de cases de fuite sûres.', 'pt-br': 'Prender uma peça que não tem casas de fuga seguras.', zh: '困住没有安全逃跑格子的棋子。', ja: '安全な逃げ場所のない駒を閉じ込めます。', hi: 'एक ऐसे मोहरे को फंसाना जिसके पास सुरक्षित बचने के वर्ग नहीं हैं।' } 
  },
  { 
    id: 'attraction', 
    name: { en: '🧲 Attraction', tr: '🧲 Çekme / Feda ile Cezbetme (Attraction)', es: '🧲 Atracción', de: '🧲 Hinlenkung', ru: '🧲 Завлечение', fr: '🧲 Attraction', 'pt-br': '🧲 Atração', zh: '🧲 引离/吸引', ja: '🧲 アトラクション', hi: '🧲 आकर्षण' }, 
    desc: { en: 'Luring an opponent piece or king to an unfavorable square.', tr: 'Rakip şahı veya taşı dezavantajlı bir kareye gitmeye zorlama/çekme.', es: 'Atraer una pieza o rey rival a una casilla desfavorable.', de: 'Eine gegnerische Figur oder den König auf ein ungünstiges Feld locken.', ru: 'Заманивание фигуры или короля соперника на невыгодное поле.', fr: 'Attirer une pièce ou le roi adverse sur une case défavorable.', 'pt-br': 'Atrair uma peça ou o rei adversário para uma casa desfavorável.', zh: '引诱对手的棋子或国王到一个不利的格子。', ja: '相手の駒やキングを不利なマスへ誘い込みます。', hi: 'विरोधी मोहरे या राजा को प्रतिकूल वर्ग पर लुभाना।' } 
  },
  { 
    id: 'clearance', 
    name: { en: '🧹 Clearance', tr: '🧹 Alan Boşaltma (Clearance)', es: '🧹 Despeje', de: '🧹 Räumung', ru: '🧹 Освобождение пространства', fr: '🧹 Libération', 'pt-br': '🧹 Desobstrução', zh: '🧹 腾空', ja: '🧹 クリアランス', hi: '🧹 क्लीयरेंस' }, 
    desc: { en: 'Clearing a square or file for another piece.', tr: 'Başka bir taşın o kareyi veya hattı kullanabilmesi için yolu temizleme.', es: 'Despejar una casilla o columna para otra pieza.', de: 'Ein Feld oder eine Linie für eine andere Figur räumen.', ru: 'Очистка поля или линии для другой фигуры.', fr: 'Libérer une case ou une colonne pour une autre pièce.', 'pt-br': 'Liberar uma casa ou coluna para outra peça.', zh: '为另一个棋子清理格子或路线。', ja: '別の駒のためにマスやファイルを空けます。', hi: 'दूसरे मोहरे के लिए किसी वर्ग या फ़ाइल को साफ़ करना।' } 
  },
  { 
    id: 'quietmove', 
    name: { en: '🤫 Quiet Move', tr: '🤫 Sessiz Hamle (Quiet Move)', es: '🤫 Jugada silenciosa', de: '🤫 Ruhiger Zug', ru: '🤫 Тихий ход', fr: '🤫 Coup silencieux', 'pt-br': '🤫 Jogada Silenciosa', zh: '🤫 安静步', ja: '⁠🤫 クワイエットムーブ', hi: '🤫 शांत चाल' }, 
    desc: { en: 'A subtle move that does not make a check or capture but prepares a fatal threat.', tr: 'Şah veya taş alımı içermeyen, ancak kaçınılmaz bir mat/tehdit hazırlayan ince hamle.', es: 'Un movimiento sutil que prepara una amenaza fatal sin dar jaque o capturar.', de: 'Ein unauffälliger Zug, der eine tödliche Drohung vorbereitet.', ru: 'Тонкий ход без шаха или взятия, готовящий неотразимую угрозу.', fr: 'Un coup subtil qui ne donne pas échec et ne capture pas mais prépare une menace fatale.', 'pt-br': 'Um movimento sutil que não dá xeque nem captura, mas prepara uma ameaça fatal.', zh: '不将军也不吃子，但酝酿致命威胁的微妙走法。', ja: '王手や駒取りをせず、致命的な脅威を準備する絶妙な手。', hi: 'एक सूक्ष्म चाल जो चेक या कैप्चर नहीं करती बल्कि घातक खतरे की तैयारी करती है।' } 
  },
  { 
    id: 'queensacrifice', 
    name: { en: '👑 Queen Sacrifice', tr: '👑 Vezir Fedası (Queen Sacrifice)', es: '👑 Sacrificio de dama', de: '👑 Damenopfer', ru: '👑 Жертва ферзя', fr: '👑 Sacrifice de dame', 'pt-br': '👑 Sacrifício de Dama', zh: '👑 弃后', ja: '👑 クイーン犠牲', hi: '👑 रानी बलिदान' }, 
    desc: { en: 'Sacrificing the queen for a winning tactic or mate.', tr: 'Kazançlı bir taktik veya mat hedefiyle veziri feda etme.', es: 'Sacrificar la dama por una táctica ganadora o mate.', de: 'Opferung der Dame für eine Gewinn- oder Mattkombination.', ru: 'Жертва ферзя ради выигрышной тактики или мата.', fr: 'Sacrifier la dame pour une tactique gagnante ou un mat.', 'pt-br': 'Sacrificar a dama por uma tática vencedora ou mate.', zh: '为了胜利战术或做杀而牺牲后。', ja: '勝利戦術やメイトのためにクイーンを犠牲にします。', hi: 'जीतने वाली रणनीति या मेट के लिए रानी का बलिदान देना।' } 
  },
  { 
    id: 'rooksacrifice', 
    name: { en: '♜ Rook Sacrifice', tr: '♜ Kale Fedası (Rook Sacrifice)', es: '♜ Sacrificio de torre', de: '♜ Turmopfer', ru: '♜ Жертва ладьи', fr: '♜ Sacrifice de tour', 'pt-br': '♜ Sacrifício de Torre', zh: '♜ 弃车', ja: '♜ ルーク犠牲', hi: '♜ रूक बलिदान' }, 
    desc: { en: 'Sacrificing a rook to destroy enemy defense.', tr: 'Rakip savunmasını çökertmek için kaleyi feda etme.', es: 'Sacrificar una torre para destruir la defensa enemiga.', de: 'Opferung eines Turms zur Zerstörung der gegnerischen Verteidigung.', ru: 'Жертва ладьи для разрушения защиты противника.', fr: 'Sacrifier une tour pour détruire la défense ennemie.', 'pt-br': 'Sacrificar uma torre para destruir a defesa inimiga.', zh: '牺牲车来摧毁敌方防线。', ja: '敵の防御を崩すためにルークを犠牲にします。', hi: 'दुश्मन की रक्षा को नष्ट करने के लिए रूक का बलिदान देना।' } 
  },
  { 
    id: 'bishopsacrifice', 
    name: { en: '♝ Bishop Sacrifice', tr: '♝ Fil Fedası (Bishop Sacrifice)', es: '♝ Sacrificio de alfil', de: '♝ Läuferopfer', ru: '♝ Жертва слона', fr: '♝ Sacrifice de fou', 'pt-br': '♝ Sacrifício de Bispo', zh: '♝ 弃象', ja: '♝ ビショップ犠牲', hi: '♝ bishop बलिदान' }, 
    desc: { en: 'Sacrificing a bishop to open up the king position.', tr: 'Şah kanadını açmak veya zayıflatmak için fili feda etme.', es: 'Sacrificar un alfil para abrir la posición del rey.', de: 'Opferung eines Läufers, um die Königsstellung zu öffnen.', ru: 'Жертва слона для вскрытия позиции короля.', fr: 'Sacrifier un fou pour ouvrir la position du roi.', 'pt-br': 'Sacrificar um bispo para abrir a posição do rei.', zh: '牺牲象以打开国王的位置。', ja: 'キングの周辺を開くためにビショップを犠牲にします。', hi: 'राजा की स्थिति को खोलने के लिए बिशप का बलिदान देना।' } 
  },
  { 
    id: 'knightsacrifice', 
    name: { en: '♞ Knight Sacrifice', tr: '♞ At Fedası (Knight Sacrifice)', es: '♞ Sacrificio de caballo', de: '♞ Springeropfer', ru: '♞ Жертва коня', fr: '♞ Sacrifice de cavalier', 'pt-br': '♞ Sacrifício de Cavalo', zh: '♞ 弃马', ja: '♞ ナイト犠牲', hi: '♞ नाइट बलिदान' }, 
    desc: { en: 'Sacrificing a knight for a fork or mate.', tr: 'Çatal, mat veya baskı kurmak için atı feda etme.', es: 'Sacrificar un caballo para un doblete o mate.', de: 'Opferung eines Springers für Gabel oder Matt.', ru: 'Жертва коня для вилки или мата.', fr: 'Sacrifier un cavalier pour une fourchette ou un mat.', 'pt-br': 'Sacrificar um cavalo por um garfo ou mate.', zh: '牺牲马以形成双攻或做杀。', ja: 'フォークやメイトのためにナイトを犠牲にします。', hi: 'फॉर्क या मेट के लिए घोड़े का बलिदान देना।' } 
  },
  { 
    id: 'pawnsacrifice', 
    name: { en: '♟️ Pawn Sacrifice', tr: '♟️ Piyon Fedası (Pawn Sacrifice)', es: '♟️ Sacrificio de peón', de: '♟️ Bauernopfer', ru: '♟️ Жертва пешки', fr: '♟️ Sacrifice de pion', 'pt-br': '♟️ Sacrifício de Peão', zh: '♟️ 弃兵', ja: '♟️ ポーン犠牲', hi: '♟️ प्यादा बलिदान' }, 
    desc: { en: 'Sacrificing a pawn to gain initiative or open lines.', tr: 'İnisiyatif kazanmak veya hat açmak için piyon feda etme.', es: 'Sacrificar un peón para ganar iniciativa o abrir líneas.', de: 'Opferung eines Bauern, um Initiative oder Linien zu gewinnen.', ru: 'Жертва пешки для захвата инициативы или вскрытия линий.', fr: 'Sacrifier un pion pour gagner l’initiative ou ouvrir des lignes.', 'pt-br': 'Sacrificar um peão para ganhar iniciativa ou abrir linhas.', zh: '牺牲兵以获得主动权或打开路线。', ja: '主導権を握ったりラインを開くためにポーンを犠牲にします。', hi: 'पहल हासिल करने या लाइनें खोलने के लिए प्यादे का बलिदान देना।' } 
  },
  { 
    id: 'exchangesacrifice', 
    name: { en: '🔄 Exchange Sacrifice', tr: '🔄 Kalite Fedası (Exchange Sacrifice)', es: '🔄 Sacrificio de calidad', de: '🔄 Qualitätstupfer', ru: '🔄 Жертва качества', fr: '🔄 Sacrifice de qualité', 'pt-br': '🔄 Sacrifício de Qualidade', zh: '🔄 牺牲子力（兑换）', ja: '🔄 エクスチェンジ犠牲', hi: '🔄 एक्सचेंज बलिदान' }, 
    desc: { en: 'Trading a rook for a minor piece for strategic advantage.', tr: 'Stratejik üstünlük veya taş koordinasyonu için kaleyi hafif taşa verme.', es: 'Cambiar una torre por una pieza menor por ventaja estratégica.', de: 'Tausch eines Turms gegen eine Leichtfigur für strategischen Vorteil.', ru: 'Обмен ладьи на легкую фигуру ради стратегического преимущества.', fr: 'Échanger une tour contre une pièce mineure pour un avantage stratégique.', 'pt-br': 'Trocar uma torre por uma peça menor por vantagem estratégica.', zh: '用车兑换轻子以获得战略优势。', ja: '戦略的優位のためにルークをマイナーピースと交換します。', hi: 'रणनीतिक लाभ के लिए रूक को हल्के मोहरे से बदलना।' } 
  },
  { 
    id: 'matein1', 
    name: { en: '🎯 Mate in 1', tr: '🎯 1 Hamlede Mat (Mate in 1)', es: '🎯 Mate en 1', de: '🎯 Matt in 1', ru: '🎯 Мат в 1 ход', fr: '🎯 Mat en 1', 'pt-br': '🎯 Mate em 1', zh: '🎯 1步杀', ja: '🎯 1手詰まり', hi: '🎯 1 चाल में मेट' }, 
    desc: { en: 'Checkmate in a single move.', tr: 'Tek hamlede gerçekleştirilen mat.', es: 'Jaque mate en un solo movimiento.', de: 'Schachmatt in einem einzigen Zug.', ru: 'Мат в один ход.', fr: 'Échec et mat en un seul coup.', 'pt-br': 'Xeque-mate em um único movimento.', zh: '一步之内将死。', ja: '1手でチェックメイト。', hi: 'एक ही चाल में शह और मात।' } 
  },
  { 
    id: 'matein2', 
    name: { en: '🎯 Mate in 2', tr: '🎯 2 Hamlede Mat (Mate in 2)', es: '🎯 Mate en 2', de: '🎯 Matt in 2', ru: '🎯 Мат в 2 хода', fr: '🎯 Mat en 2', 'pt-br': '🎯 Mate em 2', zh: '🎯 2步杀', ja: '🎯 2手詰まり', hi: '🎯 2 चाल में मेट' }, 
    desc: { en: 'A direct 2-move checkmate combination.', tr: 'İki hamlelik doğrudan mat kombinasyonu.', es: 'Combinación directa de jaque mate en 2 movimientos.', de: 'Eine direkte 2-Züge-Mattkombination.', ru: 'Комбинация мата в два хода.', fr: 'Une combinaison de mat direct en 2 coups.', 'pt-br': 'Uma combinação direta de xeque-mate em 2 movimentos.', zh: '两步做杀组合。', ja: '2手でのチェックメイトコンビネーション。', hi: '2 चालों का सीधा चेकमाइट संयोजन।' } 
  },
  { 
    id: 'matein3', 
    name: { en: '🎯 Mate in 3', tr: '🎯 3 Hamlede Mat (Mate in 3)', es: '🎯 Mate en 3', de: '🎯 Matt in 3', ru: '🎯 Мат в 3 хода', fr: '🎯 Mat en 3', 'pt-br': '🎯 Mate em 3', zh: '🎯 3步杀', ja: '🎯 3手詰まり', hi: '🎯 3 चाल में मेट' }, 
    desc: { en: 'Deep calculation 3-move checkmate.', tr: 'Derin hesaplama gerektiren üç hamlelik mat.', es: 'Cálculo profundo de jaque mate en 3 movimientos.', de: 'Tief berechnetes Matt in 3 Zügen.', ru: 'Глубокий расчет мата в 3 хода.', fr: 'Mat en 3 coups nécessitant un calcul approfondi.', 'pt-br': 'Cálculo profundo para xeque-mate em 3 movimentos.', zh: '需要深度计算的三步杀。', ja: '深い読みが必要な3手詰め。', hi: 'गहरी गणना के साथ 3 चालों में मेट।' } 
  },
  { 
    id: 'backrankmate', 
    name: { en: '🏰 Back Rank Mate', tr: '🏰 Taban Matı (Back Rank Mate)', es: '🏰 Mate del pasillo', de: '🏰 Grundreihenmatt', ru: '🏰 Мат по последней горизонтали', fr: '🏰 Mat du couloir', 'pt-br': '🏰 Mate do Corredor', zh: '🏰 底线将死', ja: '🏰 バックランクメイト', hi: '🏰 बैक रैंक मेट' }, 
    desc: { en: 'Mate delivered on the back rank behind pawns.', tr: 'Kendi piyonlarının arkasında sıkışan şahın taban yataydan mat edilmesi.', es: 'Mate dado en la última fila detrás de los peones.', de: 'Matt auf der Grundreihe hinter den Bauern.', ru: 'Мат на последней горизонтали позади пешек.', fr: 'Mat administré sur la dernière rangée derrière les pions.', 'pt-br': 'Mate aplicado na última linha atrás dos peões.', zh: '在兵后面的底线将死。', ja: 'ポーンの背後にある最終ランクでのメイト。', hi: 'प्यादों के पीछे पीछे की पंक्ति में दिया गया मेट।' } 
  },
  { 
    id: 'smotheredmate', 
    name: { en: '🐴 Smothered Mate', tr: '🐴 Boğmaca Matı (Smothered Mate)', es: '🐴 Mate de la coz', de: '🐴 Ersticktes Matt', ru: '🐴 Спертый мат', fr: '🐴 Mat étouffé', 'pt-br': '🐴 Mate Afogado / Abafado', zh: '🐴 闷宫将死', ja: '🐴 スマザードメイト', hi: '🐴 स्मदर्ड मेट' }, 
    desc: { en: 'A knight checkmate against a trapped king.', tr: 'Kendi taşlarıyla tamamen kuşatılmış şahın at tarafından mat edilmesi.', es: 'Un jaque mate de caballo contra un rey atrapado.', de: 'Ein Springer-Schachmatt gegen einen eingesperrten König.', ru: 'Мат конем окруженному собственными фигурами королю.', fr: 'Un mat du cavalier contre un roi emmuré.', 'pt-br': 'Um xeque-mate de cavalo contra um rei enclausurado.', zh: '针对被困国王的马将死。', ja: '閉じ込められたキングに対するナイトのチェックメイト。', hi: 'फंसे हुए राजा के खिलाफ घोड़े द्वारा चेकमाइट।' } 
  },
  { 
    id: 'arabianmate', 
    name: { en: '🇦🇪 Arabian Mate', tr: '🇦🇪 Arap Matı (Arabian Mate)', es: '🇦🇪 Mate árabe', de: '🇦🇪 Arabisches Matt', ru: '🇦🇪 Арабский мат', fr: '🇦🇪 Mat arabe', 'pt-br': '🇦🇪 Mate Árabe', zh: '🇦🇪 阿拉伯将死', ja: '🇦🇪 アラビアンメイト', hi: '🇦🇪 अरेबियन मेट' }, 
    desc: { en: 'Rook and knight coordination mate in the corner.', tr: 'Kale ve atın koordinasyonuyla köşede sıkıştırılan şaha yapılan mat.', es: 'Mate por coordinación de torre y caballo en la esquina.', de: 'Matt durch Turm und Springer in der Ecke.', ru: 'Мат ладьей и конем в углу доски.', fr: 'Mat par la coordination tour et cavalier dans le coin.', 'pt-br': 'Mate por coordenação de torre e cavalo no canto.', zh: '车马配合在角落将死。', ja: 'コーナーでのルークとナイトの連係メイト。', hi: 'कोने में रूक और घोड़े के समन्वय से मेट।' } 
  },
  { 
    id: 'hookmate', 
    name: { en: '🪝 Hook Mate', tr: '🪝 Çengel Matı (Hook Mate)', es: '🪝 Mate de gancho', de: '🪝 Hakenmatt', ru: '🪝 Крюковой мат', fr: '🪝 Mat du crochet', 'pt-br': '🪝 Mate do Gancho', zh: '🪝 钩形将死', ja: '🪝 フックメイト', hi: '🪝 हुक मेट' }, 
    desc: { en: 'Mate involving a rook, knight, and pawn.', tr: 'Kale, at ve piyon ortaklığıyla yapılan özel köşe matı.', es: 'Mate que involucra una torre, un caballo y un peón.', de: 'Matt mit Turm, Springer und Bauer.', ru: 'Мат с участием ладьи, коня и пешки.', fr: 'Mat impliquant une tour, un cavalier et un pion.', 'pt-br': 'Mate envolvendo torre, cavalo e peão.', zh: '涉及车、马和兵的将死。', ja: 'ルーク、ナイト、ポーンが絡むメイト。', hi: 'रूक, घोड़े और प्यादे से जुड़ा मेट।' } 
  },
  { 
    id: 'bishopsmate', 
    name: { en: '📐 Double Bishop Mate', tr: '📐 Çift Fil Matı (Bishop Mate)', es: '📐 Mate de dos alfiles', de: '📐 Läufer-Mate', ru: '📐 Мат двумя слонами', fr: '📐 Mat des deux fous', 'pt-br': '📐 Mate de Dois Bispos', zh: '📐 双象将死', ja: '📐 ダブルビショップメイト', hi: '📐ダブル बिशप मेट' }, 
    desc: { en: 'Mate delivered by two bishops on diagonals.', tr: 'İki filin çaprazlardan uyumlu çalışarak yaptığı mat.', es: 'Mate dado por dos alfiles en diagonales.', de: 'Matt durch zwei Läufer auf Diagonalen.', ru: 'Мат двумя слонами по диагоналям.', fr: 'Mat administré par deux fous sur des diagonales.', 'pt-br': 'Mate aplicado por dois bispos nas diagonais.', zh: '由两个象在对角线上完成的将死。', ja: '2つのビショップが対角線上で決めるメイト。', hi: 'विकर्णों पर दो बिशप द्वारा दिया गया मेट।' } 
  },
  { 
    id: 'anastasiamate', 
    name: { en: '🏛️ Anastasia Mate', tr: '🏛️ Anastasia Matı (Anastasia Mate)', es: '🏛️ Mate de Anastasia', de: '🏛️ Anastasia-Matt', ru: '🏛️ Мат Анастасии', fr: '🏛️ Mat d’Anastasia', 'pt-br': '🏛️ Mate de Anastasia', zh: '🏛️ 安娜斯塔西亚将死', ja: '🏛️ アナスタシアメイト', hi: '🏛️ अनास्तासिया मेट' }, 
    desc: { en: 'Knight and rook trap mate on the edge.', tr: 'At ve kalenin tahta kenarında kurduğu özel sıkıştırma matı.', es: 'Mate de trampa con caballo y torre en el borde.', de: 'Springer-Turm-Fallenmatt am Rand.', ru: 'Мат конем и ладьей на краю доски.', fr: 'Mat piège cavalier et tour sur le bord.', 'pt-br': 'Mate de armadilha com cavalo e torre na borda.', zh: '马和车在边缘的陷阱将死。', ja: '端でのナイトとルークの罠メイト。', hi: 'किनारे पर घोड़े और रूक का ट्रैप मेट।' } 
  },
  { 
    id: 'bodenmate', 
    name: { en: '⚔️ Boden Mate', tr: '⚔️ Boden Matı (Boden Mate)', es: '⚔️ Mate de Boden', de: '⚔️ Boden-Matt', ru: '⚔️ Мат Бодена', fr: '⚔️ Mat de Boden', 'pt-br': '⚔️ Mate de Boden', zh: '⚔️ 博登将死', ja: '⚔️ ボーデンメイト', hi: '⚔️ बोडेन मेट' }, 
    desc: { en: 'Criscrossing bishop diagonal checkmate.', tr: 'Kesişen iki çapraz hattından fillerle yapılan mat.', es: 'Jaque mate en diagonal con alfiles cruzados.', de: 'Kreuzende Läuferdiagonal-Mattstellung.', ru: 'Мат пересекающимися диагоналями слонов.', fr: 'Échec et mat en diagonale par des fous croisés.', 'pt-br': 'Xeque-mate em diagonal com bispos cruzados.', zh: '交叉象对角线将死。', ja: '交差するビショップの対角線チェックメイト。', hi: 'क्रिसक्रॉस बिशप विकर्ण चेकमाइट।' } 
  },
  { 
    id: 'dovetailmate', 
    name: { en: '🕊️ Dovetail Mate', tr: '🕊️ Kırlangıç Kuyruğu Matı (Dovetail Mate)', es: '🕊️ Mate de cola de milano', de: '🕊️ Schwalbenschwanz-Matt', ru: '🕊️ Мат «Ласточкин хвост»', fr: '🕊️ Mat de la queue d’aronde', 'pt-br': '🕊️ Mate Cauda de Andorinha', zh: '🕊️ 燕尾将死', ja: '🕊️ ダブテイルメイト', hi: '🕊️ डवटेल मेट' }, 
    desc: { en: 'Close-up queen checkmate pattern.', tr: 'Vezirin şaha çok yakın mesafeden piyonları kilitleyerek yaptığı mat.', es: 'Patrón de jaque mate de dama cercano.', de: 'Nahbereichs-Damenmattmuster.', ru: 'Плотный паттерн мата ферзем.', fr: 'Modèle de mat de dame de près.', 'pt-br': 'Padrão de xeque-mate de dama de perto.', zh: '近距离女王将死图案。', ja: '至近距離のクイーンチェックメイトパターン。', hi: 'क्लोज-अप रानी चेकमाइट पैटर्न।' } 
  },
  { 
    id: 'pawnendgame', 
    name: { en: '♟️ Pawn Endgame', tr: '♟️ Piyon Oyunsonu (Pawn Endgame)', es: '♟️ Final de peones', de: '♟️ Bauerndspiel', ru: '♟️ Пешечный эндшпиль', fr: '♟️ Final de pions', 'pt-br': '♟️ Final de Peões', zh: '♟️ 兵残局', ja: '♟️ ポーンエンディング', hi: '♟️ प्यादा एंडगेम' }, 
    desc: { en: 'Pawn promotion and key square endgames.', tr: 'Piyon terfi stratejileri ve kritik kare hesaplamaları.', es: 'Promoción de peones y finales de casillas clave.', de: 'Bauernumwandlung und Schlüsselfeld-Endspiele.', ru: 'Проведение пешек и борьба за ключевые поля.', fr: 'Promotion de pions et finales de cases clés.', 'pt-br': 'Promoção de peões e finais de casas-chave.', zh: '兵的升变与关键格残局。', ja: 'ポーンのプロモーションとキースクエアのエンディング。', hi: 'प्यादा प्रमोशन और प्रमुख वर्ग एंडगेम।' } 
  },
  { 
    id: 'rookendgame', 
    name: { en: '♜ Rook Endgame', tr: '♜ Kale Oyunsonu (Rook Endgame)', es: '♜ Final de torres', de: '♜ Turmendspiel', ru: '♜ Ладейный эндшпиль', fr: '♜ Final de tours', 'pt-br': '♜ Final de Torres', zh: '♜ 车残局', ja: '♜ ルークエンディング', hi: '♜ रूक एंडगेम' }, 
    desc: { en: 'Lucena and Philidor endgame positions.', tr: 'Lucena, Philidor ve temel kale oyunsonu teknikleri.', es: 'Posiciones de finales de Lucena y Philidor.', de: 'Lucena- und Philidor-Endspielstellungen.', ru: 'Позиции Люсены и Филидора в эндшпиле.', fr: 'Positions de finales de Lucena et Philidor.', 'pt-br': 'Posições de finais de Lucena e Philidor.', zh: '卢塞纳和菲利多尔残局位置。', ja: 'ルセナおよびフィリドールのエンディングポジション。', hi: 'लुसेना और फिलidor एंडगेम स्थितियां।' } 
  },
  { 
    id: 'knightendgame', 
    name: { en: '♞ Knight Endgame', tr: '♞ At Oyunsonu (Knight Endgame)', es: '♞ Final de caballos', de: '♞ Springerendspiel', ru: '♞ Конный эндшпиль', fr: '♞ Final de cavaliers', 'pt-br': '♞ Final de Cavalos', zh: '♞ 马残局', ja: '♞ ナイトエンディング', hi: '♞ नाइट एंडगेम' }, 
    desc: { en: 'Knight endgame pawn races.', tr: 'At üstünlüğü veya piyon yarışları içeren oyunsonları.', es: 'Carreras de peones en finales de caballo.', de: 'Springerendspiel-Bauernduelle.', ru: 'Пешечные гонки в эндшпиле с конями.', fr: 'Courses de pions en final de cavalier.', 'pt-br': 'Corridas de peões em finais de cavalo.', zh: '马残局中的兵赛跑。', ja: 'ナイトエンディングのポーンレース。', hi: 'नाइट एंडगेम प्यादा रेस।' } 
  },
  { 
    id: 'bishopendgame', 
    name: { en: '♝ Bishop Endgame', tr: '♝ Fil Oyunsonu (Bishop Endgame)', es: '♝ Final de alfiles', de: '♝ Läuferendspiel', ru: '♝ Слоновый эндшпиль', fr: '♝ Final de fous', 'pt-br': '♝ Final de Bispos', zh: '♝ 象残局', ja: '♝ ビショップエンディング', hi: '♝ बिशप एंडगेम' }, 
    desc: { en: 'Opposite/same-colored bishop endgames.', tr: 'Aynı veya zıt renkli fillerle oynanan oyunsonu taktikleri.', es: 'Finales de alfiles de igual o distinto color.', de: 'Gleich- oder gegnerfarbige Läuferendspiele.', ru: 'Эндшпиль с разноцветными или одноцветными слонами.', fr: 'Finales de fous de même couleur ou de couleurs opposées.', 'pt-br': 'Finais de bispos de mesma cor ou de cores opostas.', zh: '同色或异色象残局。', ja: '同色または異色のビショップエンディング。', hi: 'समान या विपरीत रंग के बिशप एंडगेम।' } 
  },
  { 
    id: 'queenendgame', 
    name: { en: '♛ Queen Endgame', tr: '♛ Vezir Oyunsonu (Queen Endgame)', es: '♛ Final de damas', de: '♛ Damenendspiel', ru: '♛ Ферзевый эндшпиль', fr: '♛ Final de dames', 'pt-br': '♛ Final de Damas', zh: '♛ 后残局', ja: '♛ クイーンエンディング', hi: '♛ रानी एंडगेम' }, 
    desc: { en: 'Perpetual check and promotion defense.', tr: 'Şah çekmeler, sürekli şah ve vezir terfi savunmaları.', es: 'Jaque perpétuo y defensa de promoción.', de: 'Ewiges Schach und Umwandlungsverteidigung.', ru: 'Вечный шах и защита при проведении ферзя.', fr: 'Échec perpétuel et défense de promotion.', 'pt-br': 'Xeque perpétuo e defesa de promoção.', zh: '长将与升变防守。', ja: '永久チェックとプロモーションの防御。', hi: 'अनंत चेक और प्रमोशन डिफेंस।' } 
  },
  { 
    id: 'advancedpawn', 
    name: { en: '⏩ Advanced Pawn', tr: '⏩ İlerlemiş Piyon (Advanced Pawn)', es: '⏩ Peón avanzado', de: '⏩ Fortgeschrittener Bauer', ru: '⏩ Продвинутая пешка', fr: '⏩ Pion avancé', 'pt-br': '⏩ Peão Avançado', zh: '⏩ 进阶兵', ja: '⏩ 高度なポーン', hi: '⏩ उन्नत प्यादा' }, 
    desc: { en: 'Tactics involving advanced passed pawns.', tr: 'Geçer piyonların ve ileri piyonların yarattığı taktik baskılar.', es: 'Tácticas con peones pasados avanzados.', de: 'Taktiken mit fortgeschrittenen Freibauern.', ru: 'Тактика с продвинутыми проходными пешками.', fr: 'Tactiques impliquant des pions passés avancés.', 'pt-br': 'Táticas envolvendo peões pasados avançados.', zh: '涉及进阶 passed 兵的战术。', ja: '高度なパセドポーンに関する戦術。', hi: 'उन्नत पास किए गए प्यादों से जुड़ी रणनीति।' } 
  },
  { 
    id: 'promotion', 
    name: { en: '👑 Pawn Promotion', tr: '👑 Piyon Terfisi (Promotion)', es: '👑 Coronación de peón', de: '👑 Bauernumwandlung', ru: '👑 Превращение пешки', fr: '👑 Promotion de pion', 'pt-br': '👑 Promoção de Peão', zh: '👑 兵升变', ja: '👑 ポーンの昇格', hi: '👑 प्यादा प्रमोशन' }, 
    desc: { en: 'Promoting a pawn on the final rank.', tr: 'Piyonu son yataya ulaştırarak taşa dönüştürme taktikleri.', es: 'Promocionar un peón en la última fila.', de: 'Umwandlung eines Bauern auf der letzten Reihe.', ru: 'Превращение пешки на последней горизонтали.', fr: 'Promouvoir un pion sur la dernière rangée.', 'pt-br': 'Promoção de Peão', zh: '在底线将兵升变。', ja: '最終ランクでポーンを昇格させます。', hi: 'अ अंतिम पंक्ति में प्यादे का प्रमोशन करना।' } 
  }
];

function renderCategoryCards(categories) {
  let html = '';
  let langKey = i18nDict[currentLang] ? currentLang : 'en';

  categories.forEach(cat => {
    let nameVal = typeof cat.name === 'object' ? (cat.name[langKey] || cat.name['en']) : cat.name;
    let descVal = typeof cat.desc === 'object' ? (cat.desc[langKey] || cat.desc['en']) : cat.desc;

    html += `
      <div class="cat-card" onclick="selectCategory('${cat.id}')">
        <h3>${nameVal}</h3>
        <p>${descVal}</p>
      </div>
    `;
  });
  $('#categoryGrid').html(html);
}

function selectCategory(catId) {
  selectedCat = LICHESS_44_CATEGORIES.find(c => c.id === catId) || LICHESS_44_CATEGORIES[0];
  let langKey = i18nDict[currentLang] ? currentLang : 'en';
  let catName = typeof selectedCat.name === 'object' ? (selectedCat.name[langKey] || selectedCat.name['en']) : selectedCat.name;

  $('#selectedCatTitle').text(catName);
  $('#categoryListSection').hide();
  $('#categoryBoardSection').css('display', 'flex');

  loadCategoryPuzzle();
}

function backToCategories() {
  $('#categoryBoardSection').hide();
  $('#categoryListSection').show();
}

function setDifficultyOffset(offset) {
  currentDiffOffset = offset;
  $('.diff-btn').removeClass('active');$(`#btn-diff-${offset}`).addClass('active');
  loadCategoryPuzzle();
}

function switchPage(pageNumber) {
  $('.nav-btn').removeClass('active');$('.page-view').removeClass('active');

  $(`.nav-btn:nth-child(${pageNumber})`).addClass('active');
  $(`#page${pageNumber}`).addClass('active');

  if (pageNumber === 2 && dailyCtrl) {
    dailyCtrl.resize();
  } else if (pageNumber === 3 && catCtrl) {
    catCtrl.resize();
  }
}

$(document).ready(async function() {
  await loadSavedSession();

  const hashParams = new URLSearchParams(window.location.hash.substring(1));
  const typeParam = hashParams.get('type');
  if (typeParam === 'recovery') {
    showAuthForm('updatePassword');
    $('#eloPromptModal').removeClass('hidden');
  }

  if (supabaseClient) {
    const { data } = await supabaseClient.auth.getUser();
    if (data && data.user) {
      activeUser.id = data.user.id;
      const meta = data.user.user_metadata || {};
      if (meta.username) activeUser.username = meta.username;
      
      const { data: profileData } = await supabaseClient
        .from('profiles')
        .select('rating, username')
        .eq('id', data.user.id)
        .single();

      if (profileData) {
        activeUser.elo = profileData.rating !== undefined ? profileData.rating : 1500;
        activeUser.username = profileData.username || activeUser.username;
      } else if (meta.elo) {
        activeUser.elo = parseInt(meta.elo, 10);
      }

      saveActiveUserData();
      await loadUserHistoryFromSupabase();
    }

    supabaseClient.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        activeUser.id = session.user.id;
        const meta = session.user.user_metadata || {};
        if (meta.username) activeUser.username = meta.username;

        const { data: profileData } = await supabaseClient
          .from('profiles')
          .select('rating, username')
          .eq('id', session.user.id)
          .single();

        if (profileData) {
          activeUser.elo = profileData.rating !== undefined ? profileData.rating : 1500;
          activeUser.username = profileData.username || activeUser.username;
        }

        saveActiveUserData();
        updateHeaderUI();
        await loadUserHistoryFromSupabase();
      }
      if (event === 'PASSWORD_RECOVERY') {
        showAuthForm('updatePassword');
        $('#eloPromptModal').removeClass('hidden');
      }
    });
  }

  bootApp();
  renderCategoryCards(LICHESS_44_CATEGORIES);

  $('#loginEmail, #loginPassword').on('keypress', function(e) {
    if (e.which === 13) {
      submitLogin();
    }
  });

  $('#searchInput').on('keyup input', function() {
    let q = $(this).val().toLowerCase();
    let langKey = i18nDict[currentLang] ? currentLang : 'en';
    
    let filtered = LICHESS_44_CATEGORIES.filter(c => {
      let nameVal = typeof c.name === 'object' ? (c.name[langKey] || c.name['en'] || '') : c.name;
      let descVal = typeof c.desc === 'object' ? (c.desc[langKey] || c.desc['en'] || '') : c.desc;
      return nameVal.toLowerCase().includes(q) || descVal.toLowerCase().includes(q);
    });
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
  updateDynamicBoardTexts();
  
  if (c.ctrl && typeof c.ctrl.lock === 'function') {
    c.ctrl.lock();
  }

  if (c.puzzle) {
    await recordPuzzleToHistory(c.puzzle, true);
    
    if (activeUser && activeUser.id) {
      let change = calculateEloChange(activeUser.elo, c.puzzle.rating || 1500, true);
      await applyEloUpdate(change);
    }
  }
}

function processMoveVerdict(which, from, to, moveObj) {
  const c = puzzleCtx(which);
  const expectedUci = c.sol[c.idx];
  const userUci = from + to + (moveObj.promotion || '');

  if (userUci === expectedUci || (expectedUci && userUci.substring(0, 4) === expectedUci.substring(0, 4))) {
    c.game.move(moveObj);
    c.idx++;

    if (c.idx >= c.sol.length) {
      finishPuzzle(which, false);
      return 'ok';
    }

    const currentGen = c.gen;
    setTimeout(() => {
      if (c.gen !== currentGen) return;
      const responseUci = c.sol[c.idx];
      if (responseUci) {
        c.ctrl.playMove(responseUci);
        c.idx++;
        if (c.idx >= c.sol.length) {
          finishPuzzle(which, false);
        }
      }
    }, 400);

    return 'ok';
  }

  showBoardFeedback(c.indicator, t('msgWrongMove'), '#e74c3c', 2000);
  return 'wrong';
}

function initDailyPuzzle() {
  if (typeof LICHESS_PUZZLES_DATA === 'undefined' || !LICHESS_PUZZLES_DATA.length) return;

  currentActiveDailyPuzzle = LICHESS_PUZZLES_DATA[0];
  startDailyPuzzle(currentActiveDailyPuzzle);
}

function startDailyPuzzle(puzzle) {
  dailyGen++;
  dailySolved = false;
  dailyIndex = 0;
  dailySolution = puzzle.solution ? puzzle.solution.split(' ') : [];

  dailyGame = new Chess(puzzle.fen);

  const initialMove = dailySolution[0];
  if (initialMove) {
    dailyGame.move({
      from: initialMove.substring(0, 2),
      to: initialMove.substring(2, 4),
      promotion: initialMove[4] || 'q'
    });
    dailyIndex = 1;
  }

  const playerColor = dailyGame.turn();

  if (!dailyCtrl) {
    dailyCtrl = createLichessBoard('dailyBoard', {
      onUserMove: (from, to, legal) => processMoveVerdict('daily', from, to, legal)
    });
  }

  dailyCtrl.load(dailyGame, playerColor, initialMove ? [initialMove.substring(0, 2), initialMove.substring(2, 4)] : null);
  updateDynamicBoardTexts();
}

function showDailySolution() {
  if (dailySolved) return;
  
  let steps = dailySolution.slice(dailyIndex);
  let stepIdx = 0;

  function step() {
    if (stepIdx >= steps.length) {
      finishPuzzle('daily', true);
      return;
    }
    const moveUci = steps[stepIdx];
    dailyCtrl.playMove(moveUci);
    stepIdx++;
    setTimeout(step, 600);
  }
  step();
}

function loadCategoryPuzzle() {
  if (typeof LICHESS_PUZZLES_DATA === 'undefined' || !LICHESS_PUZZLES_DATA.length) return;

  let userTargetElo = (activeUser ? activeUser.elo : 1500) + currentDiffOffset;
  let matching = LICHESS_PUZZLES_DATA.filter(p => {
    if (!p.themes) return false;
    let themeList = p.themes.toLowerCase().split(' ');
    return themeList.includes(selectedCat.id.toLowerCase());
  });

  if (!matching.length) {
    matching = LICHESS_PUZZLES_DATA;
  }

  matching.sort((a, b) => Math.abs((a.rating || 1500) - userTargetElo) - Math.abs((b.rating || 1500) - userTargetElo));
  
  let pool = matching.slice(0, 15);
  let chosen = pool[Math.floor(Math.random() * pool.length)];

  currentActiveCatPuzzle = chosen;
  startCatPuzzle(chosen);
}

function startCatPuzzle(puzzle) {
  catGen++;
  catSolved = false;
  catIndex = 0;
  catSolution = puzzle.solution ? puzzle.solution.split(' ') : [];

  catGame = new Chess(puzzle.fen);

  const initialMove = catSolution[0];
  if (initialMove) {
    catGame.move({
      from: initialMove.substring(0, 2),
      to: initialMove.substring(2, 4),
      promotion: initialMove[4] || 'q'
    });
    catIndex = 1;
  }

  const playerColor = catGame.turn();

  if (!catCtrl) {
    catCtrl = createLichessBoard('catBoard', {
      onUserMove: (from, to, legal) => processMoveVerdict('cat', from, to, legal)
    });
  }

  catCtrl.load(catGame, playerColor, initialMove ? [initialMove.substring(0, 2), initialMove.substring(2, 4)] : null);
  updateDynamicBoardTexts();
}

function showHint() {
  if (catSolved || !catSolution.length || catIndex >= catSolution.length) return;
  let currentUci = catSolution[catIndex];
  let fromSq = currentUci.substring(0, 2);

  $(`#catBoard .square-${fromSq}`).addClass('selected-square');
  setTimeout(() => {
    $(`#catBoard .square-${fromSq}`).removeClass('selected-square');
  }, 1500);
}

function showSolution() {
  if (catSolved) return;
  
  let steps = catSolution.slice(catIndex);
  let stepIdx = 0;

  function step() {
    if (stepIdx >= steps.length) {
      finishPuzzle('cat', true);
      return;
    }
    const moveUci = steps[stepIdx];
    catCtrl.playMove(moveUci);
    stepIdx++;
    setTimeout(step, 600);
  }
  step();
}