Router.configure({
    layoutTemplate: 'layout'
});

Router.map(function () {
    //Host Route
    this.route('posts',{
        path:'/',
        template: 'posts'
    });
    // about Router
    this.route('about',{
        path:'/about',
        template: 'about'
    });
});
