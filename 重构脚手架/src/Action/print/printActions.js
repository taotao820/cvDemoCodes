/**
 * Created by zhoufr on 2017/1/10.
 * printType 取值：1、打印  2、补打  3、重打
 * invoiceType 取值：1、门诊收费发票  2、住院收费发票  3、挂号发票 4、住院预交款收据
 */
import {fetchInvoice} from '../register/registerActions';

var tempInvoiceList = [];
var printType;//1、打印  2、补打  3、重打
export const getPrinterList = ()=>{ //获取打印机列表
    try{
        var priNum = global.myLodop.GET_PRINTER_COUNT();
    }catch(err){
        global.message.error("打印控件未正确安装，请安装后重新打印！");
        return;
    }
    var arr = [];
    for(var i=0;i<priNum;i++){
        arr.push({value: global.myLodop.GET_PRINTER_NAME(i), key: global.myLodop.GET_PRINTER_NAME(i)});
    }
    return arr
}
export const doPrintAction = (invoiceId,invoiceType,isTj) =>{
    if(!isTj)isTj = 0;
    var array = {};
    array.invoiceId = invoiceId;
	if(!printType || typeof printType =='undefined' || printType == ''){
		printType = '1';//1、打印  2、补打  3、重打
	}
    array.visitType = '1';
    insertInfoAndSelectPrinter(array,invoiceType,isTj);
}
function insertInfoAndSelectPrinter(array,invoiceType,isTj) {
    var invoiceId = array.invoiceId;
    var visitType = array.visitType;
    global.post(global.host+'invoice/printInfo',"token="+global.token+"&isTj="+isTj+"&invoiceId=" + invoiceId + "&printType=" + printType + "&visitType=" + visitType +"&invoiceType="+invoiceType+"&time=" + new Date().valueOf()).then(res=>{
        return res.json()
    }).then(data=>{
        if (data.code == "0") {
            tempInvoiceList = data.data;
            //更新页面发票数据
            fetchInvoice()
            var printerName = window.localStorage.getItem('printerName');
            if((printerName == '' || typeof(printerName) =='undefined' ) && typeof(printerForTJ) != "undefined" && printerForTJ != ''){
                printerName = printerForTJ;
            }
            try{
                global.myLodop.GET_PRINTER_COUNT();
            }catch (e){
                console.log(e)
                return;
            }
            global.myLodop.SET_PRINTER_INDEX(printerName);
            setAndPrint(invoiceType);
        } else if(data.code == 1){
            global.message.error(data.msg);
        }else{
            global.message.error("系统异常");
            console.log(data.msg)
        }
    })

}

function formatInvoiceType(invoiceType){
    if ("1"==invoiceType) {
        return "619001";
    }else if ("2"==invoiceType) {
        return "619004";
    }else if ("3"==invoiceType) {
        return "619002";
    }else if ("4"==invoiceType) {
        return "619003";
    }else{
        return "619001";
    }
}
var pageSize = 1;
var pageCount = 1;
var lodopState = false;
function setAndPrint(invoiceType) {
    pageCount = tempInvoiceList.length;
    for(var i = 0;i<tempInvoiceList.length;i++){
        try{
            global.myLodop.NEWPAGE();
        }catch(e){
            global.message.error("打印控件未正确安装，请安装后重新打印！");
            return;
        }
        try{
        	pageSize = i+1;
            LODOP_config(tempInvoiceList[i],invoiceType);
        }catch(e){
            global.message.error("打印模板未配置，请联系管理员！");
            return;
        }
    }
}

function ObjData(k,v,s,c){
	this.key=k;
	if(typeof(v)=="undefined" || v==null){
		this.value="";
	}else{
		this.value=v;
	}
	if(typeof(s)=="undefined" || s==null){
		this.size = 1;
	}else{
		this.size = s;
	}
	if(typeof(c)=="undefined" || c==null){
		this.column = 1;
	}else{
		this.column = c;
	}
}
function LODOP_config(args,invoiceType){
	if(typeof(patName4Print) != "undefined" && patName4Print != ''){
		args.patientName = patName4Print;
	}
	var groupDatasMap = new Map();
    global.post(global.host+"invoice/printGroup","token="+global.token+"&useCode="+formatInvoiceType(invoiceType)+'&time='+new Date().getTime()).then(res=>{
        return res.json()
    }).then(data=>{
        var groupDatas = data.data;
        for(var i=0;i<groupDatas.length;i++){
            groupDatasMap.put(groupDatas[i].templateValue,groupDatas[i].templateSize+","+groupDatas[i].templateCol+","+groupDatas[i].isGroup);
        }
        try{
            var array = [];
            array.push(new ObjData("pageSize",pageSize,1,1));
            array.push(new ObjData("pageCount",pageCount,1,1));
            if(pageCount>1){
                array.push(new ObjData("pageNum","("+pageSize+"/"+pageCount+")",1,1));
            }
            args = specailConditionSet(args);
            var printData =  trans(args, groupDatasMap, array);
            global.post(global.host+"invoice/printTemplate","&printData="+encodeURIComponent(printData)+"&time="+new Date().getTime()+"&token="+global.token+"&useCode="+formatInvoiceType(invoiceType)).then(res=>{
                return res.json()
            }).then(data=>{
                if (data.code == "0") {
                    global.myLodop.NewPage();
                    var LODOP = global.myLodop;
                    eval(data.data);
                    global.myLodop.PRINT();
                    // global.myLodop.PREVIEW();
                } else if(data.code == 1){
                    global.message.error(data.msg);
                }else{
                    global.message.error("系统异常");
                    console.log(data.msg)
                }
            })
        } catch(e){
            global.message.error("系统异常");
            console.log(e)
        }
    })
}
function trans(args, map, array){
    for(var p in args){
        var detailSize =1;
        var col=1;
        var isGroup=0;
        if(typeof (map.get(p)) != "undefined"){
            detailSize = Number(map.get(p).split(",")[0]);
            col = Number(map.get(p).split(",")[1]);
            isGroup = Number(map.get(p).split(",")[2]);
            if(isGroup==1){
                var arr = new Array();
                for(var i in args[p]){
                    if(args[p][i]!=null && args[p][i].length>10){
                        arr.push(args[p][i].substring(0,10));
                    }else{
                        arr.push(args[p][i]);
                    }
                }
                array.push(new ObjData(p,arr.join("@").replace(/\//g,''),detailSize,col));
            }else{
                 var value = args[p];
                 value = specialDeal(p,value,args);
                 array.push(new ObjData(p,value,detailSize,col));
            }
        }
    }
    return JSON.stringify(array);

}
function specialDeal(p,value,args){
	if(p=='capitalCountFee' || p=='subtotalCapital'){
		value = strTrans(value);
	}
	if(p=='printType'){
		if(value=='3'){
			value = "重打";
		}else{
			value = "";
		}
    }
	if(p=='cashFlag'){
		if(value =='是'){
			value = "一卡通";
		}else{
			value = "";
		}
    }
	if(p=='countFee' && value){
		value = parseFloat(Number(value)/100).toFixed(2);
	}
	if(p=='agrinsuranceFee' && value){
		value = parseFloat(Number(value)/100).toFixed(2);
	}
	if(p=='agrOwnFee' && value){
		value = parseFloat(Number(value)/100).toFixed(2);
	}
	if(p=='medInsuranceFee' && value){
		value = parseFloat(Number(value)/100).toFixed(2);
	}
	if(p=='medInsuranceAccountFee' && value){
		value = parseFloat(Number(value)/100).toFixed(2);
	}
	if(p=='medInsuranceOwnFee' && value){
		value = parseFloat(Number(value)/100).toFixed(2);
	}
	if(p=='ownFee' && value){
		value = parseFloat(Number(value)/100).toFixed(2);
	}
	if(p=='subtotal' && value){
		value = parseFloat(Number(value)/100).toFixed(2);
	}
	return value;
}

function specailConditionSet(args){
	if(args.chgType=="02"){//费别大类编码 01自费，02农保 03医保 04荣军
		args.medInsuranceFee = "";
		args.medInsuranceOwnFee = "";
		args.ownFee = "";
    }else if(args.chgType=="03"){
        args.agrinsuranceFee = "";
		args.agrOwnFee = "";
		args.ownFee = "";
    }else{
    	args.medInsuranceFee = "";
		args.medInsuranceOwnFee = "";
		args.agrinsuranceFee = "";
		args.agrOwnFee = "";
    }
	for(var i in args.detailCost){
		if(args.detailCost[i]){
			args.detailCost[i] = parseFloat(Number(args.detailCost[i])/100).toFixed(2);
		}
	}
	for(var i in args.detailPrice){
		if(args.detailPrice[i]){
			args.detailPrice[i] = parseFloat(Number(args.detailPrice[i])/100).toFixed(2);
		}
	}
	for(var i in args.detailAccountItemCost){
		if(args.detailAccountItemCost[i]){
			args.detailAccountItemCost[i] = parseFloat(Number(args.detailAccountItemCost[i])/100).toFixed(2);
		}
	}
	for(var i in args.invoiceItemCost){
		if(args.invoiceItemCost[i]){
			args.invoiceItemCost[i] = parseFloat(Number(args.invoiceItemCost[i])/100).toFixed(2);
		}
	}
	splitDaxie(args);
	if(args.visitType){
		if(args.visitType == '1'){
			args.isOutp = "√";
		}
		if(args.visitType == '2'){
			args.isInp = "√";
		}
		/*if(args.visitType == '急诊'){
			args.isEmer = "√";
		}*/
	}
	if(args.sex){
		if(args.sex == '男'){
			args.isMale = "√";
		}
		if(args.sex == '女'){
			args.isFemale = "√";
		}
	}
	return args;
}

function splitDaxie(args){
	if(args.capitalCountFee){
		var value = strTrans(args.capitalCountFee);
        value = value.replace(/零/g,"");
		var remainString = "";
		if(value.indexOf("万")==-1){
			args.oneHundredThousand = "零";
			args.tenThousand = "零";
			remainString = value;
		}else{
			remainString = value.substring(value.indexOf("万")+1);
			var wan = value.substring(0,value.indexOf("万"));
			if(wan.indexOf("拾")!=-1){
				args.oneHundredThousand = wan.split("拾")[0];
				args.tenThousand = wan.split("拾")[1];
			}else{
				args.oneHundredThousand = "零";
				args.tenThousand = wan;
			}
		}
		args.thousand = remainString.indexOf("仟")==-1?"零":remainString.substring(0,remainString.indexOf("仟"));
		remainString = remainString.indexOf("仟")==-1?remainString:remainString.substring(remainString.indexOf("仟")+1);
		args.hundred = remainString.indexOf("佰")==-1?"零":remainString.substring(0,remainString.indexOf("佰"));
		remainString = remainString.indexOf("佰")==-1?remainString:remainString.substring(remainString.indexOf("佰")+1);
		args.ten = remainString.indexOf("拾")==-1?"零":remainString.substring(0,remainString.indexOf("拾"));
		remainString = remainString.indexOf("拾")==-1?remainString:remainString.substring(remainString.indexOf("拾")+1);
		args.yuan = remainString.indexOf("圆")==-1?"零":remainString.substring(0,remainString.indexOf("圆"));
		remainString = remainString.indexOf("圆")==-1?remainString:remainString.substring(remainString.indexOf("圆")+1);
		args.jiao = remainString.indexOf("角")==-1?"零":remainString.substring(0,remainString.indexOf("角"));
		remainString = remainString.indexOf("角")==-1?remainString:remainString.substring(remainString.indexOf("角")+1);
		args.fen = remainString.indexOf("分")==-1?"零":remainString.substring(0,remainString.indexOf("分"));
		args.thousand = args.thousand==''?'零':args.thousand;
		args.hundred = args.hundred ==''?'零':args.hundred;
		args.ten = args.ten ==''?'零':args.ten;
		args.yuan = args.yuan==''?'零':args.yuan;
		args.jiao = args.jiao==''?'零':args.jiao;
		args.fen = args.fen==''?'零':args.fen;
	}
}

function daxie()
{  //定义大写数组
    this.values = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
    this.digits = ["", "拾", "佰", "仟"];
}
daxie.prototype.getDaXie=function(money){
    if(isNaN(money)) return "";                 //如果不是数值型，直接返回空
    var number = Math.round(money*100)/100;     //取数值的整数
    number = number.toString(10).split('.');  //整数和小数分开
    var moneyInt = number[0];                  //整数部分
    var len = moneyInt.length;                 //整数的长度
    if (len > 12)                             //长度如果超出范围
        return "数值超出范围！支持的最大数为 999999999999.99!";
    var returnValue = this.millonTrans(moneyInt.slice(-4));
    if (len > 4)                                          //多于万位
        returnValue = this.millonTrans(moneyInt.slice(-8,-4)) + (moneyInt.slice(-8,-4)!="0000"?"万":"") + returnValue;
    if (len > 8)                                          //多于亿位
        returnValue = this.millonTrans(moneyInt.slice(-12,-8)) + "亿" + returnValue;
    if(returnValue!="")
        returnValue += "圆";                                //添加最后一个字符
    if(number.length==2)                                  //是否是带小数的金额
    {
        var cok = number[1].split('');
        if(returnValue!="" || cok[0]!="0")
            returnValue += this.values[parseInt(cok[0])] + (cok[0]!="0"?"角":"");//十位数显示角
        if(cok.length>=2)
            returnValue += this.values[parseInt(cok[1])] + "分";
    }
    if(returnValue!="" && !/分$/.test(returnValue))           //使用正则判断是否有小数
        returnValue += "整";
    return returnValue;
}

daxie.prototype.millonTrans=function(strTemp)
{
    var money = strTemp.split('');                                //将金额转换为数组
    var mLength = money.length-1;                                 //金额的长度
    var returnValue = "";
    for (var i=0; i<=mLength; i++)                                //遍历每个元素
        returnValue += this.values[parseInt(money[i])] + (money[i]!='0'?this.digits[mLength-i]:"");
    returnValue = returnValue.replace(/零+$/, "").replace(/零{2,}/, "零");//返回转换后的数值
    return returnValue;
}
var stmp = "";
var daXieM = new daxie();
function strTrans(strT)
{
    return daXieM.getDaXie(parseFloat(Number(strT)/100));                        //显示大写
}

function Map() {
    /** 存放键的数组(遍历用到) */
    this.keys = new Array();
    /** 存放数据 */
    this.data = new Object();
    
    /**
     * 放入一个键值对
     * @param {String} key
     * @param {Object} value
     */
    this.put = function(key, value) {
        if(this.data[key] == null){
            this.keys.push(key);
        }
        this.data[key] = value;
    };
    
    /**
     * 获取某键对应的值
     * @param {String} key
     * @return {Object} value
     */
    this.get = function(key) {
        return this.data[key];
    };
    
    /**
     * 删除一个键值对
     * @param {String} key
     */
    this.remove = function(key) {
        this.keys.remove(key);
        this.data[key] = null;
    };
    
    /**
     * 遍历Map,执行处理函数
     * 
     * @param {Function} 回调函数 function(key,value,index){..}
     */
    this.each = function(fn){
        if(typeof fn != 'function'){
            return;
        }
        var len = this.keys.length;
        for(var i=0;i<len;i++){
            var k = this.keys[i];
            fn(k,this.data[k],i);
        }
    };
}