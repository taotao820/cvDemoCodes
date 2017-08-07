var schema=[];
var count=34;                                                                                                                                               //    街道                        街道
//            0*i      1*i    2*i    3*d      4*i    5s     6s     7s      8s      9*s    10s   11s     12s       13s   14s      15ss    16ss       17*ss   18*i  19i   20i    21*ss   22*i  23i     24i       25i       26i     27SS*       28*i   29i        30s    31ss*   32*i  33i          
var labels=["病人标识","姓名","性别","出生日期","年龄","国籍","民族","职业","身份证号","费别","身份","婚姻","文化程度","血型","RH血型","出生地","籍贯","现地址","","电话","邮编","户口地址","", "邮编","工作单位","单位电话","邮编","工作单位地址","",  "联系人姓名","关系","联系人地址","","电话",];
var types=["it",       "it",  "st","dp",      "it",  "st",  "st","st",    "it",    "st",  "st",  "st",  "st",      "st", "st",    "mst",  "mst", "mst","it","it",  "it",   "mst",  "it", "it",  "it",      "it",     "it",   "mst",     "it",  "it",       "st",  "mst",  "it",    "it"];
var ids=["patientId","patientName","sex","birth","age","nation","nationality","professional","idNo","marrage","culture","blood","RHblood","birthAddress","nativePlace","nowAddress","nowStreet","nowTel","nowPc","residenceAddress","residenceStreet","residencePc","workAddress","workStreet","contactName","relation","contactAddress","contactStreet","contactTel"];
var requireds=[true,  true,  true,   true,     true, false, false,false,  false,   true,  false, false, false,   false,  false,   false, false, true,   true,false,false,  true,   true, false,  false,    false,   false,   true,       true, false,      false, false,  true,   true];
var errorsArr=["病人标识不能为空","姓名不能为空","性别不能为空","出生日期不为空","年龄不能为空","","","","","费别不能为空","","","","","","","","现地址不能为空","现地址街道不能为空","","","户口地址不能为空","户口地址街道不能为空","","","","","工作单位地址不能为空","工作单位街道不能为空"];
var validsArr=["isNonEmpty", "isNonEmpty", "isNonEmpty", "isNonEmpty", "isNonEmpty", "isNonEmpty", "isNonEmpty", "isNonEmpty", "isNonEmpty", "isNonEmpty", "isNonEmpty", "isNonEmpty", "isNonEmpty", "isNonEmpty", "isNonEmpty", "isNonEmpty", "isNonEmpty", "isNonEmpty", "isNonEmpty", "isNonEmpty", "isNonEmpty", "isNonEmpty", "isNonEmpty", "isNonEmpty", "isNonEmpty", "isNonEmpty", "isNonEmpty", "isNonEmpty", "isNonEmpty", "isNonEmpty", "isNonEmpty", "isNonEmpty", "isNonEmpty", "isNonEmpty"];
var index=[];
$(function () {
    $(".mask-modal").hide();
    //获取窗口的高度
    var windowHeight;
    //获取窗口的宽度
    var windowWidth;
    //获取弹窗的宽度
    var popWidth;
    //获取弹窗高度
    var popHeight;
    //循环 schema 加载表单
    initSchema();
    $("#readCardCancel").off();//事件委托
    $("#readCardCancel,.title-close").on('click', function () {
        $(".mask-modal").hide();
        $(".window-modal").hide();
    })
})
function initSchema(){
    var dom="";
    $("#verifyCheck").html("");
    for(var i=0;i<count;i++){
        schema.push({
            type: types[i],
            required:requireds[i],
            id: ids[i],
            label: labels[i],
            error: errorsArr[i],
            validTip: validsArr[i],
            index: i
        })
    }
    for(var i=0;i<schema.length;i++){
        dom+=getFieldDecorater(schema[i])
    }
    $("#verifyCheck").append(dom);
    var children=$("#verifyCheck").children("div.reitem");
    for(var i=0;i<children.length;i++){
        if(i==2||i==5||i==8||i==11||i==14){
            $("div#verifyCheck div.reitem:eq("+i+")").after("<div></div>");
        }
    }
}
function $ajax(url, type, postData, succCallback) {
    var type = type || "post";
    var timestamp = Date.parse(new Date());
    postData.timestamp=timestamp;
    $.ajax({
        type: type,
        url:  "/his"+url,
        data: postData,
        dataType: "json",
        //contentType: "application/json",
        //开始loading beforeSend: function() { },
        success: function(data) {
            var code = data.code;
            if (code != 10000) {
                clickautohide(data.msg);
                return;
            }
            succCallback(data.data);
        }
        //结束loading   complete: function() {$(".js_loading").hide();}
    })
}
function getFieldDecorater(item){
    var labelSpan=item.label?'<span class="intelligent-label f-fl"><b class="ftx04">'+tip+'</b>'+item.label+'：</span>':'<span class="intelligent-label f-fl w10" style="width: 10px;"></span>';
    var colWidth=item.label?"reitem col-xs-3":"reitem col-xs-2";
    switch (item.type) {
    case 'it':
        node='<div class="reitem col-xs-3">'+
                labelSpan+ 
                '<div class="'+colWidth+'">'+
                    '<input type="text" class="'+inputTypeCls+'" tabindex="2" data-valid="'+item.validTip+'" data-error="'+item.error+'" id="'+item.id+'" />'+  
                    '<span class="ie8 icon-close close hide"></span>'+                        
                    '<label class="icon-sucessfill blank hide"></label>'+
                    '<label class="focus valid"></label>'+
                '</div>'+
            '</div>';
        return node;
    case 'st':
        node='<div class="reitem col-xs-3">'+
                labelSpan+   
                '<div class="f-fl item-ifo selectbox">'+
                    '<div>'+
                        '<input type="text" maxlength="20" class='+inputTypeCls+' tabindex="1"  id="chargeType" />'+                          
                        '<em class="arrow pos-abs"></em>'+
                        '<label class="icon-sucessfill blank hide"></label>'+
                        '<label class="focus valid"></label>'+   
                    '</div>'+
                    '<ul class="selectlist">'+
                        '<li>城镇城镇城镇城镇</li>'+
                        '<li>农村农村农村农村农</li>'+
                        '<li>自费自费自费自费</li>'+
                    '</ul>'+                     
                '</div>'+
            '</div>';
        return node;
    case 'mst':
        if(item.label=="籍贯"){
            node='<div class="reitem col-xs-6">'+
                labelSpan+   
                '<div class="f-fl item-ifo-s selectbox">'+
                    '<div>'+
                        '<input type="text" maxlength="20" class='+inputTypeCls+' tabindex="1"  id="'+item.id+'" />'+                          
                        '<em class="arrow pos-abs"></em>'+
                        '<label class="icon-sucessfill blank hide"></label>'+
                        '<label class="focus valid"></label>'+   
                    '</div>'+
                    '<ul class="selectlist">'+
                        '<li>城镇</li>'+
                        '<li>农村</li>'+
                        '<li>自费</li>'+
                    '</ul>'+                     
                '</div>'+
                '<div class="f-fl item-ifo-s selectbox">'+
                    '<div>'+
                        '<input type="text" maxlength="20" class='+inputTypeCls+' tabindex="1"  id="'+item.id+'" />'+                          
                        '<em class="arrow pos-abs"></em>'+
                        '<label class="icon-sucessfill blank hide"></label>'+
                        '<label class="focus valid"></label>'+   
                    '</div>'+
                    '<ul class="selectlist">'+
                        '<li>城镇</li>'+
                        '<li>农村</li>'+
                        '<li>自费</li>'+
                    '</ul>'+                     
                '</div>'+
            '</div>';
        }else{
            node='<div class="reitem col-xs-6">'+
                labelSpan+   
                '<div class="f-fl item-ifo-s selectbox">'+
                    '<div>'+
                        '<input type="text" maxlength="20" class='+inputTypeCls+' tabindex="1"  id="'+item.id+'" />'+                          
                        '<em class="arrow pos-abs"></em>'+
                        '<label class="icon-sucessfill blank hide"></label>'+
                        '<label class="focus valid"></label>'+   
                    '</div>'+
                    '<ul class="selectlist">'+
                        '<li>城镇</li>'+
                        '<li>农村</li>'+
                        '<li>自费</li>'+
                    '</ul>'+                     
                '</div>'+
                '<div class="f-fl item-ifo-s selectbox">'+
                    '<div>'+
                        '<input type="text" maxlength="20" class='+inputTypeCls+' tabindex="1"  id="'+item.id+'" />'+                          
                        '<em class="arrow pos-abs"></em>'+
                        '<label class="icon-sucessfill blank hide"></label>'+
                        '<label class="focus valid"></label>'+   
                    '</div>'+
                    '<ul class="selectlist">'+
                        '<li>城镇</li>'+
                        '<li>农村</li>'+
                        '<li>自费</li>'+
                    '</ul>'+                     
                '</div>'+
                '<div class="f-fl item-ifo-s selectbox">'+
                    '<div>'+
                        '<input type="text" maxlength="20" class='+inputTypeCls+' tabindex="1"  id="'+item.id+'" />'+                          
                        '<em class="arrow pos-abs"></em>'+
                        '<label class="icon-sucessfill blank hide"></label>'+
                        '<label class="focus valid"></label>'+   
                    '</div>'+
                    '<ul class="selectlist">'+
                        '<li>城镇</li>'+
                        '<li>农村</li>'+
                        '<li>自费</li>'+
                    '</ul>'+                     
                '</div>'+
            '</div>';
        }
        return node;
    case 'dt':
        node='<div class="reitem col-xs-3">'+
                labelSpan+ 
                '<div class="f-fl item-ifo-s">'+
                    '<input type="text" class="'+inputTypeCls+'" tabindex="2" data-valid="'+item.validTip+'" data-error="'+item.error+'" id="'+item.id+'" />'+  
                    '<span class="ie8 icon-close close hide"></span>'+                        
                    '<label class="icon-sucessfill blank hide"></label>'+
                    '<label class="focus valid"></label>'+
                '</div>'+
            '</div>';
        $("#"+item.id).dcalendarpicker({
            format: 'yyyy-mm-dd'
        });
        return node;
    default:
        node='<div class="reitem col-xs-3">'+
                labelSpan+ 
                '<div class="f-fl item-ifo">'+
                    '<input type="text" class="'+inputTypeCls+'" tabindex="2" data-valid="'+item.validTip+'" data-error="'+item.error+'" id="'+item.id+'" />'+  
                    '<span class="ie8 icon-close close hide"></span>'+                        
                    '<label class="icon-sucessfill blank hide"></label>'+
                    '<label class="focus valid"></label>'+
                '</div>'+
            '</div>';
        return node;
    }
}

function windowInit() {
    $(".mask-loading").hide();
    windowHeight = $(window).height();
    windowWidth = $(window).width();
    popHeight = $(".window-modal").height();
    popWidth = $(".window-modal").width();
    //计算弹出窗口的左上角Y的偏移量
    var popY = (windowHeight - popHeight) / 2; //垂直方向偏移量
    var popX = (windowWidth - popWidth) / 2; //水平方向偏移量
    //设定窗口的位置
    $("#center").css("top", popY).css("left", popX).slideToggle("fast");
}



