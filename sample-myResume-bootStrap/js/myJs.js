function raterStar(){
    var understand = {  
        value   : 5 ,
        max : 10
        };
    var know_well={
        value   : 7 ,
        max : 10
    };
    var professional={
        value   : 9 ,
        max : 10
    };
    $('.star-js').rater(understand);
    $('.star-css').rater(understand);
    $('.star-bs').rater(understand);
    $('.star-java').rater(understand);
    $('.star-ajax').rater(understand);
    $('.star-oracle').rater(understand);
    $('.star-jquery').rater(understand);
 }   
function swicthTab() {
    $(".li-tabs").on("click", function() {
        var index = $(this).index();
        var divs = $(".tabs-body > div");
        $(this).parent().children("li").removeAttr("class", "active"); //将所有选项置为未选中
        $(this).attr("class","active");
        divs.hide(); //隐藏所有选中项内容
        divs.eq(index).show(); //显示选中项对应内容
     });
 }  
$(function(){
    raterStar();
    swicthTab();
})