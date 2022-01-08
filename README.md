# kanbunHTML

This is a _kanbun kundoku_ (漢文訓読) HTML display solution (probably the best) supporting both fixed inter-character spacing setting (<span lang="ja" title="akigumi">アキ組</span>) and solid setting (<span lang="ja" title="betagumi">ベタ組</span>) setting. It converts annotated kanbun text to HTML and displays it.

An example converter: [phesoca.com/kanbun-html/](https://phesoca.com/kanbun-html/).

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

- `( )`: _furigana_ (<span lang="ja" title="furigana">振り仮名</span>)
- `{ }`: _okurigana_ (<span lang="ja" title="okurigana">送り仮名</span>) (these brackets can be omitted)
- `‹ ›`: _furigana_ (<span lang="ja" title="furigana">振り仮名</span>) of _saidokumoji_ (<span lang="ja" title="saidokumoji">再読文字</span>)
- `« »`: _okurigana_ (<span lang="ja" title="okurigana">送り仮名</span>) of _saidokumoji_ (<span lang="ja" title="saidokumoji">再読文字</span>)
- `[ ]`: _kaeriten_ (<span lang="ja" title="kaeriten">返り点</span>)
- Punctuation (no annotation)

This is the recommended order of components after one kanji in kanbun annotation. However, in practice, they will be displayed correctly in any order.

## Class Description

Several class values can be given to the kanbun `<div>`:

- `kanbun`: Display in kanbun style
- `betagumi`: Use solid setting (<span lang="ja" title="betagumi">ベタ組</span>) (the default is fixed inter-character spacing setting (<span lang="ja" title="akigumi">アキ組</span>))
- `okurigana-sinking`: Make _okurigana_ (<span lang="ja" title="okurigana">送り仮名</span>) sink 1/4 em height when without _furigana_ (<span lang="ja" title="furigana">振り仮名</span>)
- `split-touching-kana`: When using solid setting (<span lang="ja" title="betagumi">ベタ組</span>), insert 1/2 em spacing between two adjacent kanji if their kana touch with each other
- `furigana-top-align`: When using solid setting (<span lang="ja" title="betagumi">ベタ組</span>), align _furigana_ (<span lang="ja" title="furigana">振り仮名</span>) to the center of kanji when without _okurigana_ (<span lang="ja" title="okurigana">送り仮名</span>)
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
- Elika J. Etemad, et al. [CSS Ruby Annotation Layout Module Level 1](https://www.w3.org/TR/css-ruby-1/). W3C Working Draft, **2021**.
- 千葉弘幸, et al. [日本語組版処理の要件](https://www.w3.org/TR/jlreq/). W3C Working Group Note, **2020**.
