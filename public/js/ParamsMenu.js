function ParamsMenu() {
  $.get("/html/ParamsMenu.html", function(data){
    $("body").prepend(data);

    $("#paramsMenu").hide();

    langManager.setLanguage(infos.lang.value);
  });
}

ParamsMenu.prototype = {
  constructor: ParamsMenu,
  open: function() {
    $("#paramsMenu").css({'left': mouse.x, 'top': mouse.y});
    $("#paramsMenu").fadeIn(fadeSpeed);

    paramsMenuOpen = true;
    if(grid.hexagons.length > 1){
      if($("#modifHexa").length < 1){
        $("#paramsMenu ul").append('<li id="modifHexa" onclick="ParamsMenu.prototype.modif()"></li>');
        langManager.setLanguage(infos.lang.value);
      }
    }else{
      $("#modifHexa").remove();
    }
  },
  close: function() {
    $("#paramsMenu").fadeOut(fadeSpeed);
    paramsMenuOpen = false;
  },
  closeAll: function() {
    if(params){
      paramsWindow.undoModifications();
    }

    ParamsWindowHexa.prototype.close();
    grid.removePreviewHexa();
    modifying = false;
    messages.closeAll();
  },
  modif: function() {
    this.closeAll();
    modifying = true;
    messages.open("choosehexatomod");
  },
  generalParams: function() {
    this.closeAll();
    if (params)
      paramsWindow.close();
    else
      paramsWindow.open();
  },
  addHexa: function() {
    this.closeAll();
    if (!previewing){
      grid.findPreviewHexa();
    }
    else
      grid.removePreviewHexa();
  }
};
