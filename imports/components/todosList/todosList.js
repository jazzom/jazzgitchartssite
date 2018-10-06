import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Tasks } from '../../api/tasks.js';
import { Meteor } from 'meteor/meteor';

import template from './todosList.html';

class TodosListCtrl {
  constructor($scope) {
    $scope.viewModel(this);
	
	this.hideCompleted = false;
	
	this.datasource = [{
  	  type:'us', y:20.5, x:Date.parse('12-1-2013')
	},{
	  type:'us', y:10, x:Date.parse('01-1-2014')
	},{
	  type:'bug', y:150.111, x:Date.parse('02-1-2014')
	},{
	  type:'bug', y:300.9, x:Date.parse('05-1-2014')
	}]; 
	this.datasourceTypes = []; 
	this.datasourceByType = {};
	
    this.helpers({
      
	  tasks() {  
		const selector = {};
        // If hide completed is checked, filter tasks
        if (this.getReactively('hideCompleted')) {
          selector.checked = {
            $ne: true
          };
        }
		
	   // Show newest tasks at the top
		const results =  Tasks.find(selector, {
        	sort: {
            	createdAt: -1
          	}
        });
		console.log("jazz results:");
		console.log(results);
        return results;
       },
	   
      incompleteCount() {
		  const incompleteSelector = {};
		  incompleteSelector.checked = {
            $ne: true
          };
	  	const incompleteResults =  Tasks.find(incompleteSelector);
		console.log("jazz incomplete results");
		console.log(incompleteResults);
		return incompleteResults.count();
      },
      currentUser() {
        return Meteor.user();
      }
	});
  }//end constructor
  $onInit(){
	  console.log("on init");
	  this.datasourceByType = _.groupBy(this.datasource, 'type');
	  console.log(this.datasourceByType);
	  this.datasourceTypes = Object.keys(this.datasourceByType);
	  console.log(this.datasourceTypes);
	  console.log("end init");
	  }
  
   addTask(newTask) {
	   /*
    // Insert a task into the collection
    Tasks.insert({
      text: newTask,
 	  createdAt: new Date,
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
	*/
	// Insert a task into the collection
    Meteor.call('tasks.insert', newTask);
 
    // Clear form
    this.newTask = '';
  }
   setChecked(task) {
    /*// Set the checked property to the opposite of its current value
    Tasks.update(task._id, {
      $set: {
        checked: !task.checked
      },
    });
	*/
	console.log("uuuser");
	console.log(Meteor.user());
	Meteor.call('tasks.setChecked', task._id, !task.checked);
  }
 
  removeTask(task) {
    /*Tasks.remove(task._id);*/
	Meteor.call('tasks.remove', task._id);
  }

}

export default angular.module('todosList', [
  angularMeteor
])
  .component('todosList', {
    templateUrl: 'imports/components/todosList/todosList.html',
    controller: ['$scope', TodosListCtrl]
  });