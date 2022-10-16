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

function removeItemAll(arr, value) {
    var i = 0;
    while (i < arr.length) {
      if (arr[i] === value) {
        arr.splice(i, 1);
      } else {
        ++i;
      }
    }
    return arr;
  }
export function get_possible_play_id(chess_pawn , chess_side ,axisx ,axisy ,selected_id){
    // ♙
    if(chess_pawn == "pawn")
    {
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
    // ♖
    else if(chess_pawn == "rook")
    {
        var possible_move_axis = [];
        var possible_eat_axis = [] ;
        var possible_play_id = [];
        var possible_move_id = [];
        
       // mouvment simple du pwan :
        var arr = []    ;
        for (let i = 0; i < 8; i++) {
            arr.push(i);
        } 
        possible_move_axis['y'] = axisy;
        possible_move_axis['x'] = arr; 
        possible_move_id = axis_to_id(possible_move_axis);
        possible_move_axis['x'] = axisx;
        possible_move_axis['y'] = arr; 
        possible_move_id = possible_move_id.concat(axis_to_id(possible_move_axis));
        possible_play_id = removeItemAll(possible_move_id,selected_id);
        var id_to_ommit = [];
        
        // contrainte d'ecrasment & de depassment :
        //4 directions of the rook:
        function dir_of_rook(xv , yv , xk ,yk){
            var direction ;
            if(xv == xk && yv < yk){
                direction = "l";
            }
            if(xv == xk && yv > yk){
                direction = "r";
            }
            if(yv == yk && xv < xk){
                direction = "u";
            }
            if(yv == yk && xv > xk){
                direction = "d";
            }
            return direction;
        }

        for ( const yexe of possible_play_id){
            if( $(yexe).children().length != 0 ){
                var id_pawn_to_eat = $(yexe).children(":first").attr('id');
                var element_pte =  id_pawn_to_eat.split('_');
                var side = element_pte[1];
                var axis_victim = yexe.split('_');
                var avy = (axis_victim[0]);
                avy = avy.split('#');
                avy = avy[1];
                var avx = (axis_victim[1]);
                var dir = dir_of_rook( avy, avx ,axisx ,axisy);
                

                if(dir == "d"){
                    for( let i = parseInt(avy) +1 ;  i < 8 ; i ++){
                        id_to_ommit.push("#"+i+"_"+avx);
                        if(chess_side == side){
                            id_to_ommit.push(yexe);
                        }
                    }
                }
                if(dir == "r"){
                    for( let i = parseInt(avx) + 1 ;  i < 8 ; i ++){
                        id_to_ommit.push("#"+avy+"_"+i);
                        if(chess_side == side){
                            id_to_ommit.push(yexe);
                        }
                    }
                }
                if(dir == "u"){
                    for( let i = parseInt(avy)  ;  i >= 0 ; i --){
                        id_to_ommit.push("#"+i+"_"+avx);
                        if(chess_side != side){
                            id_to_ommit = removeItemAll(id_to_ommit,yexe);
                        }
                    }
                }
                if(dir == "l"){
                    for( let i = parseInt(avx)   ;  i >= 0 ; i --){
                        id_to_ommit.push("#"+avy+"_"+i);
                        if(chess_side != side){
                            id_to_ommit = removeItemAll(id_to_ommit,yexe);
                        }
                    }
                }
    
            }    
        }
        for (const ij of id_to_ommit){
            possible_play_id = removeItemAll(possible_play_id,ij);
        }
        
    }
    // ♘
    else if(chess_pawn == "knight"){
        var possible_move_axis = [];
        var possible_eat_axis = [] ;
        var possible_play_id = [];
        var possible_move_id = [];
        
       // mouvment simple du pwan :
       possible_move_axis['x'] = [parseInt(axisx) + parseInt(1)];
       possible_move_axis['y'] = [parseInt(axisy) + parseInt(2)];
       possible_move_id = possible_move_id.concat(axis_to_id(possible_move_axis));
       
       possible_move_axis['x'] = [parseInt(axisx) - parseInt(1)];
       possible_move_axis['y'] = [parseInt(axisy) - parseInt(2)];
       possible_move_id = possible_move_id.concat(axis_to_id(possible_move_axis));

       possible_move_axis['y'] = [parseInt(axisy) + parseInt(1)];
       possible_move_axis['x'] = [parseInt(axisx) + parseInt(2)];
       possible_move_id = possible_move_id.concat(axis_to_id(possible_move_axis));
       
       possible_move_axis['y'] = [parseInt(axisy) - parseInt(1)];
       possible_move_axis['x'] = [parseInt(axisx) - parseInt(2)];
       possible_move_id = possible_move_id.concat(axis_to_id(possible_move_axis));
       
       possible_move_axis['x'] = [parseInt(axisx) - parseInt(1)];
       possible_move_axis['y'] = [parseInt(axisy) + parseInt(2)];
       possible_move_id = possible_move_id.concat(axis_to_id(possible_move_axis));
       
       possible_move_axis['x'] = [parseInt(axisx) + parseInt(1)];
       possible_move_axis['y'] = [parseInt(axisy) - parseInt(2)];
       possible_move_id = possible_move_id.concat(axis_to_id(possible_move_axis));

       possible_move_axis['y'] = [parseInt(axisy) - parseInt(1)];
       possible_move_axis['x'] = [parseInt(axisx) + parseInt(2)];
       possible_move_id = possible_move_id.concat(axis_to_id(possible_move_axis));
       
       possible_move_axis['y'] = [parseInt(axisy) + parseInt(1)];
       possible_move_axis['x'] = [parseInt(axisx) - parseInt(2)];
       possible_move_id = possible_move_id.concat(axis_to_id(possible_move_axis));
       
        
        possible_move_id.forEach((ymxm,index) => {
            if( $(ymxm).children().length != 0 ){
                var id_pawn_to_eat = $(ymxm).children(":first").attr('id');
                var element_pte =  id_pawn_to_eat.split('_');
                var side = element_pte[1];
                if(side != chess_side){
                    possible_play_id.push(ymxm);
                }
            }else{
                possible_play_id.push(ymxm);

            }    
        });

    }
    // ♗
    else if(chess_pawn == "bishop"){
        var possible_move_axis = [];
        var possible_eat_axis = [] ;
        var possible_play_id = [];
        var possible_move_id = [];
        var id_to_ommit = [];
        var yexe;
       // mouvment simple du pwan :
        var arr = []    ;
        let i = parseInt(axisx);
        let y = parseInt(axisy);
        while ( i > 0 &&  y > 0 ) {
            possible_move_axis['x'] = [i - 1];
            possible_move_axis['y'] = [y - 1]; 
            possible_move_id = possible_move_id.concat(axis_to_id(possible_move_axis));
            i--;
            y--;
            yexe = axis_to_id(possible_move_axis);
            yexe = yexe[0];
            if( $(yexe).children().length != 0 ){
                var id_pawn_to_eat = $(yexe).children(":first").attr('id');
                var element_pte =  id_pawn_to_eat.split('_');
                var side = element_pte[1];
                if(chess_side == side){
                    id_to_ommit.push(yexe);
                }
            }
            if( $(yexe).children().length != 0 ) break;
        }
        i = parseInt(axisx);
        y = parseInt(axisy);
        while ( i < 8 &&  y > 0 ) {
            possible_move_axis['x'] = [i + 1];
            possible_move_axis['y'] = [y - 1]; 
            possible_move_id = possible_move_id.concat(axis_to_id(possible_move_axis));
            i++;
            y--;
            yexe = axis_to_id(possible_move_axis);
            yexe = yexe[0];
            if( $(yexe).children().length != 0 ){
                var id_pawn_to_eat = $(yexe).children(":first").attr('id');
                var element_pte =  id_pawn_to_eat.split('_');
                var side = element_pte[1];
                if(chess_side == side){
                    id_to_ommit.push(yexe);
                }
                
            }
            if( $(yexe).children().length != 0 ) break;
            
        } 
        
        i = parseInt(axisx);
        y = parseInt(axisy);
        while ( i > 0 &&  y < 8 ) {
            possible_move_axis['x'] = [i - 1];
            possible_move_axis['y'] = [y + 1]; 
            possible_move_id = possible_move_id.concat(axis_to_id(possible_move_axis));
            i--;
            y++;
            yexe = axis_to_id(possible_move_axis);
            yexe = yexe[0];
            if( $(yexe).children().length != 0 ){
                var id_pawn_to_eat = $(yexe).children(":first").attr('id');
                var element_pte =  id_pawn_to_eat.split('_');
                var side = element_pte[1];
                if(chess_side == side){
                    id_to_ommit.push(yexe);
                }
                
            }
            if( $(yexe).children().length != 0 ) break;

        } 
       i = parseInt(axisx);
       y = parseInt(axisy);
        while ( i < 8 &&  y < 8 ) {
            possible_move_axis['x'] = [i + 1];
            possible_move_axis['y'] = [y + 1]; 
            possible_move_id = possible_move_id.concat(axis_to_id(possible_move_axis));
            i++;
            y++;
            yexe = axis_to_id(possible_move_axis);
            yexe = yexe[0];
            if( $(yexe).children().length != 0 ){
                var id_pawn_to_eat = $(yexe).children(":first").attr('id');
                var element_pte =  id_pawn_to_eat.split('_');
                var side = element_pte[1];
                if(chess_side == side){
                    id_to_ommit.push(yexe);
                }
                break;
            }
            if( $(yexe).children().length != 0 ) break;
            
        } 
        
        possible_play_id = possible_move_id;
        
        for (const ij of id_to_ommit){
            possible_play_id = removeItemAll(possible_play_id,ij);
        }
    }
    // ♕
    else if(chess_pawn == "queen"){
        possible_play_id = get_possible_play_id("rook" , chess_side ,axisx ,axisy ,selected_id);
        possible_play_id = possible_play_id.concat(get_possible_play_id("bishop" , chess_side ,axisx ,axisy ,selected_id))
    }
    // ♔
    else if(chess_pawn == "king"){
        var possible_play_id = [];
        var possible_move_id = [];
        possible_move_id = [[parseInt(axisy) , parseInt(axisx)-1] , [parseInt(axisy)  , parseInt(axisx)+1] , [parseInt(axisy)-1, parseInt(axisx)-1] , [parseInt(axisy)-1,parseInt(axisx)+1]
            , [parseInt(axisy)-1,parseInt(axisx)] ,[parseInt(axisy)+1,parseInt(axisx)] ,[parseInt(axisy)+1,parseInt(axisx)-1] ,[parseInt(axisy)+1,parseInt(axisx)+1] 
        ]
        for (const  lst of  possible_move_id ){
            var yexe = "#"+lst[1]+"_"+lst[0] ;
            if( $(yexe).children().length != 0 ){
                var id_pawn_to_eat = $(yexe).children(":first").attr('id');
                var element_pte =  id_pawn_to_eat.split('_');
                var side = element_pte[1];
                if(chess_side != side){
                    possible_play_id.push(yexe);
                }
            }else{
                possible_play_id.push(yexe);
            }    
        }
        
    }
    else{
        possible_play_id = [];
    }
        return possible_play_id ;
};

export function check_echec(){
    $('.chess-line').children().each(function() {
        var chess_element = [];
        if($(this).children().length > 0){
            var selected_id =  $(this).children().attr('id');
            var p_id = $(this).split('_');
            var axis  = [];
            axis['x'] = (p_id[0]);
            axis['y'] = (p_id[1]);
            var element =  selected_id.split('_');
            chess_element['pawn'] = element[0];
            chess_element['side'] = element[1];
            chess_element['position'] = element[2];
            console.log(p_id);
            // var possible_play_id = get_possible_play_id(chess_element['pawn'],chess_element['side'],axis['x'],axis['y'],"#"+p_id);
        }
    });     
};
