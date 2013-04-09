!(function() {
  console.log('index');
  var hammer = [];
  var draggableType = 'text/choice'
  
  $(document).find('.answer').each(function(index, item) {
    item.addEventListener('dragenter', function (event) {
      $(item).addClass('over');
    });
    
    item.addEventListener('dragleave', function (event) {
      $(item).removeClass('over');
    });
    
    item.addEventListener('dragover', function (event) {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
      return false;
    });
    
    item.addEventListener('drop', function (event) {
      var index = event.dataTransfer.getData(draggableType)
      var el = hammer[index-1].element;
      event.currentTarget.innerHTML = el.innerHTML;
      el.innerHTML = '';
      $(item).removeClass('over');
      return false;
    });
  });
  
  $(document).find('.choice').each(function(index, item) {
    hammer[index] = Hammer(item);
    hammer[index].on('dragstart', function(event) {
      if (event instanceof MouseEvent) {
        event.dataTransfer.setData(draggableType, item.dataset.value);
        event.dataTransfer.effectAllowed = 'move';
      }
    });
    //hammer[index].on('dragend', function(e) {});
  });
})();