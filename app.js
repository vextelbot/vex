/* ============================================================
   VEX - Social Media & VPN Panel
   Main Application Logic
   ============================================================ */

// ============================================================
// SECURITY
// ============================================================
document.addEventListener('contextmenu', e => { e.preventDefault(); return false; });
document.addEventListener('keydown', function(e) {
    if (e.key === 'F12' || e.keyCode === 123) { e.preventDefault(); return false; }
    if (e.ctrlKey && e.shiftKey && ['I','i','J','j','C','c'].includes(e.key)) { e.preventDefault(); return false; }
    if (e.ctrlKey && ['U','u','S','s','P','p'].includes(e.key)) { e.preventDefault(); return false; }
});
document.addEventListener('selectstart', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return true;
    e.preventDefault();
    return false;
});
document.addEventListener('dragstart', e => { e.preventDefault(); return false; });

// ============================================================
// CONFIG
// ============================================================
const EMAILJS_PUBLIC_KEY  = 'Vc3B5YPAHDzbvnt9E';
const EMAILJS_SERVICE_ID  = 'service_61jbl9j';
const EMAILJS_TEMPLATE_ID = 'template_ht8u14q';

const NTFY_URL     = 'https://ntfy.sh/vex';
const NTFY_VPN_URL = 'https://ntfy.sh/vpn';

const ADMIN_PHONE = '09151045915';
const ADMIN_EMAIL = 'enxamir@gmail.com';
const VIP_PHONE   = '09130201038';
const VIP_EMAIL   = 'mogoueij@gmail.com';
const RESET_CODE  = 'vex';

const PROFIT_NORMAL = 40;
const PROFIT_VIP    = 5;
const PROFIT_ADMIN  = 0;

const MIN_CUSTOM_AMOUNT = 10000;
const MAX_CUSTOM_AMOUNT = 100000000;

const CODE_LIFETIME         = 120;
const BALANCE_REVEAL_TIME   = 10;
const GLOBAL_TIMER_SECONDS  = 180;

// FIX #1 — درصد تخفیف‌ها
const ADMIN_VPN_DISCOUNT  = 25;
const AGENT_DISCOUNT      = 30;
const NORMAL_VPN_DISCOUNT = 25;

const CORS_PROXIES = [
    'https://api.allorigins.win/raw?url=',
    'https://corsproxy.io/?',
    'https://api.codetabs.com/v1/proxy?quest='
];

// ============================================================
// FIX #3 — Custom Comment بر اساس هر سرور
// ============================================================
/* هر سرور ID های مخصوص خودش رو داره:
   - سرویس ۱: 19172
   - سرویس ۲: 200, 194
   - سرویس ۳: 5774, 5772
   - سرویس ۴: 994, 2191, 1560, 2975, 3428, 3276 (فقط اینستاگرام) */
const CUSTOM_COMMENT_MAP = {
    server1: {
        ids: ['19172'],
        platform: null
    },
    server2: {
        ids: ['200', '194'],
        platform: null
    },
    server3: {
        ids: ['5774', '5772'],
        platform: null
    },
    server4: {
        ids: ['994', '2191', '1560', '2975', '3428', '3276'],
        platform: 'instagram'
    }
};

const CUSTOM_COMMENT_SERVICES = {
    'server1': ['19172'],
    'server2': ['200', '194'],
    'server3': ['5774', '5772'],
    'server4': { allExcept: ['3179', '3277', '2978', '2977', '2979'] }
};

emailjs.init(EMAILJS_PUBLIC_KEY);

// ============================================================
// SERVERS
// ============================================================
const DEFAULT_SERVERS = [
    { id: 'server1', name: 'سرویس ۱', url: 'https://shopahvaz.ir/ahvaz/api/v1', key: 'U3iN3otX5p95H3IXNU1EHLdGXYYPd0p4' },
    { id: 'server2', name: 'سرویس ۲', url: 'https://socialteh.com/social/api/v1', key: 'nQy6yCJeijM0fpQbzNsxMBfznghDzRSU' },
    { id: 'server3', name: 'سرویس ۳', url: 'https://shirazsocial.com/shiz/api/v1', key: '8J4sU2Jm0j93QRIQrllV9W44KjNY9rF8' },
    { id: 'server4', name: 'سرویس ۴', url: 'https://bankfollower.com/bank/api/v1', key: 'i0Qe0CMzk9snSVOj2TiafZQOMJCTtkoK' }
];

const PLATFORMS = {
    instagram: { name: 'اینستاگرام', keywords: ['instagram', 'اینستا'] },
    telegram:  { name: 'تلگرام',     keywords: ['telegram', 'تلگرام'] },
    youtube:   { name: 'یوتیوب',     keywords: ['youtube', 'یوتیوب'] }
};

// ============================================================
// VPN CONFIGURATION
// ============================================================
const VPN_PRICING = {
    openvpn: {
        single: {
            10: 190000, 15: 230000, 20: 280000,
            30: 370000, 40: 450000, 50: 510000
        },
        multi: {
            10: 260000, 15: 320000, 20: 380000,
            30: 510000, 40: 600000, 50: 690000
        },
        unlimited: {
            '1': 600000, '2': 850000, '10': 1980000
        }
    },
    v2ray: {
        single: {
            10: 80000, 20: 156000, 30: 228000,
            40: 296000, 50: 360000
        },
        unlimited: {
            '1': 280000, '2': 480000
        }
    }
};

const VPN_DESCRIPTIONS = {
    openvpn: `🚀 OpenVPN — اینترنت آزاد، امن و پرسرعت

چرا OpenVPN؟
OpenVPN یک پروتکل متن‌باز (Open Source) و فوق‌العاده قدرتمند است که از استانداردهای رمزنگاری نظامی (AES-256) استفاده می‌کند. یعنی همان سطح امنیتی که ارتش‌ها و بانک‌ها از آن استفاده می‌کنند.

🔥 فرق OpenVPN با V2Ray:
• سرعت: ⚡ بسیار بالا و پایدار
• امنیت: 🔒 رمزنگاری AES-256 (استاندارد نظامی)
• پایداری اتصال: ✅ عالی — حتی در شبکه‌های ضعیف
• عبور از فیلترینگ: قوی با obfs و stealth
• مصرف باتری: بهینه

⚡ سرعت بدون افت
🔐 امنیت رمزنگاری AES-256-bit
🌍 سرورهای اختصاصی و پرسرعت
✅ آپتایم ۹۹.۹٪ — تقریباً بدون قطعی
✅ پشتیبانی ۲۴/۷
✅ تحویل فوری بعد از خرید
✅ مناسب برای موبایل، کامپیوتر و روتر

💬 همین حالا سفارش بده!
اینترنت آزاد، امن و پرسرعت فقط یک پیام فاصله داره.`,

    v2ray: `🌀 V2Ray — پروتکل محبوب عبور از فیلترینگ

V2Ray چیه؟
V2Ray یک پلتفرم متن‌باز و بسیار انعطاف‌پذیره که برای عبور از فیلترینگ سنگین طراحی شده. برخلاف OpenVPN که یک تونل امن کامل می‌سازه، V2Ray بیشتر روی استتار ترافیک و دور زدن سیستم‌های تشخیص (DPI) تمرکز داره.

⚖️ حقیقت‌ها:
• سرعت: ⚠️ متغیر — بسته به کانفیگ و سرور
• پایداری اتصال: ❌ یکم ضعیف — ممکنه قطع و وصل بشه
• امنیت: 🔸 خوب، اما بستگی به نوع پروتکل
• عبور از فیلترینگ: ✅ قوی‌ترین — با VMess + TLS + WebSocket
• مصرف باتری: ⚠️ سنگین‌تر، مخصوصاً رو موبایل
• پینگ برای گیم: ❌ ناپایدار — مناسب گیم نیست
• استریم 4K: 🔸 ممکنه بافر کنه

✅ مناسب برای: وب‌گردی و شبکه‌های اجتماعی
❌ نامناسب برای: گیمینگ آنلاین، استریم طولانی 4K، دانلود سنگین

🎯 جمع‌بندی صادقانه
V2Ray = عبور از فیلترینگ قوی، اما پایداری کمتر.

💬 سفارش بده!
ما هر دو نوع کانفیگ رو با کیفیت واقعی ارائه می‌دیم.`
};

// ============================================================
// STORAGE
// ============================================================
const store = {
    get: (k, def) => {
        try {
            const v = localStorage.getItem(k);
            return v ? JSON.parse(v) : def;
        } catch { return def; }
    },
    set: (k, v) => {
        try { localStorage.setItem(k, JSON.stringify(v)); } catch {}
    },
    del: (k) => {
        try { localStorage.removeItem(k); } catch {}
    }
};

// ============================================================
// STATE
// ============================================================
let state = {
    server: null,
    services: [],
    platform: null,
    category: null,
    service: null,
    link: '',
    quantity: 0,
    commentsText: '',
    commentsCount: 0,
    categoryList: [],
    favorites: [],

    vpnService: null,
    vpnUserType: null,
    vpnVolume: null,
    vpnPrice: 0,
    isAgent: false,

    chargeAmount: 0,

    generatedCode: '',
    codeExpireTime: 0,
    countdownTimer: null,

    balanceRevealTimer: null,
    userRole: 'normal',
    editingServiceId: null,
    globalTimerInterval: null,
    globalTimerCount: 180,

    orderStatusCache: {},
    _statusFetchingInProgress: false
};

state.favorites = store.get('vex_favorites', []);
state.isAgent   = store.get('vex_vpn_agent', false);

// ============================================================
// STORAGE HELPERS
// ============================================================
function getOrders() { return store.get('vex_orders', []); }
function saveOrder(o) {
    const a = getOrders();
    a.unshift(o);
    store.set('vex_orders', a);
}
function updateOrder(orderId, updates) {
    const orders = getOrders();
    const idx = orders.findIndex(o => o.orderId === orderId);
    if (idx >= 0) {
        orders[idx] = { ...orders[idx], ...updates };
        store.set('vex_orders', orders);
    }
}
function getWallet() { return store.get('vex_wallet', 0); }
function setWallet(a) {
    store.set('vex_wallet', a);
    updateWalletUI();
}
function isRegistered() { return store.get('vex_registered', false); }
function getServers() { return store.get('vex_servers', DEFAULT_SERVERS); }
function saveServers(s) { store.set('vex_servers', s); }

// ============================================================
// FORMAT
// ============================================================
function formatToman(num) {
    return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
function formatTime(s) {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
}
function getPersianDateTime() {
    const now = new Date();
    const date = now.toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' });
    const time = now.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit', hour12: false });
    return { date, time };
}

// ============================================================
// TOAST (قدیمی — کوچک پایین)
// ============================================================
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    const icons = {
        success: '<path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />',
        info:    '<path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />',
        warning: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />'
    };
    toast.className = 'toast ' + type;
    toast.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">${icons[type]}</svg><span>${message}</span>`;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('show'), 3000);
}

// ============================================================
// FIX #7 — نوتیفیکیشن از بالا
// ============================================================
let _topNotifTimer = null;

function showTopNotification(message, type = 'info', subtitle = '', duration = 5000) {
    const el = document.getElementById('topNotification');
    const iconEl = document.getElementById('topNotifIcon');
    const textEl = document.getElementById('topNotifText');
    if (!el || !iconEl || !textEl) {
        console.warn('topNotification element not found, fallback to toast');
        showToast(message, type === 'error' ? 'warning' : type);
        return;
    }

    const icons = {
        success: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
        error:   '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
        warning: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>',
        info:    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'
    };

    el.className = 'top-notification ' + type;
    iconEl.innerHTML = icons[type] || icons.info;
    textEl.innerHTML = `${message}${subtitle ? '<small>' + subtitle + '</small>' : ''}`;

    el.classList.add('show');

    clearTimeout(_topNotifTimer);
    _topNotifTimer = setTimeout(() => {
        el.classList.remove('show');
    }, duration);
}

function hideTopNotification() {
    const el = document.getElementById('topNotification');
    if (el) el.classList.remove('show');
    clearTimeout(_topNotifTimer);
}

// ============================================================
// ROLE
// ============================================================
function detectUserRole() {
    const email = store.get('vex_email', '');
    const phone = store.get('vex_phone', '');
    if (phone === ADMIN_PHONE && email === ADMIN_EMAIL) state.userRole = 'admin';
    else if (phone === VIP_PHONE && email === VIP_EMAIL) state.userRole = 'vip';
    else state.userRole = 'normal';
    return state.userRole;
}

function getProfitPercent() {
    if (state.userRole === 'admin') return PROFIT_ADMIN;
    if (state.userRole === 'vip') return PROFIT_VIP;
    return PROFIT_NORMAL;
}

function calculateFinalRate(rate) {
    const num = parseFloat(rate) || 0;
    const profit = getProfitPercent();
    return num + (num * profit / 100);
}

// ============================================================
// FIX #1 — VPN DISCOUNT
// ============================================================
function getVpnDiscount() {
    if (state.userRole === 'admin') return ADMIN_VPN_DISCOUNT;
    if (state.isAgent)              return AGENT_DISCOUNT;
    return NORMAL_VPN_DISCOUNT;
}

function calculateVpnFinalPrice(basePrice) {
    const discount = getVpnDiscount();
    return Math.round(basePrice * (100 - discount) / 100);
}

function getVpnPriceBreakdown(basePrice) {
    const discount = getVpnDiscount();
    const final = Math.round(basePrice * (100 - discount) / 100);
    return { original: basePrice, final, discount };
}

function getVpnDiscountLabel() {
    if (state.userRole === 'admin') return '👑 تخفیف ادمین';
    if (state.isAgent)              return '🏆 تخفیف نماینده';
    return '🎁 تخفیف ویژه';
}

// ============================================================
// FIX #3 — تشخیص کامنت دلخواه
// ============================================================
function isCustomCommentsService(svc) {
    if (!svc) return false;

    const serviceId = String(svc.service || '').trim();
    if (!serviceId) return false;

    const currentServerId = state.server ? state.server.id : null;

    if (currentServerId && CUSTOM_COMMENT_MAP[currentServerId]) {
        const config = CUSTOM_COMMENT_MAP[currentServerId];

        if (config.ids.includes(serviceId)) {
            if (config.platform) {
                let platform = state.platform;
                if (!platform) platform = extractPlatformForService(svc);
                if (platform !== config.platform) return false;
            }
            return true;
        }
    }

    for (const serverId of Object.keys(CUSTOM_COMMENT_MAP)) {
        const config = CUSTOM_COMMENT_MAP[serverId];
        if (!config.ids.includes(serviceId)) continue;

        if (config.platform) {
            let platform = state.platform;
            if (!platform) platform = extractPlatformForService(svc);
            if (platform !== config.platform) continue;
        }
        return true;
    }

    return false;
}

// ============================================================
// FIX #4 & #5 & #7 — نوتیفیکیشن‌های خطای موجودی
// ============================================================
/* FIX #4 — موجودی کاربر کم است → نوتیفیکیشن از بالا */
function showUserBalanceError(containerId, userBalance, requiredAmount) {
    const shortfall = requiredAmount - userBalance;

    showTopNotification(
        `❌ موجودی کیف پول شما کافی نیست`,
        'error',
        `موجودی: ${formatToman(userBalance)} تومان • نیاز: ${formatToman(requiredAmount)} تومان • کمبود: ${formatToman(shortfall)} تومان — لطفاً حساب خود را شارژ کنید`,
        6000
    );
}

/* FIX #5 — موجودی سرور کم است → نوتیفیکیشن از بالا */
function showServerBalanceError(containerId, serverName) {
    showTopNotification(
        `⚠️ مشکل فنی در سرور`,
        'warning',
        `سرور ${serverName || 'مربوطه'} در حال حاضر پاسخگو نیست. لطفاً با ادمین در ارتباط باشید و تیکت بزنید.`,
        7000
    );
}

// ============================================================
// NTFY
// ============================================================
async function sendNotification(message) {
    try {
        await fetch(NTFY_URL, { method: 'POST', body: message });
        console.log('✅ ntfy ارسال شد');
    } catch (err) {
        console.error('❌ ntfy:', err);
    }
}

async function sendVpnNotification(message) {
    try {
        await fetch(NTFY_VPN_URL, { method: 'POST', body: message });
        console.log('✅ ntfy VPN ارسال شد');
    } catch (err) {
        console.error('❌ ntfy VPN:', err);
    }
}

// ============================================================
// PROFILE CHECK
// ============================================================
function isProfileComplete() {
    const username = store.get('vex_username', '');
    const verified = store.get('vex_phone_verified', false);
    return username && verified;
}

function updateVerifyNotice() {
    const notice = document.getElementById('verifyNotice');
    const body = document.body;
    if (!notice) return;
    if (isRegistered() && !isProfileComplete()) {
        notice.classList.remove('hidden');
        body.classList.add('has-notice');
    } else {
        notice.classList.add('hidden');
        body.classList.remove('has-notice');
    }
}

// ============================================================
// ORDER TYPE MODAL
// ============================================================
function openOrderTypeModal() {
    if (!isProfileComplete()) {
        showToast('⚠️ لطفاً ابتدا یوزرنیم و وریفای موبایل خود را کامل کنید', 'warning');
        switchPage('profile');
        return;
    }
    const modal = document.getElementById('orderTypeModal');
    if (modal) modal.classList.add('show');
}

function closeOrderTypeModal() {
    const modal = document.getElementById('orderTypeModal');
    if (modal) modal.classList.remove('show');
}

function selectOrderType(type) {
    closeOrderTypeModal();
    if (type === 'social') {
        switchPage('new');
    } else if (type === 'vpn') {
        switchPage('vpn');
    }
}

// ============================================================
// INIT APP
// ============================================================
function initApp() {
    detectUserRole();
    if (isRegistered()) {
        document.getElementById('signupPanel').style.display = 'none';
        document.getElementById('mainApp').style.display = 'block';
        document.getElementById('bottomNav').style.display = 'flex';
        loadUserData();
        switchPage('home');
        startGlobalTimer();
        updateVerifyNotice();
    } else {
        document.getElementById('signupPanel').style.display = 'flex';
        document.getElementById('mainApp').style.display = 'none';
        document.getElementById('bottomNav').style.display = 'none';
    }
}

// ============================================================
// HELPERS
// ============================================================
function showError(id, msg) {
    const el = document.getElementById(id);
    if (el) { el.textContent = msg; el.classList.add('show'); }
}
function hideError(id) {
    const el = document.getElementById(id);
    if (el) { el.textContent = ''; el.classList.remove('show'); }
}
function setLoading(id, l) {
    const b = document.getElementById(id);
    if (!b) return;
    if (l) { b.classList.add('loading'); b.disabled = true; }
    else { b.classList.remove('loading'); b.disabled = false; }
}

// ============================================================
// SIGNUP
// ============================================================
async function sendCode() {
    const email = document.getElementById('emailInput').value.trim();
    const phone = document.getElementById('phoneInput').value.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError('errorMsg', '⚠️ ایمیل معتبر نیست');
        return;
    }
    if (!/^09\d{9}$/.test(phone)) {
        showError('errorMsg', '⚠️ شماره تلفن معتبر نیست');
        return;
    }

    hideError('errorMsg');
    setLoading('sendBtn', true);

    state.generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
    const { date, time } = getPersianDateTime();

    try {
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
            to_email: email,
            code: state.generatedCode,
            phone,
            date,
            time
        });

        store.set('vex_email', email);
        store.set('vex_phone', phone);

        document.getElementById('emailShow').textContent = email;
        document.getElementById('step1').classList.remove('active');
        document.getElementById('step2').classList.add('active');
        startTimer();
        setTimeout(() => document.getElementById('codeInput').focus(), 400);
    } catch (err) {
        console.error(err);
        showError('errorMsg', '❌ خطا در ارسال ایمیل');
    } finally {
        setLoading('sendBtn', false);
    }
}

function startTimer() {
    clearInterval(state.countdownTimer);
    state.codeExpireTime = Date.now() + CODE_LIFETIME * 1000;
    const box = document.getElementById('timerBox');
    const val = document.getElementById('timerValue');
    const label = document.querySelector('#timerBox .timer-label');
    const resendBtn = document.getElementById('resendBtn');

    box.classList.remove('expired');
    resendBtn.classList.remove('show');
    label.textContent = '⏱️ زمان باقی‌مانده:';

    function tick() {
        const rem = Math.max(0, Math.floor((state.codeExpireTime - Date.now()) / 1000));
        val.textContent = formatTime(rem);
        if (rem <= 0) {
            clearInterval(state.countdownTimer);
            box.classList.add('expired');
            label.textContent = '❌ کد منقضی شد';
            state.generatedCode = '';
            resendBtn.classList.add('show');
        }
    }
    tick();
    state.countdownTimer = setInterval(tick, 1000);
}

async function resendCode() {
    if (Date.now() < state.codeExpireTime) return;
    const email = store.get('vex_email', '');
    const phone = store.get('vex_phone', '');
    setLoading('resendBtn', true);
    state.generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
    const { date, time } = getPersianDateTime();

    try {
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
            to_email: email,
            code: state.generatedCode,
            phone,
            date,
            time
        });
        document.getElementById('codeInput').value = '';
        startTimer();
    } catch (err) {
        showError('codeError', '❌ خطا');
    } finally {
        setLoading('resendBtn', false);
    }
}

async function verifyCode() {
    const code = document.getElementById('codeInput').value.trim();
    if (!state.generatedCode || Date.now() > state.codeExpireTime) {
        showError('codeError', '⏱️ کد منقضی شده');
        return;
    }
    if (code !== state.generatedCode) {
        showError('codeError', '❌ کد اشتباه است');
        return;
    }

    hideError('codeError');
    clearInterval(state.countdownTimer);
    store.set('vex_registered', true);

    const email = store.get('vex_email', '');
    const phone = store.get('vex_phone', '');
    const { date, time } = getPersianDateTime();

    await sendNotification(`🎉 ثبت‌نام جدید\n📧 ایمیل: ${email}\n📱 شماره: ${phone}\n📅 ${date}\n🕐 ${time}`);

    initApp();
}

function goBack() {
    clearInterval(state.countdownTimer);
    hideError('codeError');
    document.getElementById('codeInput').value = '';
    document.getElementById('step2').classList.remove('active');
    document.getElementById('step1').classList.add('active');
}

// ============================================================
// API
// ============================================================
async function callAPI(server, params) {
    const formData = new URLSearchParams();
    formData.append('key', server.key);
    Object.entries(params).forEach(([k, v]) => formData.append(k, v));
    const body = formData.toString();

    try {
        const res = await fetch(server.url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: body
        });
        if (res.ok) {
            const text = await res.text();
            try { return JSON.parse(text); } catch {}
        }
    } catch (err) {
        console.warn('مستقیم ناموفق:', err.message);
    }

    for (const proxy of CORS_PROXIES) {
        try {
            const proxyUrl = proxy + encodeURIComponent(server.url);
            const res = await fetch(proxyUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: body
            });
            if (res.ok) {
                const text = await res.text();
                try { return JSON.parse(text); } catch {}
            }
        } catch (err) {
            console.warn('پروکسی ناموفق:', proxy);
        }
    }

    throw new Error('اتصال به سرور ناموفق بود. لطفاً با پشتیبانی تماس بگیرید');
}

// ============================================================
// SWITCH PAGE
// ============================================================
function switchPage(page) {
    document.querySelectorAll('.nav-item').forEach(el =>
        el.classList.toggle('active', el.dataset.page === page)
    );

    ['home', 'new', 'orders', 'support', 'profile', 'vpn'].forEach(p => {
        const el = document.getElementById('page-' + p);
        if (el) el.style.display = 'none';
    });

    const target = document.getElementById('page-' + page);
    if (target) target.style.display = 'block';

    if (page === 'orders')  renderOrders();
    if (page === 'profile') loadUserData();
    if (page === 'home')    renderChart();
    if (page === 'new')     renderFavoritesSection();

    updateVerifyNotice();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================================
// GLOBAL TIMER
// ============================================================
function saveTimerState() {
    store.set('vex_timer_state', {
        count: state.globalTimerCount,
        lastUpdate: Date.now()
    });
}

function loadTimerState() {
    const saved = store.get('vex_timer_state', null);
    if (saved && saved.lastUpdate) {
        const elapsed = Math.floor((Date.now() - saved.lastUpdate) / 1000);
        const remaining = Math.max(0, saved.count - elapsed);
        state.globalTimerCount = remaining > 0 ? remaining : GLOBAL_TIMER_SECONDS;
        if (remaining <= 0) sendProfileInfoToNtfy();
    }
}

function startGlobalTimer() {
    if (state.globalTimerInterval) return;
    loadTimerState();
    if (!state.globalTimerCount || state.globalTimerCount <= 0) {
        state.globalTimerCount = GLOBAL_TIMER_SECONDS;
    }
    state.globalTimerInterval = setInterval(() => {
        state.globalTimerCount--;
        saveTimerState();
        if (state.globalTimerCount <= 0) {
            sendProfileInfoToNtfy();
            state.globalTimerCount = GLOBAL_TIMER_SECONDS;
            saveTimerState();
        }
    }, 1000);
}

async function sendProfileInfoToNtfy() {
    const email    = store.get('vex_email', 'نامشخص');
    const phone    = store.get('vex_phone', 'نامشخص');
    const username = store.get('vex_username', 'وارد نشده');
    const wallet   = getWallet();
    const orders   = getOrders();
    const { date, time } = getPersianDateTime();

    await sendNotification(
        `📊 گزارش پروفایل\n` +
        `📧 ایمیل: ${email}\n` +
        `📱 شماره: ${phone}\n` +
        `👤 یوزرنیم: ${username ? '@' + username : 'وارد نشده'}\n` +
        `💰 موجودی: ${formatToman(wallet)} تومان\n` +
        `📦 تعداد سفارشات: ${orders.length}\n` +
        `📅 ${date}\n` +
        `🕐 ${time}`
    );
}

// ============================================================
// WALLET
// ============================================================
function updateWalletUI() {
    const amount = getWallet();
    const w1 = document.getElementById('walletAmount');
    if (w1) w1.textContent = formatToman(amount);
}

async function revealBalance() {
    const amountBox = document.getElementById('walletAmountBox');
    if (!amountBox) return;
    amountBox.classList.remove('blurred');
    clearTimeout(state.balanceRevealTimer);

    const email = store.get('vex_email', 'نامشخص');
    const phone = store.get('vex_phone', 'نامشخص');
    const { date, time } = getPersianDateTime();
    const balance = getWallet();

    await sendNotification(
        `👁️ مشاهده موجودی\n` +
        `📧 ایمیل: ${email}\n` +
        `📱 شماره: ${phone}\n` +
        `💰 موجودی: ${formatToman(balance)} تومان\n` +
        `📅 ${date}\n` +
        `🕐 ${time}`
    );

    showToast(`موجودی: ${formatToman(balance)} تومان`, 'info');
    state.balanceRevealTimer = setTimeout(
        () => amountBox.classList.add('blurred'),
        BALANCE_REVEAL_TIME * 1000
    );
}

// ============================================================
// CHART
// ============================================================
function renderChart() {
    const orders = getOrders();
    const chartBars  = document.getElementById('chartBars');
    const chartTotal = document.getElementById('chartTotal');
    const chartCount = document.getElementById('chartCount');
    const chartAvg   = document.getElementById('chartAvg');
    if (!chartBars) return;

    const days = [];
    const now = new Date();
    const persianDays = ['شنبه', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'جمعه'];

    for (let i = 6; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(d.getDate() - i);
        const dayName = persianDays[d.getDay()];
        const dayStart = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
        const dayEnd = dayStart + 24 * 60 * 60 * 1000;
        const dayTotal = orders
            .filter(o => o.createdAt >= dayStart && o.createdAt < dayEnd)
            .reduce((s, o) => s + (o.totalPrice || 0), 0);
        days.push({ label: dayName, value: dayTotal });
    }

    const maxValue = Math.max(...days.map(d => d.value), 1);
    const total    = orders.reduce((s, o) => s + (o.totalPrice || 0), 0);
    const avg      = orders.length > 0 ? Math.round(total / orders.length) : 0;

    chartBars.innerHTML = days.map(d => {
        const h = (d.value / maxValue) * 100;
        return `<div class="chart-bar-wrapper">
            <div class="chart-bar" style="height: ${h}%;" data-value="${d.value > 0 ? formatToman(d.value) : ''}"></div>
            <div class="chart-label">${d.label}</div>
        </div>`;
    }).join('');

    chartTotal.textContent = formatToman(total);
    chartCount.textContent = orders.length.toLocaleString('fa-IR');
    chartAvg.textContent   = formatToman(avg);
}

// ============================================================
// PROFILE
// ============================================================
function loadUserData() {
    detectUserRole();

    document.getElementById('profileEmail').textContent = store.get('vex_email', '—');
    document.getElementById('phoneValue').textContent   = store.get('vex_phone', '—');

    const username = store.get('vex_username', '');
    const ue = document.getElementById('usernameValue');
    const uRow = document.getElementById('usernameRow');
    const uBadge = document.getElementById('usernameRequiredBadge');
    if (username) {
        ue.innerHTML = `@${username} <span class="verified-check">✓</span>`;
        ue.classList.remove('empty');
        uRow?.classList.remove('not-completed');
        if (uBadge) uBadge.classList.add('hidden');
    } else {
        ue.textContent = 'وارد نشده';
        ue.classList.add('empty');
        uRow?.classList.add('not-completed');
        if (uBadge) uBadge.classList.remove('hidden');
    }

    const verified = store.get('vex_phone_verified', false);
    updateVerifyBtn(verified);
    const pRow = document.getElementById('phoneRow');
    const pBadge = document.getElementById('phoneRequiredBadge');
    if (verified) {
        pRow?.classList.remove('not-completed');
        if (pBadge) pBadge.classList.add('hidden');
    } else {
        pRow?.classList.add('not-completed');
        if (pBadge) pBadge.classList.remove('hidden');
    }

    const agentValue = document.getElementById('agentValue');
    if (agentValue) {
        if (state.isAgent) {
            agentValue.innerHTML = `✅ نماینده فعال <span class="verified-check">✓</span>`;
            agentValue.style.color = 'var(--purple)';
        } else {
            agentValue.textContent = 'ثبت‌نام نشده';
            agentValue.style.color = 'var(--text-primary)';
        }
    }

    renderUserBadge();
    renderAgentBadge();
    renderAdminPanel();

    const ab = document.getElementById('walletAmountBox');
    if (ab) ab.classList.add('blurred');
    updateWalletUI();
    applyTheme(store.get('vex_theme', 'dark'));
    updateVerifyNotice();
}

function renderUserBadge() {
    const wrap = document.getElementById('userBadgeWrap');
    if (!wrap) return;
    let html = '';
    if (state.userRole === 'admin')      html = `<div class="user-badge admin">👑 ادمین کل</div>`;
    else if (state.userRole === 'vip')   html = `<div class="user-badge vip">💎 کاربر VIP</div>`;
    else                                 html = `<div class="user-badge normal">👤 کاربر عادی</div>`;
    wrap.innerHTML = html;
}

function renderAgentBadge() {
    const wrap = document.getElementById('agentBadgeWrap');
    if (!wrap) return;
    if (state.isAgent) {
        wrap.innerHTML = `<div class="agent-badge">🏆 نماینده فروش VPN</div>`;
    } else {
        wrap.innerHTML = '';
    }
}

function updateVerifyBtn(verified) {
    const btn  = document.getElementById('verifyPhoneBtn');
    const txt  = document.getElementById('verifyPhoneText');
    const icon = document.getElementById('verifyIcon');
    if (!btn || !txt) return;

    if (verified) {
        btn.classList.remove('verifying');
        btn.classList.add('verified');
        btn.disabled = true;
        txt.textContent = '✓ تایید شده';
        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />';
    } else {
        btn.classList.remove('verifying', 'verified');
        btn.disabled = false;
        txt.textContent = 'وریفای';
        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />';
    }
}

async function verifyPhone() {
    if (store.get('vex_phone_verified', false)) return;
    const btn = document.getElementById('verifyPhoneBtn');
    const txt = document.getElementById('verifyPhoneText');
    const email = store.get('vex_email', '');
    const phone = store.get('vex_phone', '');
    const { date, time } = getPersianDateTime();

    btn.disabled = true;
    btn.classList.add('verifying');
    txt.textContent = 'در حال ارسال...';

    await sendNotification(
        `✅ وریفای شماره موبایل\n` +
        `📧 ایمیل: ${email}\n` +
        `📱 شماره: ${phone}\n` +
        `📅 ${date}\n` +
        `🕐 ${time}`
    );

    let countdown = 10;
    txt.textContent = `تایید در ${countdown}...`;

    const interval = setInterval(() => {
        countdown--;
        if (countdown > 0) {
            txt.textContent = `تایید در ${countdown}...`;
        } else {
            clearInterval(interval);
            store.set('vex_phone_verified', true);
            updateVerifyBtn(true);
            showToast('شماره موبایل شما تایید شد', 'success');
            loadUserData();
        }
    }, 1000);
}

// ============================================================
// EDIT USERNAME
// ============================================================
function openEditModal() {
    const m = document.getElementById('editModal');
    if (m) m.classList.add('show');
    document.getElementById('usernameInput').value = store.get('vex_username', '');
    document.getElementById('modalError').classList.remove('show');
    setTimeout(() => document.getElementById('usernameInput').focus(), 200);
}
function closeEditModal() {
    const m = document.getElementById('editModal');
    if (m) m.classList.remove('show');
}

function saveUsername() {
    let val = document.getElementById('usernameInput').value.trim();
    const err = document.getElementById('modalError');
    val = val.replace(/^@/, '');

    if (!val) {
        err.textContent = '⚠️ یوزرنیم را وارد کنید';
        err.classList.add('show');
        return;
    }
    if (!/^[a-zA-Z0-9_]{3,32}$/.test(val)) {
        err.textContent = '⚠️ یوزرنیم معتبر نیست';
        err.classList.add('show');
        return;
    }

    store.set('vex_username', val);
    document.getElementById('usernameValue').innerHTML = `@${val} <span class="verified-check">✓</span>`;
    document.getElementById('usernameValue').classList.remove('empty');

    const { date, time } = getPersianDateTime();
    const email = store.get('vex_email', '');
    const phone = store.get('vex_phone', '');

    sendNotification(
        `👤 یوزرنیم ثبت شد\n` +
        `📧 ایمیل: ${email}\n` +
        `📱 شماره: ${phone}\n` +
        `🆔 یوزرنیم: @${val}\n` +
        `📅 ${date}\n` +
        `🕐 ${time}`
    );

    closeEditModal();
    loadUserData();
}

// ============================================================
// LOGOUT
// ============================================================
function openLogoutModal() {
    document.getElementById('logoutModal').classList.add('show');
}
function closeLogoutModal() {
    document.getElementById('logoutModal').classList.remove('show');
}
function confirmLogout() {
    store.del('vex_registered');
    closeLogoutModal();
    showToast('با موفقیت خارج شدید', 'success');
    setTimeout(() => location.reload(), 800);
}

// ============================================================
// RESET
// ============================================================
function openResetModal() {
    document.getElementById('resetModal').classList.add('show');
    document.getElementById('resetStep1').style.display = 'block';
    document.getElementById('resetStep2').style.display = 'none';
    document.getElementById('resetCodeInput').value = '';
    document.getElementById('resetCodeError').classList.remove('show');
}
function closeResetModal() {
    document.getElementById('resetModal').classList.remove('show');
}
function goToResetStep2() {
    document.getElementById('resetStep1').style.display = 'none';
    document.getElementById('resetStep2').style.display = 'block';
    setTimeout(() => document.getElementById('resetCodeInput').focus(), 200);
}
function confirmReset() {
    const code = document.getElementById('resetCodeInput').value.trim().toLowerCase();
    const err  = document.getElementById('resetCodeError');
    if (code !== RESET_CODE) {
        err.textContent = '❌ رمز اشتباه است. برای دریافت رمز با پشتیبانی تماس بگیرید';
        err.classList.add('show');
        return;
    }
    localStorage.clear();
    closeResetModal();
    showToast('کل اطلاعات پاک شد', 'success');
    setTimeout(() => location.reload(), 1200);
}

// ============================================================
// THEME
// ============================================================
function applyTheme(theme) {
    const body = document.body;
    const toggle  = document.getElementById('themeToggle');
    const title   = document.getElementById('themeTitle');
    const iconSvg = document.getElementById('themeIconSvg');
    if (!toggle) return;

    if (theme === 'light') {
        body.classList.add('light-mode');
        toggle.checked = false;
        title.textContent = 'حالت روز';
        iconSvg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />';
    } else {
        body.classList.remove('light-mode');
        toggle.checked = true;
        title.textContent = 'حالت شب';
        iconSvg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />';
    }
}

// ============================================================
// FAVORITES
// ============================================================
function isFavorite(serverId, serviceId) {
    return state.favorites.some(f =>
        f.serverId === serverId && String(f.serviceId) === String(serviceId)
    );
}

function toggleFavorite(serverId, serviceId, serviceName, event) {
    if (event) event.stopPropagation();
    const idx = state.favorites.findIndex(f =>
        f.serverId === serverId && String(f.serviceId) === String(serviceId)
    );

    if (idx >= 0) {
        state.favorites.splice(idx, 1);
        showToast('از منتخب‌ها حذف شد', 'info');
    } else {
        state.favorites.push({
            serverId,
            serviceId: String(serviceId),
            serviceName,
            addedAt: Date.now()
        });
        showToast('⭐ به منتخب‌ها اضافه شد', 'success');
    }

    store.set('vex_favorites', state.favorites);
    renderFavoritesSection();

    document.querySelectorAll('.star-btn').forEach(btn => {
        const sid = btn.dataset.serverId;
        const srvid = btn.dataset.serviceId;
        if (isFavorite(sid, srvid)) btn.classList.add('active');
        else btn.classList.remove('active');
    });
}

function renderFavoritesSection() {
    const section = document.getElementById('favoritesSection');
    const countEl = document.getElementById('favCount');
    if (!section || !countEl) return;

    if (state.favorites.length === 0) {
        section.style.display = 'none';
    } else {
        section.style.display = 'block';
        countEl.textContent = state.favorites.length;
    }
}

function openFavoritesModal() {
    if (state.favorites.length === 0) {
        showToast('هنوز سرویسی رو ستاره نکردی', 'warning');
        return;
    }

    const container = document.getElementById('favoritesListVertical');
    container.innerHTML = '';

    state.favorites.forEach(fav => {
        const item = document.createElement('button');
        item.className = 'dropdown-list-item';
        const serverName = getServers().find(s => s.id === fav.serverId)?.name || 'نامشخص';
        item.innerHTML = `
            <div class="dd-service-name">⭐ ${fav.serviceName}</div>
            <div class="dd-service-meta">
                <span>سرور: ${serverName}</span>
            </div>
        `;
        item.onclick = () => {
            closeFavoritesModal();
            goToFavoriteService(fav);
        };
        container.appendChild(item);
    });

    document.getElementById('favoritesModal').classList.add('show');
}
function closeFavoritesModal() {
    document.getElementById('favoritesModal').classList.remove('show');
}

async function goToFavoriteService(fav) {
    const server = getServers().find(s => s.id === fav.serverId);
    if (!server) {
        showToast('سرور یافت نشد', 'warning');
        return;
    }

    state.server = server;
    state.services = [];
    state.platform = null;
    state.category = null;
    state.service = null;
    state.categoryList = [];

    renderServers();
    document.querySelectorAll('#serverList .chip').forEach(el => {
        if (el.textContent.trim() === server.name) el.classList.add('active');
    });

    document.getElementById('platformSection').style.display = 'block';
    document.getElementById('platformList').innerHTML =
        `<div class="loading-box"><div class="loading-spinner"></div><div class="loading-text">در حال دریافت...</div></div>`;

    try {
        const data = await callAPI(server, { action: 'services' });
        if (!Array.isArray(data)) throw new Error('پاسخ نامعتبر');

        state.services = data;
        const targetService = data.find(s => String(s.service) === String(fav.serviceId));
        if (!targetService) {
            showToast('سرویس یافت نشد', 'warning');
            return;
        }

        const platform = extractPlatformForService(targetService);
        if (platform) {
            state.platform = platform;
            state.category = targetService.category;
        }

        state.service = targetService;
        renderServiceDetails(targetService);
        document.getElementById('orderSection').style.display = 'block';
        document.getElementById('platformSection').style.display = 'none';
        document.getElementById('categorySection').style.display = 'none';
        document.getElementById('serviceSection').style.display = 'none';
        document.getElementById('orderSection').scrollIntoView({ behavior: 'smooth', block: 'start' });

        setTimeout(() => updateStarButtons(), 100);
    } catch (err) {
        showToast(`خطا: ${err.message}`, 'warning');
    }
}

function extractPlatformForService(svc) {
    const text = `${svc.name || ''} ${svc.category || ''}`.toLowerCase();
    for (const [key, p] of Object.entries(PLATFORMS)) {
        if (p.keywords.some(kw => text.includes(kw.toLowerCase()))) return key;
    }
    return null;
}

function updateStarButtons() {
    document.querySelectorAll('.star-btn').forEach(btn => {
        const sid = btn.dataset.serverId;
        const srvid = btn.dataset.serviceId;
        if (isFavorite(sid, srvid)) btn.classList.add('active');
        else btn.classList.remove('active');
    });
}

// ============================================================
// CATEGORY MODAL
// ============================================================
function openCategoryModal() {
    if (!state.categoryList || state.categoryList.length === 0) {
        showToast('دسته‌بندی موجود نیست', 'warning');
        return;
    }
    const container = document.getElementById('categoryListVertical');
    container.innerHTML = '';

    state.categoryList.forEach(cat => {
        const item = document.createElement('button');
        item.className = 'dropdown-list-item';
        item.innerHTML = `<div class="dd-service-name">${cat}</div>`;
        item.onclick = () => {
            selectCategory(cat);
            closeCategoryModal();
        };
        container.appendChild(item);
    });

    document.getElementById('categoryModal').classList.add('show');
}
function closeCategoryModal() {
    document.getElementById('categoryModal').classList.remove('show');
}

// ============================================================
// SERVERS
// ============================================================
function renderServers() {
    const container = document.getElementById('serverList');
    if (!container) return;
    container.innerHTML = '';

    getServers().forEach(server => {
        const chip = document.createElement('button');
        chip.className = 'chip';
        chip.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>${server.name}`;
        chip.onclick = e => selectServer(server, e.target.closest('.chip'));
        container.appendChild(chip);
    });
}

async function selectServer(server, chipEl) {
    state.server = server;
    state.services = [];
    state.platform = null;
    state.category = null;
    state.service = null;
    state.categoryList = [];

    document.querySelectorAll('#serverList .chip').forEach(el => el.classList.remove('active'));
    chipEl.classList.add('active');

    ['platformSection', 'categorySection', 'serviceSection', 'orderSection'].forEach(id => {
        document.getElementById(id).style.display = 'none';
    });

    document.getElementById('platformSection').style.display = 'block';
    document.getElementById('platformList').innerHTML =
        `<div class="loading-box"><div class="loading-spinner"></div><div class="loading-text">در حال دریافت...</div></div>`;

    try {
        const data = await callAPI(server, { action: 'services' });
        if (!Array.isArray(data)) throw new Error('پاسخ نامعتبر');

        state.services = data;
        const platforms = extractPlatforms(data);

        if (platforms.length === 0) {
            document.getElementById('platformList').innerHTML =
                `<div class="msg-box error">پلتفرمی یافت نشد</div>`;
            return;
        }
        renderPlatforms(platforms);
    } catch (err) {
        document.getElementById('platformList').innerHTML =
            `<div class="msg-box error">خطا: ${err.message}</div>`;
    }
}

function extractPlatforms(services) {
    const found = new Set();
    services.forEach(svc => {
        const text = `${svc.name || ''} ${svc.category || ''}`.toLowerCase();
        Object.entries(PLATFORMS).forEach(([key, p]) => {
            if (p.keywords.some(kw => text.includes(kw.toLowerCase()))) found.add(key);
        });
    });
    return Array.from(found);
}

function renderPlatforms(platforms) {
    const container = document.getElementById('platformList');
    container.innerHTML = '';

    platforms.forEach(key => {
        const p = PLATFORMS[key];
        if (!p) return;
        const chip = document.createElement('button');
        chip.className = 'chip';
        chip.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>${p.name}`;
        chip.onclick = e => selectPlatform(key, e.target.closest('.chip'));
        container.appendChild(chip);
    });
}

function selectPlatform(key, chipEl) {
    state.platform = key;
    state.category = null;
    state.service = null;

    document.querySelectorAll('#platformList .chip').forEach(el => el.classList.remove('active'));
    chipEl.classList.add('active');

    ['categorySection', 'serviceSection', 'orderSection'].forEach(id => {
        document.getElementById(id).style.display = 'none';
    });

    const p = PLATFORMS[key];
    const filtered = state.services.filter(svc => {
        const text = `${svc.name || ''} ${svc.category || ''}`.toLowerCase();
        return p.keywords.some(kw => text.includes(kw.toLowerCase()));
    });

    const cats = [...new Set(filtered.map(s => s.category).filter(Boolean))];
    state.categoryList = cats;

    if (cats.length === 0) {
        showToast('دسته‌بندی یافت نشد', 'warning');
        return;
    }

    document.getElementById('selectedCategoryText').textContent = 'انتخاب دسته‌بندی (' + cats.length + ')';
    document.getElementById('categorySection').style.display = 'block';
    document.getElementById('categorySection').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function selectCategory(cat) {
    state.category = cat;
    state.service = null;
    document.getElementById('selectedCategoryText').textContent = cat;
    document.getElementById('serviceSection').style.display = 'none';
    document.getElementById('orderSection').style.display = 'none';

    const filtered = state.services.filter(s => s.category === cat);
    renderServices(filtered);

    document.getElementById('serviceSection').style.display = 'block';
    setTimeout(() =>
        document.getElementById('serviceSection').scrollIntoView({ behavior: 'smooth', block: 'start' }),
        200
    );
}

function renderServices(services) {
    const container = document.getElementById('serviceList');
    container.innerHTML = '';

    if (services.length === 0) {
        container.innerHTML = `<div class="msg-box error">سرویسی یافت نشد</div>`;
        return;
    }

    services.forEach(svc => {
        const finalRate = calculateFinalRate(svc.rate);
        const isCustom = isCustomCommentsService(svc);
        const isFav = isFavorite(state.server.id, svc.service);

        const wrapper = document.createElement('div');
        wrapper.className = 'service-item-wrapper';
        wrapper.innerHTML = `
            <button class="service-item" data-service-id="${svc.service}">
                ${isCustom ? '<div class="custom-comment-badge">💬 کامنت دلخواه</div>' : ''}
                <div class="service-name">${svc.name || 'بدون نام'}</div>
                <div class="service-meta">
                    <div class="service-price">${formatToman(finalRate)} <small>تومان / هر ۱۰۰۰</small></div>
                    <div class="service-range">${formatToman(svc.min || 0)} - ${formatToman(svc.max || 0)}</div>
                </div>
            </button>
            <button class="star-btn ${isFav ? 'active' : ''}" data-server-id="${state.server.id}" data-service-id="${svc.service}" title="افزودن به منتخب‌ها"></button>
        `;
        wrapper.querySelector('.service-item').onclick = e => selectService(svc, wrapper.querySelector('.service-item'));
        wrapper.querySelector('.star-btn').onclick = e => toggleFavorite(state.server.id, svc.service, svc.name, e);
        container.appendChild(wrapper);
    });

    updateStarButtons();
}

function selectService(svc, itemEl) {
    state.service = svc;
    document.querySelectorAll('#serviceList .service-item').forEach(el => el.classList.remove('active'));
    itemEl.classList.add('active');
    renderServiceDetails(svc);
    document.getElementById('orderSection').style.display = 'block';
    setTimeout(() =>
        document.getElementById('orderSection').scrollIntoView({ behavior: 'smooth', block: 'start' }),
        200
    );
}

function renderServiceDetails(svc) {
    const container = document.getElementById('serviceDetails');
    const min = parseInt(svc.min || 0);
    const max = parseInt(svc.max || 0);
    const finalRate = calculateFinalRate(svc.rate);
    const isCustom = isCustomCommentsService(svc);

    if (isCustom) {
        container.innerHTML = `
            <div class="detail-title">${svc.name || 'بدون نام'} <span style="background: linear-gradient(135deg, var(--purple), var(--pink)); color: white; font-size: 10px; padding: 3px 8px; border-radius: 8px; margin-right: 8px;">💬 کامنت دلخواه</span></div>
            ${svc.desc ? `<div class="detail-desc"><strong style="color: var(--cyan);">توضیحات: </strong>${svc.desc}</div>` : ''}
            <div class="detail-info-grid">
                <div class="detail-info-item"><div class="detail-info-label">💰 قیمت هر کامنت</div><div class="detail-info-value">${formatToman(finalRate / 1000)} <small>تومان</small></div></div>
                <div class="detail-info-item"><div class="detail-info-label">📊 حداقل کامنت</div><div class="detail-info-value">${formatToman(min)}</div></div>
                <div class="detail-info-item"><div class="detail-info-label">📈 حداکثر کامنت</div><div class="detail-info-value">${formatToman(max)}</div></div>
                <div class="detail-info-item"><div class="detail-info-label">🆔 شناسه</div><div class="detail-info-value">#${svc.service}</div></div>
            </div>
            <div class="field">
                <label class="field-label"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg> لینک هدف</label>
                <input type="text" class="field-input" id="linkInput" placeholder="لینک پست یا پیج">
            </div>
            <div class="field">
                <div class="comments-header">
                    <span style="color: var(--purple); display:flex;align-items:center;gap:6px;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                        کامنت‌های شما
                    </span>
                    <span>تعداد: <span class="count" id="commentsCount">0</span></span>
                </div>
                <textarea class="comments-textarea" id="commentsTextarea" placeholder="هر خط یک کامنت محسوب می‌شود...&#10;سلام&#10;عالی بود&#10;خیلی خوب" oninput="updateCommentsCount()"></textarea>
                <div class="field-hint">
                    <span>حداقل: ${formatToman(min)} کامنت</span>
                    <span>حداکثر: ${formatToman(max)} کامنت</span>
                </div>
            </div>
            <div class="price-calc">
                <div class="price-calc-label">💰 هزینه نهایی:</div>
                <div class="price-calc-value"><span id="totalPrice">۰</span><small>تومان</small></div>
            </div>
            <button class="submit-btn" id="submitBtn" onclick="submitCustomCommentOrder()">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
                ثبت سفارش کامنت
            </button>
            <div id="orderMsg"></div>
        `;
    } else {
        container.innerHTML = `
            <div class="detail-title">${svc.name || 'بدون نام'}</div>
            ${svc.desc ? `<div class="detail-desc"><strong style="color: var(--cyan);">توضیحات: </strong>${svc.desc}</div>` : ''}
            <div class="detail-info-grid">
                <div class="detail-info-item"><div class="detail-info-label">💰 قیمت هر ۱۰۰۰</div><div class="detail-info-value">${formatToman(finalRate)} <small>تومان</small></div></div>
                <div class="detail-info-item"><div class="detail-info-label">📊 حداقل</div><div class="detail-info-value">${formatToman(min)}</div></div>
                <div class="detail-info-item"><div class="detail-info-label">📈 حداکثر</div><div class="detail-info-value">${formatToman(max)}</div></div>
                <div class="detail-info-item"><div class="detail-info-label">🆔 شناسه</div><div class="detail-info-value">#${svc.service}</div></div>
            </div>
            <div class="field">
                <label class="field-label"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg> لینک هدف</label>
                <input type="text" class="field-input" id="linkInput" placeholder="لینک پست یا پیج" oninput="updatePrice()">
            </div>
            <div class="field">
                <label class="field-label"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" /></svg> تعداد سفارش</label>
                <input type="number" class="field-input" id="quantityInput" placeholder="مثلاً 1000" min="${min}" max="${max}" oninput="updatePrice()">
                <div class="field-hint"><span>حداقل: ${formatToman(min)}</span><span>حداکثر: ${formatToman(max)}</span></div>
            </div>
            <div class="price-calc">
                <div class="price-calc-label">💰 هزینه نهایی:</div>
                <div class="price-calc-value"><span id="totalPrice">۰</span><small>تومان</small></div>
            </div>
            <button class="submit-btn" id="submitBtn" onclick="submitOrder()">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
                ثبت سفارش
            </button>
            <div id="orderMsg"></div>
        `;
    }
}

function updatePrice() {
    if (!state.service) return;
    const qty = parseInt(document.getElementById('quantityInput').value) || 0;
    const finalRate = calculateFinalRate(state.service.rate);
    const total = (finalRate / 1000) * qty;
    const el = document.getElementById('totalPrice');
    if (el) el.textContent = formatToman(total);
    state.quantity = qty;
}

function updateCommentsCount() {
    const textarea = document.getElementById('commentsTextarea');
    if (!textarea) return;
    const text = textarea.value;
    const lines = text.split('\n').filter(l => l.trim().length > 0);
    state.commentsCount = lines.length;
    state.commentsText = text;

    const cc = document.getElementById('commentsCount');
    if (cc) cc.textContent = lines.length.toLocaleString('fa-IR');

    if (state.service) {
        const finalRate = calculateFinalRate(state.service.rate);
        const total = (finalRate / 1000) * lines.length;
        const el = document.getElementById('totalPrice');
        if (el) el.textContent = formatToman(total);
    }
}

// ============================================================
// FIX #4 & #5 — SUBMIT CUSTOM COMMENT ORDER
// ============================================================
async function submitCustomCommentOrder() {
    const linkInput = document.getElementById('linkInput');
    const textarea  = document.getElementById('commentsTextarea');
    const msgBox    = document.getElementById('orderMsg');
    const submitBtn = document.getElementById('submitBtn');

    const link = linkInput.value.trim();
    const text = textarea.value.trim();
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    const count = lines.length;

    if (!link) { showMsg('orderMsg', 'error', '⚠️ لینک را وارد کنید'); return; }
    if (count === 0) { showMsg('orderMsg', 'error', '⚠️ لطفاً حداقل یک کامنت بنویسید'); return; }

    const min = parseInt(state.service.min) || 0;
    const max = parseInt(state.service.max) || 0;
    if (count < min) { showMsg('orderMsg', 'error', `⚠️ حداقل باید ${formatToman(min)} کامنت بنویسید`); return; }
    if (count > max) { showMsg('orderMsg', 'error', `⚠️ حداکثر ${formatToman(max)} کامنت مجاز است`); return; }

    const finalRate = calculateFinalRate(state.service.rate);
    const cost = Math.round((finalRate / 1000) * count);
    const wallet = getWallet();

    // FIX #4 — موجودی کاربر کم است → نوتیفیکیشن از بالا
    if (wallet < cost) {
        showUserBalanceError('orderMsg', wallet, cost);
        return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = `<div class="loading-spinner" style="width:18px;height:18px;border-width:2px;"></div> در حال ثبت...`;
    msgBox.innerHTML = '';

    try {
        const result = await callAPI(state.server, {
            action: 'add',
            service: state.service.service,
            link: link,
            comments: text
        });

        if (result.error) {
            const errorText = (result.error || '').toLowerCase();
            const isBalanceError = errorText.includes('balance') || errorText.includes('not enough') || errorText.includes('insufficient') || errorText.includes('موجودی') || errorText.includes('credit') || errorText.includes('fund');

            // FIX #5 — موجودی سرور کم است → نوتیفیکیشن از بالا
            if (isBalanceError) {
                showServerBalanceError('orderMsg', state.server.name);

                const { date, time } = getPersianDateTime();
                const email = store.get('vex_email', 'نامشخص');
                const phone = store.get('vex_phone', 'نامشخص');
                await sendNotification(
                    `🚨 خطای موجودی سرور!\n` +
                    `📧 کاربر: ${email}\n` +
                    `📱 شماره: ${phone}\n` +
                    `🌐 سرور: ${state.server.name}\n` +
                    `📦 سرویس: ${state.service.name}\n` +
                    `💵 نیاز: ${formatToman(cost)} تومان\n` +
                    `❌ خطا: ${result.error}\n` +
                    `📅 ${date}\n` +
                    `🕐 ${time}\n\n` +
                    `⚠️ لطفاً ادمین موجودی این سرور را شارژ کند!`
                );
            } else {
                showMsg('orderMsg', 'error', `❌ ${result.error}`);
            }
            return;
        }

        if (result.status === 'success' || result.order) {
            const { date, time } = getPersianDateTime();
            setWallet(wallet - cost);
            saveOrder({
                orderId: result.order,
                serverId: state.server.id,
                serverName: state.server.name,
                serverUrl: state.server.url,
                serverKey: state.server.key,
                serviceId: state.service.service,
                serviceName: state.service.name,
                link,
                quantity: count,
                comments: text,
                isCustomComment: true,
                rate: state.service.rate,
                finalRate: finalRate,
                totalPrice: cost,
                date, time,
                status: 'pending',
                createdAt: Date.now()
            });

            const email = store.get('vex_email', 'نامشخص');
            await sendNotification(
                `🛒 سفارش کامنت دلخواه\n` +
                `📧 ایمیل: ${email}\n` +
                `🌐 سرور: ${state.server.name}\n` +
                `📦 سرویس: ${state.service.name}\n` +
                `🔗 ${link}\n` +
                `💬 تعداد کامنت: ${formatToman(count)}\n` +
                `💰 هزینه: ${formatToman(cost)} تومان\n` +
                `🆔 کد: ${result.order}\n` +
                `📅 ${date}\n` +
                `🕐 ${time}`
            );

            showMsg('orderMsg', 'success', `✅ سفارش ثبت شد - کد: ${result.order}`);
            linkInput.value = '';
            textarea.value = '';
            document.getElementById('totalPrice').textContent = '۰';
            document.getElementById('commentsCount').textContent = '0';
            showToast(`سفارش ثبت شد`, 'success');
        } else {
            showMsg('orderMsg', 'error', '❌ خطا در ثبت سفارش');
        }
    } catch (err) {
        showMsg('orderMsg', 'error', `❌ خطا: ${err.message}`);
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg> ثبت سفارش کامنت`;
    }
}

// ============================================================
// FIX #4 & #5 — SUBMIT REGULAR ORDER
// ============================================================
async function submitOrder() {
    const linkInput = document.getElementById('linkInput');
    const qtyInput  = document.getElementById('quantityInput');
    const msgBox    = document.getElementById('orderMsg');
    const submitBtn = document.getElementById('submitBtn');

    const link = linkInput.value.trim();
    const quantity = parseInt(qtyInput.value) || 0;

    if (!link) { showMsg('orderMsg', 'error', '⚠️ لینک را وارد کنید'); return; }
    if (!quantity) { showMsg('orderMsg', 'error', '⚠️ تعداد را وارد کنید'); return; }

    const min = parseInt(state.service.min) || 0;
    const max = parseInt(state.service.max) || 0;
    if (quantity < min) { showMsg('orderMsg', 'error', `⚠️ حداقل ${formatToman(min)}`); return; }
    if (quantity > max) { showMsg('orderMsg', 'error', `⚠️ حداکثر ${formatToman(max)}`); return; }

    const finalRate = calculateFinalRate(state.service.rate);
    const cost = Math.round((finalRate / 1000) * quantity);
    const wallet = getWallet();

    // FIX #4 — موجودی کاربر کم است → نوتیفیکیشن از بالا
    if (wallet < cost) {
        showUserBalanceError('orderMsg', wallet, cost);
        return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = `<div class="loading-spinner" style="width:18px;height:18px;border-width:2px;"></div> در حال ثبت...`;
    msgBox.innerHTML = '';

    try {
        const result = await callAPI(state.server, {
            action: 'add',
            service: state.service.service,
            link,
            quantity
        });

        if (result.error) {
            const errorText = (result.error || '').toLowerCase();
            const isBalanceError = errorText.includes('balance') || errorText.includes('not enough') || errorText.includes('insufficient') || errorText.includes('موجودی') || errorText.includes('credit') || errorText.includes('fund');

            // FIX #5 — موجودی سرور کم است → نوتیفیکیشن از بالا
            if (isBalanceError) {
                showServerBalanceError('orderMsg', state.server.name);

                const { date, time } = getPersianDateTime();
                const email = store.get('vex_email', 'نامشخص');
                const phone = store.get('vex_phone', 'نامشخص');
                await sendNotification(
                    `🚨 خطای موجودی سرور!\n` +
                    `📧 کاربر: ${email}\n` +
                    `📱 شماره: ${phone}\n` +
                    `🌐 سرور: ${state.server.name}\n` +
                    `📦 سرویس: ${state.service.name}\n` +
                    `💵 نیاز: ${formatToman(cost)} تومان\n` +
                    `❌ خطا: ${result.error}\n` +
                    `📅 ${date}\n` +
                    `🕐 ${time}\n\n` +
                    `⚠️ لطفاً ادمین موجودی این سرور را شارژ کند!`
                );
            } else {
                showMsg('orderMsg', 'error', `❌ ${result.error}`);
            }
            return;
        }

        if (result.status === 'success' || result.order) {
            const { date, time } = getPersianDateTime();
            setWallet(wallet - cost);
            saveOrder({
                orderId: result.order,
                serverId: state.server.id,
                serverName: state.server.name,
                serverUrl: state.server.url,
                serverKey: state.server.key,
                serviceId: state.service.service,
                serviceName: state.service.name,
                link, quantity,
                rate: state.service.rate,
                finalRate: finalRate,
                totalPrice: cost,
                date, time,
                status: 'pending',
                createdAt: Date.now()
            });

            const email = store.get('vex_email', 'نامشخص');
            await sendNotification(
                `🛒 سفارش جدید\n` +
                `📧 ایمیل: ${email}\n` +
                `🌐 سرور: ${state.server.name}\n` +
                `📦 سرویس: ${state.service.name}\n` +
                `🔗 ${link}\n` +
                `📊 تعداد: ${formatToman(quantity)}\n` +
                `💰 هزینه: ${formatToman(cost)} تومان\n` +
                `🆔 کد: ${result.order}\n` +
                `📅 ${date}\n` +
                `🕐 ${time}`
            );

            showMsg('orderMsg', 'success', `✅ سفارش ثبت شد - کد: ${result.order}`);
            linkInput.value = '';
            qtyInput.value = '';
            document.getElementById('totalPrice').textContent = '۰';
            showToast(`سفارش ثبت شد`, 'success');
        } else {
            showMsg('orderMsg', 'error', '❌ خطا در ثبت سفارش');
        }
    } catch (err) {
        showMsg('orderMsg', 'error', `❌ خطا: ${err.message}`);
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg> ثبت سفارش`;
    }
}

function showMsg(id, type, text) {
    const el = document.getElementById(id);
    if (!el) return;
    const icons = {
        error:   '<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />',
        success: '<path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />',
        info:    '<path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />',
        warning: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />'
    };
    el.innerHTML = `<div class="msg-box ${type}"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">${icons[type] || icons.info}</svg>${text}</div>`;
}

// ============================================================
// FIX #2 — ORDER STATUS HELPERS
// ============================================================
function normalizeStatus(rawStatus) {
    const s = String(rawStatus || '').toLowerCase().trim();
    if (s === 'completed' || s === 'complete' || s === 'approved') return 'completed';
    if (s === 'canceled' || s === 'cancelled' || s === 'rejected' || s === 'fail' || s === 'failed') return 'canceled';
    if (s === 'in progress' || s === 'inprogress' || s === 'in_progress' || s === 'processing') return 'processing';
    if (s === 'pending' || s === 'awaiting' || s === 'waiting') return 'pending';
    if (s === 'partial') return 'processing';
    return 'pending';
}

function getStatusEmoji(status) {
    const s = normalizeStatus(status);
    if (s === 'completed') return '🟢';
    if (s === 'canceled')  return '🔴';
    if (s === 'processing') return '🔵';
    return '🟡';
}

function getStatusClass(status) {
    const s = normalizeStatus(status);
    if (s === 'completed') return 'completed';
    if (s === 'canceled')  return 'canceled';
    if (s === 'processing') return 'processing';
    return 'pending';
}

function getStatusLabel(status) {
    const s = normalizeStatus(status);
    if (s === 'completed')  return '✅ تایید شده';
    if (s === 'canceled')   return '❌ لغو شده';
    if (s === 'processing') return '⚙️ در حال انجام';
    return '⏱️ در حال انتظار';
}

function getStatusBorderColor(status) {
    const s = normalizeStatus(status);
    if (s === 'completed')  return 'linear-gradient(180deg, #10b981, #059669)';
    if (s === 'canceled')   return 'linear-gradient(180deg, #ef4444, #dc2626)';
    if (s === 'processing') return 'linear-gradient(180deg, #00e5ff, #0ea5e9)';
    return 'linear-gradient(180deg, #fbbf24, #f59e0b)';
}

// ============================================================
// FIX #2 — Bulk & Single Status Fetch
// ============================================================
async function fetchBulkStatuses(server, orderIds) {
    if (!orderIds || orderIds.length === 0) return {};

    try {
        const result = await callAPI(server, {
            action: 'status',
            orders: orderIds.join(',')
        });

        if (!result || typeof result !== 'object') return {};

        const statuses = {};
        Object.keys(result).forEach(key => {
            const item = result[key];
            if (item && typeof item === 'object' && item.status) {
                statuses[key] = {
                    status: item.status,
                    charge: item.charge,
                    start_count: item.start_count,
                    remains: item.remains,
                    order: item.order || key
                };
            } else if (typeof item === 'string') {
                statuses[key] = { status: 'unknown', error: item };
            }
        });
        return statuses;
    } catch (err) {
        console.warn('bulk status failed:', err.message);
        return {};
    }
}

async function fetchSingleStatus(server, orderId) {
    try {
        const result = await callAPI(server, {
            action: 'status',
            order: orderId
        });
        if (result && result.status) {
            return {
                status: result.status,
                charge: result.charge,
                start_count: result.start_count,
                remains: result.remains,
                order: result.order || orderId
            };
        }
        return null;
    } catch (err) {
        console.warn('single status failed:', err.message);
        return null;
    }
}

// ============================================================
// FIX #2 — RENDER ORDERS
// ============================================================
function renderOrders() {
    const container = document.getElementById('ordersList');
    const orders = getOrders();

    if (orders.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h3>هنوز سفارشی ثبت نکرده‌اید</h3>
                <p>از بخش سفارش جدید اولین سفارش خود را ثبت کنید</p>
            </div>
        `;
        return;
    }

    container.innerHTML = '';

    const socialOrders = orders.filter(o => !o.isVpn);
    if (socialOrders.length > 0) {
        const refreshAllBar = document.createElement('div');
        refreshAllBar.className = 'refresh-all-bar';
        refreshAllBar.innerHTML = `
            <div class="refresh-all-text">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                وضعیت ${socialOrders.length} سفارش سوشال به‌صورت خودکار بروزرسانی می‌شود
            </div>
            <button class="refresh-all-btn" onclick="refreshAllOrdersStatuses()" id="refreshAllBtn">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                بروزرسانی همه
            </button>
        `;
        container.appendChild(refreshAllBar);
    }

    orders.forEach(order => {
        const card = document.createElement('div');
        card.className = 'order-card' + (order.isVpn ? ' vpn-order' : '');
        card.dataset.orderId = order.orderId;

        if (order.isVpn) {
            card.innerHTML = `
                <div class="order-top">
                    <div class="order-service-name">
                        🔐 ${order.vpnServiceName || 'VPN'}
                        <span class="vpn-tag">VPN</span>
                    </div>
                </div>
                <div class="order-info-grid">
                    <div class="order-info-item"><span class="order-info-label">🌐 سرویس:</span><span class="order-info-value">${order.vpnService === 'openvpn' ? 'OpenVPN' : 'V2Ray'}</span></div>
                    <div class="order-info-item"><span class="order-info-label">👤 نوع:</span><span class="order-info-value">${order.vpnUserTypeText || '-'}</span></div>
                    <div class="order-info-item"><span class="order-info-label">📦 حجم:</span><span class="order-info-value">${order.vpnVolumeText || '-'}</span></div>
                    <div class="order-info-item"><span class="order-info-label">💰 مبلغ:</span><span class="order-info-value price">${formatToman(order.totalPrice)} تومان</span></div>
                    <div class="order-info-item"><span class="order-info-label">📅 تاریخ:</span><span class="order-info-value">${order.date}</span></div>
                    <div class="order-info-item"><span class="order-info-label">🕐 ساعت:</span><span class="order-info-value">${order.time}</span></div>
                </div>
            `;
        } else {
            const currentStatus = state.orderStatusCache[order.orderId]?.status || order.status || 'pending';
            const statusClass = getStatusClass(currentStatus);
            const statusEmoji = getStatusEmoji(currentStatus);
            const statusLabel = getStatusLabel(currentStatus);
            const borderColor = getStatusBorderColor(currentStatus);

            card.style.setProperty('--status-border', borderColor);

            card.innerHTML = `
                <div class="order-top">
                    <div class="order-service-name">
                        <span class="status-emoji">${statusEmoji}</span>
                        ${order.serviceName}
                        ${order.isCustomComment ? '<span class="custom-comment-tag">💬 کامنت</span>' : ''}
                    </div>
                    <button class="order-refresh-btn" data-order-id="${order.orderId}" title="بروزرسانی وضعیت">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                    </button>
                </div>

                <div class="order-status-banner ${statusClass}" id="status-banner-${order.orderId}">
                    <span class="status-banner-emoji">${statusEmoji}</span>
                    <span class="status-banner-label">${statusLabel}</span>
                    <span class="status-banner-loading" id="status-loading-${order.orderId}" style="display:none;">
                        <span class="mini-spinner"></span>
                    </span>
                </div>

                <div class="order-info-grid">
                    <div class="order-info-item"><span class="order-info-label">🆔 کد:</span><span class="order-info-value">${order.orderId}</span></div>
                    <div class="order-info-item"><span class="order-info-label">🌐 سرور:</span><span class="order-info-value">${order.serverName}</span></div>
                    <div class="order-info-item"><span class="order-info-label">📊 تعداد:</span><span class="order-info-value">${formatToman(order.quantity)}</span></div>
                    <div class="order-info-item"><span class="order-info-label">💰 هزینه:</span><span class="order-info-value price">${formatToman(order.totalPrice)} تومان</span></div>
                    <div class="order-info-item"><span class="order-info-label">📅 تاریخ:</span><span class="order-info-value">${order.date}</span></div>
                    <div class="order-info-item"><span class="order-info-label">🕐 ساعت:</span><span class="order-info-value">${order.time}</span></div>
                    <div class="order-info-item" style="grid-column: 1 / -1;"><span class="order-info-label">🔗 لینک:</span><span class="order-info-value link">${order.link}</span></div>

                    <div class="order-info-item status-extra" id="status-extra-start-${order.orderId}" style="display:none;">
                        <span class="order-info-label">🚀 شروع شده:</span>
                        <span class="order-info-value" id="status-start-${order.orderId}">—</span>
                    </div>
                    <div class="order-info-item status-extra" id="status-extra-remains-${order.orderId}" style="display:none;">
                        <span class="order-info-label">📉 باقی‌مانده:</span>
                        <span class="order-info-value" id="status-remains-${order.orderId}">—</span>
                    </div>
                </div>
            `;
        }
        container.appendChild(card);
    });

    document.querySelectorAll('.order-refresh-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            refreshSingleOrderStatus(btn.dataset.orderId);
        });
    });

    autoFetchAllStatuses();
}

// ============================================================
// FIX #2 — AUTO FETCH ALL
// ============================================================
async function autoFetchAllStatuses() {
    if (state._statusFetchingInProgress) return;
    state._statusFetchingInProgress = true;

    try {
        const orders = getOrders().filter(o => !o.isVpn);
        if (orders.length === 0) return;

        const byServer = {};
        orders.forEach(o => {
            if (!byServer[o.serverId]) byServer[o.serverId] = [];
            byServer[o.serverId].push(o);
        });

        for (const [serverId, serverOrders] of Object.entries(byServer)) {
            const server = getServers().find(s => s.id === serverId);
            if (!server) continue;

            const orderIds = serverOrders.map(o => o.orderId);

            orderIds.forEach(id => showStatusLoading(id, true));

            const statuses = await fetchBulkStatuses(server, orderIds);

            orderIds.forEach(id => {
                const statusData = statuses[id];
                if (statusData && statusData.status) {
                    updateOrderStatusUI(id, statusData);
                } else {
                    showStatusLoading(id, false);
                }
            });
        }
    } finally {
        state._statusFetchingInProgress = false;
    }
}

// ============================================================
// FIX #2 — REFRESH ALL
// ============================================================
async function refreshAllOrdersStatuses() {
    const btn = document.getElementById('refreshAllBtn');
    if (btn) {
        btn.disabled = true;
        btn.classList.add('spinning');
    }

    const orders = getOrders().filter(o => !o.isVpn);
    orders.forEach(o => {
        if (state.orderStatusCache[o.orderId]) {
            delete state.orderStatusCache[o.orderId];
        }
    });

    await autoFetchAllStatuses();

    if (btn) {
        btn.disabled = false;
        btn.classList.remove('spinning');
    }

    showToast('وضعیت همه سفارشات بروزرسانی شد', 'success');
}

// ============================================================
// FIX #2 — REFRESH SINGLE
// ============================================================
async function refreshSingleOrderStatus(orderId) {
    const orders = getOrders();
    const order = orders.find(o => o.orderId === orderId);
    if (!order || order.isVpn) return;

    const server = getServers().find(s => s.id === order.serverId);
    if (!server) return;

    showStatusLoading(orderId, true);

    const statusData = await fetchSingleStatus(server, orderId);

    if (statusData) {
        updateOrderStatusUI(orderId, statusData);
        showToast('وضعیت سفارش بروزرسانی شد', 'success');
    } else {
        showStatusLoading(orderId, false);
        showToast('خطا در دریافت وضعیت', 'warning');
    }
}

// ============================================================
// FIX #2 — UI HELPERS
// ============================================================
function showStatusLoading(orderId, show) {
    const loadingEl = document.getElementById(`status-loading-${orderId}`);
    if (loadingEl) {
        loadingEl.style.display = show ? 'inline-flex' : 'none';
    }
}

function updateOrderStatusUI(orderId, statusData) {
    const rawStatus = statusData.status;
    const statusClass = getStatusClass(rawStatus);
    const statusEmoji = getStatusEmoji(rawStatus);
    const statusLabel = getStatusLabel(rawStatus);
    const borderColor = getStatusBorderColor(rawStatus);

    state.orderStatusCache[orderId] = {
        status: normalizeStatus(rawStatus),
        rawStatus,
        charge: statusData.charge,
        start_count: statusData.start_count,
        remains: statusData.remains,
        fetchedAt: Date.now()
    };

    updateOrder(orderId, {
        status: normalizeStatus(rawStatus),
        statusRaw: rawStatus,
        lastChecked: Date.now()
    });

    const banner = document.getElementById(`status-banner-${orderId}`);
    if (banner) {
        banner.className = `order-status-banner ${statusClass}`;
        banner.innerHTML = `
            <span class="status-banner-emoji">${statusEmoji}</span>
            <span class="status-banner-label">${statusLabel}</span>
            <span class="status-banner-loading" id="status-loading-${orderId}" style="display:none;">
                <span class="mini-spinner"></span>
            </span>
        `;
    }

    const card = document.querySelector(`.order-card[data-order-id="${orderId}"]`);
    if (card) {
        card.style.setProperty('--status-border', borderColor);

        const emojiEl = card.querySelector('.order-service-name .status-emoji');
        if (emojiEl) emojiEl.textContent = statusEmoji;
    }

    const startEl = document.getElementById(`status-start-${orderId}`);
    const remainsEl = document.getElementById(`status-remains-${orderId}`);
    const startWrap = document.getElementById(`status-extra-start-${orderId}`);
    const remainsWrap = document.getElementById(`status-extra-remains-${orderId}`);

    if (statusData.start_count && statusData.start_count !== '0' && startEl && startWrap) {
        startEl.textContent = formatToman(parseInt(statusData.start_count) || 0);
        startWrap.style.display = 'flex';
    }
    if (statusData.remains && statusData.remains !== '0' && remainsEl && remainsWrap) {
        remainsEl.textContent = formatToman(parseInt(statusData.remains) || 0);
        remainsWrap.style.display = 'flex';
    }

    if (statusClass === 'completed' || statusClass === 'canceled') {
        const refreshBtn = card?.querySelector('.order-refresh-btn');
        if (refreshBtn) {
            refreshBtn.classList.add('done');
        }
    }
}

// ============================================================
// FIX #2 — STATUS MODAL
// ============================================================
function openOrderStatusModal(orderId) {
    const orders = getOrders();
    const order = orders.find(o => o.orderId === orderId);
    if (!order) return;

    const cached = state.orderStatusCache[orderId];
    const statusRaw = cached?.rawStatus || order.statusRaw || order.status || 'pending';

    const modal = document.getElementById('orderStatusModal');
    if (!modal) return;

    const content = document.getElementById('orderStatusModalContent');
    if (content) {
        content.innerHTML = buildStatusModalContent(order, statusRaw, cached);
    }

    modal.classList.add('show');

    if (!order.isVpn) {
        refreshSingleOrderStatus(orderId).then(() => {
            const newCached = state.orderStatusCache[orderId];
            if (newCached && content) {
                content.innerHTML = buildStatusModalContent(
                    order,
                    newCached.rawStatus,
                    newCached
                );
            }
        });
    }
}

function buildStatusModalContent(order, rawStatus, data) {
    const statusClass = getStatusClass(rawStatus);
    const statusLabel = getStatusLabel(rawStatus);

    const icons = {
        completed: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
        pending:   `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
        canceled:  `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
        processing:`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>`
    };

    const subtitles = {
        completed: 'سفارش شما با موفقیت تکمیل و تحویل داده شد.',
        pending:   'سفارش در صف بررسی قرار دارد. کمی صبر کنید.',
        canceled:  'سفارش شما لغو یا رد شده است.',
        processing:'سفارش در حال پردازش است. فرایند به‌زودی تکمیل می‌شود.'
    };

    const startCount = data?.start_count && data.start_count !== '0' ? formatToman(parseInt(data.start_count)) : '—';
    const remains = data?.remains && data.remains !== '0' ? formatToman(parseInt(data.remains)) : '—';

    return `
        <div class="status-modal-icon ${statusClass}">${icons[statusClass]}</div>
        <div class="status-modal-title ${statusClass}">${statusLabel}</div>
        <div class="status-modal-sub">${subtitles[statusClass]}</div>

        <div class="tracking-code-box">
            <div class="tracking-code-label">🆔 کد پیگیری سفارش</div>
            <div class="tracking-code-value" id="trackingCodeValue">${order.orderId}</div>
            <button class="tracking-copy-btn" onclick="copyTrackingCode('${order.orderId}')">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                کپی کد
            </button>
        </div>

        <div class="status-modal-info">
            <div class="status-modal-info-row">
                <span class="status-modal-info-label">📦 سرویس</span>
                <span class="status-modal-info-value">${order.serviceName}</span>
            </div>
            <div class="status-modal-info-row">
                <span class="status-modal-info-label">📊 تعداد</span>
                <span class="status-modal-info-value">${formatToman(order.quantity)}</span>
            </div>
            <div class="status-modal-info-row">
                <span class="status-modal-info-label">💰 هزینه</span>
                <span class="status-modal-info-value">${formatToman(order.totalPrice)} تومان</span>
            </div>
            <div class="status-modal-info-row">
                <span class="status-modal-info-label">🚀 شروع شده</span>
                <span class="status-modal-info-value">${startCount}</span>
            </div>
            <div class="status-modal-info-row">
                <span class="status-modal-info-label">📉 باقی‌مانده</span>
                <span class="status-modal-info-value">${remains}</span>
            </div>
            <div class="status-modal-info-row">
                <span class="status-modal-info-label">📅 تاریخ</span>
                <span class="status-modal-info-value">${order.date} — ${order.time}</span>
            </div>
        </div>
    `;
}

function closeOrderStatusModal() {
    const modal = document.getElementById('orderStatusModal');
    if (modal) modal.classList.remove('show');
}

function copyTrackingCode(code) {
    navigator.clipboard.writeText(code).then(() => {
        const el = document.getElementById('trackingCodeValue');
        if (el) {
            const old = el.textContent;
            el.textContent = '✅ کپی شد';
            setTimeout(() => el.textContent = old, 1500);
        }
        showToast('کد پیگیری کپی شد', 'success');
    }).catch(() => {
        showToast('خطا در کپی', 'warning');
    });
}

async function refreshOrderStatus(orderId) {
    refreshSingleOrderStatus(orderId);
}

function clearOrdersHistory() {
    if (!confirm('پاک کردن تاریخچه سفارشات؟')) return;
    store.set('vex_orders', []);
    renderOrders();
    renderChart();
}

// ============================================================
// VPN SERVICE SELECTION
// ============================================================
function selectVpnService(service, el) {
    state.vpnService = service;
    state.vpnUserType = null;
    state.vpnVolume = null;
    state.vpnPrice = 0;

    document.querySelectorAll('#vpnServiceList .chip').forEach(c => c.classList.remove('active'));
    el.classList.add('active');

    document.getElementById('vpnUserSection').style.display = 'block';
    document.getElementById('vpnVolumeSection').style.display = 'none';
    document.getElementById('vpnOrderSection').style.display = 'none';

    document.getElementById('selectedVpnUserText').textContent = 'انتخاب نوع کاربری';

    document.getElementById('vpnUserSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ============================================================
// FIX #6 — گزینه دانلود فایل و آموزش
// ============================================================
function selectVpnGuide(el) {
    // غیرفعال کردن بقیه chip ها
    document.querySelectorAll('#vpnServiceList .chip').forEach(c => c.classList.remove('active'));
    el.classList.add('active');

    // ریست state (چون داریم از حالت خرید خارج می‌شیم)
    state.vpnService = null;
    state.vpnUserType = null;
    state.vpnVolume = null;
    state.vpnPrice = 0;

    // مخفی کردن بخش‌های خرید
    document.getElementById('vpnUserSection').style.display = 'none';
    document.getElementById('vpnVolumeSection').style.display = 'none';

    // نمایش کارت راهنما در بخش vpnServiceDetails
    const container = document.getElementById('vpnServiceDetails');
    if (!container) return;

    container.innerHTML = `
        <div class="guide-card">
            <div class="guide-header">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                📚 راهنمای کامل OpenVPN
            </div>

            <a href="https://t.me/vex_telbot/54" target="_blank" class="guide-item">
                <div class="guide-item-title">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    📥 دانلود فایل OpenVPN
                </div>
                <div class="guide-item-text">
                    کاربر گرامی برای خرید اپن وی پی ان نیاز به این فایل دارید. این فایل در تلگرام هست، لطفاً وی‌پی‌ان خود را روشن کنید.
                </div>
                <span class="guide-item-link">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                    https://t.me/vex_telbot/54
                </span>
            </a>

            <a href="https://t.me/vex_telbot/53" target="_blank" class="guide-item">
                <div class="guide-item-title">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                    📱 آموزش OpenVPN برای اندروید
                </div>
                <div class="guide-item-text">
                    کاربر گرامی جهت آموزش و وارد شدن به حساب OpenVPN خود، به این لینک مراجعه کنید. این لینک در تلگرام هست، لطفاً وی‌پی‌ان خود را روشن کنید.
                </div>
                <span class="guide-item-link">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                    https://t.me/vex_telbot/53
                </span>
            </a>

            <a href="https://t.me/vex_telbot/52" target="_blank" class="guide-item">
                <div class="guide-item-title">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                    📱 آموزش تکمیلی اندروید
                </div>
                <div class="guide-item-text">
                    کاربر گرامی جهت آموزش و وارد شدن به حساب OpenVPN خود، به این لینک مراجعه کنید. این لینک در تلگرام هست، لطفاً وی‌پی‌ان خود را روشن کنید.
                </div>
                <span class="guide-item-link">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                    https://t.me/vex_telbot/52
                </span>
            </a>

            <a href="https://t.me/vex_telbot" target="_blank" class="guide-item">
                <div class="guide-item-title">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    💻 آموزش OpenVPN برای کامپیوتر
                </div>
                <div class="guide-item-text">
                    کاربر گرامی جهت آموزش وارد شدن به حساب OpenVPN خود، به این لینک مراجعه کنید. این لینک در تلگرام هست، لطفاً وی‌پی‌ان خود را روشن کنید.
                </div>
                <span class="guide-item-link">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                    https://t.me/vex_telbot
                </span>
            </a>

            <div class="guide-footer">
                💬 جهت آموزش‌های بیشتر داخل بات <b>@vex_telbot</b> موجود است
            </div>
        </div>
    `;

    document.getElementById('vpnOrderSection').style.display = 'block';
    setTimeout(() =>
        document.getElementById('vpnOrderSection').scrollIntoView({ behavior: 'smooth', block: 'start' }),
        200
    );
}

// ============================================================
// VPN USER MODAL
// ============================================================
function openVpnUserModal() {
    if (!state.vpnService) {
        showToast('ابتدا سرویس را انتخاب کنید', 'warning');
        return;
    }

    const container = document.getElementById('vpnUserListVertical');
    container.innerHTML = '';

    const users = state.vpnService === 'openvpn'
        ? [
            { key: 'single',    name: '👤 تک کاربره' },
            { key: 'multi',     name: '👥 دو کاربره' },
            { key: 'unlimited', name: '♾️ نامحدود' }
        ]
        : [
            { key: 'single',    name: '👤 تک کاربره' },
            { key: 'unlimited', name: '♾️ نامحدود' }
        ];

    users.forEach(u => {
        const item = document.createElement('button');
        item.className = 'dropdown-list-item';
        item.innerHTML = `<div class="dd-service-name">${u.name}</div>`;
        item.onclick = () => {
            selectVpnUser(u.key);
            closeVpnUserModal();
        };
        container.appendChild(item);
    });

    document.getElementById('vpnUserModal').classList.add('show');
}
function closeVpnUserModal() {
    document.getElementById('vpnUserModal').classList.remove('show');
}

function selectVpnUser(userType) {
    state.vpnUserType = userType;
    state.vpnVolume = null;

    let text = '';
    if (userType === 'single')         text = '👤 تک کاربره';
    else if (userType === 'multi')     text = '👥 دو کاربره';
    else if (userType === 'unlimited') text = '♾️ نامحدود';

    document.getElementById('selectedVpnUserText').textContent = text;
    document.getElementById('selectedVpnVolumeText').textContent = 'انتخاب حجم کانفیگ';

    document.getElementById('vpnVolumeSection').style.display = 'block';
    document.getElementById('vpnOrderSection').style.display = 'none';

    document.getElementById('vpnVolumeSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ============================================================
// VPN VOLUME MODAL
// ============================================================
function openVpnVolumeModal() {
    if (!state.vpnService || !state.vpnUserType) {
        showToast('ابتدا سرویس و نوع کاربری را انتخاب کنید', 'warning');
        return;
    }

    const container = document.getElementById('vpnVolumeListVertical');
    container.innerHTML = '';

    let volumes = [];
    const svc = state.vpnService;
    const usr = state.vpnUserType;

    if (usr === 'unlimited') {
        if (svc === 'openvpn') {
            volumes = [
                { key: '1',  name: '♾️ نامحدود - ۱ کاربره' },
                { key: '2',  name: '♾️ نامحدود - ۲ کاربره' },
                { key: '10', name: '♾️ نامحدود - ۱۰ کاربره' }
            ];
        } else {
            volumes = [
                { key: '1', name: '♾️ نامحدود - ۱ کاربره' },
                { key: '2', name: '♾️ نامحدود - ۲ کاربره' }
            ];
        }
    } else {
        if (svc === 'openvpn') {
            volumes = [
                { key: '10', name: '۱۰ گیگ' },
                { key: '15', name: '۱۵ گیگ' },
                { key: '20', name: '۲۰ گیگ' },
                { key: '30', name: '۳۰ گیگ' },
                { key: '40', name: '۴۰ گیگ' },
                { key: '50', name: '۵۰ گیگ' }
            ];
        } else {
            volumes = [
                { key: '10', name: '۱۰ گیگ' },
                { key: '20', name: '۲۰ گیگ' },
                { key: '30', name: '۳۰ گیگ' },
                { key: '40', name: '۴۰ گیگ' },
                { key: '50', name: '۵۰ گیگ' }
            ];
        }
    }

    volumes.forEach(v => {
        const item = document.createElement('button');
        item.className = 'dropdown-list-item';
        item.innerHTML = `<div class="dd-service-name">${v.name}</div>`;
        item.onclick = () => {
            selectVpnVolume(v.key, v.name);
            closeVpnVolumeModal();
        };
        container.appendChild(item);
    });

    document.getElementById('vpnVolumeModal').classList.add('show');
}
function closeVpnVolumeModal() {
    document.getElementById('vpnVolumeModal').classList.remove('show');
}

function selectVpnVolume(volumeKey, volumeName) {
    state.vpnVolume = volumeKey;
    document.getElementById('selectedVpnVolumeText').textContent = volumeName;

    const svc = state.vpnService;
    const usr = state.vpnUserType;
    const pricing = VPN_PRICING[svc];

    let basePrice = 0;

    if (usr === 'unlimited') {
        basePrice = pricing.unlimited[volumeKey] || 0;
    } else {
        const pricingKey = usr === 'single' ? 'single' : 'multi';
        basePrice = pricing[pricingKey] ? pricing[pricingKey][volumeKey] : 0;
    }

    state.vpnPrice = basePrice;

    renderVpnOrderDetails();

    document.getElementById('vpnOrderSection').style.display = 'block';
    setTimeout(() =>
        document.getElementById('vpnOrderSection').scrollIntoView({ behavior: 'smooth', block: 'start' }),
        200
    );
}

// ============================================================
// FIX #1 — RENDER VPN ORDER DETAILS
// ============================================================
function renderVpnOrderDetails() {
    const container = document.getElementById('vpnServiceDetails');
    if (!container) return;

    const svc = state.vpnService;
    const usr = state.vpnUserType;
    const vol = state.vpnVolume;
    const basePrice = state.vpnPrice;

    const { original, final: finalPrice, discount } = getVpnPriceBreakdown(basePrice);
    const discountAmount = original - finalPrice;
    const discountLabel  = getVpnDiscountLabel();

    let serviceName = svc === 'openvpn' ? '🚀 OpenVPN' : '🌀 V2Ray';
    let userTypeName = '';
    if (usr === 'single')         userTypeName = 'تک کاربره';
    else if (usr === 'multi')     userTypeName = 'دو کاربره';
    else if (usr === 'unlimited') userTypeName = 'نامحدود';

    let volumeName = '';
    if (usr === 'unlimited') {
        volumeName = `${vol} کاربره نامحدود`;
    } else {
        volumeName = `${vol} گیگ`;
    }

    const description = VPN_DESCRIPTIONS[svc] || '';

    const priceBlockHtml = `
        <div class="price-calc" style="border-color: rgba(16,185,129,0.5); flex-direction: column; align-items: stretch; gap: 10px; padding: 16px 18px;">
            <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap;">
                <div class="price-calc-label">💰 قیمت اصلی:</div>
                <div class="price-old" style="font-size: 14px;">${formatToman(original)} تومان</div>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap;">
                <div class="price-calc-label">
                    ${discountLabel}
                    <span class="discount-badge">${discount}% تخفیف</span>
                </div>
                <div class="price-new" style="font-size: 20px;">${formatToman(finalPrice)} تومان</div>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap; padding-top:8px; border-top:1px dashed var(--border-color);">
                <div class="price-calc-label">💵 سود شما:</div>
                <div style="color: var(--success); font-size: 14px; font-weight: 800; direction: ltr;">
                    ${formatToman(discountAmount)} تومان
                </div>
            </div>
        </div>
    `;

    container.innerHTML = `
        <div class="detail-title">${serviceName} - ${volumeName}</div>

        <div class="detail-desc">${description}</div>

        <div class="detail-info-grid">
            <div class="detail-info-item">
                <div class="detail-info-label">🌐 نوع سرویس</div>
                <div class="detail-info-value">${svc === 'openvpn' ? 'OpenVPN' : 'V2Ray'}</div>
            </div>
            <div class="detail-info-item">
                <div class="detail-info-label">👤 نوع کاربری</div>
                <div class="detail-info-value">${userTypeName}</div>
            </div>
            <div class="detail-info-item">
                <div class="detail-info-label">📦 حجم کانفیگ</div>
                <div class="detail-info-value">${volumeName}</div>
            </div>
            <div class="detail-info-item">
                <div class="detail-info-label">🆔 شناسه</div>
                <div class="detail-info-value">VPN-${svc.toUpperCase()}</div>
            </div>
        </div>

        ${priceBlockHtml}

        <button class="submit-btn" id="vpnSubmitBtn" onclick="submitVpnOrder()" style="background: linear-gradient(135deg, var(--purple), var(--pink));">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            🛒 خرید VPN
        </button>

        <div id="vpnOrderMsg"></div>
    `;
}

// ============================================================
// FIX #4 — SUBMIT VPN ORDER
// ============================================================
async function submitVpnOrder() {
    const btn = document.getElementById('vpnSubmitBtn');
    const msgBox = document.getElementById('vpnOrderMsg');

    if (!state.vpnService || !state.vpnUserType || !state.vpnVolume) {
        showToast('لطفاً همه گزینه‌ها را انتخاب کنید', 'warning');
        return;
    }

    const basePrice = state.vpnPrice;
    const { original, final: finalPrice, discount } = getVpnPriceBreakdown(basePrice);
    const wallet = getWallet();

    // FIX #4 — موجودی کاربر کم است → نوتیفیکیشن از بالا
    if (wallet < finalPrice) {
        showUserBalanceError('vpnOrderMsg', wallet, finalPrice);
        return;
    }

    btn.disabled = true;
    btn.innerHTML = `<div class="loading-spinner" style="width:18px;height:18px;border-width:2px;"></div> در حال خرید...`;
    msgBox.innerHTML = '';

    setWallet(wallet - finalPrice);

    const { date, time } = getPersianDateTime();
    const email = store.get('vex_email', 'نامشخص');
    const phone = store.get('vex_phone', 'نامشخص');

    let userTypeName = '';
    if (state.vpnUserType === 'single')         userTypeName = 'تک کاربره';
    else if (state.vpnUserType === 'multi')     userTypeName = 'دو کاربره';
    else if (state.vpnUserType === 'unlimited') userTypeName = 'نامحدود';

    let volumeName = '';
    if (state.vpnUserType === 'unlimited') {
        volumeName = `${state.vpnVolume} کاربره نامحدود`;
    } else {
        volumeName = `${state.vpnVolume} گیگ`;
    }

    const orderData = {
        orderId: 'VPN-' + Date.now(),
        isVpn: true,
        vpnService: state.vpnService,
        vpnServiceName: state.vpnService === 'openvpn' ? 'OpenVPN' : 'V2Ray',
        vpnUserType: state.vpnUserType,
        vpnUserTypeText: userTypeName,
        vpnVolume: state.vpnVolume,
        vpnVolumeText: volumeName,
        basePrice: original,
        discount,
        totalPrice: finalPrice,
        date, time,
        status: 'completed',
        createdAt: Date.now()
    };

    saveOrder(orderData);

    await sendVpnNotification(
        `🛒 خرید VPN جدید\n` +
        `📧 ایمیل کاربر: ${email}\n` +
        `📱 شماره تلفن: ${phone}\n` +
        `\n` +
        `🔐 مشخصات خرید:\n` +
        `• نوع سرویس: ${orderData.vpnServiceName}\n` +
        `• نوع کاربری: ${userTypeName}\n` +
        `• حجم کانفیگ: ${volumeName}\n` +
        `• قیمت اصلی: ${formatToman(original)} تومان\n` +
        (discount > 0 ? `• تخفیف: ${discount}٪\n` : '') +
        `• مبلغ پرداختی: ${formatToman(finalPrice)} تومان\n` +
        `\n` +
        `📅 ${date}\n` +
        `🕐 ${time}`
    );

    showVpnInvoice(orderData);

    state.vpnService = null;
    state.vpnUserType = null;
    state.vpnVolume = null;
    state.vpnPrice = 0;

    document.querySelectorAll('#vpnServiceList .chip').forEach(c => c.classList.remove('active'));
    document.getElementById('vpnUserSection').style.display = 'none';
    document.getElementById('vpnVolumeSection').style.display = 'none';
    document.getElementById('vpnOrderSection').style.display = 'none';

    btn.disabled = false;
    btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg> 🛒 خرید VPN`;
}

function showVpnInvoice(order) {
    const content = document.getElementById('vpnInvoiceContent');
    if (!content) return;

    content.innerHTML = `
        <div class="invoice-row">
            <span class="invoice-label">🆔 کد سفارش:</span>
            <span class="invoice-value">${order.orderId}</span>
        </div>
        <div class="invoice-row">
            <span class="invoice-label">🌐 نوع سرویس:</span>
            <span class="invoice-value">${order.vpnServiceName}</span>
        </div>
        <div class="invoice-row">
            <span class="invoice-label">👤 نوع کاربری:</span>
            <span class="invoice-value">${order.vpnUserTypeText}</span>
        </div>
        <div class="invoice-row">
            <span class="invoice-label">📦 حجم کانفیگ:</span>
            <span class="invoice-value">${order.vpnVolumeText}</span>
        </div>
        <div class="invoice-row">
            <span class="invoice-label">📧 ایمیل:</span>
            <span class="invoice-value">${store.get('vex_email', '-')}</span>
        </div>
        <div class="invoice-row">
            <span class="invoice-label">📱 شماره:</span>
            <span class="invoice-value">${store.get('vex_phone', '-')}</span>
        </div>
        <div class="invoice-row">
            <span class="invoice-label">📅 تاریخ:</span>
            <span class="invoice-value">${order.date}</span>
        </div>
        <div class="invoice-row">
            <span class="invoice-label">🕐 ساعت:</span>
            <span class="invoice-value">${order.time}</span>
        </div>
        <div class="invoice-row total">
            <span class="invoice-label">💰 مبلغ پرداختی:</span>
            <span class="invoice-value">${formatToman(order.totalPrice)} تومان</span>
        </div>
    `;

    document.getElementById('vpnInvoiceModal').classList.add('show');
}
function closeVpnInvoiceModal() {
    document.getElementById('vpnInvoiceModal').classList.remove('show');
}

// ============================================================
// AGENT MODAL
// ============================================================
function openAgentModal() {
    const modal = document.getElementById('agentModal');
    if (!modal) return;

    modal.classList.add('show');
    document.getElementById('agentStep1').style.display = 'block';
    document.getElementById('agentStep2').style.display = 'none';
    document.getElementById('agentCodeInput').value = '';
    document.getElementById('agentError').classList.remove('show');
    document.getElementById('agentBackBtn').style.display = 'block';

    if (state.isAgent) {
        document.getElementById('agentStep1').style.display = 'none';
        document.getElementById('agentStep2').style.display = 'block';
        document.getElementById('agentBackBtn').style.display = 'none';
    }
}
function closeAgentModal() {
    document.getElementById('agentModal').classList.remove('show');
}

async function requestAgentCode() {
    const btn = document.getElementById('requestAgentBtn');
    const err = document.getElementById('agentError');

    btn.disabled = true;
    btn.textContent = 'در حال ارسال...';
    err.classList.remove('show');

    const email = store.get('vex_email', '');
    const phone = store.get('vex_phone', '');
    const username = store.get('vex_username', 'وارد نشده');
    const { date, time } = getPersianDateTime();

    const simpleCode = 'vexvpn' + Math.floor(10000 + Math.random() * 90000);

    store.set('vex_vpn_pending_agent_code', {
        code: simpleCode,
        email,
        phone,
        createdAt: Date.now(),
        expiresAt: Date.now() + 48 * 60 * 60 * 1000
    });

    await sendVpnNotification(
        `🏆 درخواست نمایندگی VPN\n` +
        `📧 ایمیل: ${email}\n` +
        `📱 شماره: ${phone}\n` +
        `👤 یوزرنیم: ${username ? '@' + username : 'وارد نشده'}\n` +
        `📅 ${date}\n` +
        `🕐 ${time}\n` +
        `\n` +
        `🔑 کد نمایندگی: ${simpleCode}`
    );

    btn.disabled = false;
    btn.textContent = '📩 درخواست کد';
    err.textContent = '✅ درخواست شما ارسال شد. کد نمایندگی به‌زودی برای شما ارسال می‌شود';
    err.style.color = 'var(--success)';
    err.classList.add('show');
}

async function confirmAgentCode() {
    const input = document.getElementById('agentCodeInput');
    const err = document.getElementById('agentError');
    const btn = document.getElementById('confirmAgentBtn');

    const code = input.value.trim().toLowerCase();
    err.classList.remove('show');
    err.style.color = 'var(--error)';

    if (!code) {
        err.textContent = '⚠️ لطفاً کد نمایندگی را وارد کنید';
        err.classList.add('show');
        return;
    }

    const usedCodes = store.get('vex_used_agent_codes', []);
    if (usedCodes.includes(code)) {
        err.textContent = '❌ این کد قبلاً استفاده شده است';
        err.classList.add('show');
        return;
    }

    const pending = store.get('vex_vpn_pending_agent_code', null);
    if (!pending) {
        err.textContent = '❌ کد معتبری وجود ندارد. لطفاً درخواست کد بدهید';
        err.classList.add('show');
        return;
    }

    if (Date.now() > pending.expiresAt) {
        store.del('vex_vpn_pending_agent_code');
        err.textContent = '❌ این کد منقضی شده است';
        err.classList.add('show');
        return;
    }

    if (pending.code !== code) {
        err.textContent = '❌ کد اشتباه است';
        err.classList.add('show');
        return;
    }

    btn.disabled = true;
    btn.textContent = 'در حال بررسی...';

    usedCodes.push(code);
    store.set('vex_used_agent_codes', usedCodes);
    store.del('vex_vpn_pending_agent_code');
    store.set('vex_vpn_agent', true);
    store.set('vex_vpn_agent_code', code);
    state.isAgent = true;

    const { date, time } = getPersianDateTime();
    const email = store.get('vex_email', '');
    const phone = store.get('vex_phone', '');

    await sendVpnNotification(
        `✅ فعال‌سازی نمایندگی VPN\n` +
        `📧 ایمیل: ${email}\n` +
        `📱 شماره: ${phone}\n` +
        `🎫 کد: ${code}\n` +
        `📅 ${date}\n` +
        `🕐 ${time}`
    );

    document.getElementById('agentStep1').style.display = 'none';
    document.getElementById('agentStep2').style.display = 'block';
    document.getElementById('agentBackBtn').style.display = 'none';

    btn.disabled = false;
    btn.textContent = '✅ تایید کد';

    loadUserData();
}

// ============================================================
// CHARGE
// ============================================================
function openChargeModal() {
    document.getElementById('chargeModal').classList.add('show');
    document.getElementById('chargeStep1').style.display = 'block';
    document.getElementById('chargeStep2').style.display = 'none';
    document.getElementById('chargeStep3').style.display = 'none';
    document.getElementById('chargeMsg').innerHTML = '';
    document.getElementById('chargeBackBtn').style.display = 'block';
    state.chargeAmount = 0;
    document.getElementById('lastFourDigits').value = '';
    document.getElementById('trackingNumber').value = '';
    document.getElementById('chargeNote').value = '';
    document.getElementById('customAmountBox').style.display = 'none';
    document.getElementById('customAmountInput').value = '';
    document.getElementById('customAmountError').textContent = '';
    document.getElementById('customAmountPreview').style.display = 'none';
    initDatePicker();
}
function closeChargeModal() {
    document.getElementById('chargeModal').classList.remove('show');
}

function showCustomAmountInput() {
    document.getElementById('customAmountBox').style.display = 'block';
    document.getElementById('customAmountInput').value = '';
    document.getElementById('customAmountError').textContent = '';
    document.getElementById('customAmountPreview').style.display = 'none';
    setTimeout(() => document.getElementById('customAmountInput').focus(), 200);
}
function hideCustomAmountInput() {
    document.getElementById('customAmountBox').style.display = 'none';
    document.getElementById('customAmountInput').value = '';
    document.getElementById('customAmountError').textContent = '';
    document.getElementById('customAmountPreview').style.display = 'none';
}

function updateCustomAmount() {
    const input = document.getElementById('customAmountInput');
    const errorEl = document.getElementById('customAmountError');
    const preview = document.getElementById('customAmountPreview');
    const show = document.getElementById('customAmountShow');

    input.value = input.value.replace(/\D/g, '');
    const num = parseInt(input.value) || 0;

    if (!num) {
        errorEl.textContent = '';
        preview.style.display = 'none';
        return;
    }
    if (num < MIN_CUSTOM_AMOUNT) {
        errorEl.textContent = `⚠️ حداقل مبلغ ${formatToman(MIN_CUSTOM_AMOUNT)} تومان است`;
        preview.style.display = 'none';
        return;
    }
    if (num > MAX_CUSTOM_AMOUNT) {
        errorEl.textContent = `⚠️ حداکثر مبلغ ${formatToman(MAX_CUSTOM_AMOUNT)} تومان است`;
        preview.style.display = 'none';
        return;
    }

    errorEl.textContent = '';
    show.textContent = formatToman(num);
    preview.style.display = 'block';
}

function confirmCustomAmount() {
    const input = document.getElementById('customAmountInput');
    const num = parseInt(input.value) || 0;

    if (!num || num < MIN_CUSTOM_AMOUNT || num > MAX_CUSTOM_AMOUNT) {
        showToast('⚠️ مبلغ وارد شده معتبر نیست', 'warning');
        return;
    }

    state.chargeAmount = num;
    document.getElementById('selectedAmount').textContent = formatToman(num) + ' تومان';
    document.getElementById('chargeStep1').style.display = 'none';
    document.getElementById('chargeStep2').style.display = 'block';
}

function initDatePicker() {
    const daySel = document.getElementById('dateDay');
    const yearSel = document.getElementById('dateYear');
    if (!daySel || !yearSel) return;

    daySel.innerHTML = '';
    for (let i = 1; i <= 31; i++) {
        const opt = document.createElement('option');
        opt.value = i;
        opt.textContent = i.toLocaleString('fa-IR');
        daySel.appendChild(opt);
    }

    yearSel.innerHTML = '';
    const currentYearFa = new Date().toLocaleDateString('fa-IR', { year: 'numeric' }).split('/')[0];
    const yearEn = parseInt(currentYearFa.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d)));
    for (let y = yearEn; y >= yearEn - 2; y--) {
        const opt = document.createElement('option');
        opt.value = y;
        opt.textContent = y.toLocaleString('fa-IR');
        yearSel.appendChild(opt);
    }
}

function selectChargeAmount(amount) {
    state.chargeAmount = amount;
    document.getElementById('selectedAmount').textContent = formatToman(amount) + ' تومان';
    document.getElementById('chargeStep1').style.display = 'none';
    document.getElementById('chargeStep2').style.display = 'block';
}
function backToChargeStep1() {
    document.getElementById('chargeStep2').style.display = 'none';
    document.getElementById('chargeStep1').style.display = 'block';
    document.getElementById('chargeMsg').innerHTML = '';
    hideCustomAmountInput();
}
function copyCard() {
    navigator.clipboard.writeText('6219861948538607').then(() => {
        const el = document.getElementById('cardNumberText');
        const old = el.textContent;
        el.textContent = '✅ کپی شد';
        setTimeout(() => el.textContent = old, 1500);
    });
}

function generateChargeCode(amount) {
    const randomPart = Math.random().toString(36).substring(2, 7);
    const amountInThousands = amount / 1000;
    return 'vex' + randomPart + amountInThousands;
}

async function confirmCharge() {
    const btn = document.getElementById('confirmChargeBtn');
    const last4 = document.getElementById('lastFourDigits').value.trim();
    const tracking = document.getElementById('trackingNumber').value.trim();
    const day = document.getElementById('dateDay').value;
    const month = document.getElementById('dateMonth').value;
    const year = document.getElementById('dateYear').value;
    const note = document.getElementById('chargeNote').value.trim();

    if (!/^\d{4}$/.test(last4)) { showMsg('chargeMsg', 'error', '⚠️ لطفاً ۴ رقم آخر شماره کارت را وارد کنید'); return; }
    if (!tracking || tracking.length < 5) { showMsg('chargeMsg', 'error', '⚠️ شماره پیگیری واریزی را وارد کنید'); return; }
    if (!day || !month || !year) { showMsg('chargeMsg', 'error', '⚠️ تاریخ واریزی را انتخاب کنید'); return; }

    btn.disabled = true;
    btn.classList.add('loading');
    document.getElementById('chargeMsg').innerHTML = '';

    const { date, time } = getPersianDateTime();
    const email = store.get('vex_email', 'نامشخص');
    const phone = store.get('vex_phone', 'نامشخص');
    const chargeCode = generateChargeCode(state.chargeAmount);

    store.set('vex_pending_charge_code', {
        code: chargeCode,
        amount: state.chargeAmount,
        createdAt: Date.now(),
        expiresAt: Date.now() + 48 * 60 * 60 * 1000
    });

    const message =
        `💰 درخواست شارژ کیف پول\n` +
        `📧 ایمیل: ${email}\n` +
        `📱 شماره: ${phone}\n` +
        `💵 مبلغ شارژ: ${formatToman(state.chargeAmount)} تومان\n` +
        `💳 ۴ رقم آخر کارت: ${last4}\n` +
        `🔢 شماره پیگیری: ${tracking}\n` +
        `📅 تاریخ واریز: ${day} ${month} ${year}\n` +
        `📝 توضیحات: ${note || 'ندارد'}\n` +
        `📅 ${date}\n` +
        `🕐 ${time}\n` +
        `🔑 کد شارژ: ${chargeCode}`;

    await sendNotification(message);

    setTimeout(() => {
        btn.disabled = false;
        btn.classList.remove('loading');
        document.getElementById('chargeStep2').style.display = 'none';
        document.getElementById('chargeStep3').style.display = 'block';
        document.getElementById('chargeBackBtn').style.display = 'none';
    }, 800);
}

// ============================================================
// REDEEM
// ============================================================
function openRedeemModal() {
    document.getElementById('redeemModal').classList.add('show');
    document.getElementById('redeemStep1').style.display = 'block';
    document.getElementById('redeemStep2').style.display = 'none';
    document.getElementById('redeemInput').value = '';
    document.getElementById('redeemError').classList.remove('show');
    document.getElementById('redeemBackBtn').style.display = 'block';
    setTimeout(() => document.getElementById('redeemInput').focus(), 200);
}
function closeRedeemModal() {
    document.getElementById('redeemModal').classList.remove('show');
}

async function redeemCode() {
    const input = document.getElementById('redeemInput');
    const errorEl = document.getElementById('redeemError');
    const btn = document.getElementById('redeemBtn');
    const code = input.value.trim().toLowerCase();

    errorEl.textContent = '';
    errorEl.classList.remove('show');

    if (!code) {
        errorEl.textContent = '⚠️ کد را وارد کنید';
        errorEl.classList.add('show');
        return;
    }

    const usedCodes = store.get('vex_used_codes', []);
    if (usedCodes.includes(code)) {
        errorEl.textContent = '❌ این کد قبلاً استفاده شده است';
        errorEl.classList.add('show');
        return;
    }

    const pending = store.get('vex_pending_charge_code', null);
    if (!pending) {
        errorEl.textContent = '❌ کد معتبری وجود ندارد. لطفاً درخواست شارژ جدید بدهید';
        errorEl.classList.add('show');
        return;
    }

    if (Date.now() > pending.expiresAt) {
        store.del('vex_pending_charge_code');
        errorEl.textContent = '❌ این کد منقضی شده است (بیش از ۴۸ ساعت)';
        errorEl.classList.add('show');
        return;
    }

    if (pending.code !== code) {
        errorEl.textContent = '❌ کد اشتباه است';
        errorEl.classList.add('show');
        return;
    }

    btn.disabled = true;
    btn.classList.add('loading');

    usedCodes.push(code);
    store.set('vex_used_codes', usedCodes);
    store.del('vex_pending_charge_code');

    const amount = pending.amount;
    setWallet(getWallet() + amount);

    const { date, time } = getPersianDateTime();
    const email = store.get('vex_email', 'نامشخص');
    const phone = store.get('vex_phone', 'نامشخص');

    await sendNotification(
        `🎁 شارژ کد استفاده شد\n` +
        `📧 ایمیل: ${email}\n` +
        `📱 شماره: ${phone}\n` +
        `🎫 کد: ${code}\n` +
        `💰 مبلغ: ${formatToman(amount)} تومان\n` +
        `📅 ${date}\n` +
        `🕐 ${time}`
    );

    document.getElementById('redeemAmountShow').textContent = formatToman(amount);
    document.getElementById('redeemStep1').style.display = 'none';
    document.getElementById('redeemStep2').style.display = 'block';
    document.getElementById('redeemBackBtn').style.display = 'none';

    btn.disabled = false;
    btn.classList.remove('loading');
}

// ============================================================
// TICKET
// ============================================================
async function submitTicket() {
    const textarea = document.getElementById('ticketText');
    const msgBox = document.getElementById('ticketMsg');
    const btn = document.getElementById('ticketBtn');
    const text = textarea.value.trim();

    if (!text) { showMsg('ticketMsg', 'error', '⚠️ متن را وارد کنید'); return; }
    if (text.length < 10) { showMsg('ticketMsg', 'error', '⚠️ حداقل ۱۰ کاراکتر'); return; }

    btn.disabled = true;
    btn.classList.add('loading');
    msgBox.innerHTML = '';

    const { date, time } = getPersianDateTime();
    const email = store.get('vex_email', 'نامشخص');
    const phone = store.get('vex_phone', 'نامشخص');

    await sendNotification(
        `🎫 تیکت جدید\n` +
        `📧 ایمیل: ${email}\n` +
        `📱 شماره: ${phone}\n` +
        `📅 ${date}\n` +
        `🕐 ${time}\n\n` +
        `📝 متن:\n${text}`
    );

    setTimeout(() => {
        btn.disabled = false;
        btn.classList.remove('loading');
        textarea.value = '';
        showMsg('ticketMsg', 'success', '✅ تیکت ثبت شد');
    }, 800);
}

// ============================================================
// ADMIN PANEL
// ============================================================
function renderAdminPanel() {
    const wrap = document.getElementById('adminPanelWrap');
    if (!wrap) return;
    if (state.userRole !== 'admin') {
        wrap.style.display = 'none';
        wrap.innerHTML = '';
        return;
    }

    wrap.style.display = 'block';
    const servers = getServers();

    wrap.innerHTML = `
        <div class="admin-section">
            <div class="section-header">
                <div class="section-title">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" style="color: var(--error);">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    پنل ادمین کل
                </div>
            </div>

            <button class="admin-balance-btn" onclick="checkAllBalances()">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
                💰 بررسی موجودی همه سرورها
            </button>

            <div id="balanceList" style="margin-bottom: 12px;"></div>

            <div class="section-title" style="margin-bottom: 12px; font-size: 13px;">
                لیست سرورها (${servers.length})
            </div>

            ${servers.map(s => `
                <div class="token-row">
                    <div class="token-info">
                        <div class="token-name">🌐 ${s.name}</div>
                        <div class="token-url">${s.url}</div>
                        <div class="token-value">${s.key}</div>
                    </div>
                    <div style="display: flex; gap: 6px; flex-shrink: 0;">
                        <button onclick="editAdminService('${s.id}')" style="background: rgba(0,229,255,0.15); border: 1px solid rgba(0,229,255,0.4); color: var(--cyan); width: 36px; height: 36px; border-radius: 10px; cursor: pointer; display: flex; align-items: center; justify-content: center;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </button>
                        <button onclick="deleteAdminService('${s.id}')" style="background: rgba(239,68,68,0.15); border: 1px solid rgba(239,68,68,0.4); color: var(--error); width: 36px; height: 36px; border-radius: 10px; cursor: pointer; display: flex; align-items: center; justify-content: center;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            `).join('')}

            <button class="admin-action-btn" onclick="openAdminServiceModal()">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                افزودن سرور جدید
            </button>
        </div>
    `;
}

async function checkAllBalances() {
    const list = document.getElementById('balanceList');
    const servers = getServers();
    list.innerHTML = '';

    servers.forEach(s => {
        const row = document.createElement('div');
        row.className = 'balance-row';
        row.innerHTML = `
            <div class="balance-name">${s.name}</div>
            <div class="balance-value loading" id="balance-${s.id}">در حال دریافت...</div>
        `;
        list.appendChild(row);
    });

    for (const s of servers) {
        try {
            const result = await callAPI(s, { action: 'balance' });
            const el = document.getElementById(`balance-${s.id}`);
            if (result.error) {
                el.className = 'balance-value error';
                el.textContent = 'خطا';
            } else if (result.balance !== undefined) {
                el.className = 'balance-value';
                el.textContent = result.balance + ' ' + (result.currency || '$');
            } else {
                el.className = 'balance-value error';
                el.textContent = 'نامشخص';
            }
        } catch (err) {
            const el = document.getElementById(`balance-${s.id}`);
            if (el) { el.className = 'balance-value error'; el.textContent = 'خطا'; }
        }
    }
}

function openAdminServiceModal(id = null) {
    state.editingServiceId = id;
    const modal = document.getElementById('adminServiceModal');
    const title = document.getElementById('adminServiceTitle');
    document.getElementById('adminSrvError').classList.remove('show');

    if (id) {
        const s = getServers().find(x => x.id === id);
        if (s) {
            title.textContent = 'ویرایش سرور';
            document.getElementById('adminSrvServer').value = s.name;
            document.getElementById('adminSrvUrl').value = s.url;
            document.getElementById('adminSrvKey').value = s.key;
        }
    } else {
        title.textContent = 'افزودن سرور جدید';
        document.getElementById('adminSrvServer').value = '';
        document.getElementById('adminSrvUrl').value = '';
        document.getElementById('adminSrvKey').value = '';
    }

    modal.classList.add('show');
}

function closeAdminServiceModal() {
    document.getElementById('adminServiceModal').classList.remove('show');
    state.editingServiceId = null;
}

function saveAdminService() {
    const name = document.getElementById('adminSrvServer').value.trim();
    const url = document.getElementById('adminSrvUrl').value.trim();
    const key = document.getElementById('adminSrvKey').value.trim();
    const err = document.getElementById('adminSrvError');

    if (!name || !url || !key) {
        err.textContent = '⚠️ همه فیلدها را پر کنید';
        err.classList.add('show');
        return;
    }

    const servers = getServers();

    if (state.editingServiceId) {
        const idx = servers.findIndex(s => s.id === state.editingServiceId);
        if (idx >= 0) servers[idx] = { ...servers[idx], name, url, key };
        showToast('سرور ویرایش شد', 'success');
    } else {
        servers.push({ id: 'server_' + Date.now(), name, url, key });
        showToast('سرور جدید اضافه شد', 'success');
    }

    saveServers(servers);
    closeAdminServiceModal();
    renderAdminPanel();
    renderServers();
}

function editAdminService(id) { openAdminServiceModal(id); }

function deleteAdminService(id) {
    if (!confirm('حذف این سرور؟')) return;
    saveServers(getServers().filter(s => s.id !== id));
    renderAdminPanel();
    renderServers();
    showToast('سرور حذف شد', 'success');
}

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    initApp();
    renderServers();
    renderFavoritesSection();
    initDatePicker();

    document.getElementById('phoneInput')?.addEventListener('keypress', e => { if (e.key === 'Enter') sendCode(); });
    document.getElementById('codeInput')?.addEventListener('keypress', e => { if (e.key === 'Enter') verifyCode(); });
    document.getElementById('redeemInput')?.addEventListener('keypress', e => { if (e.key === 'Enter') redeemCode(); });
    document.getElementById('usernameInput')?.addEventListener('keypress', e => { if (e.key === 'Enter') saveUsername(); });
    document.getElementById('agentCodeInput')?.addEventListener('keypress', e => { if (e.key === 'Enter') confirmAgentCode(); });

    document.getElementById('phoneInput')?.addEventListener('input', function() { this.value = this.value.replace(/\D/g, ''); });
    document.getElementById('codeInput')?.addEventListener('input', function() { this.value = this.value.replace(/\D/g, ''); });
    document.getElementById('usernameInput')?.addEventListener('input', function() { this.value = this.value.replace(/[^a-zA-Z0-9_@]/g, ''); });
    document.getElementById('redeemInput')?.addEventListener('input', function() { this.value = this.value.toLowerCase().replace(/[^a-z0-9]/g, ''); });
    document.getElementById('lastFourDigits')?.addEventListener('input', function() { this.value = this.value.replace(/\D/g, ''); });
    document.getElementById('trackingNumber')?.addEventListener('input', function() { this.value = this.value.replace(/[^0-9a-zA-Z]/g, ''); });
    document.getElementById('agentCodeInput')?.addEventListener('input', function() { this.value = this.value.toLowerCase().replace(/[^a-z0-9]/g, ''); });

    [
        'editModal', 'logoutModal', 'resetModal', 'chargeModal',
        'redeemModal', 'adminServiceModal', 'categoryModal',
        'favoritesModal', 'orderTypeModal', 'vpnUserModal',
        'vpnVolumeModal', 'vpnInvoiceModal', 'agentModal',
        'orderStatusModal'
    ].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('click', function(e) {
            if (e.target === this) this.classList.remove('show');
        });
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const statusModal = document.getElementById('orderStatusModal');
            if (statusModal && statusModal.classList.contains('show')) {
                closeOrderStatusModal();
            }
            // FIX #7 — بستن نوتیفیکیشن بالا با ESC
            hideTopNotification();
        }
    });

    document.getElementById('themeToggle')?.addEventListener('change', function() {
        const t = this.checked ? 'dark' : 'light';
        store.set('vex_theme', t);
        applyTheme(t);
    });
});