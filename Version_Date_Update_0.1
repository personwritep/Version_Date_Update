// ==UserScript==
// @name        Version Date Update ⭐
// @namespace        http://tampermonkey.net/
// @version        0.1
// @description        記事中の「バージョン」「更新日付」を記入するツール　「Pause+Alt ➔ F9」
// @author        Ameba Blog User
// @match        https://blog.ameba.jp/ucs/entry/srventry*
// @exclude        https://blog.ameba.jp/ucs/entry/srventrylist.do*
// @icon        https://www.google.com/s2/favicons?sz=64&domain=ameblo.jp
// @grant        none
// @updateURL        https://github.com/personwritep/Version_Date_Update/raw/main/Version_Date_Update.user.js
// @downloadURL        https://github.com/personwritep/Version_Date_Update/raw/main/Version_Date_Update.user.js
// ==/UserScript==


let retry=0;
let interval=setInterval(wait_target, 100);
function wait_target(){
    retry++;
    if(retry>10){ // リトライ制限 10回 1sec
        clearInterval(interval); }
    let target=document.getElementById('cke_1_contents'); // 監視 target
    if(target){
        clearInterval(interval);
        main(); }}




function main(){
    let target=document.getElementById('cke_1_contents'); // 監視 target
    let monitor=new MutationObserver(catch_key);
    monitor.observe(target, {childList: true}); // ショートカット待受け開始

    catch_key();

    function catch_key(){
        document.addEventListener("keydown", check_key); // iframe外のキー取得

        let editor_iframe=document.querySelector('.cke_wysiwyg_frame');
        if(editor_iframe){ // iframe読込みが実行条件
            let iframe_doc=editor_iframe.contentWindow.document;
            iframe_doc.addEventListener("keydown", check_key); } // iframe内のキー取得

        let gate;
        function check_key(event){
            let send=-1;

            if(event.keyCode==19 && event.altKey){ gate=2; } // 「Pause+Alt」キー入力
            if(event.keyCode==120){
                if(gate==2){
                    event.preventDefault(); send=220; }} //「Pause+Alt ➔ F9」のショートカット
            if(event.keyCode !=19){ gate=-1; }

            if(send !=-1){
                event.stopImmediatePropagation();
                set_mark(send); }

        } // check_key

    } // catch_key



    function set_mark(sender){
        if(sender==220){ //「Pause+Alt ➔ F9」バージョン数　更新日付の書換

            let panel=
                '<div id="update_panel">'+
                'Ver No: <input class="ver_num" type="number" min="0.1" step="0.1">'+
                '<input class="up_date" type="submit" value="Date Set">'+
                '<input class="update_reset" type="submit" value="Reset">'+
                '<input class="update_close" type="submit" value="✖">'+
                '<style>'+
                '#update_panel { position: fixed; top: 30vh; left: 20px; z-index: 100; '+
                'padding: 20px; border: 1px solid #aaa; background: #fff; '+
                'font: normal 16px/22px Meiryo; } '+
                '.ver_num { width: 68px; padding: 2px 2px 0 0; text-align: center; } '+
                'input[type=number].ver_num::-webkit-inner-spin-button { '+
                'height: 20px; margin-top: 2px; } '+
                '.up_date { padding: 2px 6px 0; margin: 0 20px; } '+
                '.update_reset { padding: 2px 6px 0; margin: 0 10px; } '+
                '.update_close { padding: 2px 6px 0; } '+
                '</style></div>';

            if(!document.querySelector('#update_panel')){
                document.body.insertAdjacentHTML('beforeend', panel); }



            let editor_iframe=document.querySelector('.cke_wysiwyg_frame');
            if(editor_iframe){
                let iframe_doc=editor_iframe.contentWindow.document;
                if(iframe_doc){

                    let origin0; // 処理前の対象行のデータ type0
                    let origin1; // 処理前の対象行のデータ type1
                    let ver_date_disp; // 処理対象行

                    let datedisp=iframe_doc.querySelector('.update_date'); // 更新対象日付のクラス名
                    if(datedisp){
                        ver_date_disp=datedisp.parentElement;
                        if(ver_date_disp.tagName=="P" || ver_date_disp.tagName=="DIV"){
                            if(ver_date_disp.querySelector('.update_ver')){ // ver表示を持つ更新対象日付表示
                                origin0=ver_date_disp.innerHTML; }
                            else{
                                origin0='';
                                origin1=datedisp.innerHTML; }} // ver表示を伴わない更新対象日付表示
                        else{
                            origin0='';
                            origin1=datedisp.innerHTML; } // ver表示を伴わない更新対象日付表示

                        datedisp.scrollIntoView({ block: "center" }); } // if(datedisp)
                    else{ // 更新対象日付のクラス名を指定した日付表示が無い場合
                        origin0=''; }



                    let ver_num=document.querySelector('#update_panel .ver_num');
                    if(ver_num){
                        if(origin0!=''){
                            let update_ver=ver_date_disp.querySelector('.update_ver');
                            let version=parseFloat(update_ver.textContent.replace('ver.', ''));

                            if(version){ // 少数表示でないver表記は非対応
                                ver_num.value=version.toFixed(1);

                                ver_num.onchange=function(){
                                    let new_ver=(ver_num.value/1).toFixed(1);
                                    ver_num.value=new_ver;
                                    update_ver.textContent='ver.'+ new_ver; }}}
                        else{
                            ver_num.disabled=true;
                            ver_num.style.opacity='0.5'; }}



                    let up_date=document.querySelector('#update_panel .up_date');
                    if(up_date){
                        let datedisp=iframe_doc.querySelector('.update_date'); // 更新対象日付のクラス名
                        if(datedisp){
                            up_date.onclick=()=>{
                                let date=new Date();
                                let year=date.getFullYear();
                                let month=date.getMonth()+1;
                                let day=date.getDate();

                                let d_str=datedisp.textContent;
                                if(d_str.includes('年') || d_str.includes('月') || d_str.includes('日')){ // 年月日表示
                                    let index=d_str.search(/[0-9]/);
                                    let base_str=d_str.replace(/[0-9]|[年月日]/g, '');
                                    let top_str=base_str.slice(0, index);
                                    let end_str=base_str.slice(index);
                                    datedisp.textContent=
                                        top_str+ year +'年'+ month +'月'+ day +'日'+ end_str; }

                                else if(d_str.includes('.')){ // ドット繋ぎ表示
                                    let index=d_str.search(/[0-9]/);
                                    let base_str=d_str.replace(/[0-9]|\./g, '');
                                    let top_str=base_str.slice(0, index);
                                    let end_str=base_str.slice(index);
                                    datedisp.textContent=
                                        top_str+
                                        year +'.'+ String(month).padStart(2, '0') +'.'+ String(day).padStart(2, '0')+
                                        end_str; }

                            } // up_date.onclick

                        } // if(datedisp)
                        else{
                            up_date.disabled=true;
                            up_date.style.opacity='0.5'; }

                    } // if(up_date)



                    let update_reset=document.querySelector('#update_panel .update_reset');
                    if(update_reset){
                        update_reset.onclick=()=>{
                            let datedisp=iframe_doc.querySelector('.update_date'); // 更新対象日付のクラス名
                            if(datedisp){
                                if(origin0!=''){ // ver表示を持つ更新対象日付表示
                                    ver_date_disp=datedisp.parentElement;
                                    if(ver_date_disp.tagName=="P" || ver_date_disp.tagName=="DIV"){
                                        ver_date_disp.innerHTML=origin0; }}
                                else{ // ver表示を伴わない更新対象日付表示
                                    datedisp.innerHTML=origin1; }

                            } // if(datedisp)

                            set_mark(220); // スクリプトの再起動

                        } // update_reset.onclick

                    } // if(update_reset)



                    let update_close=document.querySelector('#update_panel .update_close');
                    if(update_close){
                        update_close.onclick=()=>{
                            if(document.querySelector('#update_panel')){
                                document.querySelector('#update_panel').remove(); }}}


                }} // if(editor_iframe)

        } // if(sender==220)

    } // set_mark()

} // main()
