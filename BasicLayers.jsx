var mainComp = app.project.activeItem;

if (!(mainComp instanceof CompItem)){           
    alert("Please Select an Active Composition");
}
else{

    var mainWindow = new Window("palette", "Basic Layers ", undefined);

    var groupOne = mainWindow.add("group", undefined, "groupOne");
    groupOne.orientation = "column";

    groupOne.add("statictext", undefined, "This Palette Allows you to Add Some Basic Layers ! ");
    
    var groupTwo = mainWindow.add("group",undefined, "input-field");
    groupTwo.add("statictext", undefined, "Layer duration");

    var layerDuration = groupTwo.add("edittext", undefined, "");
    layerDuration.size = [150, 25];
    layerDuration.characters = 20;

    function getValidatedDuration() {
        var duration = parseFloat(layerDuration.text);
        if (isNaN(duration) || duration <= 0) {
            alert("Please enter a valid duration greater than 0 seconds.");
            return null;
        }
        return duration;
    }    

    
    var groupThree = mainWindow.add("group", undefined, "Buttons");
    groupThree.orientation = "column";

    var nullButton = groupThree.add("button", undefined, "NULL");
    var adjButton = groupThree.add("button", undefined, "Adj");
    var solidButton = groupThree.add("button", undefined, "Solid");
    var closeButton = groupThree.add("button", undefined, "Close");

    nullButton.onClick = function () {
        var duration = getValidatedDuration();
        if(duration === null) return;
        app.beginUndoGroup("Levin");
        addNullLayer(duration);
    }
    adjButton.onClick = function () {
        var duration = getValidatedDuration();
        if(duration === null) return;
        app.beginUndoGroup("Levin1");
        addAdjustmentLayer(duration);
        
    }
    solidButton.onClick = function () {
        var duration = getValidatedDuration();
        if(duration === null) return;
        app.beginUndoGroup("Levin2");
        addSolidLayer(duration);
    }

    closeButton.onClick = function () {
        mainWindow.close();
    }

    var layer;

    function addNullLayer(duration){

        var layerSeconds = duration;
        layer = mainComp.layers.addNull(duration); 
        layer.inpoint = 0;
        layer.outPoint = layerSeconds;
        app.endUndoGroup("Levin");
    }
    function addAdjustmentLayer (duration) {
        
        var layerSeconds = duration;
        layer = mainComp.layers.addSolid([1,1,1], "Adjustment Layer", mainComp.width, mainComp.height, mainComp.pixelAspect, layerSeconds);
        //mf *whats going on here?*
        layer.adjustmentLayer = true;
        layer.outPoint = layerSeconds;
        layer.label = 5;
        layer.selected = true; 

        app.endUndoGroup("Levin1");
    
    }
    function addSolidLayer(duration) {
        var layerSeconds = duration;
        layer = mainComp.layers.addSolid([1,1,1], "Solid Layer", mainComp.width, mainComp.height, mainComp.pixelAspect, layerSeconds);
        layer.outPoint = layerSeconds;
        app.endUndoGroup("Levin2");
        
    }
 groupThree.add("statictext", undefined, "Made by Levin");

    mainWindow.show();

}