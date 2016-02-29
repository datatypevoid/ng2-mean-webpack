import {Component, View} from 'angular2/core';

import {TodoService} from './todo.service';

// We `import` `http` into our `TodoService` but we can only
// specify providers within our component
import {HTTP_PROVIDERS} from 'angular2/http';

// Import NgFor directive
import {NgFor} from 'angular2/common';

// Create metadata with the `@Component` decorator
@Component({
    // HTML tag for specifying this component
    selector: 'todo',
    // Let Angular 2 know about `Http` and `TodoService`
    providers: [...HTTP_PROVIDERS, TodoService]
})
@View({
    template: `
      <div class="container">

        <!-- HEADER AND TODO COUNT -->
        <div class="jumbotron text-center">
            <h1>Todo <span class="label label-info">{{todos.length}}</span></h1>
        </div>

        <!-- TODO LIST -->
        <div id="todo-list" class="row">
            <div class="col-sm-4 col-sm-offset-4">

                <!-- LOOP OVER THE TODOS IN $scope.todos -->
                <div class="checkbox" *ngFor="#todo of todos">
                    <label>
                        <input type="checkbox" (click)="deleteTodo(todo._id)" bind-checked="false">
                        {{ todo.text }}
                    </label>
                </div>

            </div>
        </div>

        <!-- FORM TO CREATE TODOS -->
        <div id="todo-form" class="row">
            <div class="col-sm-8 col-sm-offset-2 text-center">
                <form>
                    <div class="form-group">

                        <!-- BIND THIS VALUE TO todoData.text IN ANGULAR -->
                        <input type="text" class="form-control input-lg text-center" placeholder="I want to buy a puppy that will love me forever" [(ngModel)]="todoData.text" required>
                    </div>

                    <!-- createToDo() WILL CREATE NEW TODOS -->
                    <button type="submit" class="btn btn-primary btn-lg"
                      (click)="createTodo()">Add</button>
                </form>
            </div>
        </div>

    </div>
    `
})
export class Todo {
  private todos: Array<Todo> = [];
  // Set our default values
  //todos = [];
  // Initialize our `todoData.text` to an empty `string`
  todoData = {
    text: ''
  };

  constructor(public todoService:TodoService) {
    console.log('Todo constructor go!')

      //this.todos = [];
      todoService.getAll()
        // `Rxjs`; we subscribe to the response
        .subscribe((res) => {

            // Populate our `todo` array with the `response` data
            this.todos = res;
            // Reset `todo` input
            this.todoData.text = '';
        })
  }

  createTodo() {

      this.todoService.createTodo(this.todoData)
        .subscribe((res) => {

            // Populate our `todo` array with the `response` data
            this.todos = res;
            // Reset `todo` input
            this.todoData.text = '';
        })
  }

  deleteTodo(id) {

    this.todoService.deleteTodo(id)
      .subscribe((res) => {

          // Populate our `todo` array with the `response` data
          this.todos = res;
      })
  }
}