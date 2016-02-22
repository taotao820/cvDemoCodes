define([
    'text!modules/xxx/templates/XxxxView.html',
    'modules/xxx/service/XxxxViewService',
    'i18n!modules/xxx/i18n/XxxxView.i18n'
], function(XxxxViewTpl, XxxxViewService, i18nXxxxView) {
    return fish.View.extend({
        template: fish.compile(XxxxViewTpl),
        i18nData: fish.extend({}),
        commanderTemp: fish.compile(),

        events: {
            "click .vphone-man-list .linkman-list li": "doBookAddressClick",
            "click .dialing-btn": "doDialing",
            "keydown .vphone-search .control-search-input": "doSearchCommander"
        },

        //这里用来进行dom操作
        _render: function() {
            this.$el.html(this.template(this.i18nData));
            return this;
        },

        //这里用来初始化页面上要用到的fish组件
        _afterRender: function() {
            this.loadCommanderList();
        },

        loadCommanderList: function() {
            var thisView = this;
            XxxxViewService.qryEventCommanderListAll(function(ret) {
                if (ret != null && ret.COMMANDER_LIST && ret.COMMANDER_LIST.length > 0) {
                    thisView.doRenderCommander(ret.COMMANDER_LIST);
                } else {
                    $(".linkman-list").html("<li class='query-empty'><a>查无记录</a></li>");
                }
            });
        },

        // 渲染指挥官Li列表
        doRenderCommander: function(commanderList) {
            // 处理头像显示路径
            for (var i = 0; i < commanderList.length; i++) {
                var imgPath = commanderList[i].PHOTO;
                if (imgPath) {
                    commanderList[i].PHOTO = webroot + "ViwImgServlet?imgPath=/eventmgr/" + imgPath.substring(imgPath.lastIndexOf("/") + 1, imgPath.length);
                } else {
                    commanderList[i].PHOTO = webroot + "ViwImgServlet?imgPath=null";
                }
            }

            var data = {
                commanderList: commanderList
            };
            var cmderHtml = this.commanderTemp(data);
            $(".linkman-list").html(cmderHtml);
            setTimeout(function() {
                $('.linkman-list').slimScroll({
                    height: '100%'
                });
            }, 100);
        },

        doSearchCommander: function(event) {
            var thisView = this;
            // 查询输入框回车事件处理
            if (event.keyCode == 13) {
                var inputTxt = $('.vphone-search .control-search-input').val();
                XxxxViewService.qryEventCommanderListByQueryTxt(inputTxt, function(ret) {
                    if (ret != null && ret.COMMANDER_LIST && ret.COMMANDER_LIST.length > 0) {
                        thisView.doRenderCommander(ret.COMMANDER_LIST);
                    } else {
                        $(".linkman-list").html("<li class='query-empty'><a>"+i18nLeftExtendView.NO_RECORDS_FOUND+"</a></li>");
                    }
                });
            }
        },

        doBookAddressClick: function(event) {
            var curruntli = $(event.currentTarget);
            curruntli.addClass("active").siblings().removeClass('active');
            var phoneNo = curruntli.find('.commander-phone-no').attr('title');
            $('.control-dialing-input').val(phoneNo);
            $('.control-dialing-input').focus();
        },

        // 拨号
        doDialing: function(event) {
            var digital = $(event.currentTarget).attr('data-num');
            if (digital == 'D') {
                // 删除号码
                $('.control-dialing-input').val('');
                $('.control-dialing-input').focus();
            } else if (digital == 'C') {
                // 打电话 挂断电话
            } else {
                $('.control-dialing-input').val($('.control-dialing-input').val() + digital);
                $('.control-dialing-input').focus();
            }
        }
    });
});
