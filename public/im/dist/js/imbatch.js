var editor; // use a global for the submit and return data rendering in the examples

$(document).ready(function() {

    
    $('#batchtrial').dataTable( {
        "ajax": "../data/imBatchTrialStatus.JSON",
        "responsive": true,
        "bAutoWidth": false,
        "columns": [
            { "data": "appGroup" },
            { "data": "appName" },
            { "data": "cycleDate" },
            { "data": "trialName" },
            { "data": "trialStatus" },
            { "data": "actualStartTime" }
        ]
    } );

    /*$('#batchtrial').dataTable( {
        "bServerSide": true,
        "sAjaxSource": "imBatchTrialStatus.json",
        "sAjaxDataProp" : "batchDetails",
        "bProcessing": true,
        "sPaginationType": "full_numbers",
        "aoColumns": [
            { "mData": "appGroup"},
            { "mData": "appName" },
            { "mData": "cycleDate" },
            { "mData": "trialName" },
            { "mData": "trialStatus" },
            { "mData": "actualStartTime"}
        ]
    } );*/
    
    
  //BAR CHART
/*    var bar = new Morris.Bar({
      element: 'bar-chart',
      resize: true,
      data: [
        {y: '8 PM', a: 10, b: 8},
        {y: '9 PM', a: 75, b: 65},
        {y: '10 PM', a: 50, b: 40},
        {y: '11 PM', a: 75, b: 65},
        {y: '12 AM', a: 50, b: 40},
        {y: '1 AM', a: 75, b: 65},
        {y: '2 AM', a: 100, b: 90}
      ],
      barColors: ['#00a65a', '#f56954'],
      xkey: 'y',
      ykeys: ['a', 'b'],
      labels: ['Completed', 'Delayed'],
      hideHover: 'auto'
    });*/
    
    
    var json = (function () {
        var json = null;
        $.ajax({
            'async': false,
            'global': false,
            'url': '../data/imBatchTrialStatus.JSON',
            'dataType': "json",
            'success': function (data) {
                json = data;
            }
        });

        return json;
    })();
    var graph = [];
    var trialStatus = ["Delayed","Complete - SLA Breached","InProgress","Complete - SLA Met","Complete","Not Started","Not Scheduled","Abend"];
    var trialStatusJson = {};
    
    for(var i in trialStatus){
       graph.push({"x":trialStatus[i],"y":countOfTrialStatus(json.data,trialStatus[i])});   
       
    }
   // console.log(graph);
    var bar2 = new Morris.Bar({
      element: 'bar-chart2',
      resize: true,
      gridLineColor: '#dddddd',
      data: graph,
     // barColors: ['#00a65a', '#f56954'],
      xkey: 'x',
      ykeys: ['y'],
      labels: ['Trial Status Count'],
      hideHover: 'auto',
      xLabelMargin: 10,
      barColors: function (row, series, type) {
        //console.log("--> "+row.label, series, type);
        if(row.label == trialStatus[0]) return "#db7093";
        else if(row.label == trialStatus[1]) return "#AD1D28";
        else if(row.label == trialStatus[2]) return "#fec04c";
        else if(row.label == trialStatus[3]) return "#38ACEC";
        else if(row.label == trialStatus[4]) return "#00a65a";
        else if(row.label == trialStatus[5]) return "#234545";
        else if(row.label == trialStatus[6]) return "#98AFC7";
        else if(row.label == trialStatus[7]) return "#FF0000";

      }
    });
    /*var bar3 = new Morris.bar({
        element: 'graph-area',
        padding: 10,
        behaveLikeLine: true,
        gridEnabled: false,
        gridLineColor: '#dddddd',
        axes: true,
        fillOpacity:.7,
        data:graph,
        lineColors:['#ED5D5D','#D6D23A','#32D2C9'],
        xkey: 'x',
        ykeys:['y'],
        labels: ['Trial Status Count'],

        pointSize: 0,
        lineWidth: 0,
        hideHover: 'auto'
    });*/

    function countOfTrialStatus(obj,trialStatus) {
       var count=0;
       for(var prop in obj) {
          // console.log(obj[prop].trialStatus);
          if (obj[prop].trialStatus == trialStatus) {
             ++count;
          }
       }
       return count;
    }
} );