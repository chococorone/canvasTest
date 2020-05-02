/***************************************
 * マウスアクション
 ***************************************/

/*
 * クリックしたところに矩形を描画する
 */
function e_click() {
    var cs = document.getElementById('e_click');
    var ctx = cs.getContext('2d');
    var w = cs.width;
    var h = cs.height;
    var x = 0;
    var y = 0;

    function onClick(e) {
        /*
         * rectでcanvasの絶対座標位置を取得し、
         * クリック座標であるe.clientX,e.clientYからその分を引く
         * ※クリック座標はdocumentからの位置を返すため
         * ※rectはスクロール量によって値が変わるので、onClick()内でつど定義
         */
        var rect = e.target.getBoundingClientRect();
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;

        draw();
    }

    function draw() {
        ctx.clearRect(0, 0, w, h);
        ctx.fillRect(x, y, 10, 10);
    }

    cs.addEventListener('click', onClick, false);
}
e_click();
