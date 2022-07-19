function axis_to_id( arr ) {
   var list = [];
    for (const  i of  arr['x'] ){
        for (const y of arr['y']){
            var id =  ('#'+ i +"_" + y);
            list.push(id);
        }
    }
    return list;    
}


export function get_possible_play_id(chess_pawn , chess_side ,axisx ,axisy ){
    if(chess_pawn == "pawn"){

        var possible_move_axis = [];
        var possible_eat_axis = [] ;
        var possible_play_id = [];
        var possible_move_id = [];
        
        // Checker s'il peut manger : 
        possible_eat_axis['y']=[parseInt(axisy) - parseInt(1) , parseInt(axisy) + parseInt(1)];
        if(chess_side == "w"){
            possible_eat_axis['x']=[parseInt(axisx) - parseInt(1)];        
        }
        if(chess_side == "b"){
            possible_eat_axis['x']=[parseInt(axisx) + parseInt(1)];        
        }    
        var possible_eat_id =  axis_to_id(possible_eat_axis);
        for ( const yexe of possible_eat_id){
            if( $(yexe).children().length != 0 ){
                var id_pawn_to_eat = $(yexe).children(":first").attr('id');
                var element_pte =  id_pawn_to_eat.split('_');
                var side = element_pte[1];
                if(side != chess_side){
                    possible_play_id.push(yexe);
                    // bool_kill = true ;
                }
            }    
        }
        
        // mouvment simple du pwan : 
        possible_move_axis['y'] = axisy; 
        
        if(chess_side == "w"){
            possible_move_axis['x'] = [parseInt(axisx) - parseInt(1) , parseInt(axisx) - parseInt(2)];
        }
        if(chess_side == "b"){
            possible_move_axis['x'] = [parseInt(axisx) + parseInt(1) , parseInt(axisx) + parseInt(2)];
        }
        
        possible_move_id = axis_to_id(possible_move_axis);
        // contrainte d'ecrasment & de depassment
         
        var move = true ;
        possible_move_id.forEach((ymxm,index) => {
            if(index==0 ){
                if($(ymxm).children().length == 0){
                    move = true ;
                    possible_play_id.push(ymxm);
                }else{
                    move = false ;
                }
            }else{
                if(move && $(ymxm).children().length == 0){
                    possible_play_id.push(ymxm);
                }
            } 
              });
            }
            else{
                possible_play_id = [];
            }
            return possible_play_id ;
};

export function movepawn(){
    
}