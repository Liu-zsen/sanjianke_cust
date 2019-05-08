
/*导航点击*/
function leftNavOpen(obj) {
    $(obj).parents("li.navItem").toggleClass("active").siblings().removeClass("active");
}
/*导航收缩/展开*/
function leftNavShow(obj){
    $(obj).parents(".left-nav").toggleClass("mini");
    /*图表重新resize*/
    $(window).resize()
}
/*顶部消息展开*/
function msgShow(obj){
    $(obj).parents(".top-message").toggleClass("active");
    /*下面结合后台添加请求代码*/
}
/*首页宽高设置*/
function setHomeSize(){
    //浏览器窗口高度
    // var winHeight = window.innerHeight,
    var winHeight = $(window).height(),
        winWidth = window.innerWidth,
        topBar = document.getElementById("top-bar");
    var contentHeight = winHeight - topBar.offsetHeight;
    var home_content = $(".home-content");
    console.log(winHeight,contentHeight,topBar.offsetHeight,topBar);
    home_content.css("height",contentHeight);
    /*屏宽度下雨1200时导航为mini模式*/
    if(winWidth <= 1200){
        var leftNav = document.getElementById("left-nav");
        leftNav.classList.add( 'mini');
    }
}
/*请求首页图标数据*/
function getChartData(dataUrl){
    $.get(dataUrl).done(function (data) {
        var userData = data.users,
            borrowData = data.borrows,
            salseData = data.process;
        userCharts('userCharts',userData);
        borrowCharts('borrowCharts',borrowData);
        salesCharts('salesCharts',salseData);
        dataTab()
    });
}
/*首页用户增长图*/
function userCharts(el,data){
    var _thisChart = echarts.init(document.getElementById(el));
// 显示标题，图例和空的坐标轴
    _thisChart.setOption({
        tooltip: {
            trigger: 'axis',
            formatter: '增长量: {c0}'
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        },
        yAxis:{
                type : 'value',
                axisLabel: {
                    show: false //这行代码控制着坐标轴x轴的文字是否显示
                },
                splitLine: {
                    show: true, // 网格线是否显示
                    lineStyle: {
                        color: '#ededed' // 修改网格线颜色
                    }
                },
                axisLine:{
                    lineStyle:{
                        color:'#fff', // x坐标轴的轴线颜色
                        width:0 //这里是坐标轴的宽度,为0就是不显示
                    }
                }
            },
        series: [{
            type: 'line',
            data:data,
            areaStyle: {
                color:'rgba(209, 31, 39, 0.1)'
            }
        }]
    });
    /*响应式*/
    $(window).resize(function(){_thisChart.resize();});
}
/*首页领借统计图*/
function borrowCharts(el,data){
    var _thisChart = echarts.init(document.getElementById(el));
// 显示标题，图例和空的坐标轴
    _thisChart.setOption({
            tooltip: {
                showContent: true
            },
            xAxis: {type: 'category'},
            yAxis: {
                type : 'value',
                gridIndex: 0,
                axisLabel: {
                    show: false //这行代码控制着坐标轴x轴的文字是否显示
                },
                splitLine: {
                    show: true, // 网格线是否显示
                    lineStyle: {
                        color: '#ededed' // 修改网格线颜色
                    }
                },
                axisLine:{
                    lineStyle:{
                        color:'#fff', // x坐标轴的轴线颜色
                        width:0 //这里是坐标轴的宽度,为0就是不显示
                    }
                }
            },
            dataset:data,
            series: [
                {type: 'line', smooth: true, seriesLayoutBy: 'row',color:'#2968f8'},
                {type: 'line', smooth: true, seriesLayoutBy: 'row',color:'#ff2239'},
            ]
    });
    /*响应式*/
    $(window).resize(function(){_thisChart.resize();});
}
/*首页排行榜条形图*/
function salesCharts(el,data){
    // $.get(dataUrl).done(function (data) {}
        var str = "";
        if(data.length>0 || data !=null){
            for(var i=0;i<data.length;i++){
                str += '<div class="salesRanks-item">'+
                    '<span class="salesRanks-num">'+(i+1)+'</span>'+
                    '<h4 class="salesRanks-info">'+
                    '<p class="salesRanks-name inline">'+data[i].name+'</p>'+
                    '<p class="salesRanks-data inline" title="全国代理商占比：'+data[i].percent+'，数量：'+data[i].amount+'">全国代理商占比：<span class="ranks-data-percent">'+data[i].percent+'</span><span class="ranks-data-num">'+data[i].amount+'</span></p>'+
                    '</h4>'+
                    '<div class="salesRanks-process">'+
                    '<p class="salesRanks-process-content" style="width: '+data[i].percent+'"></p>'+
                    '</div>'+
                    '</div>'
            }
        }else{
            str = "<h2>暂无排行数据</h2>";
        }
    $("#salesRanks").html('').append(str);
}
/*初始化Datatables*/
function dataTab(){
    console.log(1);
    $(document).ready( function () {
        $('#teaListTable').DataTable();
    } );
}