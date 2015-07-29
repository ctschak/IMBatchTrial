var editor; // use a global for the submit and return data rendering in the examples

$(document).ready(function() {

    
    $('#batchtrial').dataTable( {
        "ajax": "../../data/imBatchTrialStatus.JSON",
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
    var bar = new Morris.Bar({
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
    });

} );