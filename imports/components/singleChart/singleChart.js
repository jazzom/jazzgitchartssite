import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Tasks } from '../../api/tasks.js';
import { Meteor } from 'meteor/meteor';

import template from './singleChart.html';
//test github2
class SingleChartCtrl {
  constructor($scope) {
    $scope.viewModel(this);
	this.titlep = "not loaded yet";
	console.log(this.titlep);
	console.log(this.datasource);
  }
  $onInit() {
       // this.title= 'Loaded!';
		console.log("jazz single chart");
	//this.dataSource = {};//datasource IN
	//this.title = "not working";
	console.log(this.titlep);
	console.log(this.datasource);

      }
	  $postLink(){
		  console.log("jazz postlink");

		  angular.element(document).ready(function () {
      //  const renderEl = angular.element(renderPlace);
	//console.log(renderEl);
	this.setUpHighChart();

    }.bind(this));
		}
  setUpHighChart(){
	  console.log("jazz highchart");
	  const renderPlace = this.titlep+'line';
	  console.log(renderPlace);
	 const myChart = Highcharts.chart(''+renderPlace, {
        xAxis: {
        type: 'datetime'
    },
        series: [{data: this.datasource}]
    });
  }
  setUpChart(){

	var chart = new Taucharts.Chart({
		data: this.datasource,
		type: 'line',
		x: 'date',
		y: 'count',
		color: 'type', // there will be two lines with different colors on the chart
		plugins: ["tooltip"
//        TauCharts.api.plugins.get('tooltip')()
    ]
	});
	const renderPlace = '#'+this.titlep+'line';
	//renderPlace='bugline';
	console.log("jazz render place");
	console.log(renderPlace);
	angular.element(document).ready(function () {
      //  const renderEl = angular.element(renderPlace);
	//console.log(renderEl);
	chart.renderTo(renderPlace);
    });


  }//end setupchart
}

export default angular.module('singleChart', [
  	angularMeteor
	])
  .component('singleChart', {
	  bindings: {
       titlep: '<',
       datasource: '<'
  	},
    templateUrl: 'imports/components/singleChart/singleChart.html',
    controller: ['$scope', SingleChartCtrl]
  });
