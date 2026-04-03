/*
 * Derive Mandarin Chinese (Putonghua) from Middle Chinese
 * Original: https://github.com/nk2028/tshet-uinh-examples/blob/main/putonghua.js
 *
 * @author graphemecluster
 * @author JwietPuj-Drin
 * @author SyiMyuZya
 *
 * The option "Tone assignment for voiceless initials in entering tone" refers to
 * Hirayama Hisao's "Correspondence rules of Middle Chinese voiceless entering tone in Beijing dialect"
 * http://ccj.pku.edu.cn/Article/DownLoad?id=271015083&&type=ArticleFile
 *
 * Default choice is "all assigned to 陰平 (tone 1)", referring to materials disclosed by Liu Haiyang
 * in his answer to "Why do entering tones in Beijing dialect get assigned to three different tones?"
 * "For ancient voiceless entering tone characters in Beijing dialect tones, those without variant readings
 * adopt the already prevalent Beijing pronunciation. For those with variant readings, if one of them is
 * yinping tone, the principle is to adopt yinping, e.g.: 'xi' (息), 'ji' (击). Otherwise consider
 * case by case, adopting the more prevalent..."
 * https://www.zhihu.com/question/30370012/answer/533234460
 *
 * The option "Initials for Chang initial level tone yin finals and Chuan initial level tone"
 * refers to unt's answer to "Why do Middle Chinese dʑ ʑ and Mandarin correspondences seem reversed
 * (i.e. dʑ > ʂ, ʑ > ʈʂ)?"
 * https://www.zhihu.com/question/526195183/answer/2425807330
 */

/** @type { YinyunPosition['belongsTo'] } */
const is = (...x) => yinyunPosition.belongsTo(...x);  // Helper function to check phonological position

/** @type { YinyunPosition['evaluate'] } */
const when = (...x) => yinyunPosition.evaluate(...x);  // Helper function for conditional logic

const hasAdvancedOptions = options.advancedOptions ?? false;  // Check if advanced options are enabled

// Configuration options - returns available settings if no phonological position provided
if (!yinyunPosition) return [
    ['標調方式', [2, '數字', '附標']],  // Tone marking method: numeric or diacritical
    ['更多選項', hasAdvancedOptions],   // Advanced options toggle
    ...(hasAdvancedOptions ? [
        '更多選項',
        ['清聲母入聲調分派層次', [2, '皆派入上聲', '皆派入陰平', '次清、擦音和零聲母字派入去聲，其餘派入陽平', '次清和零聲母字派入去聲，其餘派入陽平', '皆不標調', '連同濁聲母，所有入聲字皆派入去聲']],
        // Tone assignment levels for voiceless initials in entering tone
        ['常母平聲陰聲韻聲母和船母平聲聲母', [2, 'ch', 'sh']],  // Chang/Chuan initial choices
    ] : []),
];

// Pre-adjustments (differences already present in Middle Chinese)
// Handle specific phonological mergers that occurred in Middle Chinese
if (is`明母 尤東韻`) {  // Labial nasal 'm' with certain finals
    yinyunPosition = yinyunPosition.adjust(`${yinyunPosition.rime === '尤' ? '侯' : yinyunPosition.rime}韻 一等 不分類`);
}
if (is`云母 通攝 舒聲`) {  // Glottal approximant with certain vowels
    yinyunPosition = yinyunPosition.adjust('匣母', ['匣母三等']);
}

// TODO: Handle other historical mergers like crab finals into fake finals, flow finals into meet finals

// Initial consonant rules
// Note: j, q, x are not listed here - they're derived later from palatalization conditions
const initialRules = () => when([
    // Labial stops and fricatives
    ['幫滂並母 C類', 'f'],           // Labial stops in certain environments → f
    ['幫母', 'b'],                   // Voiceless unaspirated labial → b
    ['滂母', 'p'],                   // Voiceless aspirated labial → p
    ['並母', [['平聲', 'p'], ['', 'b']]], // Voiced labial → p in level tone, b elsewhere
    ['明母', [['C類', 'w'], ['', 'm']]], // Labial nasal → w in C-type, m elsewhere

    // Dental/alveolar stops
    ['端母', 'd'],                   // Voiceless unaspirated dental → d
    ['透母', 't'],                   // Voiceless aspirated dental → t
    ['定母', [['平聲', 't'], ['', 'd']]], // Voiced dental → t in level tone, d elsewhere
    ['泥孃母', 'n'],                 // Dental/retroflex nasals → n
    ['來母', 'l'],                   // Lateral → l

    // Sibilants (dental)
    ['精母', 'z'],                   // Voiceless unaspirated sibilant → z
    ['清母', 'c'],                   // Voiceless aspirated sibilant → c
    ['從母', [['平聲', 'c'], ['', 'z']]], // Voiced sibilant → c in level tone, z elsewhere
    ['心邪母', 's'],                 // Voiceless/voiced fricatives → s

    // Retroflex and palatal series
    ['知莊章母', 'zh'],              // Retroflex/palatal stops → zh
    ['徹初昌母', 'ch'],              // Aspirated retroflex/palatal → ch
    ['澄崇母', [['平聲', 'ch'], ['', 'zh']]], // Voiced retroflex → ch in level, zh elsewhere
    ['常母', [['平聲 陽聲韻', 'ch'], ['', 'sh']]], // Chang initial special handling
    ['生書母', 'sh'],                // Voiceless fricatives → sh
    ['俟船母', 'sh'],                // More fricatives → sh
    ['日母', 'r'],                   // Approximant → r

    // Velars and laryngeals
    ['見母', 'g'],                   // Voiceless unaspirated velar → g
    ['溪母', 'k'],                   // Voiceless aspirated velar → k
    ['羣母', [['平聲', 'k'], ['', 'g']]], // Voiced velar → k in level tone, g elsewhere
    ['曉匣母', 'h'],                 // Fricatives → h
    ['以母 蟹攝 三四等 合口', 'r'],   // Special case: "銳" (sharp)
    ['疑影云以母', ''],              // Zero initials
], 'no initial rule found');

// Final rules for non-entering tones (smooth tones)
// Finals written assuming zero initial, using y/w/yu as i/u/ü for easier processing
// Doesn't separately list systematic changes to hong sounds for zh/ch/sh/r/f/w and some n/l - handled later
const smoothFinalRules = () => when([
    // Tong finals (通攝)
    ['通攝', [['三四等 牙喉音', 'iong'], ['', 'ueng']]],  // Grade 3-4 velars → iong, others → ueng

    // Zhi finals (止攝)
    ['止攝', [
        ['合口', [['莊組', 'uai'], ['', 'uei']]],  // Rounded: retroflex → uai, others → uei
        ['', 'er'],  // 'er' indicates r-coloring and special z/c/s behavior
    ]],

    // Yu finals (遇攝)
    ['遇攝', [['三四等', 'ü'], ['', 'u']]],  // Grade 3-4 → ü, others → u

    // Xie finals (蟹攝) - complex with many subcases
    ['蟹攝', [
        ['廢韻 平上聲 章組', [['合口', 'uai'], ['', 'ai']]],  // Fei final with palatal initials
        ['三四等', [['合口 莊組', 'uai'], ['合口', 'uei'], ['', 'i']]],  // Grade 3-4 patterns
        ['二等 開口 溪影母', 'ai'],  // Grade 2 unrounded with specific initials
        ['佳韻 合口 牙喉音', 'ua'],  // Jia final rounded with velars: "畫掛" etc
        ['佳韻 開口 疑母', 'ia'],    // Jia final unrounded with ng-: "崖睚" etc
        ['二等', [['開口 牙喉音', 'ie'], ['合口', 'uai'], ['', 'ai']]],  // Grade 2 general
        ['一等', [['開口', 'ai'], ['', 'uei']]],  // Grade 1
    ]],

    // Zhen/Shen finals (臻深攝)
    ['臻深攝', [
        ['三四等', [['合口', 'ün'], ['', 'in']]],  // Grade 3-4: rounded → ün, unrounded → in
        ['', [['合口 或 舌齒音', 'uen'], ['', 'en']]],  // Others: rounded or dental → uen, else → en
    ]],

    // Shan/Xian finals (山咸攝)
    ['山咸攝', [
        ['三四等', [['合口', 'üan'], ['', 'ian']]],  // Grade 3-4 patterns
        ['二等 牙喉音 開口', 'ian'],  // Grade 2 velars unrounded → ian
        ['', [['合口', 'uan'], ['', 'an']]],  // General: rounded → uan, unrounded → an
    ]],

    // Xiao finals (效攝)
    ['效攝', [
        ['三四等 或 二等 牙喉音', 'iao'],  // Grade 3-4 or grade 2 velars → iao
        ['', 'ao'],  // Others → ao
    ]],

    // Guo/Jia finals (果假攝)
    ['果假攝', [
        ['三四等', [['合口', 'üe'], ['', 'ie']]],  // Grade 3-4 patterns
        ['二等', [['合口', 'ua'], ['牙喉音', 'ia'], ['', 'a']]],  // Grade 2 patterns
        ['一等', [['開口 牙喉音', 'e'], ['', 'uo']]],  // Grade 1 patterns
    ]],

    // Dang/Jiang finals (宕江攝)
    ['宕江攝', [
        ['合口 或 莊組 或 二等 知組', 'uang'],  // Rounded, retroflex, or grade 2 retroflex → uang
        ['三四等 或 二等 牙喉音', 'iang'],      // Grade 3-4 or grade 2 velars → iang
        ['', 'ang'],  // Others → ang
    ]],

    // Geng/Zeng finals (梗曾攝)
    ['梗曾攝', [
        ['三四等', [['合口', 'iong'], ['', 'ing']]],  // Grade 3-4: rounded → iong, unrounded → ing
        ['', [['合口', 'ueng'], ['', 'eng']]],         // Others: rounded → ueng, unrounded → eng
    ]],

    // Liu finals (流攝) - complex historical changes
    ['流攝', [
        ['幽韻 幫滂並母', 'iao'],  // You final with labial stops: "彪髟淲" etc
        ['尤韻 脣音 非 (幫母 上聲)', 'u'],  // You final with labials except specific cases
        ['三四等', 'iou'],  // Grade 3-4 → iou
        ['', 'ou'],  // Others → ou
    ]],
], 'no final rule found');

// Final rules for entering tones (checked tones)
const enteringFinalRules = () => when([
    // Tong finals in entering tone
    ['通攝', [['三四等 牙喉音', 'ü'], ['', 'u']]],  // Grade 3-4 velars → ü, others → u

    // Zhen/Shen finals in entering tone
    ['臻深攝', [
        ['莊組', [['合口', 'uai'], ['', 'e']]],  // Retroflex series
        ['三四等', [['合口 或 脣音 C類', 'ü'], ['', 'i']]],  // Grade 3-4 patterns
        ['', [['脣音', 'o'], ['合口', 'u'], ['', 'e']]],  // General patterns
    ]],

    // Shan/Xian finals in entering tone
    ['山咸攝', [
        ['二等 或 莊組 或 脣音 C類', [['合口', 'ua'], ['牙喉音', 'ia'], ['', 'a']]],  // Grade 2 etc
        ['三四等', [['合口', 'üe'], ['', 'ie']]],  // Grade 3-4
        ['', [['開口', [['牙喉音', 'e'], ['', 'a']]], ['', 'uo']]],  // General
    ]],

    // Dang/Jiang finals in entering tone
    ['宕江攝', [
        ['三四等 或 二等 牙喉音', 'üe'],  // Grade 3-4 or grade 2 velars → üe
        ['一等 開口 牙喉音', 'e'],        // Grade 1 unrounded velars → e
        ['', 'uo'],  // Others → uo
    ]],

    // Geng/Zeng finals in entering tone
    ['梗曾攝', [
        ['三四等 非 莊組', [['合口', 'ü'], ['', 'i']]],  // Grade 3-4 non-retroflex
        ['', [['開口', 'e'], ['', 'uo']]],  // General patterns
    ]],
], 'no final rule found');

// Tone rules based on voicing and original tone category
const toneRules = () => when([
    ['清音', [  // Voiceless initials
        ['平聲', '1'],  // Level → tone 1 (yinping)
        ['上聲', '3'],  // Rising → tone 3 (shangsheng)
        ['去聲', '4'],  // Departing → tone 4 (qusheng)
        ['入聲', ''],   // Entering → (handled separately)
    ]],
    ['濁音', [  // Voiced initials
        ['平聲', '2'],  // Level → tone 2 (yangping)
        ['上聲', [['全濁', '4'], ['次濁', '3']]],  // Rising: fully voiced → 4, sonorants → 3
        ['去聲', '4'],  // Departing → tone 4
        ['入聲', [['全濁', '2'], ['次濁', '4']]],  // Entering: fully voiced → 2, sonorants → 4
    ]],
], 'no tone rule found');

// Apply the rules
let initial = initialRules();
let final = is`舒聲` ? smoothFinalRules() : enteringFinalRules();  // Choose final rules based on tone type
let tone = toneRules();

// Handle advanced options
if (hasAdvancedOptions) {
    // Special handling for Chang/Chuan initials in level tone
    if (is`(常母 陰聲韻 或 船母) 平聲`) {
        initial = options.常母平聲陰聲韻聲母和船母平聲聲母;
    }

    // Special tone assignment rules for entering tone with voiceless initials
    if (is`入聲`) {
        switch (options.清聲母入聲調分派層次) {
            case '皆派入上聲':  // All to rising tone
                if (is`清音`) tone = '3';
                break;
            case '皆派入陰平':  // All to yinping
                if (is`清音`) tone = '1';
                break;
            case '次清、擦音和零聲母字派入去聲，其餘派入陽平':  // Aspirated/fricative/zero → departing, others → yangping
                if (is`心生書影曉母 或 次清`) tone = '4';
                else if (is`全清`) tone = '2';
                break;
            case '次清和零聲母字派入去聲，其餘派入陽平':  // Aspirated/zero → departing, others → yangping
                if (is`影母 或 次清`) tone = '4';
                else if (is`全清`) tone = '2';
                break;
            case '連同濁聲母，所有入聲字皆派入去聲':  // All entering tones → departing
                tone = '4';
                break;
        }
    }
}

// Palatalization: derive j, q, x initials
// Occurs before high front vowels and r-colored vowels
if (final === 'er' || ['i', 'ü'].includes(final[0])) {
    initial = { g: 'j', k: 'q', h: 'x' }[initial] ?? initial;  // Velar palatalization
    if (final !== 'er') {
        initial = { z: 'j', c: 'q', s: 'x' }[initial] ?? initial;  // Sibilant palatalization
    }
}

// Handle r-coloring (erhua)
if (final === 'er') {
    if (initial === 'r') {
        initial = '';  // r + er → er (no initial)
    } else {
        final = 'i';   // Non-r + er → i
    }
}

// Systematic sound changes for specific initial-final combinations

// n, l + rounded finals → unrounded (systematic delabialization)
if (['n', 'l'].includes(initial) && ['ua', 'uai', 'uang', 'uei'].includes(final)) {
    final = final.slice(1);  // Remove initial 'u'
}

// ü-finals with n, l → u-finals (systematic derounding)
if (final[0] === 'ü' && ['n', 'l'].includes(initial) && !['ü', 'üe'].includes(final)) {
    final = 'u' + (final[1] === 'n' ? 'e' : '') + final.slice(1);
}

// Systematic changes to "hong" (non-palatal) sounds for certain initials
if (['zh', 'ch', 'sh', 'r', 'f', 'w'].includes(initial)) {
    if (final === 'i') {
        if (initial === 'f' || initial === 'w') {
            final = 'ei';  // f/w + i → ei
        }
    } else if (final[0] === 'i' || final[0] === 'ü') {
        // Convert palatal finals to non-palatal
        final = (final[0] === 'ü' ? 'u' : '') + (final[1] === 'n' ? 'e' : '') + final.slice(1);
        if (final === 'ue') final = 'uo';
        else if (final === 'e' && ['f', 'w'].includes(initial)) final = 'o';
    }
}

// Labial initials + u-finals → unrounded (systematic delabialization)
if (['b', 'p', 'm', 'f', 'w'].includes(initial) && final[0] === 'u' && final[1]) {
    final = final.slice(1);
}

// Pinyin spelling rules for zero initials
if (!initial) {
    if (final[0] === 'i' || final[0] === 'ü') initial = 'y';  // Add y- before i/ü
    if (final[0] === 'u') initial = 'w';  // Add w- before u
    if (initial && final[0] !== 'ü' && final[1] && final[1] !== 'n') {
        final = final.slice(1);  // Remove redundant vowel after added initial
    }
}

// Standard pinyin final spelling adjustments
final = { iou: 'iu', uei: 'ui', uen: 'un', ueng: 'ong' }[final] || final;

// ü → u after non-n/l initials (pinyin convention)
if (final[0] === 'ü' && !['n', 'l'].includes(initial)) {
    final = 'u' + final.slice(1);
}

// Output formatting
if (options.標調方式 === '數字') {
    return initial + final + tone;  // Numeric tone marking
}

// Diacritical tone marking - add tone marks to appropriate vowels
return initial + (tone ? final.replace(/.*a|.*[eo]|.*[iuü]/, '$&' + ' ̄́̌̀'[tone]) : final);
