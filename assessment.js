'use strict';
const userNameInput = document.getElementById('user-name');
userNameInput.onkeydown = (event) => {
    if (event.key === 'Enter') {
        assessmentButton.click();
    }
}
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');
assessmentButton.onclick = () => {

    removeAllChild(resultDivided);

    const userName = userNameInput.value;
    console.log(userName);
    if (userName.length == 0) {
        return;
    }

    // 診断結果表示エリアの作成
    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);
    
    // Tweetエリアの作成
    removeAllChild(tweetDivided);
    const anchor = document.createElement('a');
    const hrefValue = "https://twitter.com/intent/tweet?button_hashtag="
        + encodeURIComponent('あなたのいいところ'); 
        + "&ref_src=twsrc%5Etfw";
    
    anchor.setAttribute('href', hrefValue);
    anchor.setAttribute('class', "twitter-hashtag-button");
    anchor.setAttribute('data-text', result);
    anchor.innerHTML = ('Tweet #あなたのいいところ');

    const script = document.createElement('script');
    script.setAttribute('src', "https://platform.twitter.com/widgets.js");
    script.setAttribute('charset', "utf-8");
    tweetDivided.appendChild(script);

    tweetDivided.appendChild(anchor);
}
/**
 * 指定した要素の子要素を全て削除する。
 * @param {HTMLElement} element 
 */
function removeAllChild(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}


const answers = [
  '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
  '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
  '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
  '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
  '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
  '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
  '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
  '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
  '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
  '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
  '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
  '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
  '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
  '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
  '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
  '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
  '{userName}のいいところは優しさです。{userName}の優しい雰囲気や立ち振る舞いに多くの人が癒やされています。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーネーム
 * @return {string} 診断結果
 */
function assessment(userName) {
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++) {
        sumOfCharCode += userName.charCodeAt(i);
    }
    console.log('somOfCharCode is ' + sumOfCharCode);
    // 文字のコード番号の合計を回答の数で割って添字の数字を求める。
    let num = sumOfCharCode % answers.length;
    console.log('num is ' + num);

    let result = answers[num];
    result = result.replace(/{userName}/g, userName);



    return result;
}

console.log(assessment('太郎'));
console.log(assessment('nanakop'));
console.assert(
    assessment('太郎') === assessment('太郎'),
    '診断結果の誤り'
);

