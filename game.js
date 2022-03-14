$(function() {
    for (let i = 0; i < 8 ; i++) {
        for (let y = 0; y < 8 ; y++) {
            var id = ("#"+i+"_"+y);
            var odd = ((i+y)%2);
            if(odd == 0){
                var element = document.getElementById(id);
                $(id).addClass('bg-secondary')
            }else{
                var element = document.getElementById(id);
                $(id).addClass('bg-light')
            }  
        } 
      }   
});