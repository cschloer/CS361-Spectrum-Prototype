// CAGE
// CSCI 361 Prototype

// tile
// todo: wall tiles, cliff tiles, fall tiles.

var modelObject : GameObject; 
var box : BoxCollider;			// For walls and cliffs

function init(type: String) {
	modelObject = GameObject.CreatePrimitive(PrimitiveType.Quad);		// Create a quad object for holding the unit texture.
	modelObject.collider.enabled = false;								// Turn off MeshCollider
	modelObject.SetActive(false);										// Turn off the object so its script doesn't do anything until we're ready.
	if(type == "Wall"){
		var wmodel = modelObject.AddComponent("TileWallModel");					// Add a script to control direction of the unit.
		box = modelObject.AddComponent("BoxCollider");						// Add boxcollider.
		box.center = wmodel.transform.position;								// Center the boxcollider on the unit.
		box.size = Vector3(1,1,1);
		wmodel.init(this);													// Initialize the tileModel.
	} else {
		var model = modelObject.AddComponent("TileFloorModel");					// Add a script to control direction of the unit.
		box = modelObject.AddComponent("BoxCollider");						// Add boxcollider.
		box.center = model.transform.position;								// Center the boxcollider on the unit.
		box.size = Vector3(1,1,1);
		box.isTrigger = true;
		model.init(this);													// Initialize the tileModel.
	}
	modelObject.SetActive(true);										// Turn on the object (the Update function will start being called).
}