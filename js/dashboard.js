const BASE_URL = 'http://35.154.104.127:8080/LMS';
const jwt = localStorage.getItem("jwt");
const userRole = localStorage.getItem("userRole");
if (jwt == null || userRole != "Admin"){
  window.location.href = './login.html'
}



async function getapi(url) {
  const response = await fetch(url,{
          method : 'GET',
          headers : {
                      'Content-Type' : 'application/json',
                      'token': localStorage.getItem("jwt")
                   }
      });
  var data = await response.json();
  if (response) {
     if(!response.ok){
          if(response.status=='401'){
              //localStorage.removeItem('jwt');
              //window.location.href = './login.html'
              //console.log(localStorage.getItem("jwt"));
          }
          return false;
     }
  }
  return data;
}

async function getDashboardData() {
    const url = BASE_URL+"/dashboard/getDashboardData";
    const body = {
        toDate:"",
        typeId:"1",
        fromDate:""
    };
        const response = await fetch(url,{
                method : 'POST',
                headers : {
                            'Content-Type' : 'application/json',
                            'token': localStorage.getItem("jwt")
                         },
                body : JSON.stringify(body)
            });
        var data = await response.json();
        if (response) {
           if(!response.ok){
                if(response.status=='401'){
                    //localStorage.removeItem('jwt');
                    //window.location.href = './login.html'
                    //console.log(localStorage.getItem("jwt"));
                }
                return false;
           }
        }
        showDashboardData(data);
        showGraphChart(data);
      }

function showDashboardData(data){
    if(data.status != 200){
        return false;
      }
      const dashboard = data.response;
      document.getElementById("total-books").innerHTML = dashboard.totalBook;
      document.getElementById("issued-books").innerHTML = dashboard.allIssuedBookListData;
      document.getElementById("returned-books").innerHTML = dashboard.returnBookListData;
      document.getElementById("maintn_books").innerHTML = dashboard.maintenanceBook;
      document.getElementById("damaged-books").innerHTML = dashboard.damageBook;
      document.getElementById("return-overdue").innerHTML = dashboard.overDueBook;
}

function showGraphChart(dashboardData){
  const dashboardGraphyData = dashboardData.response.dashBoardGraph;
  //chart--line--
  var users = dashboardData.response.allUserData;
  var totalIssued = dashboardData.response.allIssuedBookListData;
  var totalOverdue = dashboardData.response.overDueBook;
  var months=[];
  var totalBookIssuedMonth = [];
  var totalPendingforReturned = [];
  var i = 0;
  dashboardGraphyData.forEach(e => {
    months[i] = e.monthName;
    totalBookIssuedMonth[i] = e.totalIssueBook;
    totalPendingforReturned[i] = e.totalReturnBook;
    i++;
  });
	  
  const data = {
		labels: months,
		datasets: [{
		  label: 'Total Books',
		  backgroundColor: '#17a2b8',
		  borderColor: '#17a2b8',
		  data: [50,70,80,100,120,140],
		  cubicInterpolationMode: 'monotone',
		},
    ]
	  };
	
	  const config = {
		type: 'bar',
		data: data,
		options: {}
	  };
	  

	  const lineChart = new Chart(
		document.getElementById('lineChart'),
		config
	  );

    /*--Total issued Books--*/
    const dataissued = {
      labels: months,
      datasets: [{
        label: 'Issued Books',
        backgroundColor: '#5CB85C',
        borderColor: '#5CB85C',
        data: [20,25,30,40,50,70],
        cubicInterpolationMode: 'monotone',
      },
    ]
      };
    
      const configissued = {
      type: 'bar',
      data: dataissued,
      options: {}
      };
      
  
      const lineChartissued = new Chart(
      document.getElementById('lineChartissued'),
      configissued
      );
  
      /*--Total Return Books--*/
      const dataReturn = {
        labels: months,
        datasets: [{
          label: 'Returned Books',
          backgroundColor: '#337AB7',
          borderColor: '#337AB7',
          data: [20,25,30,40,50,70],
          cubicInterpolationMode: 'monotone',
        },
      ]
        };
      
        const configReturn = {
        type: 'bar',
        data: dataReturn,
        options: {}
        };
        
    
        const lineChartReturn = new Chart(
        document.getElementById('lineChartReturn'),
        configReturn
        );
    
    
 /*--Total Maintenance Books--*/
 const dataMaintenance = {
  labels: months,
  datasets: [{
    label: 'Maintenance Books',
    backgroundColor: '#343A40',
    borderColor: '#343A40',
    data: [20,25,30,40,50,70],
    cubicInterpolationMode: 'monotone',
  },
]
  };

  const configMaintenance = {
  type: 'bar',
  data: dataMaintenance,
  options: {}
  };
  

  const lineChartMaintenance = new Chart(
  document.getElementById('lineChartMaintenance'),
  configMaintenance
  );
/*--Total damages Books--*/
const dataDamaged = {
  labels: months,
  datasets: [{
    label: 'Damaged Books',
    backgroundColor: '#F0AD4E',
    borderColor: '#F0AD4E',
    data: [20,25,30,40,50,70],
    cubicInterpolationMode: 'monotone',
  },
]
  };

  const configDamaged = {
  type: 'bar',
  data: dataDamaged,
  options: {}
  };
  

  const lineChartDamaged = new Chart(
  document.getElementById('lineChartDamaged'),
  configDamaged
  );

/*--Total damages Books--*/
const dataOverdue = {
  labels: months,
  datasets: [{
    label: 'Damaged Books',
    backgroundColor: '#D9534F',
    borderColor: '#D9534F',
    data: [20,25,30,40,50,70],
    cubicInterpolationMode: 'monotone',
  },
]
  };

  const configOverdue = {
  type: 'bar',
  data: dataOverdue,
  options: {}
  };
  

  const lineChartOverdue = new Chart(
  document.getElementById('lineChartOverdue'),
  configOverdue
  );


	  /*--polarchart--*/
	  const dataPolar = {
		labels: [
		  'Total Books',
      'Issued',
      'Returned',
		  'Overdue',
      'Maintenance',
		  'Damaged',
		],
    labelDisplay:'rotate',
		datasets: [{
		  data: [30, 40, 30, 50,70,50],
		  backgroundColor: [
			'#17A2B8',
			'#5CB85C',
			'#337AB7',
			'#343A40',
			'#F0AD4E',
			'#D9534F',

		  ]
		}]
	   }
	const configPolar = {
      type: 'polarArea',
		  data: dataPolar,
		  options: {}
	  };
  
    const polarChart = new Chart(document.getElementById('polarChart'),configPolar);
}

getDashboardData();

function checkForFutureDate(value){
      var date = new Date(value);
      var today = new Date();
      today.setHours(0, 0, 0, 0);
      date.setHours(0, 0, 0, 0);
      var dateTense = "present";
      if (date > today) {
        Swal.fire({
          text: 'Cannot enter Future Date',
          icon: 'error',
          confirmButtonText: 'OK',
          showCancelButton: true,
        }).then(async (result) => {
          if (result.isConfirmed) {
              document.getElementById("fromDate").value="";
            }
          }); 
      }
}


function checkForPastDate(value){
  var tempDate = document.getElementById("fromDate").value;
  if(tempDate != ""){
  var fromDate = new Date(tempDate)   
  var date = new Date(value);
  fromDate.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);
  if (date < fromDate) {
    Swal.fire({
      text: 'To Date must be greater than From Date',
      icon: 'error',
      confirmButtonText: 'OK',
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
          document.getElementById("toDate").value="";
        }
      }); 
  }
}
}


async function refreshDashboardData() {
  const url = BASE_URL+"/dashboard/getDashboardData";
  const fromDate = document.getElementById("fromDate").value;
  const toDate = document.getElementById("toDate").value;
  const itemType = document.getElementById("itemType").value;
  const body = {
      toDate:toDate,
      fromDate:fromDate,
      typeId:itemType,
  };
  console.log(JSON.stringify(body));
      const response = await fetch(url,{
              method : 'POST',
              headers : {
                          'Content-Type' : 'application/json',
                          'token': localStorage.getItem("jwt")
                       },
              body : JSON.stringify(body)
          });
      var data = await response.json();
      if (response) {
         if(!response.ok){
              if(response.status=='401'){
                  //localStorage.removeItem('jwt');
                  //window.location.href = './login.html'
                  //console.log(localStorage.getItem("jwt"));
              }
              return false;
         }
      }
      showDashboardData(data);
    }