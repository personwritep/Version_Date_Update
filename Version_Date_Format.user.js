// ==UserScript==
// @name        Version Date Format ⭐
// @namespace        http://tampermonkey.net/
// @version        0.1
// @description        マニュアルの「バージョン」「更新日付」の書式変換ツール
// @author        Ameba Blog User
// @match        https://blog.ameba.jp/ucs/entry/srventry*
// @exclude        https://blog.ameba.jp/ucs/entry/srventrylist.do*
// @icon        https://www.google.com/s2/favicons?sz=64&domain=ameblo.jp
// @grant        none
// @updateURL        https://github.com/personwritep/Version_Date_Update/raw/main/Version_Date_Format.user.js
// @downloadURL        https://github.com/personwritep/Version_Date_Update/raw/main/Version_Date_Format.user.js
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
    let origin; // 変換前のデータ

    let target=document.getElementById('cke_1_contents'); // 監視 target
    let monitor=new MutationObserver(get_ver_date);
    monitor.observe(target, {childList: true}); // ショートカット待受け開始

    get_ver_date();


    function get_ver_date(){
        let editor_iframe=document.querySelector('.cke_wysiwyg_frame');
        if(editor_iframe){
            let iframe_doc=editor_iframe.contentWindow.document;
            if(iframe_doc){

                iframe_doc.onclick=function(event){
                    let elem=iframe_doc.elementFromPoint(event.clientX, event.clientY);
                    if(elem){
                        if(elem.tagName=="P"){
                            origin=elem.outerHTML; // 変換前のデータ
                            let last_ver='';
                            let last_update='';

                            let ver_index=elem.textContent.indexOf('ver.');
                            let ver_disp=elem.textContent.substr(ver_index, 10);
                            if(ver_disp){
                                last_ver=parseFloat(ver_disp.replace('ver.', '')).toFixed(1); }

                            let year_disp=elem.textContent.match(/\b\d{4}\b/g);
                            let date_index=elem.textContent.indexOf(year_disp);
                            let date_disp=elem.textContent.substr(date_index, 10);
                            if(date_disp){
                                if(date_disp.includes('年')){ // 年月日表示
                                    let year=date_disp.split('年')[0];
                                    let month=date_disp.split('年')[1].split('月')[0];
                                    let day=date_disp.split('月')[1].split('日')[0];
                                    last_update=year +'.'+ month.padStart(2, '0') +'.'+ day.padStart(2, '0'); }
                                else{ // ドット表示
                                    let all=date_disp.split('.');
                                    let year=all[0];
                                    let month=all[1];
                                    let day=all[2].replace(/[^0-9]/g, '');
                                    last_update=year +'.'+ month.padStart(2, '0') +'.'+ day.padStart(2, '0'); }

                                if(last_ver!='' && last_update!=''){ // 変換ツールの起動条件
                                    disp_panel(elem, last_ver, last_update); }

                            }}}

                } // iframe_doc.onclick

            }}}



    function disp_panel(elem, last_ver, last_update){
        let panel=
            '<div id="rewrite_panel">'+
            '<input class="renew_text" type="text">'+
            '<input class="rewrite" type="submit" value="Rewrite">'+
            '<input class="reset" type="submit" value="Reset">'+
            '<input class="close" type="submit" value="✖">'+
            '<style>'+
            '#rewrite_panel { position: fixed; top: 30vh; left: 20px; z-index: 100; '+
            'padding: 20px; border: 1px solid #aaa; background: #fff; '+
            'font: normal 16px/22px Meiryo; } '+
            '.renew_text { width: 300px; padding: 2px 12px 0; } '+
            '.rewrite { padding: 2px 6px 0; margin: 0 20px; } '+
            '.reset { padding: 2px 6px 0; margin: 0 10px; } '+
            '.close { padding: 2px 6px 0; } '+
            '</style></div>';

        if(!document.querySelector('#rewrite_panel')){
            document.body.insertAdjacentHTML('beforeend', panel); }

        let renew_text=document.querySelector('#rewrite_panel .renew_text');
        if(renew_text){
            renew_text.value='ver.'+ last_ver +' 以降に対応　'+ last_update +' 更新'; }



        let rewrite=document.querySelector('#rewrite_panel .rewrite');
        if(rewrite){
            rewrite.onclick=()=>{
                let new_data=
                    '<p style="text-align: right; padding: .5em 1.5em 0;">'+
                    '<span class="update_ver">ver.'+ last_ver +'</span> 以降に対応　'+
                    '<span class="update_date">'+ last_update +'</span> 更新</p>';

                elem.outerHTML=new_data; }}


        let reset=document.querySelector('#rewrite_panel .reset');
        if(reset){
            reset.onclick=()=>{
                let editor_iframe=document.querySelector('.cke_wysiwyg_frame');
                if(editor_iframe){
                    let iframe_doc=editor_iframe.contentWindow.document;
                    if(iframe_doc){
                        let date_span=iframe_doc.querySelector('.update_date');
                        if(date_span){
                            let new_elem=date_span.closest('p');
                            if(new_elem){
                                new_elem.outerHTML=origin; }}}}}}



        let close=document.querySelector('#rewrite_panel .close');
        if(close){
            close.onclick=()=>{
                if(document.querySelector('#rewrite_panel')){
                    document.querySelector('#rewrite_panel').remove(); }}}

    } // disp_panel

} // main()
