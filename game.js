$(function() {    

    for (let i = 0; i < 8 ; i++) {
        list = [];
        for (let y = 0; y < 8 ; y++) {
            var id = ("#"+i+"_"+y);
            $(id).addClass('bg-cold');
            var odd = ((i+y)%2);
            if(odd == 0){
                $(id).addClass('bg-dark dark-box');
            }else{
                $(id).addClass('bg-light light-box');
            }
        list.push(id);
        } 
      }

    function axis_to_id( arr ) {
        list = [];
        for (const  i of  arr['x'] ){
            for (const y of arr['y']){
                id =  ('#'+ i +"_" + y);
                list.push(id);
            }
        }
        return list;    
    }
    
    $('.black , .white').on('click', function(){

        var restore_element = $('.chess-line div');
        if(restore_element.hasClass("bg-to-play")){
            restore_element.each(function( ) {
            if($(this).hasClass("dark-box")){
                $(this).removeClass('bg-to-play');
                $(this).addClass('bg-dark');
            }
            if($(this).hasClass("light-box")){
                $(this).removeClass('bg-to-play');
                $(this).addClass('bg-light');
            }
            });
        }

        var selected_id =  this.id;
        var selected_class = this.className;
        chess_element = [];
        var element =  selected_id.split('_');
        chess_element['pawn'] = element[0];
        chess_element['position'] = element[1];
        var parent_id = $(this).parent().attr('id');
        parent_id = parent_id.split('_');
        axis  = [];
        axis['x'] = parent_id[0];
        axis['y'] = parent_id[1];
        if(selected_class == "white"){
            if(chess_element['pawn'] == "pawn"){
                possible_play_axis = [];
                possible_play_axis['y'] = axis['y']; 
                possible_play_axis['x'] = [axis['x'] - 1 , axis['x'] - 2];
                possible_play_id = [];
                possible_play_id = axis_to_id(possible_play_axis);
                for ( const yx of possible_play_id){
                    if($(yx).hasClass("dark-box")){
                        $(yx).toggleClass("bg-dark bg-to-play");
                    }else{
                        $(yx).toggleClass("bg-light bg-to-play");
                    }
                }
            }
        }
       
        // else if selected black !!! Do not forget
       
        $('.bg-to-play').on('click',function(){
            $("#"+selected_id).hide().prependTo("#"+this.id).fadeIn();
            for ( const yx of possible_play_id){
                if($(yx).hasClass("dark-box")){
                    $(yx).toggleClass("bg-dark bg-to-play");
                }else{
                    $(yx).toggleClass("bg-light bg-to-play");
                }
            }
        })
    })
});

