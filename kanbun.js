const brackets = {
    '(': ')', // furigana
    '[': ']', // okurigana (these brackets can be omitted)
    '{': '}', // kaeriten
    '‹': '›', // furigana for saidokumoji
    '«': '»', // okurigana for saidokumoji
};
const leftBrackets = Object.keys(brackets);
const rightBrackets = Object.values(brackets);
const leftBracketsStr = '\\' + leftBrackets.join('\\');
const rightBracketsStr = '\\' + rightBrackets.join('\\');
const otherBrackets = {
    '⌊': '⌋', // kanji / ruby base
    '‘': '’', // multiple kanji as a single ruby base
    '“': '”', // unit (usually contains only one kanji)
};

function isKana(str) {
    let code = str.charCodeAt();
    if (str === '・') return false; // ・ is in the katakana block but treated as punctuation here
    if (parseInt('3040', 16) <= code && code <= parseInt('30FF', 16)) return true; // Hiragana & Katakana
    if (parseInt('31F0', 16) <= code && code <= parseInt('31FF', 16)) return true; // Katakana Phonetic Extensions
    if (parseInt('FF66', 16) <= code && code <= parseInt('FF9F', 16)) return true; // Halfwidth Katakana
    return false;
}

function toHTML(str) {
    let arr = str.split('');
    for (let i = 0, lastBracketIndex = -1; i < arr.length; i++) {
        if (leftBrackets.includes(arr[i])) lastBracketIndex = i;
        if (lastBracketIndex === -1) {
            if (isKana(arr[i])) arr[i] = `{${arr[i]}}`;
            else arr[i] = `“⌊${arr[i]}⌋”`;
        }
        if (rightBrackets.includes(arr[i])) lastBracketIndex = -1;
    }
    str = arr.join('');
    str = str.replace(/}{/g, '');
    str = str.replace(new RegExp(`”([${leftBracketsStr}])`, 'g'), '$1');
    str = str.replace(new RegExp(`([${rightBracketsStr}])(“)`, 'g'), '$1”$2');
    str = str.replace(/”“⌊([―・、，。「」])⌋/g, '<span class="kunten punctuation">$1</span>');
    str = str.replace(/(punctuation">―)/g, 'dash $1');

    str = str.replace(/“([^”\(\)]*”)/g, '<span class="unit">$1#'); // no furigana, use no <ruby>; use ”# as a non-ruby closing mark
    str = str.replace(/“/g, '<ruby class="unit">');
    str = str.replace(/(unit">[^”]*\()/g, 'has-furigana $1');
    str = str.replace(/(unit">[^”]*\([^\)][^\)]?\))/g, 'has-less-than-3-furigana $1');
    str = str.replace(/(unit">[^”]*”[^”]*has-furigana)/g, 'next-unit-has-furigana $1');
    str = str.replace(/(unit">[^”]*\{)/g, 'has-okurigana $1');
    str = str.replace(/⌊([^”]*”#)/g, '<span class="kanji">$1'); // non-ruby
    str = str.replace(/⌋([^”]*”#)/g, '</span>$1'); // non-ruby
    str = str.replace(/⌊/g, '<rb class="kanji">');
    str = str.replace(/⌋/g, '</rb>');

    str = str.replace(/\(/g, '<rt class="furigana">');
    str = str.replace(/\)/g, '</rt>');
    //str = str.replace(/<ruby><rb>’/g, '');
    //str = str.replace(/‘/g, '<ruby class="multiple-kanji"><rb>');
    str = str.replace(/\{/g, '<span class="kunten okurigana"><sup>');
    str = str.replace(/\}/g, '</sup></span>');

    str = str.replace(/‹/g, '<span class="kunten has-furigana saidoku"><sub class="saidoku-furigana">');
    str = str.replace(/(saidoku">[^›]*)›«/g, 'has-okurigana $1</sub><sub class="saidoku-okurigana">');
    str = str.replace(/«/g, '<span class="kunten has-okurigana saidoku"><sub class="saidoku-okurigana">');
    str = str.replace(/[›»]/g, '</sub></span>');

    str = str.replace(/\[(.)\]/g, '<span class="kunten kaeriten"><sub>$1</sub></span>');
    str = str.replace(/\[(.)(レ)\]/g, '<span class="kunten kaeriten"><sub>$1</sub><sub>$2</sub></span>');
    str = str.replace(/(kaeriten"><sub)(>一)/g, '$1 class="ichiten"$2');

    str = str.replace(/”#/g, '</span>');
    str = str.replace(/”/g, '</ruby>');
    return str;
}

function convertKanbunDiv(div) {
    div.childNodes.forEach(function (p) { p.innerHTML = toHTML(p.textContent); });
}
