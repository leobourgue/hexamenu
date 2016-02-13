function ParamsWindowHexa(id) {
  editing = true;
  hexa_id = id;
  posInArray = tools.getPosInArrays(tools.idToArray(hexa_id), grid.hexagons.positions);
  hexaColor = grid.hexagons.colors[posInArray];
  hexaLink = grid.hexagons.links[posInArray];
  hexaImg = grid.hexagons.backImg[posInArray];

  $("body").prepend('<div id="paramsWindowHexa" class="window unselectable">' +
    '<span id="closeIcon" class="ui-icon ui-icon-close"></span>' +
    '<div class="titre" id="paramsHexaTitle"></div>' +
    '<ul>' +
    '<li>' + '<div id="link"></div>' + '<input id="url" type="text" value="' + hexaLink + '" placeholder="ex: google.fr" autofocus/>' + '</li>' +
    '<li>' + '<div id="img"></div>' + '<input id="urlImg" type="text" value="' + hexaImg + '" placeholder="ex: url.com/image.png" onchange="ParamsWindowHexa.prototype.imgChange(this.value);" autofocus/>' + '</li>' +
    '<li>' + '<div id="imgSize"></div>' + '<input id="imgSize" value="200" max="300" min="0" step="5" type="range" onchange="ParamsWindow.prototype.imgSizeChange(this.value)"/>' + '</li>' +
    '<li>' + '<div id="backcolorhexa"></div>' + '<input id="colorHexa" type="color" value="' + hexaColor + '" onchange="ParamsWindowHexa.prototype.colorChange(this.value);"/>' + '</li>' +
    '<li>' + '<div id="deleteButton" class="button" onclick="ParamsWindowHexa.prototype.deleteHexa();"></div>'  + '</li>' +
    '<li style="margin-bottom: 0;">' + '<div id="okButton" class="button" onclick="ParamsWindowHexa.prototype.submit()">OK</div>' + '</li>' +
    '</ul>' +
    '</div>');
  langManager.setLanguage();

  $("#paramsWindowHexa").draggable({
    containment: "body",
    scroll: false
  });
  //Met la GUI a coté de paramsWindow (width de paramsWindow + width de paramsWindowHexa)
  $("#paramsWindowHexa").css('left', parseInt($("#paramsWindow").css('width')) + parseInt($("#paramsWindow").css('padding-left')) * 2);
  $("#url").focus();

  $("#closeIcon").click(function(){
    ParamsWindowHexa.prototype.close();
  });
}

ParamsWindowHexa.prototype = {
  constructor: ParamsWindowHexa,
  close: function() {
    $("#paramsWindowHexa").fadeOut(fadeSpeed, function(){
      $("#paramsWindowHexa").remove();
      modifying = false;
      editing = false;
    });

  },
  imgChange: function(value) {
    var pos = tools.idToArray(hexa_id);
    $("#" + pos[0] + "\\;" + pos[1] + ".hex-in2").css("background-image", 'url("' + value + '")');
    hexaImg = value;
  },
  colorChange: function(value) {
    var pos = tools.idToArray(hexa_id);
    $("#" + pos[0] + "\\;" + pos[1] + ".hex-in2").css("background-color", value);
    hexaColor = value;
  },
  deleteHexa: function() {
    document.getElementById(hexa_id).remove();
    grid.hexagons.positions.splice(posInArray, 1);
    grid.hexagons.colors.splice(posInArray, 1);
    grid.hexagons.links.splice(posInArray, 1);
    grid.hexagons.backImg.splice(posInArray, 1);
    grid.addPreviewHexa();
    editing = false;
    modifying = false;
    this.close();
  },
  submit: function() {
    editing = false;
    modifying = false;
    grid.hexagons.colors[posInArray] = hexaColor;
    grid.hexagons.links[posInArray] = $("#url").val();
    grid.hexagons.backImg[posInArray] = $("#urlImg").val();
    this.close();

  }
};
