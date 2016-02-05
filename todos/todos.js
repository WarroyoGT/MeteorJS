
Todos = new Mongo.Collection('todos');

if (Meteor.isClient) {
    Meteor.subscribe('todos');
    // Template Helpers
    Template.main.helpers({
        todos: function(){
            //return Todos.find({ userId: Meteor.userId() },{sort:{createdAt:-1}}); //in client side use Meteor on server use this
            return Todos.find({  },{sort:{createdAt:-1}}); //in client side use Meteor on server use this
        }
    });

    Template.main.events({
        "submit .new-todo":function (event){
            var text = event.target.text.value;

            Meteor.call('addTodo',text);

            // Clear Form

            event.target.text.value ='';

            // Prevent Submition
            return false;
        },
        "click .toggle-check": function () {
            Meteor.call('setChecked',  this._id, !this.checked);
        },
        "click .delete-todo": function () {
            if(confirm('Are you sure?')){
                Meteor.call('deleteTodo',this._id);
            }
        }
    });

    Accounts.ui.config({
        passwordSignupFields: "USERNAME_ONLY"
    });
}

if (Meteor.isServer) {
    Meteor.publish('todos', function(){
        if (!this.userId){
            return Todos.find();
        }else {
            return Todos.find({userId: this.userId});
        }
    })
}

Meteor.methods({
    addTodo: function (text) {
        if (!Meteor.userId()){
            throw new Meteor.Error('not-authorized');
        }
        Todos.insert({
            text:text,
            createdAt: new Date(),
            userId: Meteor.userId(),
            userName: Meteor.user().username
        });
    },
    deleteTodo: function (todoId) {
        Todos.remove(todoId);
    },
    setChecked: function (todoId, setChecked) {
        Todos.update(todoId,{$set:{checked: setChecked}});
    }
});
