'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivision = document.getElementById('result-area');
const tweetDivision = document.getElementById('tweet-area');

assessmentButton.addEventListener(
  'click',
  function () {
    //  () => {でもokアロー関数
    //console.log('ボタンが押されました');
    const userName = userNameInput.value;
    if (userName.length !== 0) {
      // 名前が空でない場合は処理を継続する
      if (userName.length !== 1) {
        // 名前が 1 文字でない場合は処理を継続する
      } else {
        // 名前が 1 文字の場合は処理を終了する
        const errorParagraph = document.createElement('p');
        errorParagraph.innerText = '名前は2文字以上で入力してください';
        resultDivision.innerText = '';
        resultDivision.appendChild(errorParagraph);
        tweetDivision.innerText = '';
   return;
      }
    } else {
      // 名前が空の時は処理を終了する
      return;
    }
    //userName が false であれば処理を終了させる、 if (!userName) return; のように書くことができます。

        // 診断結果表示エリアの作成
        //子要素を消去するためのやつresultDivision.innerText = '';
        //特定の子要素を削除するためのやつ↓
        while (resultDivision.firstChild) {
          // resultDivision に子要素があれば削除し続ける
          resultDivision.removeChild(resultDivision.firstChild);
        }
/**  　Bootstrap を使ってデザインを修正しない場合
        const header = document.createElement('h3');
        header.innerText = '診断結果';
        resultDivision.appendChild(header);
    
        const paragraph = document.createElement('p');
        const result = assessment(userName);
        paragraph.innerText = result;
        resultDivision.appendChild(paragraph);
        */
    /**　HTMLだと↓と表示される
    <div id="result-area">
  <h3>診断結果</h3>
  <p>あなたのいいところは声です。あなたの特徴的な声は皆を惹きつけ、心に残ります。</p>
</div>
*/


    // headerDivision の作成
    const headerDivision = document.createElement('div');
    headerDivision.setAttribute('class', 'card-header text-bg-primary');
    headerDivision.innerText = '診断結果';

    // bodyDivision の作成
    const bodyDivision = document.createElement('div');
    bodyDivision.setAttribute('class', 'card-body');

    const paragraph = document.createElement('p');
    paragraph.setAttribute('class', 'card-text');
    const result = assessment(userName);
    paragraph.innerText = result;
    bodyDivision.appendChild(paragraph);

    // resultDivision に Bootstrap のスタイルを適用する
    resultDivision.setAttribute('class', 'card');

    // headerDivision と bodyDivision を resultDivision に差し込む
    resultDivision.appendChild(headerDivision);
    resultDivision.appendChild(bodyDivision);

    

    // TODO ツイートエリアの作成
    tweetDivision.innerText = '';
    
    const anchor = document.createElement('a');
    const hrefValue =
     // 'https://twitter.com/intent/tweet?button_hashtag=あなたのいいところ&ref_src=twsrc%5Etfw';
     //hrefValue 変数への代入時にもともと日本語文字列で書かれていた あなたのいいところ の部分を削り、 + を使った文字列結合で、URI エンコードされた あなたのいいところ という文字列を結合しています。
     'https://twitter.com/intent/tweet?button_hashtag=' +
     encodeURIComponent('あなたのいいところ') +
     '&ref_src=twsrc%5Etfw';
    anchor.setAttribute('href', hrefValue);
    anchor.setAttribute('class', 'twitter-hashtag-button');
    //anchor.setAttribute('data-text', '診断結果の文章');  ツイートしたい内容は data-text 属性に設定する必要があります。
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #あなたのいいところ';

    tweetDivision.appendChild(anchor);

    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivision.appendChild(script);
  }
);
//テキストフィールド上で Enter を押すというイベントに反応して、処理が動くようにする
userNameInput.addEventListener(
  'keydown',
  (event) => {
    if(event.code === 'Enter') {
      // TODO Enter が押されたときに実行する処理
      //動かす処理の中で、 assessmentButton に click イベントが起きたと伝えることで、診断処理を動かす
      assessmentButton.dispatchEvent(new Event('click'));
    }
  }
)


const answers = [
  '###userName###のいいところは声です。###userName###の特徴的な声は皆を惹きつけ、心に残ります。',
  '###userName###のいいところはまなざしです。###userName###に見つめられた人は、気になって仕方がないでしょう。',
  '###userName###のいいところは情熱です。###userName###の情熱に周りの人は感化されます。',
  '###userName###のいいところは厳しさです。###userName###の厳しさがものごとをいつも成功に導きます。',
  '###userName###のいいところは知識です。博識な###userName###を多くの人が頼りにしています。',
  '###userName###のいいところはユニークさです。###userName###だけのその特徴が皆を楽しくさせます。',
  '###userName###のいいところは用心深さです。###userName###の洞察に、多くの人が助けられます。',
  '###userName###のいいところは見た目です。内側から溢れ出る###userName###の良さに皆が気を惹かれます。',
  //'###userName###のいいところは決断力です。がする決断にいつも助けられる人がいます。', これを使うとミスだと出る
  '###userName###のいいところは決断力です。###userName###がする決断にいつも助けられる人がいます。',
  '###userName###のいいところは思いやりです。###userName###に気をかけてもらった多くの人が感謝しています。',
  '###userName###のいいところは感受性です。###userName###が感じたことに皆が共感し、わかりあうことができます。',
  '###userName###のいいところは節度です。強引すぎない###userName###の考えに皆が感謝しています。',
  '###userName###のいいところは好奇心です。新しいことに向かっていく###userName###の心構えが多くの人に魅力的に映ります。',
  '###userName###のいいところは気配りです。###userName###の配慮が多くの人を救っています。',
  '###userName###のいいところはその全てです。ありのままの###userName###自身がいいところなのです。',
  '###userName###のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる###userName###が皆から評価されています。'
     '###userName###のいいところは優しさです。###userName###の優しい雰囲気や立ち振る舞いに多くの人が癒やされています。'
];
/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
  // TODO 診断処理を実装する
    // 全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++) {
      sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }
  
    // 文字のコード番号の合計を回答の数で割って添字の数値を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];
    result = result.replaceAll('###userName###', userName);
  return result;
}

// テストを行う関数
function test() {
  console.log('診断結果の文章のテスト');

  //太郎
  console.log('太郎');
  console.assert(
    assessment('太郎') ===
      '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );

  //次郎
  console.log('次郎');
  console.assert(
    assessment('次郎') ===
      '次郎のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる次郎が皆から評価されています。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );

  //花子
  console.log('花子');
  console.assert(
    assessment('花子') ===
      '花子のいいところはまなざしです。花子に見つめられた人は、気になって仕方がないでしょう。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );
  
  console.log('診断結果の文章のテスト終了');

  console.log('同じ名前なら、同じ結果を出力することのテスト');

  console.log('太郎');
  console.assert(
    assessment('太郎') === assessment('太郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
  )

  console.log('次郎');
  console.assert(
    assessment('次郎') === assessment('次郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
  )

  console.log('花子');
  console.assert(
    assessment('花子') === assessment('花子'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
  )
  console.log('同じ名前なら、同じ結果を出力することのテスト終了');
}
test();
