/***************************************
 * マウスアクション
 ***************************************/

//グローバル変数としてcanvas定義
const c = document.getElementById('e_click');
const ctx = c.getContext('2d');

var w = c.width;
var h = c.height;

var pos_lu = [];
var pos_ld = [];
var pos_ru = [];
var pos_rd = [];

//現在位置を配列で返す
function pos(e) {
    var x, y, region;
    x = e.clientX - c.getBoundingClientRect().left;
    y = e.clientY - c.getBoundingClientRect().top;

    //小数点以下の切り捨て
    x = Math.floor(x);
    y = Math.floor(y);

    region = judgeRegion(x,y);

    draw();

    return [x, y, region];
}

//どの領域クリックしたか判定
function judgeRegion(x,y){
  if(x < w/2){
    if(y < h/2){
      pos_lu[0] = x;
      pos_lu[1] = y;
      return 0;
    }else{
      pos_ld[0] = x;
      pos_ld[1] = y;
      return 1;
    }
  }else{
    if(y < h/2){
      pos_ru[0] = x;
      pos_ru[1] = y;
      return 2;
    }else{
      pos_rd[0] = x;
      pos_rd[1] = y;
      return 3;
    }
  }
}

//座標を表示させるための文字列作成
function strPair(pos) {
    return ' (' + pos[0] + ', ' + pos[1] + ')' + ' ' + pos[2]
}

//メッセージを"messageに出力"
function showMessage(message) {
    var current = document.getElementById("message").textContent;
    message = current + '\n' + message;
    document.getElementById("message").innerHTML = message;
}

function draw() {
    ctx.clearRect(0, 0, w, h);

    drawRegion();

    drawCorner(pos_lu[0], pos_lu[1]);
    drawCorner(pos_ld[0], pos_ld[1]);
    drawCorner(pos_ru[0], pos_ru[1]);
    drawCorner(pos_rd[0], pos_rd[1]);
}

function drawRegion(){
  // 線の色
  ctx.strokeStyle = "red" ;
  // 線の太さ
  ctx.lineWidth = 1 ;

  // パスをリセット
  ctx.beginPath () ;
  // 線を引くスタート地点に移動
  ctx.moveTo( 0, h/2 ) ;
  // スタート地点から(200,200)まで線を引く
  ctx.lineTo( w, h/2 )
  // 線を描画する
  ctx.stroke() ;

  // パスをリセット
  ctx.beginPath () ;
  // 線を引くスタート地点に移動
  ctx.moveTo( w/2, 0 ) ;
  // スタート地点から(200,200)まで線を引く
  ctx.lineTo( w/2, h );
  // 線を描画する
  ctx.stroke();
}

function drawCorner(x,y){
  ctx.lineWidth = 3;
  /* 円の描画 */
  ctx.beginPath(); // パスの初期化
  ctx.arc(x, y, 5, 0, 2 * Math.PI); // (100, 50)の位置に半径30pxの円
  ctx.closePath(); // パスを閉じる
  ctx.fill(); // 軌跡の範囲を塗りつぶす
}

//与えられた座標を出力
function show(num){
  switch (num) {
    case 0:
      alert('(' + pos_lu[0] + ',' + pos_lu[1] + ')');
      break;
    case 1:
      alert('(' + pos_ru[0] + ',' + pos_ru[1] + ')');
      break;
    case 2:
      alert('(' + pos_rd[0] + ',' + pos_rd[1] + ')');
      break;
    case 3:
      alert('(' + pos_ld[0] + ',' + pos_ld[1] + ')');
      break;
  }
}

//canvasアクションの定義なんか
function init() {
    var i, message;
    drawRegion();

    c.addEventListener('click', function(e) {
        showMessage('click' + strPair(pos(e)));
    });
}
