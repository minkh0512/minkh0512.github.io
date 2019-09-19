suite('Global Tests', function(){
    test('page has a valid title', function(){
        Assert(document.title && document.title.match(/\S/) && document.title.toUpperCase() !== 'TODO');
    });
});