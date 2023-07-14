import {} from '/socket.io/socket.io.js';
import {get_possible_play_id} from './game.js' ;

// Setting up cookies 

export function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
export function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  
export function checkCookie() {
    let user = getCookie("username");
    if (user != "") {
      return true;
    } else {
    return false ;
   }
  } 
export function hey(){
    console.log('hey');
}

function set_bg(){
    for (let i = 0; i < 8 ; i++) {
        for (let y = 0; y < 8 ; y++) {
            var id = ("#"+i+"_"+y);
            var odd = ((i+y)%2);
            $(id).removeClass('bg-to-play kill-effect');
            if(odd == 0){
                $(id).addClass('bg-dark dark-box');
            }else{
                $(id).addClass('bg-light light-box');
            }
        } 
    }
}

function show_tooltip(){
    for (let i = 0; i < 8 ; i++) {
        for (let y = 0; y < 8 ; y++) {
            var id = ("#"+i+"_"+y);
            $(id).attr('title',id + ' ' +$(id).attr("class"));
        } 
    }
}

function switch_player_side(player_side){
    if(player_side == "w"){
        player_side = "b"
    }else{
        player_side ="w"
    }
    return player_side;
}


$( document ).ready(function() {
    var socket , username ,room;

    if(checkCookie()){
        username = getCookie("username");
        socket = io('', {query: {username : username}});
        
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        room = urlParams.get('roomid');
        socket.emit('createroom', room);
      }else{
        window.location.href = '';
      }
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    room = urlParams.get('roomid');
    var player_side = "";
    socket.on('side', side => {
        player_side = side;
        console.log(player_side);
    });
    /*function select_side(){
        $('.game-box').css('filter',' blur(4px)');
        $('#select_side_model').modal({backdrop: 'static', keyboard: false})
        $('.modal').appendTo('#Game');
    } 
    $('.btn-select-side').on('click',function(){
        $('.game-box').css('filter',' blur(0px)');
        $('#select_side_model').modal('hide');
         player_side = $(this).children(":first").attr('id');
    })
    setTimeout(select_side, 500);
    */
    set_bg();
    show_tooltip();
    socket.on('applychangepawn', function(idpawn ,idcase){
        $(idcase).empty();
        $('#'+idpawn).hide().prependTo(idcase).fadeIn();
        console.log(idpawn , idcase);
    });
    $('.chess_element').on('click', function(event){
        event.preventDefault();
        var bool_play_once = true;
        var bool_play_same_pawn = false ;
        set_bg();
        var $this = $(this);
        var chess_element = [];
        var selected_id =  $this.attr('id');
        var element =  selected_id.split('_');
        chess_element['pawn'] = element[0];
        chess_element['side'] = element[1];
        chess_element['position'] = element[2];
        if(chess_element['side'] != player_side ){
            return ;
        }
        var parent_id = $this.parent().attr('id');
        var p_id = parent_id.split('_');
        var axis  = [];
        axis['x'] = (p_id[0]);
        axis['y'] = (p_id[1]);
        var possible_play_id = get_possible_play_id(chess_element['pawn'],chess_element['side'],axis['x'],axis['y'],"#"+parent_id);
        if(possible_play_id.length > 0){
             bool_play_same_pawn = true;
        }
                for ( const yx of possible_play_id){
                        if($(yx).hasClass("dark-box")){
                            $(yx).removeClass('bg-dark');
                        }
                        if($(yx).hasClass("light-box")){
                            $(yx).removeClass('bg-light');
                        }
                        if($(yx).children().length != 0){
                            $(yx).addClass('kill-effect');
                        }else{
                            $(yx).addClass('bg-to-play');
                        }
                    if(bool_play_same_pawn){
                        $(yx).on('click',function(event){
                            event.preventDefault();
                            if(bool_play_once){
                                var $this = $(this);
                                $this.empty();
                                socket.emit('changepawn',room , selected_id , yx );
                                socket.emit('changeside',room);
                                player_side = "";
                                $("#"+selected_id).hide().prependTo("#"+$this.attr('id')).fadeIn();
                                set_bg();
                                $(yx).off('click');
                                bool_play_once = false ;
                                //player_side = switch_player_side(player_side);
                            }  
                        })
                    }    
            }      
            bool_play_same_pawn = false;
            show_tooltip();
    })
    
    $('#show_possible_play_id').on('click',function(){
        if(typeof possible_play_id === 'undefined' || possible_play_id === null){
            alert('select a pawn');
        }else{
            alert(possible_play_id);
        }
    });
    $("#restore_class").on('click',function(){
        show_tooltip();
    });

});
