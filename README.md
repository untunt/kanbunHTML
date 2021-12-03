# kanbunHTML

This is a 漢文訓読<sub>_kanbun-kundoku_</sub> HTML display solution (maybe the best solution) supporting both アキ組<sub>_akigumi_</sub> and ベタ組<sub>_betagumi_</sub> typesetting. It converts annotated kanbun text to HTML and displays it.

An example converter: [phesoca.com/kanbun-html/](https://phesoca.com/kanbunhtml/).

## Usage

```html
<link href="kanbun.css" rel="stylesheet" />
<script src="kanbun.js"></script>
<div class="kanbun okurigana-sinking" id="sample">
  <p>感ジテハ[レ]時ニ花ニモ濺(そそ)ギ[レ]淚ヲ，恨ミデハ[レ]別レヲ鳥ニモ驚カス[レ]心ヲ。</p>
  <p>孤之有ルハ[二]孔明[一]，猶ホ‹ごと›«キ»[二]魚之有ルガ[一レ]水也。</p>
</div>
<script>convertKanbunDiv(document.getElementById("sample"));</script>
```

Put annotated kanbun paragraphs in a `<div>`, and call `convertKanbunDiv()` to convert them to HTML.

## Kanbun Annotation

Different components after kanji are annotated by different brackets:

- `( )`: 振り仮名<sub>_furigana_</sub>
- `{ }`: 送り仮名<sub>_okurigana_</sub> (these brackets can be omitted)
- `‹ ›`: 振り仮名<sub>_furigana_</sub> for 再読文字<sub>_saidokumoji_</sub>
- `« »`: 送り仮名<sub>_okurigana_</sub> for 再読文字<sub>_saidokumoji_</sub>
- `[ ]`: 返り点<sub>_kaeriten_</sub>
- Punctuation (no annotation)

This is the recommended order of components after one kanji in kanbun annotation. However, in practice, they will be displayed correctly in any order.

## Class Description

Several class values can be given to the kanbun `<div>`:

- `kanbun`: Use kanbun style
- `betagumi`: Use ベタ組<sub>_betagumi_</sub> (the default typesetting method is アキ組<sub>_akigumi_</sub>)
- `okurigana-sinking`: Make 送り仮名<sub>_okurigana_</sub> sink 1/4 kanji-height when without 振り仮名<sub>_furigana_</sub>
- `split-touching-kana`: Split adjacent kana of different kanji if they touch with each other (effective only under ベタ組<sub>_betagumi_</sub>)
- `furigana-top-align`: Align 振り仮名<sub>_furigana_</sub> to the center of kanji when without 送り仮名<sub>_okurigana_</sub> (effective only under ベタ組<sub>_betagumi_</sub>)
- `show-borders`: Show borders of elements (for debugging)

## Special Thanks

- [Ng Ching-hung](https://github.com/ngchinghung)
- [三日月綾香](https://github.com/ayaka14732)
- [思無邪SyiMyuZya](https://github.com/syimyuzya)

## References

- 青空文庫. [訓点](https://www.aozora.gr.jp/annotation/kunten.html). 注記一覧, **2012**.
- 青空文庫. [入力-2](https://www.aozora.gr.jp/KOSAKU/MANUAL_3.html). 工作員作業マニュアル, **2012**.
- 小林敏. [漢文の配置処理](https://www.jagat.or.jp/1945-2). 日本語組版とつきあう, **2016**.
  1. [漢文を構成する要素](http://www.jagat.or.jp/archives/20288)
  2. [漢文の句読点や返り点の配置処理](http://www.jagat.or.jp/archives/21315)
  3. [漢文の送り仮名・読み仮名の配置処理](http://www.jagat.or.jp/archives/21747)
- cat_in_136. [如何用HTML5 Complex Ruby寫漢文訓讀文。](https://cat-in-136.github.io/2016/10/writing-kanbun-in-html.html), **2016**.
- kawabata. [漢文訓読JavaScript](https://github.com/kawabata/kanbun-javascript). **2013**. (also [漢字データベースプロジェクト](http://kanji-database.sourceforge.net/software/kanbun.html))
- W3C. [CSS Ruby Annotation Layout Module Level 1](https://www.w3.org/TR/css-ruby-1/). W3C Working Draft, **2021**.
