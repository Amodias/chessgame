import {get_possible_play_id} from './game.js' ;
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
    var player_side = "";
    function select_side(){
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
    set_bg();
    show_tooltip();
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
                                $("#"+selected_id).hide().prependTo("#"+$this.attr('id')).fadeIn();
                                set_bg();
                                $(yx).off('click');
                                bool_play_once = false ;
                                player_side = switch_player_side(player_side);
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
