import angular from 'angular';
import angularMeteor from 'angular-meteor';
import todosList from '../imports/components/todosList/todosList';
import singleChart from '../imports/components/singleChart/singleChart';
import '../imports/startup/accounts-config.js';
 
angular.module('simple-todos', [
  angularMeteor,
  todosList.name,
  singleChart.name,
  'accounts.ui'
]);